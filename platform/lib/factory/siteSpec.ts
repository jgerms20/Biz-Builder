import { z } from "zod/v4";

/* ============================================================
   SITE SPEC

   The typed contract a business must satisfy before a site can
   be rendered. It is the ~28 template variables the exploration
   found behind every shipped site, made explicit — the single
   input to factory/scripts/render-site.mjs.

   Two rules the seeded sites taught us:

   1. TOKENS ARE ROLE-NAMED, never color-named. `ct-mustard` is
      actually teal — a color name outlived a rebrand and now
      lies. `brand`/`accent`/`surface`/`ink`/`line` never lie, so
      a rebrand is a token edit, not a repo-wide rename.

   2. ONE conversion route drives the whole form: it names the
      page dir, the api dir, the component, and the email lib.

   The brand/positioning inputs already flow from the existing
   BrandSchema + Digital section in lib/schemas.ts; this schema
   is where they land in a shape the renderer can consume.
   ============================================================ */

/** Role-named design tokens. Every generated tailwind.config maps
 *  these keys — page code references roles, never colors. */
export const TokensSchema = z.object({
  bg: z.string(), // page background
  surface: z.string(), // cards, raised panels
  surface2: z.string(), // deeper surface
  line: z.string(), // borders / hairlines
  brand: z.string(), // primary brand color
  brandStrong: z.string(), // darker/stronger brand
  accent: z.string(), // secondary accent
  ink: z.string(), // body text
  inkMuted: z.string(), // secondary text
});
export type Tokens = z.infer<typeof TokensSchema>;

export const TypographySchema = z.object({
  headingFont: z.string(), // a real Google Font family
  bodyFont: z.string(), // a real Google Font family
  headingRole: z.enum(["serif", "display", "sans"]),
  googleFontsHref: z.string(), // the exact <link>/@import URL
});

export const FormFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "tel", "select", "textarea"]),
  required: z.boolean().default(false),
  placeholder: z.string().default(""),
  options: z.array(z.string()).default([]), // for select
});
export type FormField = z.infer<typeof FormFieldSchema>;

/** Page archetypes the renderer knows how to emit. */
export const PAGE_ARCHETYPES = [
  "home",
  "about",
  "offerings",
  "process",
  "offering-detail",
  "proof",
  "location",
  "schedule",
  "conversion",
] as const;

export const PageSchema = z.object({
  slug: z.string(), // "" for home, "about", "menu", ...
  title: z.string(),
  archetype: z.enum(PAGE_ARCHETYPES),
  navLabel: z.string().optional(),
});

export const OfferingSchema = z.object({
  title: z.string(),
  blurb: z.string(),
  price: z.string().optional(),
});

export const SiteSpecSchema = z.object({
  business: z.object({
    name: z.string(),
    legalName: z.string().optional(),
    slug: z.string(), // folder + package name, e.g. "milton-german"
    shortName: z.string(), // logo wordmark
    tagline: z.string(),
    category: z.string(),
    founderName: z.string().optional(),
    founderFirstName: z.string().optional(),
    location: z.string(),
    serviceArea: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    siteUrl: z.string().optional(),
  }),

  theme: z.enum(["dark", "light"]),
  tokens: TokensSchema,
  typography: TypographySchema,
  logo: z.object({
    wordmark: z.string(),
    mark: z.string().optional(), // reference to a produced logo asset
    dividerStyle: z.enum(["bar", "diamond", "none"]).default("bar"),
  }),

  nav: z.array(z.object({ label: z.string(), href: z.string() })),
  ctaLabel: z.string(),
  ctaHref: z.string(),

  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
  }),

  pages: z.array(PageSchema),
  offerings: z.array(OfferingSchema),
  stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  proofPoints: z.array(z.string()).default([]),
  testimonials: z
    .array(z.object({ quote: z.string(), author: z.string(), detail: z.string().optional() }))
    .default([]),

  /** The single conversion route: names the page, api, component, lib. */
  conversion: z.object({
    route: z.enum(["book", "contact", "inquire", "order"]),
    formFields: z.array(FormFieldSchema),
    successHeading: z.string(),
    successBody: z.string(),
    emailSubjectTemplate: z.string(), // may reference ${field}
    recipientEnvKey: z.string().default("CONTACT_EMAIL"),
  }),

  seo: z.object({
    titleDefault: z.string(),
    titleTemplate: z.string(), // "%s · Business Name"
    description: z.string(),
    keywords: z.array(z.string()).default([]),
  }),

  deploy: z.object({
    rootDirectory: z.string(), // Vercel root = the slug folder
    previewOnly: z.boolean().default(true), // held before public deploy
    envKeys: z.array(z.string()).default(["GMAIL_USER", "GMAIL_APP_PASSWORD", "CONTACT_EMAIL"]),
  }),
});
export type SiteSpec = z.infer<typeof SiteSpecSchema>;

/* ---------- Derivation helpers ---------- */

/**
 * The fixed spine every business site has: home + about + one
 * conversion page. Anything else is an offerings page (renamed)
 * plus optional archetype pages. Used to sanity-check a spec.
 */
export function hasRequiredPages(spec: SiteSpec): boolean {
  const archetypes = new Set(spec.pages.map((p) => p.archetype));
  return archetypes.has("home") && archetypes.has("about") && archetypes.has("conversion");
}

/** Flatten the spec to the {{token}} substitution map the renderer applies. */
export function toTemplateVars(spec: SiteSpec): Record<string, string> {
  const t = spec.tokens;
  return {
    SLUG: spec.business.slug,
    BUSINESS_NAME: spec.business.name,
    SHORT_NAME: spec.business.shortName,
    TAGLINE: spec.business.tagline,
    LOCATION: spec.business.location,
    FOUNDER_NAME: spec.business.founderName ?? "",
    FOUNDER_FIRST: spec.business.founderFirstName ?? "",
    PHONE: spec.business.phone ?? "",
    EMAIL: spec.business.email ?? "",
    SITE_URL: spec.business.siteUrl ?? "",
    THEME: spec.theme,
    TOKEN_BG: t.bg,
    TOKEN_SURFACE: t.surface,
    TOKEN_SURFACE2: t.surface2,
    TOKEN_LINE: t.line,
    TOKEN_BRAND: t.brand,
    TOKEN_BRAND_STRONG: t.brandStrong,
    TOKEN_ACCENT: t.accent,
    TOKEN_INK: t.ink,
    TOKEN_INK_MUTED: t.inkMuted,
    HEADING_FONT: spec.typography.headingFont,
    BODY_FONT: spec.typography.bodyFont,
    GOOGLE_FONTS_HREF: spec.typography.googleFontsHref,
    HERO_EYEBROW: spec.hero.eyebrow,
    HERO_HEADLINE: spec.hero.headline,
    HERO_SUBHEAD: spec.hero.subhead,
    CTA_LABEL: spec.ctaLabel,
    CTA_HREF: spec.ctaHref,
    CONVERSION_ROUTE: spec.conversion.route,
    SUCCESS_HEADING: spec.conversion.successHeading,
    SUCCESS_BODY: spec.conversion.successBody,
    EMAIL_SUBJECT_TEMPLATE: spec.conversion.emailSubjectTemplate,
    RECIPIENT_ENV_KEY: spec.conversion.recipientEnvKey,
    ROOT_DIRECTORY: spec.deploy.rootDirectory,
    SEO_TITLE_DEFAULT: spec.seo.titleDefault,
    SEO_TITLE_TEMPLATE: spec.seo.titleTemplate,
    SEO_DESCRIPTION: spec.seo.description,
  };
}
