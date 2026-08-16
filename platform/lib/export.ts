import type { Project, ProjectStatus } from "./projects";
import type {
  Brand,
  Digital,
  Financial,
  Legal,
  Marketing,
  Names,
  Opportunity,
  OpportunityScan,
  Positioning,
} from "./schemas";

/* ============================================================
   Markdown export.

   Pure string building — no external deps, no runtime imports.
   Everything here is type-only at the import layer, so this
   module is safe to pull into either a server or a client file.

   Two entry points:
     kitToMarkdown(project)     — the full starter kit as one doc
     scanToMarkdown(scan, meta) — an opportunity scan as one doc
   ============================================================ */

/* ---------- primitives ---------- */

type Align = "left" | "right" | "center";

/** Normalize prose: strip CR, trim. Internal newlines survive as soft breaks. */
function text(value: string | undefined | null): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n?/g, "\n").trim();
}

/** Normalize a value destined for a table cell: single line, pipes escaped. */
function cell(value: string | undefined | null): string {
  return text(value).replace(/\s*\n\s*/g, " ").replace(/\|/g, "\\|");
}

/** A table cell that should never render blank. */
function dash(value: string | undefined | null): string {
  return cell(value) || "—";
}

/** Trim trailing zeros off generated scores so 8 renders as "8", not "8.0". */
function num(value: number | undefined | null): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return String(Math.round(value * 10) / 10);
}

/** Tolerate partially-shaped persisted data without reaching for `any`. */
function arr<T>(items: readonly T[] | undefined | null): readonly T[] {
  return Array.isArray(items) ? items : [];
}

/** Non-empty, trimmed strings only. */
function strings(items: readonly string[] | undefined | null): string[] {
  return arr(items)
    .map((item) => text(item))
    .filter((item) => item.length > 0);
}

function bullets(items: readonly string[] | undefined | null): string {
  const clean = strings(items);
  if (clean.length === 0) return "";
  return clean.map((item) => `- ${item.replace(/\n/g, "\n  ")}`).join("\n");
}

function numbered(items: readonly string[] | undefined | null): string {
  const clean = strings(items);
  if (clean.length === 0) return "";
  return clean.map((item, i) => `${i + 1}. ${item.replace(/\n/g, "\n   ")}`).join("\n");
}

/** Label/value pairs fused into one paragraph via hard line breaks. */
function fields(pairs: readonly (readonly [string, string | undefined])[]): string {
  const live = pairs
    .map(([label, value]) => [label, text(value)] as const)
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `**${label}:** ${value.replace(/\n/g, " ")}`);
  if (live.length === 0) return "";
  return live.join("  \n");
}

function quote(value: string | undefined | null): string {
  const body = text(value);
  if (!body) return "";
  return body
    .split("\n")
    .map((line) => `> ${line}`.trimEnd())
    .join("\n> \n");
}

function padTo(value: string, width: number, align: Align): string {
  const gap = Math.max(0, width - value.length);
  if (align === "right") return " ".repeat(gap) + value;
  if (align === "center") {
    const left = Math.floor(gap / 2);
    return " ".repeat(left) + value + " ".repeat(gap - left);
  }
  return value + " ".repeat(gap);
}

function ruleFor(width: number, align: Align): string {
  const w = Math.max(3, width);
  if (align === "right") return "-".repeat(w - 1) + ":";
  if (align === "center") return ":" + "-".repeat(w - 2) + ":";
  return "-".repeat(w);
}

/**
 * Render a padded GitHub-flavored table. Columns are width-aligned so the
 * raw .md stays readable in a plain text editor. Returns "" for no rows.
 */
function table(
  headers: readonly string[],
  rows: readonly (readonly string[])[],
  align: readonly Align[] = []
): string {
  if (rows.length === 0) return "";
  const cols = headers.length;
  const head = headers.map((h) => cell(h));
  const body = rows.map((row) => {
    const next: string[] = [];
    for (let i = 0; i < cols; i += 1) next.push(cell(row[i]));
    return next;
  });

  const widths: number[] = [];
  for (let i = 0; i < cols; i += 1) {
    let w = head[i].length;
    for (const row of body) w = Math.max(w, row[i].length);
    widths.push(Math.max(3, w));
  }

  const at = (i: number): Align => align[i] ?? "left";
  const line = (cells: readonly string[]): string =>
    `| ${cells.map((c, i) => padTo(c, widths[i], at(i))).join(" | ")} |`;

  return [
    line(head),
    `| ${widths.map((w, i) => ruleFor(w, at(i))).join(" | ")} |`,
    ...body.map(line),
  ].join("\n");
}

/** Join blocks with a blank line, dropping any that came back empty. */
function join(blocks: readonly string[]): string {
  return blocks.map((b) => b.trimEnd()).filter((b) => b.length > 0).join("\n\n");
}

/** GitHub-compatible heading anchor, for the table of contents. */
function anchor(title: string): string {
  return text(title)
    .toLowerCase()
    .replace(/[^a-z0-9 \-]/g, "")
    .replace(/ /g, "-");
}

/* ---------- dates ---------- */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** UTC-based so server and client render identically. */
function formatDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function formatMaybeDate(value: string | undefined): string {
  const raw = text(value);
  if (!raw) return "";
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? raw : formatDate(parsed);
}

/* ---------- project vocabulary ---------- */

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  building: "Building",
  idea: "Idea",
  paused: "Paused",
};

const PHASES: readonly { id: string; label: string }[] = [
  { id: "concept", label: "Concept" },
  { id: "formation", label: "Formation" },
  { id: "identity", label: "Identity" },
  { id: "digital", label: "Digital" },
  { id: "operations", label: "Operations" },
  { id: "growth", label: "Growth" },
];

interface Section {
  title: string;
  body: string;
}

/** Add a section only if it actually produced content. */
function addSection(into: Section[], title: string, blocks: readonly string[]): void {
  const body = join(blocks);
  if (body.length > 0) into.push({ title, body });
}

/* ============================================================
   Kit sections
   ============================================================ */

function namesBlocks(names: Names): string[] {
  const blocks: string[] = [];

  arr(names.options).forEach((option, i) => {
    const name = text(option.name) || `Option ${i + 1}`;
    blocks.push(`### ${i + 1}. ${name}`);
    const detail = fields([
      ["Rationale", option.rationale],
      ["Domain", option.domainGuess],
      ["Risk", option.risk],
    ]);
    if (detail) blocks.push(detail);
  });

  const recommendation = text(names.recommendation);
  if (recommendation) {
    blocks.push("### Recommendation");
    blocks.push(recommendation);
  }

  return blocks;
}

function positioningBlocks(positioning: Positioning): string[] {
  const blocks: string[] = [];

  const oneLiner = text(positioning.oneLiner);
  if (oneLiner) blocks.push(quote(oneLiner));

  blocks.push(
    fields([
      ["Mission", positioning.mission],
      ["Target customer", positioning.targetCustomer],
      ["Customer situation", positioning.customerSituation],
      ["Differentiator", positioning.differentiator],
    ])
  );

  const problems = bullets(positioning.problemsSolved);
  if (problems) {
    blocks.push("### Problems Solved");
    blocks.push(problems);
  }

  const pitch = text(positioning.elevatorPitch);
  if (pitch) {
    blocks.push("### Elevator Pitch");
    blocks.push(quote(pitch));
  }

  return blocks;
}

function legalBlocks(legal: Legal): string[] {
  const blocks: string[] = [];

  blocks.push(fields([["Recommended structure", legal.recommendedStructure]]));

  const rationale = text(legal.structureRationale);
  if (rationale) blocks.push(rationale);

  const steps = [...arr(legal.steps)].sort((a, b) => {
    const left = typeof a.order === "number" ? a.order : 0;
    const right = typeof b.order === "number" ? b.order : 0;
    return left - right;
  });

  if (steps.length > 0) {
    blocks.push("### Steps");
    blocks.push(
      table(
        ["#", "Step", "What it involves", "Cost", "Time", "Where", "Needs you"],
        steps.map((step, i) => [
          String(typeof step.order === "number" ? step.order : i + 1),
          dash(step.title),
          dash(step.detail),
          dash(step.estimatedCost),
          dash(step.estimatedTime),
          dash(step.where),
          step.humanRequired ? "Yes" : "—",
        ]),
        ["right", "left", "left", "left", "left", "left", "center"]
      )
    );
  }

  const licenses = bullets(legal.licensesAndPermits);
  if (licenses) {
    blocks.push("### Licenses & Permits");
    blocks.push(licenses);
  }

  blocks.push(fields([["Total estimated cost", legal.totalEstimatedCost]]));

  const warnings = bullets(legal.warnings);
  if (warnings) {
    blocks.push("### Warnings");
    blocks.push(warnings);
  }

  return blocks;
}

function brandBlocks(brand: Brand): string[] {
  const blocks: string[] = [];

  const palette = arr(brand.colorPalette);
  if (palette.length > 0) {
    blocks.push("### Color Palette");
    blocks.push(
      table(
        ["Role", "Name", "Hex", "Usage"],
        palette.map((color) => [
          dash(color.role),
          dash(color.name),
          dash(color.hex),
          dash(color.usage),
        ])
      )
    );
  }

  const typography = brand.typography;
  if (typography) {
    const type = fields([
      ["Heading", typography.heading],
      ["Body", typography.body],
      ["Rationale", typography.rationale],
    ]);
    if (type) {
      blocks.push("### Typography");
      blocks.push(type);
    }
  }

  const voice = brand.voice;
  if (voice) {
    const adjectives = strings(voice.adjectives);
    const intro = fields([
      ["Adjectives", adjectives.join(", ")],
      ["Description", voice.description],
    ]);
    const doSay = bullets(voice.doSay);
    const dontSay = bullets(voice.dontSay);

    if (intro || doSay || dontSay) blocks.push("### Voice");
    if (intro) blocks.push(intro);
    if (doSay) {
      blocks.push("**Say this**");
      blocks.push(doSay);
    }
    if (dontSay) {
      blocks.push("**Not this**");
      blocks.push(dontSay);
    }
  }

  const logo = text(brand.logoDirection);
  if (logo) {
    blocks.push("### Logo Direction");
    blocks.push(logo);
  }

  const tagline = text(brand.tagline);
  const alternates = bullets(brand.taglineAlternates);
  if (tagline || alternates) blocks.push("### Tagline");
  if (tagline) blocks.push(quote(tagline));
  if (alternates) {
    blocks.push("**Alternates**");
    blocks.push(alternates);
  }

  return blocks;
}

function digitalBlocks(digital: Digital): string[] {
  const blocks: string[] = [];

  const domains = arr(digital.domains);
  if (domains.length > 0) {
    blocks.push("### Domains");
    blocks.push(
      table(
        ["Domain", "Note"],
        domains.map((entry) => [dash(entry.domain), dash(entry.note)])
      )
    );
  }

  const handles = arr(digital.socialHandles);
  if (handles.length > 0) {
    blocks.push("### Social Handles");
    blocks.push(
      table(
        ["Platform", "Handle", "Priority"],
        handles.map((entry) => [
          dash(entry.platform),
          dash(entry.handle),
          dash(entry.priority),
        ])
      )
    );
  }

  const email = text(digital.emailSetup);
  if (email) {
    blocks.push("### Email");
    blocks.push(email);
  }

  const pages = arr(digital.websitePages);
  if (pages.length > 0) {
    blocks.push("### Website Pages");
    pages.forEach((page, i) => {
      blocks.push(`#### ${text(page.page) || `Page ${i + 1}`}`);
      const detail = fields([["Purpose", page.purpose]]);
      if (detail) blocks.push(detail);
      const sections = bullets(page.sections);
      if (sections) {
        blocks.push("**Sections**");
        blocks.push(sections);
      }
      const cta = fields([["CTA", page.cta]]);
      if (cta) blocks.push(cta);
    });
  }

  const gbp = text(digital.googleBusinessProfile);
  if (gbp) {
    blocks.push("### Google Business Profile");
    blocks.push(gbp);
  }

  const tools = arr(digital.toolStack);
  if (tools.length > 0) {
    blocks.push("### Tool Stack");
    blocks.push(
      table(
        ["Tool", "Purpose", "Cost"],
        tools.map((tool) => [dash(tool.tool), dash(tool.purpose), dash(tool.cost)])
      )
    );
  }

  return blocks;
}

function marketingBlocks(marketing: Marketing): string[] {
  const blocks: string[] = [];

  const statement = text(marketing.positioningStatement);
  if (statement) blocks.push(quote(statement));

  const channels = [...arr(marketing.channels)].sort((a, b) => {
    const left = typeof a.priority === "number" ? a.priority : Number.MAX_SAFE_INTEGER;
    const right = typeof b.priority === "number" ? b.priority : Number.MAX_SAFE_INTEGER;
    return left - right;
  });

  if (channels.length > 0) {
    blocks.push("### Channels");
    channels.forEach((channel, i) => {
      const label = text(channel.channel) || `Channel ${i + 1}`;
      blocks.push(`#### ${i + 1}. ${label}`);
      const detail = fields([
        ["Why", channel.why],
        ["First action", channel.firstAction],
        ["Effort", channel.effort],
        ["Priority", num(channel.priority)],
      ]);
      if (detail) blocks.push(detail);
    });
  }

  const pillars = arr(marketing.contentPillars);
  if (pillars.length > 0) {
    blocks.push("### Content Pillars");
    pillars.forEach((pillar, i) => {
      blocks.push(`#### ${text(pillar.pillar) || `Pillar ${i + 1}`}`);
      const description = text(pillar.description);
      if (description) blocks.push(description);
      const examples = bullets(pillar.exampleposts);
      if (examples) {
        blocks.push("**Example posts**");
        blocks.push(examples);
      }
    });
  }

  const sequence = [...arr(marketing.launchSequence)].sort((a, b) => {
    const left = typeof a.week === "number" ? a.week : 0;
    const right = typeof b.week === "number" ? b.week : 0;
    return left - right;
  });

  if (sequence.length > 0) {
    blocks.push("### Launch Sequence");
    sequence.forEach((entry, i) => {
      const week = typeof entry.week === "number" ? entry.week : i + 1;
      const focus = text(entry.focus);
      blocks.push(focus ? `#### Week ${week} — ${focus}` : `#### Week ${week}`);
      const actions = bullets(entry.actions);
      if (actions) blocks.push(actions);
    });
  }

  const customers = numbered(marketing.firstTenCustomers);
  if (customers) {
    blocks.push("### First Ten Customers");
    blocks.push(customers);
  }

  return blocks;
}

function financialBlocks(financial: Financial): string[] {
  const blocks: string[] = [];

  blocks.push(fields([["Pricing model", financial.pricingModel]]));

  const prices = arr(financial.pricePoints);
  if (prices.length > 0) {
    blocks.push("### Price Points");
    blocks.push(
      table(
        ["Offer", "Price", "Rationale"],
        prices.map((price) => [
          dash(price.offer),
          dash(price.price),
          dash(price.rationale),
        ]),
        ["left", "right", "left"]
      )
    );
  }

  const costs = arr(financial.startupCosts);
  const total = cell(financial.totalStartupCost);
  if (costs.length > 0) {
    const rows = costs.map((cost) => [
      dash(cost.item),
      dash(cost.cost),
      dash(cost.necessity),
    ]);
    if (total) rows.push(["**Total**", `**${total}**`, ""]);
    blocks.push("### Startup Costs");
    blocks.push(table(["Item", "Cost", "Necessity"], rows, ["left", "right", "left"]));
  } else if (total) {
    blocks.push(fields([["Total startup cost", total]]));
  }

  blocks.push(
    fields([
      ["Monthly overhead", financial.monthlyOverhead],
      ["Break-even", financial.breakEven],
      ["Payment processing", financial.paymentProcessing],
    ])
  );

  return blocks;
}

/* ============================================================
   kitToMarkdown
   ============================================================ */

export function kitToMarkdown(project: Project): string {
  const sections: Section[] = [];
  const kit = project.kit ?? {};

  /* --- header --- */

  const name = text(project.name) || "Untitled Business";
  const head: string[] = [`# ${name}`];

  const tagline = text(project.tagline);
  if (tagline) head.push(`_${tagline.replace(/\n/g, " ")}_`);

  head.push(
    fields([
      ["Founder", project.founder],
      ["Category", project.category],
      ["Status", STATUS_LABEL[project.status] ?? text(project.status)],
      ["Website", project.url],
      ["Started", formatMaybeDate(project.createdAt)],
      ["Generated", formatDate(new Date())],
    ])
  );

  /* --- project-level context --- */

  const description = text(project.description);
  if (description) addSection(sections, "Overview", [description]);

  const brief = project.brief;
  if (brief) {
    addSection(sections, "Brief", [
      fields([
        ["Idea", brief.idea],
        ["Working name", brief.name],
        ["Founder", brief.founder],
        ["Location", brief.location],
        ["Customer", brief.customer],
        ["Price point", brief.pricePoint],
        ["Notes", brief.notes],
      ]),
    ]);
  }

  /* --- kit sections, in build order --- */

  if (kit.names) addSection(sections, "Name Options", namesBlocks(kit.names));
  if (kit.positioning) addSection(sections, "Positioning", positioningBlocks(kit.positioning));
  if (kit.legal) addSection(sections, "Formation Plan", legalBlocks(kit.legal));
  if (kit.brand) addSection(sections, "Brand Identity", brandBlocks(kit.brand));
  if (kit.digital) addSection(sections, "Digital Setup", digitalBlocks(kit.digital));
  if (kit.marketing) addSection(sections, "Marketing Plan", marketingBlocks(kit.marketing));
  if (kit.financial) addSection(sections, "Pricing & Money", financialBlocks(kit.financial));

  /* --- progress --- */

  const complete = new Set(strings(project.phasesComplete));
  const progress: string[] = [
    PHASES.map((phase) => `- [${complete.has(phase.id) ? "x" : " "}] ${phase.label}`).join("\n"),
  ];

  const built = bullets(project.built);
  if (built) {
    progress.push("### Built So Far");
    progress.push(built);
  }

  const nextUp = bullets(project.nextUp);
  if (nextUp) {
    progress.push("### Next Up");
    progress.push(nextUp);
  }

  addSection(sections, "Progress", progress);

  /* --- assemble --- */

  const doc: string[] = [join(head)];

  if (sections.length > 2) {
    doc.push("## Contents");
    doc.push(
      sections
        .map((section, i) => `${i + 1}. [${section.title}](#${anchor(section.title)})`)
        .join("\n")
    );
  }

  for (const section of sections) {
    doc.push("---");
    doc.push(`## ${section.title}`);
    doc.push(section.body);
  }

  doc.push("---");
  doc.push(`_Generated by Biz Builder on ${formatDate(new Date())}._`);

  return `${join(doc)}\n`;
}

/* ============================================================
   scanToMarkdown
   ============================================================ */

function opportunityBlocks(opportunity: Opportunity, rank: number): string[] {
  const blocks: string[] = [];

  const title = text(opportunity.title) || `Opportunity ${rank}`;
  const composite = num(opportunity.compositeScore);
  blocks.push(`### ${rank}. ${title}${composite === "—" ? "" : ` — ${composite}`}`);

  const summary = text(opportunity.summary);
  if (summary) blocks.push(summary);

  blocks.push(
    fields([
      ["Sector", opportunity.sector],
      ["Demand signal", opportunity.demandSignal],
      ["Who needs it", opportunity.whoNeedsIt],
      ["Why the gap exists", opportunity.whyGapExists],
      ["Startup cost", opportunity.startupCost],
      ["Time to revenue", opportunity.timeToRevenue],
    ])
  );

  const scores = opportunity.scores;
  if (scores) {
    blocks.push(
      table(
        ["Signal", "Score"],
        [
          ["Demand", num(scores.demand)],
          ["Feasibility", num(scores.feasibility)],
          ["Margin", num(scores.margin)],
          ["Defensibility", num(scores.defensibility)],
          ["Speed to launch", num(scores.speedToLaunch)],
          ["**Composite**", `**${composite}**`],
        ],
        ["left", "right"]
      )
    );
  }

  const evidence = bullets(opportunity.evidence);
  if (evidence) {
    blocks.push("**Evidence**");
    blocks.push(evidence);
  }

  const moves = numbered(opportunity.firstThreeMoves);
  if (moves) {
    blocks.push("**First three moves**");
    blocks.push(moves);
  }

  const risks = bullets(opportunity.risks);
  if (risks) {
    blocks.push("**Risks**");
    blocks.push(risks);
  }

  return blocks;
}

export function scanToMarkdown(
  scan: OpportunityScan,
  meta: { sector?: string; region?: string }
): string {
  const doc: string[] = ["# Opportunity Scan"];

  const ranked = [...arr(scan.opportunities)].sort((a, b) => {
    const left = typeof a.compositeScore === "number" ? a.compositeScore : -Infinity;
    const right = typeof b.compositeScore === "number" ? b.compositeScore : -Infinity;
    return right - left;
  });

  doc.push(
    fields([
      ["Sector", meta.sector || "All sectors"],
      ["Region", meta.region || "Unspecified"],
      ["Opportunities", ranked.length > 0 ? String(ranked.length) : ""],
      ["Generated", formatDate(new Date())],
    ])
  );

  const summary = text(scan.scanSummary);
  if (summary) {
    doc.push("---");
    doc.push("## Summary");
    doc.push(summary);
  }

  const context = text(scan.marketContext);
  if (context) {
    doc.push("---");
    doc.push("## Market Context");
    doc.push(context);
  }

  if (ranked.length > 0) {
    doc.push("---");
    doc.push("## Opportunities");
    doc.push("Ranked by composite score, highest first.");
    ranked.forEach((opportunity, i) => {
      doc.push(...opportunityBlocks(opportunity, i + 1));
    });
  }

  const sources = bullets(scan.sourcesConsulted);
  if (sources) {
    doc.push("---");
    doc.push("## Sources Consulted");
    doc.push(sources);
  }

  doc.push("---");
  doc.push(`_Generated by Biz Builder on ${formatDate(new Date())}._`);

  return `${join(doc)}\n`;
}
