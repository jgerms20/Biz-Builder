import { z } from "zod/v4";

/* ============================================================
   THE TICKET

   One unit of work: "here is the thing, build it." A ticket is
   the only object the hub and Claude Code sessions exchange, and
   it lives as a single committed file at
   factory/tickets/{id}.json. One ticket per file — two different
   tickets never touch the same file, so concurrent sessions only
   ever race on a genuine same-ticket double-claim, which git
   push-rejection resolves.

   The prose contract is factory/PROTOCOL.md. This is the code of
   record for the shape.
   ============================================================ */

/** The six-phase framework a build moves through. */
export const PHASES = [
  "concept",
  "formation",
  "identity",
  "digital",
  "operations",
  "growth",
] as const;
export const PhaseSchema = z.enum(PHASES);
export type Phase = (typeof PHASES)[number];

/**
 * Gate categories mirror lib/autonomy.ts exactly. A ticket that
 * carries one routes through the existing routeAction() gate; the
 * hard-floored ones (spend/contract/file) can pause a ticket into
 * `blocked` no matter how permissive the policy is. `publish` is
 * the held-before-deploy gate for putting a site in front of the
 * public. `null` means the work is internal and reversible.
 */
export const GateSchema = z.enum(["spend", "contract", "file", "publish"]).nullable();
export type Gate = z.infer<typeof GateSchema>;

/** Model assignment + cost band. See lib/factory/models.ts. */
export const BudgetTierSchema = z.enum(["cheap", "mid", "judge", "code"]);
export type BudgetTier = z.infer<typeof BudgetTierSchema>;

/** The lifecycle. See PROTOCOL.md for the transition diagram. */
export const TICKET_STATES = [
  "queued",
  "claimed",
  "in_progress",
  "review",
  "approved",
  "done",
  "blocked",
  "changes_requested",
  "failed",
  "cancelled",
] as const;
export const TicketStateSchema = z.enum(TICKET_STATES);
export type TicketState = (typeof TICKET_STATES)[number];

/** States from which no further automated work proceeds. */
export const TERMINAL_STATES: TicketState[] = ["done", "failed", "cancelled"];

/** A state the operator must act on before work can continue. */
export const OPERATOR_STATES: TicketState[] = ["review", "blocked", "changes_requested"];

export const HistoryEntrySchema = z.object({
  state: TicketStateSchema,
  at: z.string(), // ISO 8601
  by: z.string(), // "hub" | "<agent>" | "operator"
  note: z.string().optional(),
});
export type HistoryEntry = z.infer<typeof HistoryEntrySchema>;

export const TicketResultSchema = z.object({
  commitSha: z.string().optional(),
  previewUrl: z.string().optional(),
  notes: z.string().optional(),
  artifacts: z.array(z.string()).default([]),
});
export type TicketResult = z.infer<typeof TicketResultSchema>;

export const TicketSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  /** The role that owns this ticket, e.g. "website-developer". */
  agent: z.string(),
  phase: PhaseSchema,
  title: z.string(),
  brief: z.string(),
  /** Ticket ids that must be `done` before this one is claimable. */
  dependsOn: z.array(z.string()).default([]),
  /** Paths the agent reads. */
  inputsRef: z.array(z.string()).default([]),
  /** Paths the agent must produce. */
  outputsRef: z.array(z.string()).default([]),
  gate: GateSchema.default(null),
  budgetTier: BudgetTierSchema.default("mid"),
  estUSD: z.number().nonnegative().default(0),
  state: TicketStateSchema.default("queued"),
  claimedBy: z.string().optional(),
  claimedAt: z.string().optional(),
  startedAt: z.string().optional(),
  finishedAt: z.string().optional(),
  result: TicketResultSchema.optional(),
  history: z.array(HistoryEntrySchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Ticket = z.infer<typeof TicketSchema>;

/* ---------- Construction ---------- */

export interface NewTicketInput {
  id: string;
  projectId: string;
  agent: string;
  phase: Phase;
  title: string;
  brief: string;
  dependsOn?: string[];
  inputsRef?: string[];
  outputsRef?: string[];
  gate?: Gate;
  budgetTier?: BudgetTier;
  estUSD?: number;
  /** Timestamp — passed in because Date.now() is not always available. */
  now: string;
}

export function makeTicket(input: NewTicketInput): Ticket {
  const base: Ticket = {
    id: input.id,
    projectId: input.projectId,
    agent: input.agent,
    phase: input.phase,
    title: input.title,
    brief: input.brief,
    dependsOn: input.dependsOn ?? [],
    inputsRef: input.inputsRef ?? [],
    outputsRef: input.outputsRef ?? [],
    gate: input.gate ?? null,
    budgetTier: input.budgetTier ?? "mid",
    estUSD: input.estUSD ?? 0,
    state: "queued",
    history: [{ state: "queued", at: input.now, by: "hub", note: "created" }],
    createdAt: input.now,
    updatedAt: input.now,
  };
  // Validate on the way out so a malformed construction fails loudly here.
  return TicketSchema.parse(base);
}

/* ---------- Transitions ---------- */

/** Legal next-states from each state. Enforced by transition(). */
const NEXT: Record<TicketState, TicketState[]> = {
  queued: ["claimed", "cancelled"],
  claimed: ["in_progress", "queued", "cancelled"], // back to queued if a claim is released
  in_progress: ["review", "blocked", "failed", "cancelled"],
  review: ["approved", "changes_requested", "cancelled"],
  approved: ["done"],
  changes_requested: ["in_progress", "cancelled"],
  blocked: ["queued", "cancelled"], // a gate approval re-queues it
  done: [],
  failed: [],
  cancelled: [],
};

export function canTransition(from: TicketState, to: TicketState): boolean {
  return NEXT[from].includes(to);
}

export interface TransitionInput {
  to: TicketState;
  by: string;
  at: string;
  note?: string;
  patch?: Partial<Ticket>;
}

/**
 * Apply a state transition, appending history and stamping
 * updatedAt. Returns a new ticket; throws on an illegal move so a
 * bad transition can't corrupt the queue silently.
 */
export function transition(ticket: Ticket, input: TransitionInput): Ticket {
  if (!canTransition(ticket.state, input.to)) {
    throw new Error(
      `Illegal ticket transition: ${ticket.state} → ${input.to} (ticket ${ticket.id})`
    );
  }
  const next: Ticket = {
    ...ticket,
    ...input.patch,
    state: input.to,
    updatedAt: input.at,
    history: [
      ...ticket.history,
      { state: input.to, at: input.at, by: input.by, note: input.note },
    ],
  };
  return TicketSchema.parse(next);
}

/** A ticket is claimable when queued and all deps are done. */
export function isClaimable(ticket: Ticket, doneIds: ReadonlySet<string>): boolean {
  return ticket.state === "queued" && ticket.dependsOn.every((d) => doneIds.has(d));
}

/** Deterministic id from a timestamp + a per-call salt (no Math.random at import). */
export function ticketId(nowMs: number, salt: string): string {
  return `tkt_${nowMs.toString(36)}${salt}`;
}
