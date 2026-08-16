/* ============================================================
   THE OPERATING LAYER

   Every action the platform can take on your behalf carries an
   autonomy level. The default posture is hands-off: anything
   reversible and internal just happens. Gates exist only where
   an action reaches the outside world, spends money, or is
   legally binding.

   Three levels:

     auto     Execute immediately. Logged, not gated.
     review   Execute immediately, but flag it for your review.
              Post-hoc. Reversible. This is the "I want to see it,
              but don't make me wait" setting.
     approve  Do not execute until you say yes. Pre-hoc gate.

   Some gates cannot be lowered. Entity filings need a signature,
   EIN applications need a responsible party with an SSN, and bank
   accounts need KYC on a natural person. Those are regulatory
   facts, not preferences — the platform marks them locked and
   refuses to pretend otherwise.
   ============================================================ */

export type AutonomyLevel = "auto" | "review" | "approve";

export type ActionCategory =
  | "generate"
  | "publish"
  | "message"
  | "spend"
  | "contract"
  | "file";

export interface CategorySpec {
  id: ActionCategory;
  label: string;
  description: string;
  /** What the platform does at each level, in plain language. */
  examples: string[];
  /** Default posture — deliberately permissive where it is safe to be. */
  defaultLevel: AutonomyLevel;
  /**
   * The lowest autonomy this category may be set to. Where this is
   * "approve", the gate is a legal or financial reality and the UI
   * must not offer to remove it.
   */
  floor: AutonomyLevel;
  /** Why the floor exists. Shown in the UI where locked. */
  floorReason?: string;
  accent: "signal" | "amber" | "ion" | "violet" | "rose";
}

const ORDER: Record<AutonomyLevel, number> = { auto: 0, review: 1, approve: 2 };

/** True when `level` is at least as strict as `floor`. */
export function satisfiesFloor(level: AutonomyLevel, floor: AutonomyLevel): boolean {
  return ORDER[level] >= ORDER[floor];
}

export function clampToFloor(level: AutonomyLevel, floor: AutonomyLevel): AutonomyLevel {
  return satisfiesFloor(level, floor) ? level : floor;
}

export const CATEGORIES: CategorySpec[] = [
  {
    id: "generate",
    label: "Generate",
    description:
      "Producing drafts — names, positioning, brand systems, marketing plans, site copy. Nothing leaves the building.",
    examples: [
      "Draft eight name candidates",
      "Write the brand voice and palette",
      "Build a 30-day launch calendar",
    ],
    defaultLevel: "auto",
    floor: "auto",
    accent: "signal",
  },
  {
    id: "publish",
    label: "Publish",
    description:
      "Putting something where the public can see it — deploying a site, pushing a page live, posting to a social account.",
    examples: [
      "Deploy a build to production",
      "Publish a new page on a live site",
      "Post to a connected social account",
    ],
    defaultLevel: "review",
    floor: "auto",
    accent: "ion",
  },
  {
    id: "message",
    label: "Message",
    description:
      "Sending something to a real person under your name — customer replies, inquiry follow-ups, outreach.",
    examples: [
      "Reply to a booking inquiry",
      "Send a quote to a prospect",
      "Follow up on an unanswered lead",
    ],
    defaultLevel: "review",
    floor: "auto",
    accent: "violet",
  },
  {
    id: "spend",
    label: "Spend",
    description:
      "Anything that moves money out. Domains, filing fees, subscriptions, ad budget.",
    examples: [
      "Register a domain",
      "Pay a state filing fee",
      "Start a paid subscription",
    ],
    defaultLevel: "approve",
    floor: "approve",
    floorReason:
      "Money leaving an account is not reversible on your behalf. This gate stays.",
    accent: "amber",
  },
  {
    id: "contract",
    label: "Contract",
    description:
      "Committing you to someone else — hiring a freelancer, signing an agreement, engaging a vendor.",
    examples: [
      "Hire a designer for a logo",
      "Engage a registered agent service",
      "Accept a vendor's terms",
    ],
    defaultLevel: "approve",
    floor: "approve",
    floorReason:
      "An agreement signed in your name binds you. A person has to say yes to that.",
    accent: "rose",
  },
  {
    id: "file",
    label: "File",
    description:
      "Government and financial filings — entity registration, EIN, business bank accounts, licenses.",
    examples: [
      "File Articles of Organization",
      "Apply for an EIN",
      "Open a business bank account",
    ],
    defaultLevel: "approve",
    floor: "approve",
    floorReason:
      "Filings need a signature, an SSN or ITIN, or identity verification on a real person. No system can clear this for you — it prepares the filing and hands it over.",
    accent: "amber",
  },
];

export function getCategory(id: ActionCategory): CategorySpec | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/* ---------- Policy ---------- */

export type AutonomyPolicy = Record<ActionCategory, AutonomyLevel>;

export function defaultPolicy(): AutonomyPolicy {
  return CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c.defaultLevel;
    return acc;
  }, {} as AutonomyPolicy);
}

/**
 * Normalize an arbitrary stored policy: fill gaps with defaults and
 * raise anything that sits below its category floor.
 */
export function resolvePolicy(stored?: Partial<AutonomyPolicy>): AutonomyPolicy {
  const base = defaultPolicy();
  if (!stored) return base;

  for (const category of CATEGORIES) {
    const candidate = stored[category.id];
    if (candidate && ORDER[candidate] !== undefined) {
      base[category.id] = clampToFloor(candidate, category.floor);
    }
  }
  return base;
}

/** What should happen to an action of this category under this policy. */
export function decide(
  policy: AutonomyPolicy,
  category: ActionCategory
): { execute: boolean; flagForReview: boolean; level: AutonomyLevel } {
  const level = policy[category] ?? "approve";
  return {
    execute: level !== "approve",
    flagForReview: level === "review",
    level,
  };
}

/** One-line summary of the current posture, for the console header. */
export function describePosture(policy: AutonomyPolicy): string {
  const gated = CATEGORIES.filter((c) => policy[c.id] === "approve");
  const reviewed = CATEGORIES.filter((c) => policy[c.id] === "review");

  if (gated.length === 0 && reviewed.length === 0) {
    return "Fully autonomous — nothing waits on you.";
  }

  const parts: string[] = [];
  if (gated.length) parts.push(`${gated.map((c) => c.label.toLowerCase()).join(", ")} need approval`);
  if (reviewed.length) parts.push(`${reviewed.map((c) => c.label.toLowerCase()).join(", ")} flagged for review`);
  return parts.join("; ");
}
