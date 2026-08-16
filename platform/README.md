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

## The operating layer

The generation is the easy half. The operating layer is what makes it safe to let the platform act on your behalf.

Every action carries an autonomy level, set per category on `/settings`:

| Level | Behavior |
|---|---|
| `auto` | Executes immediately. Logged, not gated. |
| `review` | Executes immediately, then lands in your queue. Post-hoc, reversible. |
| `approve` | Does not run until you say yes. |

The default posture is deliberately hands-off. Drafting is `auto` — nothing leaves the building. Publishing and messaging default to `review`, so work moves at full speed but you see what went out. Spending, contracts, and filings default to `approve`.

**Three of those gates cannot be lowered**, and the UI says so rather than pretending otherwise:

- **Spend** — money leaving an account is not reversible on your behalf.
- **Contract** — an agreement signed in your name binds you.
- **File** — entity filings need a signature, EIN applications need a responsible party with an SSN or ITIN, and bank accounts need identity verification on a real person.

Those are regulatory facts, not product preferences. The platform prepares the work and hands it over.

`/review` is the queue. Approvals block and sit at the top; reviewed items already ran and are there to check. Everything the platform has ever done stays in the ledger.

The integration that makes this real: generating a **Formation Plan** doesn't just write a document — every filing step in it is fanned into the ledger as a gated action carrying its real cost, filing office, and whether it needs you personally. The plan becomes a working queue instead of a PDF nobody re-reads.

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
  autonomy.ts     The action taxonomy, autonomy levels, and the floors that
                  cannot be lowered. resolvePolicy() raises anything below
                  its floor, so a client cannot disable a legal gate.
  ledger.ts       Every action taken or proposed, plus the stored policy.

app/
  page.tsx                  Portfolio dashboard
  new/                      Intake wizard
  opportunities/            Opportunity scanner
  projects/[id]/            Project hub with per-section generation
  review/                   The approval + review queue
  settings/                 Autonomy dial, per category
  api/projects/             CRUD
  api/generate/             Section generation (fans formation steps
                            into the ledger)
  api/scan/                 Opportunity scanning
  api/actions/              Ledger read + resolve
  api/policy/               Autonomy policy read + write
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

The durable part is the operating layer, and the ledger is its foundation. Every action the platform takes is recorded against a project, which means the system can eventually answer questions no single build can: which formation path was actually fastest in SC, which channels converted for a food business versus a trade, what a realistic price was rather than a guessed one.

That accumulated playbook is the part that compounds. A prompt doesn't.

Near-term, in the order I'd build them:

1. **Executors behind the gates.** The ledger already routes actions and holds approvals; what it lacks is something on the other side that runs them. Start with the cheapest real one — domain registration through a registrar API — so an approved `spend` action actually executes rather than just being marked approved.
2. **Payment processors.** Stripe Connect per project, so the portfolio reports real revenue instead of projections. This is also the fastest path to answering the Comeback Truck customer who asked how to pay online.
3. **Deploy pipeline.** Generate a site from the kit and ship it to Vercel without leaving the console. Publishing is already a gated category, so the approval flow is in place.
4. **Formation execution.** Registered-agent APIs (Stripe Atlas, Firstbase, Middesk) can file entities programmatically. The human still signs — that step routes through `file` and stays locked.
5. **Cross-build learning.** Feed outcomes back into the doctrine so generation improves as the portfolio grows.

**On autonomous operation.** Phase 2 of the vision — a system that finds gaps and builds businesses into them — is real in its parts. Gap-finding works today. Kit generation works today. Filing can be API-driven. What will not happen is a chain with zero human gates: entity filings need a signature, EIN applications need a responsible party with an SSN or ITIN, and bank accounts need KYC on a natural person. Those are regulatory design, not missing features, and no amount of capability removes them.

That is not a ceiling on the idea. A system that finds the opportunity, drafts the entity, builds the brand, ships the site, and hands you three things to sign is most of the way there — and it is buildable.
