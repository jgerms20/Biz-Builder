import { z } from "zod/v4";
import { generate, research } from "@/lib/claude";
import { OpportunitySchema } from "@/lib/schemas";
import { modelFor, TIER_APPROX_USD_PER_MTOK } from "./models";
import {
  getStore,
  readJson,
  writeJson,
  storeIsWritable,
  type GitStore,
} from "./gitStore";
import { activeWatches, recordScanResult, type WatchEntry } from "./watchlist";

/* ============================================================
   AUTO MODE — "Business Generator"

   The proactive discovery loop. On a schedule it walks the
   watchlist and, for each active entry: researches the real market
   (cheap tier, grounded in web search), then vets and rates what
   it found (judge tier — quality decides here). It returns ranked,
   vetted ideas and STOPS. It does not pre-build anything; building
   happens only when the operator picks an idea.

   Scope: an entry can want local openings (place-specific), general
   ones (patterns anywhere), or both.

   Cost: every model step is paced against a global budget in
   factory/budgets/global.json. When the cap is reached the pass
   stops and reports what it skipped — it never silently overruns.
   ============================================================ */

/* ---------- Vetted output schema ---------- */

export const VettedOpportunitySchema = OpportunitySchema.extend({
  /** The devil's-advocate verdict after stress-testing the idea. */
  verdict: z.enum(["build", "watch", "pass"]),
  verdictReason: z.string(),
  /** The single strongest argument against building it. */
  strongestObjection: z.string(),
  /** local = tied to a specific place; general = a pattern that travels. */
  kind: z.enum(["local", "general"]),
});
export type VettedOpportunity = z.infer<typeof VettedOpportunitySchema>;

export const HuntResultSchema = z.object({
  summary: z.string(),
  marketContext: z.string(),
  opportunities: z.array(VettedOpportunitySchema),
  sourcesConsulted: z.array(z.string()),
});
export type HuntResult = z.infer<typeof HuntResultSchema>;

/* ---------- Global budget pacing ---------- */

const GLOBAL_BUDGET_FILE = "factory/budgets/global.json";

interface GlobalBudget {
  capUSD: number;
  spentUSD: number;
  windowStart: string;
  windowDays: number;
}

const DEFAULT_GLOBAL: GlobalBudget = {
  capUSD: 20,
  spentUSD: 0,
  windowStart: "1970-01-01T00:00:00.000Z",
  windowDays: 7,
};

async function loadGlobalBudget(store: GitStore, now: string): Promise<GlobalBudget> {
  const raw = (await readJson<GlobalBudget>(store, GLOBAL_BUDGET_FILE)) ?? DEFAULT_GLOBAL;
  // Roll the window over if it has elapsed.
  const start = new Date(raw.windowStart).getTime();
  const elapsedDays = (new Date(now).getTime() - start) / (1000 * 60 * 60 * 24);
  if (Number.isNaN(start) || elapsedDays >= (raw.windowDays || 7)) {
    return { ...raw, spentUSD: 0, windowStart: now };
  }
  return raw;
}

async function saveGlobalBudget(store: GitStore, b: GlobalBudget): Promise<void> {
  if (!storeIsWritable()) return;
  await writeJson(store, GLOBAL_BUDGET_FILE, b, "factory: auto-mode spend update");
}

/** Rough per-hunt cost: one cheap research pass + one judge structuring pass. */
function estimateHuntUSD(): number {
  // ~30k tokens cheap research + ~25k tokens judge structuring, blended.
  return (
    (30 / 1000) * TIER_APPROX_USD_PER_MTOK.cheap +
    (25 / 1000) * TIER_APPROX_USD_PER_MTOK.judge
  );
}

/* ---------- One hunt ---------- */

const VET_INSTRUCTION = `Turn the market research below into a ranked list of concrete business opportunities, each independently stress-tested.

For EACH opportunity:
- Fill the standard fields (summary, sector, demandSignal, evidence from the research, whoNeedsIt, whyGapExists, startupCost, timeToRevenue, the five 1-10 scores, compositeScore = their average to one decimal, firstThreeMoves, risks).
- kind: "local" if the opening is tied to a specific place, "general" if it is a pattern that would work in many markets.
- Then play devil's advocate. strongestObjection: the single most convincing reason this would fail or isn't worth building. verdict: "build" only if it survives that objection and is genuinely worth a founder's time; "watch" if promising but unproven; "pass" if the objection is decisive. verdictReason: one or two sentences defending the verdict.

Be honest. Most ideas should be "watch" or "pass" — "build" is a high bar. Rank by compositeScore, highest first. If the research did not support a real opportunity, return fewer (or none) and say so in the summary. List the sources actually consulted.`;

export async function huntForWatch(
  entry: WatchEntry,
  now: string
): Promise<HuntResult> {
  const sector = entry.sector.trim() || "any sector";
  const region = entry.region.trim() || "South Carolina and the broader Southeast US";
  const scopeLine =
    entry.scope === "local"
      ? "Focus on LOCAL, place-specific openings in the region."
      : entry.scope === "general"
        ? "Focus on GENERAL patterns that would work in many markets."
        : "Include BOTH local place-specific openings AND general patterns.";

  const researchQuery = `Research current, real market gaps a solo founder or small team could serve as a new business.

Sector: ${sector}
Region: ${region}
${entry.constraints ? `Constraints: ${entry.constraints}` : ""}
${scopeLine}

Use web search for actual signal, not speculation: unmet requests, scarce or poorly-reviewed providers, long wait times, recently shifted regulation/demographics/technology, small-business formation trends. Note the specific evidence and where it came from. Prefer concrete, checkable observations. If a lead is thin, say so.`;

  // Research on the cheap tier — high volume, low stakes.
  const findings = await research(researchQuery, 20000, modelFor("cheap"));

  // Vet + rank on the judge tier — this is where quality decides.
  return generate({
    schema: HuntResultSchema,
    instruction: VET_INSTRUCTION,
    brief: `Sector: ${sector}\nRegion: ${region}\nScope: ${entry.scope}\n\nRESEARCH FINDINGS:\n\n${findings}`,
    maxTokens: 24000,
    model: modelFor("judge"),
  });
}

/* ---------- A full pass over the watchlist ---------- */

export interface AutoPassSummary {
  scanned: number;
  skippedForBudget: number;
  results: { watchId: string; sector: string; region: string; result: HuntResult }[];
  spentUSD: number;
  capUSD: number;
  stoppedEarly: boolean;
}

export async function runAutoPass(
  now: string,
  store: GitStore = getStore()
): Promise<AutoPassSummary> {
  const budget = await loadGlobalBudget(store, now);
  const watches = await activeWatches(store);
  const perHunt = estimateHuntUSD();

  const summary: AutoPassSummary = {
    scanned: 0,
    skippedForBudget: 0,
    results: [],
    spentUSD: budget.spentUSD,
    capUSD: budget.capUSD,
    stoppedEarly: false,
  };

  for (const entry of watches) {
    if (budget.spentUSD + perHunt > budget.capUSD) {
      // Out of budget for this window — stop, don't overrun.
      summary.skippedForBudget = watches.length - summary.scanned;
      summary.stoppedEarly = true;
      break;
    }
    try {
      const result = await huntForWatch(entry, now);
      budget.spentUSD += perHunt;
      summary.scanned += 1;
      summary.results.push({
        watchId: entry.id,
        sector: entry.sector,
        region: entry.region,
        result,
      });
      const top = result.opportunities[0]?.compositeScore;
      await recordScanResult(
        entry.id,
        { at: now, topScore: top, count: result.opportunities.length },
        store
      );
    } catch (err) {
      // One bad hunt shouldn't kill the pass.
      summary.results.push({
        watchId: entry.id,
        sector: entry.sector,
        region: entry.region,
        result: {
          summary: `Hunt failed: ${err instanceof Error ? err.message : "unknown error"}`,
          marketContext: "",
          opportunities: [],
          sourcesConsulted: [],
        },
      });
    }
  }

  summary.spentUSD = budget.spentUSD;
  await saveGlobalBudget(store, budget);
  return summary;
}
