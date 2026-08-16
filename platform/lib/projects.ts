import type { StarterKit } from "./schemas";
import type { Brief } from "./generators";

export type ProjectStatus = "live" | "building" | "idea" | "paused";

export interface Project {
  id: string;
  name: string;
  founder: string;
  tagline: string;
  category: string;
  description: string;
  status: ProjectStatus;
  url?: string;
  repoPath?: string;
  accent: "signal" | "amber" | "ion" | "violet" | "rose";
  /** Which of the six phases are complete. */
  phasesComplete: string[];
  built: string[];
  nextUp: string[];
  seeded?: boolean;
  createdAt?: string;
  brief?: Brief;
  kit?: StarterKit;
}

/* ============================================================
   The existing portfolio. These are real, shipped businesses —
   they seed the operating home so it is useful on first load,
   with no database and no setup.
   ============================================================ */

export const SEEDED_PROJECTS: Project[] = [
  {
    id: "comeback-truck",
    name: "The Comeback Truck",
    founder: "Lorenzo Dykes",
    tagline: "Soul food that brings you back.",
    category: "Food & Culinary",
    description:
      "Soul food truck out of Columbia, SC. Lorenzo Dykes started it in 2020 coming out of Covid, seeing a need for real soul food and wanting to serve the community. Business partnership with Brigman German on the operations side.",
    status: "live",
    url: "https://comeback-truck.vercel.app",
    repoPath: "comeback-truck",
    accent: "signal",
    phasesComplete: ["concept", "identity", "digital"],
    built: [
      "Six-page Next.js site (Home, About, Menu, Menu Board, Schedule, Find Us, Book Us, Order)",
      "Teal + orange brand system matched to the physical truck wrap",
      "Full menu board with real pricing, plus a photo of the printed menu",
      "Online order form with running cart total and email notification",
      "Calendar-style event schedule and multi-state service map",
      "QR code target page for print flyers",
    ],
    nextUp: [
      "Connect a payment processor so orders can be paid online",
      "Wire GMAIL_USER / GMAIL_PASS on Vercel so order emails actually send",
      "Claim Google Business Profile for local search",
    ],
    seeded: true,
  },
  {
    id: "dg-creations",
    name: "DG Creations",
    founder: "Daniel German",
    tagline: "Private chef. Private dining. Every plate, a creation.",
    category: "Food & Culinary",
    description:
      "Chef Daniel German — Johnson & Wales graduate with dual degrees in Culinary Arts and Culinary Nutrition — turned private dining expertise into a full-service culinary brand: private dining experiences, bespoke catering, and personalized meal prep.",
    status: "live",
    url: "https://dg-creations.vercel.app",
    repoPath: "daniel-german",
    accent: "amber",
    phasesComplete: ["concept", "identity", "digital"],
    built: [
      "Seven-page site with hero carousel and real photography",
      "Seven-stop career journey timeline (Highway 55 → Rio's → Carolina Ale House → luxury hotel → JWU → private dining → DG Creations)",
      "Gallery with masonry layout, filter tabs, and lightbox",
      "Catering and meal-prep pages with market-rate pricing",
      "Booking inquiry form",
    ],
    nextUp: [
      "Copy remaining food photography into public/images",
      "Collect and publish first three client testimonials",
      "Set up business email on the custom domain",
    ],
    seeded: true,
  },
  {
    id: "janie-bell",
    name: "Janie Bell's Alterations",
    founder: "Janie Bell Daniels",
    tagline: "Fifty years of perfect fit.",
    category: "Craft & Trade",
    description:
      "A 76-year-old master seamstress in Walterboro, SC who had been doing professional-quality alterations for decades at far below market rate. Biz Builder built the full digital infrastructure and repriced the work.",
    status: "live",
    url: "https://janie-bells.vercel.app",
    repoPath: "janie-bell-static",
    accent: "ion",
    phasesComplete: ["concept", "identity", "digital"],
    built: [
      "Six-page mobile-first Next.js site",
      "Market-rate pricing researched against SC and national rates",
      "Multi-step booking form with email integration",
      "Local drop-off and mail-in service flows",
      "SEO metadata and OpenGraph throughout",
    ],
    nextUp: [
      "Set up business email address",
      "Replace placeholder photography with real work shots",
      "Add Venmo Business handle for deposits",
      "Claim TikTok handle",
    ],
    seeded: true,
  },
  {
    id: "milton-german",
    name: "Milton German Bookkeeping",
    founder: "Milton German",
    tagline: "Your books, done right.",
    category: "Professional Services",
    description:
      "Decades of state-government compliance experience turned into small-business bookkeeping: setup and cleanup, ongoing monthly books, compliance and records management, and plain-English financial consulting.",
    status: "live",
    url: "https://milton-german.vercel.app",
    repoPath: "milton-german",
    accent: "violet",
    phasesComplete: ["concept", "identity", "digital"],
    built: [
      "Five-page site on a navy / green / gold brand system",
      "Four service lines with detailed scope",
      "Contact form with inquiry-type routing and email integration",
      "Compliance-forward positioning drawn from state audit background",
    ],
    nextUp: [
      "Register the LLC and get an EIN",
      "Set up QuickBooks ProAdvisor listing",
      "Publish first two case studies",
    ],
    seeded: true,
  },
  {
    id: "nicholas-german",
    name: "Nicholas German",
    founder: "Nicholas German",
    tagline: "Drummer. Session work, live dates, and lessons.",
    category: "Arts & Entertainment",
    description:
      "Portfolio and booking site for a working drummer — session work, live performance, and instruction.",
    status: "live",
    repoPath: "nicholas-german",
    accent: "rose",
    phasesComplete: ["concept", "identity", "digital"],
    built: [
      "Five-page site on a black / amber system with Oswald display type",
      "Full booking form with performance-type routing",
      "Media and video sections",
    ],
    nextUp: [
      "Upload performance video and photography",
      "Deploy to Vercel and connect a domain",
      "Add rate card for session work",
    ],
    seeded: true,
  },
];

export function getSeeded(id: string): Project | undefined {
  return SEEDED_PROJECTS.find((p) => p.id === id);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
