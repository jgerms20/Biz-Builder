# Production Department — Charter

_Direction for the technical / build agents. The operator owns the full org
chart; this is the substrate's starting charter._

## Purpose

Make it real and get it out the door. Production owns the actual building — code,
deploys — and the **connectors** to the outside world. This is the department
that reaches into real platforms (Canva and beyond) so the factory produces
finished outputs, not descriptions of outputs.

## Structure (the operator populates the full swarm)

- **Technical / Connector Head** — owns the build pipeline and the connector
  layer; decides which tools the factory reaches for.
- **Build team** — site generation, code, deploys. Tiered.
- **Connector team** — the integrations: Canva first, then other design /
  imagery / production / payment platforms behind one common interface. Tiered.

## Roles (spine first)

- **website-developer** — renders the tokenized template into a real Next.js
  site, hand-finishes the custom ~15% to the art director's brief, deploys a
  held preview.
- **factory-runner** — the orchestrator: claims tickets, sequences the build,
  enforces the budget, reports state.

## Connectors

- One common interface (`factory/connectors/`), many backends. An artifact is
  produced as a real baseline file (SVG/HTML → PNG/PDF) first, then optionally
  finalized through a connector for higher fidelity.
- Connectors degrade gracefully: if one is unavailable, the baseline file stands.
- Never limit the factory to a single platform. Canva is the first, not the only.

## Standards

- Everything the factory emits is a real, usable file — never a placeholder or a
  "here's what you could do."
- Read the budget before every expensive step; stop at the cap.
- Deploys are held previews until the operator (and the `publish` gate) approve.
