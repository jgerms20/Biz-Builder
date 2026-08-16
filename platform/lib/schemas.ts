// The SDK's zodOutputFormat helper is built against the Zod v4 API, which
// ships from the `zod/v4` subpath. Schemas must come from the same surface.
import { z } from "zod/v4";

/* ============================================================
   Structured-output schemas.
   Each one backs a generator and is enforced at the API layer
   via output_config.format, so the model can't drift.
   ============================================================ */

export const NameOptionSchema = z.object({
  name: z.string(),
  rationale: z.string(),
  domainGuess: z.string(),
  risk: z.string(),
});

export const NamesSchema = z.object({
  options: z.array(NameOptionSchema),
  recommendation: z.string(),
});
export type Names = z.infer<typeof NamesSchema>;

export const PositioningSchema = z.object({
  oneLiner: z.string(),
  mission: z.string(),
  targetCustomer: z.string(),
  customerSituation: z.string(),
  problemsSolved: z.array(z.string()),
  differentiator: z.string(),
  elevatorPitch: z.string(),
});
export type Positioning = z.infer<typeof PositioningSchema>;

export const LegalStepSchema = z.object({
  order: z.number(),
  title: z.string(),
  detail: z.string(),
  estimatedCost: z.string(),
  estimatedTime: z.string(),
  where: z.string(),
  humanRequired: z.boolean(),
});

export const LegalSchema = z.object({
  recommendedStructure: z.string(),
  structureRationale: z.string(),
  steps: z.array(LegalStepSchema),
  licensesAndPermits: z.array(z.string()),
  totalEstimatedCost: z.string(),
  warnings: z.array(z.string()),
});
export type Legal = z.infer<typeof LegalSchema>;

export const BrandSchema = z.object({
  colorPalette: z.array(
    z.object({
      role: z.string(),
      hex: z.string(),
      name: z.string(),
      usage: z.string(),
    })
  ),
  typography: z.object({
    heading: z.string(),
    body: z.string(),
    rationale: z.string(),
  }),
  voice: z.object({
    adjectives: z.array(z.string()),
    description: z.string(),
    doSay: z.array(z.string()),
    dontSay: z.array(z.string()),
  }),
  logoDirection: z.string(),
  tagline: z.string(),
  taglineAlternates: z.array(z.string()),
});
export type Brand = z.infer<typeof BrandSchema>;

export const MarketingSchema = z.object({
  positioningStatement: z.string(),
  channels: z.array(
    z.object({
      channel: z.string(),
      why: z.string(),
      firstAction: z.string(),
      effort: z.string(),
      priority: z.number(),
    })
  ),
  contentPillars: z.array(
    z.object({ pillar: z.string(), description: z.string(), exampleposts: z.array(z.string()) })
  ),
  launchSequence: z.array(
    z.object({ week: z.number(), focus: z.string(), actions: z.array(z.string()) })
  ),
  firstTenCustomers: z.array(z.string()),
});
export type Marketing = z.infer<typeof MarketingSchema>;

export const DigitalSchema = z.object({
  domains: z.array(z.object({ domain: z.string(), note: z.string() })),
  socialHandles: z.array(z.object({ platform: z.string(), handle: z.string(), priority: z.string() })),
  emailSetup: z.string(),
  websitePages: z.array(
    z.object({ page: z.string(), purpose: z.string(), sections: z.array(z.string()), cta: z.string() })
  ),
  googleBusinessProfile: z.string(),
  toolStack: z.array(z.object({ tool: z.string(), purpose: z.string(), cost: z.string() })),
});
export type Digital = z.infer<typeof DigitalSchema>;

export const FinancialSchema = z.object({
  pricingModel: z.string(),
  pricePoints: z.array(
    z.object({ offer: z.string(), price: z.string(), rationale: z.string() })
  ),
  startupCosts: z.array(z.object({ item: z.string(), cost: z.string(), necessity: z.string() })),
  totalStartupCost: z.string(),
  monthlyOverhead: z.string(),
  breakEven: z.string(),
  paymentProcessing: z.string(),
});
export type Financial = z.infer<typeof FinancialSchema>;

/* ---------- Phase 2: opportunity scanning ---------- */

export const OpportunitySchema = z.object({
  title: z.string(),
  summary: z.string(),
  sector: z.string(),
  demandSignal: z.string(),
  evidence: z.array(z.string()),
  whoNeedsIt: z.string(),
  whyGapExists: z.string(),
  startupCost: z.string(),
  timeToRevenue: z.string(),
  scores: z.object({
    demand: z.number(),
    feasibility: z.number(),
    margin: z.number(),
    defensibility: z.number(),
    speedToLaunch: z.number(),
  }),
  compositeScore: z.number(),
  firstThreeMoves: z.array(z.string()),
  risks: z.array(z.string()),
});
export type Opportunity = z.infer<typeof OpportunitySchema>;

export const OpportunityScanSchema = z.object({
  scanSummary: z.string(),
  marketContext: z.string(),
  opportunities: z.array(OpportunitySchema),
  sourcesConsulted: z.array(z.string()),
});
export type OpportunityScan = z.infer<typeof OpportunityScanSchema>;

/* ---------- Full kit ---------- */

export interface StarterKit {
  names?: Names;
  positioning?: Positioning;
  legal?: Legal;
  brand?: Brand;
  marketing?: Marketing;
  digital?: Digital;
  financial?: Financial;
}

export type KitSection = keyof StarterKit;

export const KIT_SECTIONS: {
  key: KitSection;
  label: string;
  blurb: string;
  phase: string;
}[] = [
  { key: "names", label: "Name Options", blurb: "Candidate names with rationale and domain read", phase: "concept" },
  { key: "positioning", label: "Positioning", blurb: "One-liner, mission, customer, problems solved", phase: "concept" },
  { key: "legal", label: "Formation Plan", blurb: "Entity, registration, EIN, banking, permits", phase: "formation" },
  { key: "brand", label: "Brand Identity", blurb: "Palette, type, voice, logo direction, tagline", phase: "identity" },
  { key: "digital", label: "Digital Setup", blurb: "Domain, handles, email, site spec, tools", phase: "digital" },
  { key: "marketing", label: "Marketing Plan", blurb: "Channels, content pillars, 30-day launch", phase: "growth" },
  { key: "financial", label: "Pricing & Money", blurb: "Pricing, startup costs, break-even, processing", phase: "operations" },
];
