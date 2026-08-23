/* ============================================================
   MODEL TIERS

   Cost discipline: cheap models do the high-volume, low-stakes
   work (research, drafting, sentiment); expensive models are
   reserved for the calls where quality actually decides the
   outcome (judging an idea, final code/design).

   Each agent and pipeline step names a tier; the tier resolves to
   a model id here. Change the mapping in one place to re-balance
   cost against quality across the whole factory.
   ============================================================ */

export type BudgetTier = "cheap" | "mid" | "judge" | "code";

export const TIER_MODEL: Record<BudgetTier, string> = {
  cheap: "claude-haiku-4-5", // research, drafting, sentiment — high volume
  mid: "claude-sonnet-5", // identify, design, copy — the workhorse
  judge: "claude-opus-5", // devil's advocate + judging council — quality decides
  code: "claude-opus-5", // final site build/design — correctness matters
};

/** Rough list-price per 1M tokens (input+output blended, for spend estimates). */
export const TIER_APPROX_USD_PER_MTOK: Record<BudgetTier, number> = {
  cheap: 3,
  mid: 9,
  judge: 30,
  code: 30,
};

export function modelFor(tier: BudgetTier): string {
  return TIER_MODEL[tier];
}
