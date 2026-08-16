# Biz Builder — Operating Platform

The operating console for a portfolio of real businesses. Describe an idea, get the concrete artifacts needed to start it; keep every build you've shipped in one place.

## What it does today

**Portfolio (`/`)** — every business in the portfolio, its phase progress across the six-phase framework, and what needs you next on each one.

**New Build (`/new`)** — describe an idea in a paragraph. Generates a seven-part starter kit:

| Section | What you get |
|---|---|
| Name Options | 8 candidates with rationale, domain to try, and the real risk on each |
| Positioning | One-liner, mission, target customer, the 3 problems solved, elevator pitch |
| Formation Plan | Entity recommendation + ordered filing steps with real offices, costs, and processing times |
| Brand Identity | Palette with hex values, type pairing, voice with do/don't phrasing, tagline set |
| Digital Setup | Domains, social handles, email, five-page site spec, tool stack with costs |
| Marketing Plan | Ranked channels, content pillars, 4-week launch sequence, first ten customers |
| Pricing & Money | Pricing model, price points, startup costs, break-even math, payment processing |

Every kit exports to Markdown from the project page.

**Opportunity Scanner (`/opportunities`)** — the other direction. Instead of waiting for an idea, it runs live web research against a sector and region, then returns ranked, scored market gaps with the evidence behind each one. Leads to investigate, not verified businesses.

## Setup

```bash
npm install
```

Set an API key:

```bash
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
```

```bash
npm run dev
```

Open http://localhost:3000. The five existing builds are seeded, so the portfolio is populated on first load with no database.

## Deploying

On Vercel, set **Root Directory** to `platform` and add `ANTHROPIC_API_KEY` as an environment variable.

One caveat worth knowing: Vercel's filesystem is read-only, so generated kits live in process memory and don't survive a cold start. The seeded portfolio always renders, and every kit exports to Markdown, so nothing is ever trapped — but for durable storage, swap `readAll` / `writeAll` in `lib/store.ts` for Vercel KV or Postgres. The rest of the app is unaware of the storage layer.

## Architecture

```
lib/
  claude.ts       Anthropic client. Holds the operating doctrine as a cached
                  system prefix, so every generation after the first reads it
                  at ~0.1x instead of full price. Also the web-search research
                  primitive used by the scanner.
  schemas.ts      Zod schemas for every generated section. Enforced at the API
                  layer via output_config.format, so the model can't drift.
  generators.ts   One tailored instruction per section + the two-pass
                  opportunity scan (research with web search, then structure).
  framework.ts    The six-phase build framework and its task lists.
  projects.ts     The seeded portfolio.
  store.ts        Storage adapter — disk locally, memory on read-only hosts.
  export.ts       Kit and scan to Markdown.

app/
  page.tsx                  Portfolio dashboard
  new/                      Intake wizard
  opportunities/            Opportunity scanner
  projects/[id]/            Project hub with per-section generation
  api/projects/             CRUD
  api/generate/             Section generation
  api/scan/                 Opportunity scanning
  api/export/[id]/          Markdown download
```

## The six phases

Every build moves through the same track. `Project.phasesComplete` records where each one is.

1. **Concept** — define what this actually is
2. **Formation** — make it official
3. **Identity** — build the brand
4. **Digital** — get online
5. **Operations** — run it
6. **Growth** — get customers

## Where this is going

The generation is the easy half. The durable part is the operating layer — what each business teaches the system about pricing that converted, channels that didn't, and which formation path was actually fastest. That accumulated playbook is what makes the next build better than the last.

Near-term additions worth making:

- **Payment processors** — Stripe Connect per project, so the portfolio reports real revenue rather than projected
- **Formation execution** — registered-agent APIs (Stripe Atlas, Firstbase, Middesk) can file entities programmatically; the human still signs
- **Deploy pipeline** — generate a site from the kit and ship it to Vercel without leaving the console
- **Cross-build learning** — feed outcomes back into the doctrine so generations improve with the portfolio

A note on what will not automate: entity filings need a signature, EIN applications need a responsible party with an SSN, and bank accounts need KYC. Those gates are regulatory, not technical. Build for approval steps, not around them.
