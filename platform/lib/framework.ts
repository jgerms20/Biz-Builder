/* ============================================================
   The Six-Phase Framework
   ------------------------------------------------------------
   Every business in the portfolio moves through the same six
   phases. This file is the canonical definition — task text and
   descriptions are ported verbatim from the original static
   platform (biz-builder-platform/data.js), which was written by
   hand and is deliberately opinionated.

   Phase ids match Project.phasesComplete in lib/projects.ts:
     concept · formation · identity · digital · operations · growth
   ============================================================ */

/** Accent colors available to a phase. Mirrors Project["accent"]. */
export type PhaseAccent = "signal" | "amber" | "ion" | "violet" | "rose";

export interface PhaseTask {
  /** Stable id, unique across the whole framework. */
  id: string;
  /** The imperative — what the founder actually does. */
  text: string;
  /** The opinion — how to do it, what it costs, what to avoid. */
  desc: string;
}

export interface Phase {
  /** Slug used in Project.phasesComplete and in URLs. */
  id: string;
  /** 1-indexed position in the framework. */
  number: number;
  name: string;
  tagline: string;
  /** What exists at the end of this phase that did not exist before. */
  deliverable: string;
  /** Realistic wall-clock effort for a solo founder. */
  effort: string;
  accent: PhaseAccent;
  tasks: PhaseTask[];
}

export const PHASES: Phase[] = [
  {
    id: "concept",
    number: 1,
    name: "Concept",
    tagline: "Define what this actually is.",
    deliverable:
      "A clear written definition of the business — one-liner, mission, target customer.",
    effort: "1–2 days",
    accent: "ion",
    tasks: [
      {
        id: "c1",
        text: "Write a one-sentence business description",
        desc: "The simplest, clearest version of what you do and for whom. One sentence, no jargon. If you need two, you haven't found it yet.",
      },
      {
        id: "c2",
        text: "Define your target customer",
        desc: "Who is the specific person who needs what you offer? Be concrete: their situation, their problem, what they've already tried.",
      },
      {
        id: "c3",
        text: "Write your mission statement",
        desc: "Why does this business exist beyond making money? What change does it create? 2–3 sentences. Should feel uncomfortable if it's just generic.",
      },
      {
        id: "c4",
        text: "Name the 3 problems you solve",
        desc: "Every real business solves at least one specific problem. Name yours explicitly — this becomes your marketing.",
      },
      {
        id: "c5",
        text: "Decide: side income or primary income?",
        desc: "This determines how fast to move, how much to invest, and which legal structure makes sense. Be honest with yourself.",
      },
    ],
  },
  {
    id: "formation",
    number: 2,
    name: "Formation",
    tagline: "Make it official.",
    deliverable:
      "A legally registered business entity with an EIN and dedicated bank account.",
    effort: "1–2 weeks",
    accent: "amber",
    tasks: [
      {
        id: "f1",
        text: "Choose your business structure",
        desc: "Sole Proprietorship (simplest, no separation), LLC (liability protection, $50–200 to file), S-Corp (tax optimization at scale). Most solo founders start with LLC.",
      },
      {
        id: "f2",
        text: "Register your business name",
        desc: 'File a DBA ("doing business as") or form a legal entity with your state. Check for conflicts: Google search, state business registry, USPTO trademark database.',
      },
      {
        id: "f3",
        text: "Get an EIN from the IRS",
        desc: "Employer Identification Number — free at IRS.gov, takes 5 minutes online. You need this to open a business bank account and to pay taxes properly.",
      },
      {
        id: "f4",
        text: "Open a dedicated business bank account",
        desc: "Never mix business and personal money. Most banks require your EIN and formation documents. Chase, Mercury (online, no fees), or your local credit union.",
      },
      {
        id: "f5",
        text: "Research permits and licenses",
        desc: "Varies by business type and location. Food service, contractors, healthcare providers, financial advisors — all have specific requirements. Check your state and city.",
      },
    ],
  },
  {
    id: "identity",
    number: 3,
    name: "Identity",
    tagline: "Build the brand.",
    deliverable:
      "A complete, consistent brand identity: name, colors, typography, voice.",
    effort: "3–7 days",
    accent: "violet",
    tasks: [
      {
        id: "i1",
        text: "Finalize your brand name",
        desc: "Check three things before deciding: (1) Is the .com available? (2) Does a Google search show conflicts? (3) Is it on the USPTO trademark database? Simple and memorable beats clever.",
      },
      {
        id: "i2",
        text: "Define your color palette",
        desc: "2–3 colors maximum. A primary (your brand color), a neutral (backgrounds/surfaces), and an accent (highlights/CTAs). Use Coolors.co to build and test. Colors communicate before words do.",
      },
      {
        id: "i3",
        text: "Choose your typography direction",
        desc: "Serif fonts (Cormorant, Playfair, Georgia) feel established, premium, craft-oriented. Sans-serif (DM Sans, Inter, Helvetica) feels modern, clean, tech-forward. Pick one heading + one body — and use them everywhere.",
      },
      {
        id: "i4",
        text: "Write your brand voice",
        desc: 'Pick 3 adjectives that describe how your brand communicates — not what it does, but how it speaks. "Warm, direct, expert." "Bold, simple, relentless." These guide every word you write going forward.',
      },
      {
        id: "i5",
        text: "Decide on your logo direction",
        desc: "Three paths: (1) DIY with Canva — fine for starting. (2) Hire a designer — $100–500 for a solid one on Fiverr or 99designs. (3) Start with a wordmark — just your brand name in your brand font. Ship over perfect.",
      },
    ],
  },
  {
    id: "digital",
    number: 4,
    name: "Digital",
    tagline: "Get online.",
    deliverable:
      "A live website with 5 core pages, domain, business email, and social handles.",
    effort: "1–3 weeks",
    accent: "rose",
    tasks: [
      {
        id: "d1",
        text: "Register your domain name",
        desc: "yourbrandname.com via Namecheap (~$12/year) or Google Domains. Get the .com. If it's taken, try .co or rethink the name — not .net or .biz.",
      },
      {
        id: "d2",
        text: "Set up a business email address",
        desc: "hello@yourbusiness.com — never use a personal Gmail for business. Google Workspace ($6/mo) or Zoho Mail (free tier). This single step adds credibility.",
      },
      {
        id: "d3",
        text: "Build the 5 core website pages",
        desc: "Home (who you are + CTA), About (your story + credibility), Services (what you offer + pricing), Portfolio/Gallery (proof of work), Contact/Book (how to hire you). Every business needs exactly these five.",
      },
      {
        id: "d4",
        text: "Claim your social media handles",
        desc: "Instagram and TikTok at minimum. Claim the same handle across all platforms even if you're not posting yet — @yourbrand before someone else takes it.",
      },
      {
        id: "d5",
        text: "Set up Google Business Profile",
        desc: "Free. Critical for local service businesses. Shows up in Google Maps searches. Add photos, hours, service areas, and collect reviews here. Takes 20 minutes to set up.",
      },
    ],
  },
  {
    id: "operations",
    number: 5,
    name: "Operations",
    tagline: "Build how it runs.",
    deliverable:
      "A complete ops setup: services defined, pricing set, booking live, payment ready.",
    effort: "3–5 days",
    accent: "ion",
    tasks: [
      {
        id: "o1",
        text: "Define your service or product menu",
        desc: "Write out everything you offer, organized into categories. Each item needs a name and a one-sentence description. Fewer, clearer options convert better than long lists.",
      },
      {
        id: "o2",
        text: "Set your pricing",
        desc: "Research 3–5 direct competitors. Price at or above market rate for your quality level. Underpricing signals low quality and attracts difficult clients. Know your cost, know your margin.",
      },
      {
        id: "o3",
        text: "Define how clients book or buy",
        desc: "Options: contact form on your site, email intake, Calendly (appointments), Square/Stripe (products), or phone call. Match this to your business — not every business needs a booking app.",
      },
      {
        id: "o4",
        text: "Set up payment methods",
        desc: "Minimum viable: Venmo + Zelle (instant, no fees). For credit cards: Square (in-person) or Stripe (online). For larger projects: invoice via Wave or FreshBooks. Be clear about your terms.",
      },
      {
        id: "o5",
        text: "Write your client process document",
        desc: 'One page: what happens from "new inquiry" to "project delivered and paid." This becomes your FAQ page, your onboarding email, and your ops bible. Everything lives here first.',
      },
    ],
  },
  {
    id: "growth",
    number: 6,
    name: "Launch & Grow",
    tagline: "Go live and build momentum.",
    deliverable:
      "A live business with first clients, real testimonials, and a clear growth plan.",
    effort: "Ongoing",
    accent: "signal",
    tasks: [
      {
        id: "g1",
        text: "Soft launch to 10 people you know",
        desc: "Before going public: serve 3–5 real clients, ideally at a discount or free, in exchange for honest feedback and photos of your work. Use this to fix what needs fixing before it's public.",
      },
      {
        id: "g2",
        text: "Collect your first 3 real testimonials",
        desc: 'After every job: send one follow-up message. "What did you like most? What would you tell a friend?" Use their exact words, with permission, on your website. Specificity beats praise.',
      },
      {
        id: "g3",
        text: "Build your portfolio or gallery",
        desc: "Every project gets documented. Before/after shots work best. Consistent lighting, clean backgrounds. A phone on a tripod is enough. This is your most powerful sales tool.",
      },
      {
        id: "g4",
        text: "Set up a referral mechanism",
        desc: '"Tell a friend and get X." A discount, a priority slot, a bonus — whatever fits your business. Referrals are your highest-quality clients and cost you almost nothing.',
      },
      {
        id: "g5",
        text: "Identify your top 3 skill gaps",
        desc: "Use the Skills Finder to surface what you need to learn or hire out. Prioritize skills that are directly blocking revenue — those go first.",
      },
    ],
  },
];

/** Every phase id, in framework order. */
export const PHASE_IDS: string[] = PHASES.map((p) => p.id);

/** Look up a single phase by its slug. Returns undefined for unknown ids. */
export function getPhase(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}

/**
 * Percentage of the framework a project has completed, 0–100.
 * Unknown ids and duplicates are ignored, so a stale or hand-edited
 * phasesComplete array can never push a project past 100.
 */
export function phaseProgress(complete: string[]): number {
  if (PHASES.length === 0) return 0;
  const valid = new Set<string>();
  for (const id of complete) {
    if (PHASE_IDS.includes(id)) valid.add(id);
  }
  return Math.round((valid.size / PHASES.length) * 100);
}
