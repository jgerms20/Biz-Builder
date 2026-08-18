import {
  TicketSchema,
  type Ticket,
  type TicketState,
  makeTicket,
  transition,
  type NewTicketInput,
  type TransitionInput,
} from "./ticket";
import { getStore, readJson, writeJson, type GitStore } from "./gitStore";

/* ============================================================
   TICKETS STORE

   The hub's read/write surface over factory/tickets/*.json.
   Thin on purpose: it maps ticket ids to file paths and validates
   on the way in and out. The queue semantics (claiming, deps)
   live in ticket.ts and PROTOCOL.md; this is just persistence.
   ============================================================ */

const DIR = "factory/tickets";

function ticketPath(id: string): string {
  return `${DIR}/${id}.json`;
}

export async function getTicket(id: string, store: GitStore = getStore()): Promise<Ticket | null> {
  const raw = await readJson<unknown>(store, ticketPath(id));
  if (!raw) return null;
  const parsed = TicketSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export async function listTickets(store: GitStore = getStore()): Promise<Ticket[]> {
  const paths = await store.list(DIR);
  const tickets: Ticket[] = [];
  for (const p of paths) {
    const raw = await readJson<unknown>(store, p);
    if (!raw) continue;
    const parsed = TicketSchema.safeParse(raw);
    if (parsed.success) tickets.push(parsed.data);
  }
  // Newest first — createdAt is an ISO string, lexicographic order works.
  return tickets.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function createTicket(
  input: NewTicketInput,
  store: GitStore = getStore()
): Promise<Ticket> {
  const ticket = makeTicket(input);
  await writeJson(store, ticketPath(ticket.id), ticket, `factory: queue ticket ${ticket.id} (${ticket.agent})`);
  return ticket;
}

export async function saveTicket(
  ticket: Ticket,
  message: string,
  store: GitStore = getStore()
): Promise<void> {
  await writeJson(store, ticketPath(ticket.id), TicketSchema.parse(ticket), message);
}

/** Apply a state transition and persist it in one call. */
export async function transitionTicket(
  id: string,
  input: TransitionInput,
  store: GitStore = getStore()
): Promise<Ticket> {
  const current = await getTicket(id, store);
  if (!current) throw new Error(`No ticket ${id}`);
  const next = transition(current, input);
  await saveTicket(next, `factory: ticket ${id} → ${input.to}`, store);
  return next;
}

/** Grouped view for the queue board. */
export interface TicketBoard {
  queued: Ticket[];
  active: Ticket[]; // claimed | in_progress
  review: Ticket[];
  blocked: Ticket[];
  changesRequested: Ticket[];
  done: Ticket[];
  closed: Ticket[]; // failed | cancelled
}

const GROUP: Record<TicketState, keyof TicketBoard> = {
  queued: "queued",
  claimed: "active",
  in_progress: "active",
  review: "review",
  blocked: "blocked",
  changes_requested: "changesRequested",
  approved: "review", // approved-but-not-done still needs an eye
  done: "done",
  failed: "closed",
  cancelled: "closed",
};

export function boardFrom(tickets: Ticket[]): TicketBoard {
  const board: TicketBoard = {
    queued: [],
    active: [],
    review: [],
    blocked: [],
    changesRequested: [],
    done: [],
    closed: [],
  };
  for (const t of tickets) board[GROUP[t.state]].push(t);
  return board;
}

export function boardStats(tickets: Ticket[]): {
  total: number;
  building: number;
  held: number;
  blocked: number;
  done: number;
} {
  let building = 0;
  let held = 0;
  let blocked = 0;
  let done = 0;
  for (const t of tickets) {
    if (t.state === "claimed" || t.state === "in_progress") building += 1;
    else if (t.state === "review" || t.state === "approved") held += 1;
    else if (t.state === "blocked") blocked += 1;
    else if (t.state === "done") done += 1;
  }
  return { total: tickets.length, building, held, blocked, done };
}
