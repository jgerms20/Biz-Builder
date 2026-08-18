# Factory Roadmap

The living plan, committed in-repo so both the hub and the agents can read it.
Mirrors the approved implementation plan.

## What we're building

An internal agency-swarm factory that takes a business idea (from the operator
or from auto-mode discovery) and actually builds the whole funnel — website,
marketing/promo copy, social copy, logo, business-card mockups, imagery — plus
the setup artifacts (entity recommendation, articles of incorporation draft,
member docs, watermarked UNFILED DRAFT). It holds a deployable preview before
publish. Everything routes through the existing autonomy gates.

## Division of labor

- **This build = the brick and mortar.** The software substrate: the ticket
  system, git-as-database, the site + creative generators, the connector layer,
  the agent scaffolding, the hub. The building the swarm runs in.
- **The operator = the wiring and logistics.** The org chart / agency swarm —
  departments, tiered teams, the roster. His hands-on, parallel track. The
  substrate is designed not to care where the agent definitions live (they may
  later move to a separate agency repo).

## Phasing

### Days 1–7 — the jumpstart
Prove the whole loop with a working spine.
- `factory/` skeleton + PROTOCOL + tokenized site template. ← in progress
- `platform/lib/factory/{ticket,gitStore,siteSpec}.ts`.
- Tickets API + `/factory` queue board (the operating station).
- Spine agents: business-identifier, website-developer, art-director.
- Loop: brief → ticket → session claims → builds `/{slug}/` site + copy + logo +
  business-card mockup + watermarked formation draft → held preview → review.
- Parallel: the org-chart visual for the operator to drive. Retire the old
  GitHub Pages site.

### Week 2 — departments, gates, connectors, durability
- Stand up Creative properly (creative directors + tiered copywriter/art-director
  teams) with the anti-AI-vibe standard; add devil's-advocate + judging-council.
- Wire the first connector (Canva) behind a common interface; more to follow.
- Formation drafts through the `file` gate.
- Persistence fix: back the ledger + project state with gitStore; demote the
  browser store to a cache; migrate the five seeded projects into
  `factory/projects/`.
- Tiered models + per-business budget.
- Opportunity Engine + watchlist (rename Skills Finder).
- Auto mode (Business Generator): scheduled Routine → research → vet →
  rate/judge → stop. Ranked local + general ideas. No pre-build.

## Status log

- 2026-08: factory substrate started (PROTOCOL, REVIEW, ROADMAP, dirs).
