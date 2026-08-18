# Factory Protocol

This is the contract that the web hub and Claude Code sessions both obey. It is
the load-bearing document of the whole system — read it before touching anything
under `factory/`.

## The one idea

**The git repository is the database.** There is no server-side DB, no shared
process. Everything durable lives under `factory/` as committed files. Two very
different runtimes cooperate through git alone:

- **The hub** (the Next.js app in `platform/`, deployed on Vercel) reads and
  writes these files through the GitHub Contents API. It is where the operator
  watches, creates work, and approves.
- **Claude Code sessions** (agents running on a real machine with a checkout)
  read and write the same files through the local filesystem, then `git push`.
  This is the workforce that actually builds things.

Neither side calls the other. They meet in the file tree. This resolves three
problems at once: the two-runtime bridge, durable state that survives a Vercel
cold start, and a work queue with no message broker.

## Directory map

```
factory/
  PROTOCOL.md              this file
  REVIEW.md                what "good" looks like per artifact type
  ROADMAP.md               the living plan
  ORG.md, org-chart.html   the agency org chart (structure + visual)
  departments/*/CHARTER.md direction for each department of the swarm
  tickets/{id}.json        one unit of work — the queue (source of truth)
  projects/{id}.json       durable business record
  ledger/{id}.jsonl        append-only action log per project
  budgets/{id}.json        per-business spend cap + entries
  budgets/global.json      auto-mode pacing cap
  watchlist.json           Opportunity Engine tracked sectors
  connectors/              connector configs + the common interface
  templates/site-nextjs/   the tokenized site boilerplate
  artifacts/{id}/          produced files: copy, logo, cards, imagery, legal drafts
  scripts/                 claim.mjs, report.mjs, render-site.mjs
```

## What a ticket is

A **ticket is one unit of work**: "here is the thing, build it." It could be
"turn this brief into a business," or one step of that — "design the logo,"
"write the site copy," "build the site." A ticket names the agent role that owns
it, what it depends on, what it must produce, its budget tier, and whether it
touches a gate (spending money, filing, signing).

The canonical schema lives in code at `platform/lib/factory/ticket.ts` (zod).
The prose version:

| field | meaning |
|---|---|
| `id` | `tkt_<base36 time><rand>` |
| `projectId` | the business this work belongs to |
| `agent` | the role that owns it (`business-identifier`, `website-developer`, `art-director`, …) |
| `phase` | `concept` \| `formation` \| `identity` \| `digital` \| `operations` \| `growth` |
| `title`, `brief` | what the agent reads |
| `dependsOn` | `[ticketId]` — this ticket is only claimable when all deps are `done` |
| `inputsRef` | paths the agent reads (other artifacts, project record) |
| `outputsRef` | paths the agent must produce (e.g. `comeback-truck/**`, `factory/artifacts/<id>/logo.svg`) |
| `gate` | `null` \| `spend` \| `file` \| `contract` \| `publish` — routes through the approval gates |
| `budgetTier` | `cheap` \| `mid` \| `judge` \| `code` — model assignment + cost |
| `estUSD` | reserved spend for the budget guard |
| `state` | see lifecycle |
| `claimedBy`, `claimedAt`, `startedAt`, `finishedAt` | provenance |
| `result` | `{ commitSha, previewUrl?, notes, artifacts[] }` |
| `history` | `[{state, at, by, note}]` |

**One ticket per file.** Two different tickets never touch the same file, so
concurrent sessions never conflict — except on a genuine same-ticket double
claim, which git resolves for us (see Claiming).

## Lifecycle

```
queued → claimed → in_progress → review → approved → done
                        │            │
                        ▼            ▼
                     blocked   changes_requested → in_progress
                        │
              (failed | cancelled)
```

- **queued** — created, not yet owned. Claimable when every `dependsOn` is `done`.
- **claimed** — a session has taken it (wrote `claimedBy`, pushed).
- **in_progress** — the agent is working.
- **review** — work complete, artifact **held** (a site preview is deployed but
  not published). This is the operator's look-before-publish stop.
- **blocked** — hit a gate (`spend`/`file`/`contract`/`publish`) or a budget cap.
  Parks until a ledger approval flips it back to `queued`.
- **approved → done** — operator (and, where configured, the judging council)
  cleared it.
- **changes_requested** — operator wants edits; goes back to `in_progress`.
- **failed / cancelled** — terminal.

## Claiming (the lock)

There is no lock server. The lock is git push-rejection.

1. `git pull` (fast-forward) to get the current tree.
2. Scan `factory/tickets/*.json` for `state: "queued"` whose `dependsOn` are all
   `done`. Pick one (oldest `createdAt` first).
3. Write `claimedBy`, `claimedAt`, `state: "claimed"`, append to `history`.
4. Commit that single file and **push**.
5. **If the push is rejected**, another session claimed something first. `git
   pull --rebase` and go back to step 2. Do not force-push.

Because each ticket is its own file, a rejected push means a real race, and the
rebase resolves it cleanly.

## Working a ticket

1. Move it to `in_progress` (commit + push).
2. Do the work as the named agent: write real files into `outputsRef`
   (site folders, `factory/artifacts/<projectId>/…`), following `REVIEW.md` for
   the quality bar and the art-director design brief for anything visual.
3. **Before any expensive model step**, read `factory/budgets/<projectId>.json`.
   If `spentUSD + estimate > capUSD`, stop, set the ticket `blocked` with a note,
   and push. Do not overrun the cap.
4. Record spend to the budget file as you go.
5. On completion write `state: "review"`, fill `result` (commit sha, preview URL
   if a site was deployed as a held preview, notes, produced artifact paths),
   append to `history`, commit, and **push**.

## Gates

Gates are **not** reimplemented here. When a ticket carries a `gate`, the
executing side calls the existing `routeAction()` in
`platform/lib/ledger.ts`, which consults `platform/lib/autonomy.ts`. The
categories `spend`, `contract`, and `file` have hard `approve` floors that a
policy cannot lower — money out is irreversible, an agreement binds the operator,
and filings need a signature / SSN / KYC on a real person. `routeAction()`
returns `shouldExecute: false`, the ticket becomes `blocked`, and an entry lands
in the operator's `/review` queue. When the operator approves it there, a
reconciler flips the blocked ticket back to `queued`.

**Formation documents** (articles of incorporation, member/ownership docs) are
produced as real drafts, every page watermarked **UNFILED DRAFT**, and always
routed through the `file` gate. Nothing is ever auto-submitted.

## The hub's side

The hub creates tickets (operator clicks "build this" → commit a `queued` ticket
file via the GitHub API) and reflects state by polling the ticket files
(15–30s cache). It is eventually-consistent against git and never runs agent
work inside a serverless request. A GitHub webhook can warm a cache to make the
board feel live; that is an optimization, not required for correctness.

## Non-negotiables

- One ticket per file. Never batch-edit tickets in one commit.
- Never force-push `factory/`.
- Never lower a hard gate floor. Never auto-submit a filing or a payment.
- Read the budget before spending. Stop at the cap; don't ask forgiveness.
- Every visual artifact answers to the art-director brief and `REVIEW.md` — the
  anti-generic-AI-aesthetic bar is part of "done," not a nicety.
