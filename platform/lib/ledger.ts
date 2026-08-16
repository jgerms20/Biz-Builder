import fs from "fs";
import path from "path";
import {
  resolvePolicy,
  defaultPolicy,
  decide,
  type ActionCategory,
  type AutonomyLevel,
  type AutonomyPolicy,
} from "./autonomy";

/* ============================================================
   THE LEDGER

   Every action the platform takes or wants to take is recorded
   here — executed, awaiting approval, or reviewed. This is the
   accountability surface: nothing happens on your behalf that
   you cannot see afterwards.
   ============================================================ */

export type ActionState =
  | "executed"        // done, no gate applied
  | "awaiting_review" // done, but flagged for you to look at
  | "reviewed"        // you looked at it
  | "awaiting_approval" // blocked, needs your yes
  | "approved"        // you said yes; ready to run
  | "rejected";       // you said no

export interface Action {
  id: string;
  projectId: string;
  projectName: string;
  category: ActionCategory;
  title: string;
  detail: string;
  /** What actually changes in the world if this runs. */
  effect: string;
  /** Cost in dollars, when the action spends. Free-text: "$110", "~$12/yr". */
  cost?: string;
  /** True when a human legally must act — the platform can prepare, not complete. */
  humanRequired?: boolean;
  state: ActionState;
  level: AutonomyLevel;
  createdAt: string;
  resolvedAt?: string;
  note?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEDGER_FILE = path.join(DATA_DIR, "ledger.json");
const POLICY_FILE = path.join(DATA_DIR, "policy.json");

let ledgerMemory: Action[] | null = null;
let policyMemory: AutonomyPolicy | null = null;
let writable: boolean | null = null;

function canWrite(): boolean {
  if (writable !== null) return writable;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.accessSync(DATA_DIR, fs.constants.W_OK);
    writable = true;
  } catch {
    writable = false;
  }
  return writable;
}

function readJson<T>(file: string, fallback: T): T {
  if (canWrite() && fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function writeJson(file: string, value: unknown): void {
  if (!canWrite()) return;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(value, null, 2), "utf-8");
  } catch {
    // Memory still holds it.
  }
}

/* ---------- Policy ---------- */

export function getPolicy(): AutonomyPolicy {
  if (!policyMemory) {
    policyMemory = resolvePolicy(
      readJson<Partial<AutonomyPolicy>>(POLICY_FILE, defaultPolicy())
    );
  }
  return policyMemory;
}

export function setPolicy(next: Partial<AutonomyPolicy>): AutonomyPolicy {
  // resolvePolicy raises anything below its floor, so a client cannot
  // disable a gate that exists for legal reasons.
  policyMemory = resolvePolicy({ ...getPolicy(), ...next });
  writeJson(POLICY_FILE, policyMemory);
  return policyMemory;
}

/* ---------- Ledger ---------- */

function readLedger(): Action[] {
  if (!ledgerMemory) {
    ledgerMemory = readJson<Action[]>(LEDGER_FILE, []);
  }
  return ledgerMemory;
}

function writeLedger(actions: Action[]): void {
  ledgerMemory = actions;
  writeJson(LEDGER_FILE, actions);
}

let counter = 0;
function newId(): string {
  counter += 1;
  return `act_${Date.now().toString(36)}${counter.toString(36)}`;
}

export interface RecordInput {
  projectId: string;
  projectName: string;
  category: ActionCategory;
  title: string;
  detail: string;
  effect: string;
  cost?: string;
  humanRequired?: boolean;
}

/**
 * Route an action through the current policy.
 *
 * Returns the ledger entry plus whether the caller should proceed.
 * The caller is responsible for honouring `shouldExecute` — the
 * ledger records intent, it does not itself perform the work.
 */
export function routeAction(input: RecordInput): {
  action: Action;
  shouldExecute: boolean;
} {
  const policy = getPolicy();
  const { execute, flagForReview, level } = decide(policy, input.category);

  // An action that legally requires a person can never auto-execute,
  // regardless of what the policy says.
  const blocked = input.humanRequired === true || !execute;

  const state: ActionState = blocked
    ? "awaiting_approval"
    : flagForReview
      ? "awaiting_review"
      : "executed";

  const action: Action = {
    id: newId(),
    ...input,
    state,
    level,
    createdAt: new Date().toISOString(),
  };

  const all = readLedger();
  all.unshift(action);
  writeLedger(all);

  return { action, shouldExecute: !blocked };
}

export function listActions(filter?: {
  projectId?: string;
  state?: ActionState | ActionState[];
}): Action[] {
  let all = readLedger();

  if (filter?.projectId) {
    all = all.filter((a) => a.projectId === filter.projectId);
  }
  if (filter?.state) {
    const states = Array.isArray(filter.state) ? filter.state : [filter.state];
    all = all.filter((a) => states.includes(a.state));
  }
  return all;
}

/** Everything currently waiting on you, approvals first. */
export function pendingActions(): Action[] {
  const order: Record<string, number> = {
    awaiting_approval: 0,
    awaiting_review: 1,
  };
  return readLedger()
    .filter((a) => a.state === "awaiting_approval" || a.state === "awaiting_review")
    .sort((a, b) => (order[a.state] ?? 9) - (order[b.state] ?? 9));
}

export function resolveAction(
  id: string,
  decision: "approve" | "reject" | "acknowledge",
  note?: string
): Action | undefined {
  const all = readLedger();
  const action = all.find((a) => a.id === id);
  if (!action) return undefined;

  action.state =
    decision === "approve"
      ? "approved"
      : decision === "reject"
        ? "rejected"
        : "reviewed";
  action.resolvedAt = new Date().toISOString();
  if (note) action.note = note;

  writeLedger(all);
  return action;
}

export function ledgerStats(): {
  total: number;
  awaitingApproval: number;
  awaitingReview: number;
  executed: number;
} {
  const all = readLedger();
  return {
    total: all.length,
    awaitingApproval: all.filter((a) => a.state === "awaiting_approval").length,
    awaitingReview: all.filter((a) => a.state === "awaiting_review").length,
    executed: all.filter((a) => a.state === "executed" || a.state === "reviewed").length,
  };
}
