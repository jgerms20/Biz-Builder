# The Agency Org Chart

This is the operating structure of the swarm — the wiring the operator owns. The
substrate (the factory software) is built to run whatever this chart defines; the
chart itself is the operator's to shape. What follows is the proposed structure to
react to and drive, and the visual lives in `org-chart.html`.

## Shape

The operator sits at the top, wearing several hats (executive strategy director,
executive creative direction — the final taste and the final call). Below sit
three departments, each with a head, teams, and tiers. An agent is a specialist
that deliberately over-indexes on one thing; the output is the collective's.

**Tiers** (junior / mid / senior) set ambition and autonomy, not a different job.
A senior team takes the hardest briefs and needs the least direction; a junior
team takes the routine ones and is checked more closely.

```
                          OPERATOR
             (exec strategy · exec creative · final call)
                              │
        ┌─────────────────────┼─────────────────────┐
     STRATEGY               CREATIVE              PRODUCTION
   Group Strat Dir     Creative Dir A / B      Technical/Connector Head
        │                     │                        │
  ┌─────┼─────┐        ┌──────┴──────┐          ┌───────┴───────┐
 Brand  Comms  Data   Dir-A teams   Dir-B teams  Build team   Connector team
 Strat  Strat  /Anal  (jr/mid/snr)  (jr/mid/snr) (jr/mid/snr) (jr/mid/snr)
   │      │      │      each team =   each team =  site gen,    Canva + other
  teams  teams  teams  copywriter +  copywriter + code,        platform
 (tiers)(tiers)(tiers) art director  art director deploy        connectors
```

## Departments

### Strategy — what to build and why
Owns the front of the funnel: finding real openings, judging them honestly,
defining what each business is. Group Strategy Director sets the questions and
owns go/no-go rigor. Brand Strategy owns positioning and reason-to-exist; Comms
Strategy owns channels and message; Data/Analytics owns the evidence — demand,
market size, sentiment. The devil's advocate and judging council live here.

### Creative — how it looks, sounds, and feels
Two Creative Directors with distinct tastes, each the operator's vision of what is
beautiful. Briefs route to the director whose taste fits. Each director runs three
tiered teams; a team is a copywriter + art director. Everything answers to the
anti-generic-AI standard in `REVIEW.md`.

### Production — make it real, connect it to the world
The Technical/Connector Head owns the build pipeline and the connectors. The Build
team does site generation, code, and deploys. The Connector team owns the
integrations — Canva first, then other design/imagery/production/payment platforms
behind one common interface — so the factory produces finished outputs, not
descriptions of them.

## Spine vs full swarm

The substrate ships a **spine** first — one strong agent per core role — so the
loop works end to end before the full tiered org is populated:

| Department | Spine role | Grows into |
|---|---|---|
| Strategy | business-identifier | brand strat teams (tiers) |
| Strategy | market-researcher | data/analytics teams |
| Strategy | social-sentiment-analyst | data/analytics teams |
| Strategy | devils-advocate | strat review |
| Strategy | judging-council | the go/no-go body |
| Creative | creative-director | 2 directors |
| Creative | copywriter | 6 copywriters (2×3 tiers) |
| Creative | art-director | 6 art directors (2×3 tiers) |
| Production | website-developer | build teams (tiers) |
| Production | factory-runner | orchestration |
| Production | (connectors) | Canva + N platform connectors |

Each agent is a `.claude/agents/*.md` file declaring its department, tier, model
tier, and gate categories. They may live here or move to the operator's separate
agency repo later — the substrate doesn't care where.
