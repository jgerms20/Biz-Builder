#!/usr/bin/env node
/* ============================================================
   render-site.mjs

   Deterministic site scaffolder. Takes a SiteSpec JSON and the
   tokenized template at factory/templates/site-nextjs/, and writes
   a real Next.js site into an output directory — the ~85% that is
   pure boilerplate. The website-developer agent hand-finishes the
   distinctive ~15% afterwards.

   Usage:
     node factory/scripts/render-site.mjs <spec.json> <outputDir>

   No external dependencies — Node core only.
   ============================================================ */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.resolve(__dirname, "../templates/site-nextjs");

function die(msg) {
  console.error(`render-site: ${msg}`);
  process.exit(1);
}

/* ---------- Args ---------- */

const [specPath, outDir] = process.argv.slice(2);
if (!specPath || !outDir) die("usage: render-site.mjs <spec.json> <outputDir>");
if (!fs.existsSync(specPath)) die(`spec not found: ${specPath}`);
if (!fs.existsSync(TEMPLATE_DIR)) die(`template not found: ${TEMPLATE_DIR}`);

let spec;
try {
  spec = JSON.parse(fs.readFileSync(specPath, "utf-8"));
} catch (e) {
  die(`could not parse spec: ${e.message}`);
}

/* ---------- Token map (mirrors platform/lib/factory/siteSpec.ts toTemplateVars) ---------- */

function scalarVars(s) {
  const b = s.business ?? {};
  const t = s.tokens ?? {};
  const ty = s.typography ?? {};
  const h = s.hero ?? {};
  const c = s.conversion ?? {};
  const seo = s.seo ?? {};
  const deploy = s.deploy ?? {};
  return {
    SLUG: b.slug ?? "site",
    BUSINESS_NAME: b.name ?? "",
    SHORT_NAME: b.shortName ?? b.name ?? "",
    TAGLINE: b.tagline ?? "",
    LOCATION: b.location ?? "",
    FOUNDER_NAME: b.founderName ?? "",
    FOUNDER_FIRST: b.founderFirstName ?? "",
    PHONE: b.phone ?? "",
    EMAIL: b.email ?? "",
    SITE_URL: b.siteUrl ?? "",
    THEME: s.theme ?? "light",
    TOKEN_BG: t.bg ?? "#ffffff",
    TOKEN_SURFACE: t.surface ?? "#f5f5f5",
    TOKEN_SURFACE2: t.surface2 ?? "#ebebeb",
    TOKEN_LINE: t.line ?? "#e0e0e0",
    TOKEN_BRAND: t.brand ?? "#1a1a1a",
    TOKEN_BRAND_STRONG: t.brandStrong ?? "#000000",
    TOKEN_ACCENT: t.accent ?? "#666666",
    TOKEN_INK: t.ink ?? "#111111",
    TOKEN_INK_MUTED: t.inkMuted ?? "#666666",
    HEADING_FONT: ty.headingFont ?? "Georgia",
    BODY_FONT: ty.bodyFont ?? "system-ui",
    GOOGLE_FONTS_HREF: ty.googleFontsHref ?? "",
    HERO_EYEBROW: h.eyebrow ?? "",
    HERO_HEADLINE: h.headline ?? b.name ?? "",
    HERO_SUBHEAD: h.subhead ?? b.tagline ?? "",
    CTA_LABEL: s.ctaLabel ?? "Get in touch",
    CTA_HREF: s.ctaHref ?? `/${c.route ?? "contact"}`,
    CONVERSION_ROUTE: c.route ?? "contact",
    SUCCESS_HEADING: c.successHeading ?? "Thank you",
    SUCCESS_BODY: c.successBody ?? "We'll be in touch shortly.",
    EMAIL_SUBJECT_TEMPLATE: c.emailSubjectTemplate ?? "New submission from ${name}",
    RECIPIENT_ENV_KEY: c.recipientEnvKey ?? "CONTACT_EMAIL",
    ROOT_DIRECTORY: deploy.rootDirectory ?? (b.slug ?? "site"),
    SEO_TITLE_DEFAULT: seo.titleDefault ?? b.name ?? "",
    SEO_TITLE_TEMPLATE: seo.titleTemplate ?? `%s · ${b.name ?? ""}`,
    SEO_DESCRIPTION: seo.description ?? b.tagline ?? "",
    // Derived copy the scaffold needs; the developer agent refines these.
    ABOUT_INTRO: h.subhead ?? b.tagline ?? "",
    ABOUT_BODY: `${b.name ?? "This business"} serves ${b.serviceArea ?? b.location ?? "its community"}. This section is a starting draft — the copywriter refines it.`,
  };
}

/* Escape a string for embedding inside a double-quoted TS/JSX literal. */
function esc(v) {
  return String(v ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

/* Generate the object-literal code the page arrays expect. */
function offeringsCode(s) {
  const items = Array.isArray(s.offerings) ? s.offerings : [];
  return items
    .map(
      (o) =>
        `  { title: "${esc(o.title)}", blurb: "${esc(o.blurb)}"${
          o.price ? `, price: "${esc(o.price)}"` : ""
        } },`
    )
    .join("\n");
}
function statsCode(s) {
  const items = Array.isArray(s.stats) ? s.stats : [];
  return items.map((x) => `  { value: "${esc(x.value)}", label: "${esc(x.label)}" },`).join("\n");
}

const vars = scalarVars(spec);
const injections = {
  "/* {{OFFERINGS}} */": offeringsCode(spec),
  "/* {{STATS}} */": statsCode(spec),
};

/* ---------- Substitution ---------- */

function substitute(text) {
  let out = text;
  // Code injections first (they contain the literal marker).
  for (const [marker, code] of Object.entries(injections)) {
    out = out.split(marker).join(code);
  }
  // Scalar {{TOKEN}} replacements.
  for (const [key, val] of Object.entries(vars)) {
    out = out.split(`{{${key}}}`).join(String(val));
  }
  return out;
}

const BINARY_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff", ".woff2"]);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    // Substitute tokens in names too (e.g. a {{SLUG}} filename).
    const destName = substitute(entry.name);
    const destPath = path.join(dest, destName);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (BINARY_EXT.has(ext)) {
        fs.copyFileSync(srcPath, destPath);
      } else {
        fs.writeFileSync(destPath, substitute(fs.readFileSync(srcPath, "utf-8")), "utf-8");
      }
    }
  }
}

const outAbs = path.resolve(outDir);
copyDir(TEMPLATE_DIR, outAbs);

/* ---------- Conversion-route rename ---------- */

const route = vars.CONVERSION_ROUTE;
if (route !== "contact") {
  const renames = [
    [path.join(outAbs, "app", "contact"), path.join(outAbs, "app", route)],
    [path.join(outAbs, "app", "api", "contact"), path.join(outAbs, "app", "api", route)],
  ];
  for (const [from, to] of renames) {
    if (fs.existsSync(from)) fs.renameSync(from, to);
  }
  console.log(`  · conversion route: renamed contact → ${route}`);
}

/* ---------- Report unemitted spec pages (never drop silently) ---------- */

const emitted = new Set(["home", "about", "offerings", "conversion"]);
const skipped = (Array.isArray(spec.pages) ? spec.pages : [])
  .filter((p) => !emitted.has(p.archetype))
  .map((p) => `${p.slug || "(home)"} [${p.archetype}]`);
if (skipped.length) {
  console.log(`  · spec pages not emitted by the scaffold (developer to add): ${skipped.join(", ")}`);
}

/* ---------- Leftover-token check ---------- */

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next") continue;
      walk(p, acc);
    } else acc.push(p);
  }
  return acc;
}

const leftovers = [];
for (const file of walk(outAbs)) {
  const ext = path.extname(file).toLowerCase();
  if (BINARY_EXT.has(ext)) continue;
  const content = fs.readFileSync(file, "utf-8");
  const matches = content.match(/\{\{[A-Z_]+\}\}/g);
  if (matches) leftovers.push([path.relative(outAbs, file), [...new Set(matches)]]);
}

if (leftovers.length) {
  console.warn("\n⚠ Unresolved tokens remain (add them to the spec or the renderer):");
  for (const [file, toks] of leftovers) console.warn(`   ${file}: ${toks.join(", ")}`);
}

/* ---------- Summary ---------- */

const fileCount = walk(outAbs).length;
console.log(`\n✓ Rendered ${vars.BUSINESS_NAME || vars.SLUG} → ${outDir}`);
console.log(`  ${fileCount} files written.`);
console.log(
  `  This is the ~85% scaffold. It still needs the art-director-led custom pass\n  (the distinctive ~15%) before it meets factory/REVIEW.md.`
);
