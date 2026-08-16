import { generate, research } from "./claude";
import {
  NamesSchema,
  PositioningSchema,
  LegalSchema,
  BrandSchema,
  MarketingSchema,
  DigitalSchema,
  FinancialSchema,
  OpportunityScanSchema,
  type KitSection,
} from "./schemas";

export interface Brief {
  idea: string;
  name?: string;
  founder?: string;
  location?: string;
  customer?: string;
  pricePoint?: string;
  notes?: string;
}

export function formatBrief(b: Brief): string {
  const lines = [
    `Idea: ${b.idea}`,
    b.name ? `Working name: ${b.name}` : `Working name: NOT YET CHOSEN`,
    b.founder ? `Founder: ${b.founder}` : null,
    `Location / market: ${b.location || "South Carolina, USA (assume Columbia metro unless the idea implies otherwise)"}`,
    b.customer ? `Intended customer: ${b.customer}` : null,
    b.pricePoint ? `Price expectation: ${b.pricePoint}` : null,
    b.notes ? `Additional context: ${b.notes}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

/* ============================================================
   Section generators
   ============================================================ */

const INSTRUCTIONS: Record<KitSection, string> = {
  names: `Generate 8 candidate business names.

Rules:
- Range across registers: one or two plainly descriptive, several evocative, one or two founder-named if a founder is given.
- For each, give a one-sentence rationale, a realistic .com guess, and the single biggest risk (trademark collision, hard to spell, too generic, ages badly, etc.).
- Do not claim a domain is available — you cannot check. Phrase domainGuess as the domain you would try first.
- End with a recommendation naming your single pick and why in two sentences.

If a working name is already chosen, still generate alternates but make the recommendation an honest assessment of whether the existing name should be kept.`,

  positioning: `Write the CONCEPT-phase definition for this business.

- oneLiner: one sentence, no jargon, that a stranger understands immediately. If you need two sentences, you have not found it.
- mission: 2-3 sentences on why this exists beyond money. Should feel specific enough to be uncomfortable, not a generic values statement.
- targetCustomer: the specific person, concretely. Not "small businesses" — the actual human, their situation.
- customerSituation: what is going on in their life at the moment they need this. What have they already tried?
- problemsSolved: exactly 3 specific problems. These become the marketing copy.
- differentiator: what this does that the obvious local alternative does not.
- elevatorPitch: 3-4 sentences the founder can say out loud at a chamber of commerce event without sounding rehearsed.`,

  legal: `Produce the FORMATION-phase plan.

- recommendedStructure: Sole Proprietorship, LLC, or S-Corp election. Pick one and commit.
- structureRationale: why this one for this business at this stage, in plain English, including the liability reasoning.
- steps: ordered, numbered, each with a real filing office or URL, a real dollar cost, and a real processing time. Include at minimum: name availability check, entity filing, EIN, operating agreement, business bank account, and any registered agent requirement.
- humanRequired: mark true for any step that legally requires a signature, an SSN/ITIN, or in-person/video identity verification. Be accurate about this — it defines what can and cannot be delegated.
- licensesAndPermits: specific to this business type and state. Food service, contractors, cosmetology, financial services all differ. If none are required beyond a general business license, say that.
- warnings: the two or three things founders in this specific business most often get wrong or skip.

Use the given state. If costs vary by county or municipality, say so and give the range.`,

  brand: `Produce the IDENTITY-phase brand system.

- colorPalette: 3-4 colors maximum, each with a real hex value, a name, the role it plays (primary / surface / accent / text), and where to use it. Colors must suit the business's actual customer, not generic startup blue. A food truck, a bookkeeper, and a drummer should not land in the same palette.
- typography: one heading face and one body face, both real and available on Google Fonts. Explain the pairing in one or two sentences.
- voice: exactly 3 adjectives, a short description of how the brand talks, plus concrete doSay and dontSay examples — real phrases, not categories.
- logoDirection: which of the three practical paths fits (DIY wordmark, hire a designer, start with type-only) and what the mark should actually look like.
- tagline: one primary tagline plus 4 alternates. Short. No puns unless the business is genuinely playful.`,

  marketing: `Produce the GROWTH-phase plan.

- positioningStatement: the sentence that goes at the top of every marketing asset.
- channels: 4-5 channels ranked by priority for THIS business. For each: why it fits, the very first concrete action to take, and honest effort required. Do not list channels that do not fit — a local alterations shop does not need LinkedIn thought leadership.
- contentPillars: 3-4 recurring themes, each with 3 example post ideas that are specific enough to actually shoot or write.
- launchSequence: 4 weeks, each with a focus and 3-4 concrete actions.
- firstTenCustomers: the specific, named-category first ten. "Post on Instagram" is not an answer. "Ask the three churches within two miles about their fellowship-hall catering" is.`,

  digital: `Produce the DIGITAL-phase setup.

- domains: 4 candidate domains with a note on each. Do not claim availability.
- socialHandles: the platforms that matter for this specific business, with the exact handle to claim and a priority. Skip platforms that do not fit.
- emailSetup: the specific recommendation (Google Workspace vs Zoho vs other) with cost, and the actual address to use.
- websitePages: the core pages, each with its purpose, the sections it needs, and its primary CTA. Most service businesses need exactly five; adjust if this business genuinely differs.
- googleBusinessProfile: how important it is for this business and what to put in it. If the business is not location-based, say so.
- toolStack: 4-6 tools with purpose and real monthly cost. Favor free and cheap tiers.`,

  financial: `Produce the OPERATIONS-phase money plan.

- pricingModel: hourly, per-project, packaged tiers, or per-unit. Pick one and justify it.
- pricePoints: 3-4 concrete offers with real dollar prices benchmarked to current market rates in the given region. Do not hedge with ranges wider than 30%.
- startupCosts: itemized, each marked as essential / recommended / optional.
- monthlyOverhead: realistic recurring cost.
- breakEven: how many sales per month at the given prices to cover overhead. Show the arithmetic in one line.
- paymentProcessing: specific recommendation (Stripe, Square, Venmo Business, etc.) with real transaction fees and why it fits this business. Consider whether the business takes payment in person, online, or both.`,
};

const SECTION_TOKENS: Partial<Record<KitSection, number>> = {
  legal: 20000,
  marketing: 20000,
  digital: 20000,
};

const SCHEMAS = {
  names: NamesSchema,
  positioning: PositioningSchema,
  legal: LegalSchema,
  brand: BrandSchema,
  marketing: MarketingSchema,
  digital: DigitalSchema,
  financial: FinancialSchema,
} as const;

export async function generateSection(section: KitSection, brief: Brief) {
  return generate({
    schema: SCHEMAS[section],
    instruction: INSTRUCTIONS[section],
    brief: formatBrief(brief),
    maxTokens: SECTION_TOKENS[section] ?? 16000,
  });
}

/* ============================================================
   Phase 2 — Opportunity scanning.
   Two-pass: research the real market with web search, then
   structure the findings. Keeps the search grounded and the
   output machine-readable.
   ============================================================ */

export async function scanOpportunities(input: {
  sector?: string;
  region?: string;
  constraints?: string;
  count?: number;
}) {
  const sector = input.sector?.trim() || "any sector";
  const region = input.region?.trim() || "South Carolina and the broader Southeast US";
  const count = input.count ?? 6;

  const researchQuery = `Research current, real market gaps that a solo founder or small team could serve as a new business.

Sector focus: ${sector}
Region: ${region}
${input.constraints ? `Constraints: ${input.constraints}` : ""}

Use web search to find actual signal, not speculation. Look for:
- Services people are visibly asking for and not finding (forum complaints, review gaps, "does anyone know someone who..." posts)
- Categories where existing local providers are scarce, poorly reviewed, or have long wait times
- Recently shifted regulations, demographics, or technology that opened a gap
- Job posting density and small-business formation trends that indicate unmet demand

For each gap you find, note the specific evidence and where it came from. Prefer concrete, checkable observations over general trends. Report what you actually found — if a lead turned out to be thin, say so.`;

  const findings = await research(researchQuery, 20000);

  return generate({
    schema: OpportunityScanSchema,
    instruction: `Turn the research findings below into a ranked list of ${count} concrete business opportunities.

Scoring — each dimension 1-10:
- demand: how clearly evidenced the need is
- feasibility: how realistically a solo founder could start it
- margin: profit per unit of work
- defensibility: how hard to copy once established
- speedToLaunch: how fast to first revenue

compositeScore: the average, to one decimal.

For each opportunity give the specific evidence from the research, who needs it, why the gap exists, realistic startup cost, time to first revenue, the first three moves, and the honest risks.

Rank by compositeScore, highest first. If the research did not support a strong opportunity, return fewer rather than padding the list — and say so in scanSummary.

List the sources actually consulted in sourcesConsulted.`,
    brief: `Sector: ${sector}\nRegion: ${region}\n\nRESEARCH FINDINGS:\n\n${findings}`,
    maxTokens: 24000,
  });
}
