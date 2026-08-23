import { z } from "zod/v4";
import { getStore, readJson, writeJson, type GitStore } from "./gitStore";

/* ============================================================
   THE WATCHLIST

   Sectors/regions the operator wants the Opportunity Engine to
   keep an eye on. A one-off scan answers "what's open right now";
   a watchlist entry is standing interest — auto mode re-scans it
   on a schedule and surfaces what's new.

   Stored at factory/watchlist.json (git-as-database), so the hub
   and the auto-mode Routine read the same list.
   ============================================================ */

export const WatchEntrySchema = z.object({
  id: z.string(),
  /** What to watch. Blank sector = "any sector". */
  sector: z.string().default(""),
  region: z.string().default(""),
  constraints: z.string().default(""),
  /** local = place-specific openings; general = patterns anywhere; both = both. */
  scope: z.enum(["local", "general", "both"]).default("both"),
  note: z.string().default(""),
  /** True while auto mode should keep scanning it. */
  active: z.boolean().default(true),
  createdAt: z.string(),
  /** Set by auto mode after each pass. */
  lastScannedAt: z.string().optional(),
  /** The best composite score seen on the last pass — a quick "is this heating up" read. */
  lastTopScore: z.number().optional(),
  /** How many opportunities the last pass surfaced. */
  lastCount: z.number().optional(),
});
export type WatchEntry = z.infer<typeof WatchEntrySchema>;

export const WatchlistSchema = z.object({
  entries: z.array(WatchEntrySchema).default([]),
});
export type Watchlist = z.infer<typeof WatchlistSchema>;

const FILE = "factory/watchlist.json";

export async function loadWatchlist(store: GitStore = getStore()): Promise<Watchlist> {
  const raw = await readJson<unknown>(store, FILE);
  const parsed = WatchlistSchema.safeParse(raw ?? { entries: [] });
  return parsed.success ? parsed.data : { entries: [] };
}

async function saveWatchlist(list: Watchlist, message: string, store: GitStore): Promise<void> {
  await writeJson(store, FILE, WatchlistSchema.parse(list), message);
}

export interface NewWatchInput {
  sector?: string;
  region?: string;
  constraints?: string;
  scope?: "local" | "general" | "both";
  note?: string;
  /** Deterministic id + timestamp from the caller (route supplies these). */
  id: string;
  now: string;
}

export async function addWatch(
  input: NewWatchInput,
  store: GitStore = getStore()
): Promise<WatchEntry> {
  const list = await loadWatchlist(store);
  const entry: WatchEntry = WatchEntrySchema.parse({
    id: input.id,
    sector: input.sector ?? "",
    region: input.region ?? "",
    constraints: input.constraints ?? "",
    scope: input.scope ?? "both",
    note: input.note ?? "",
    active: true,
    createdAt: input.now,
  });
  list.entries.unshift(entry);
  await saveWatchlist(list, `factory: watch ${entry.sector || "any"} / ${entry.region || "any"}`, store);
  return entry;
}

export async function removeWatch(id: string, store: GitStore = getStore()): Promise<boolean> {
  const list = await loadWatchlist(store);
  const next = list.entries.filter((e) => e.id !== id);
  if (next.length === list.entries.length) return false;
  await saveWatchlist({ entries: next }, `factory: unwatch ${id}`, store);
  return true;
}

export async function setWatchActive(
  id: string,
  active: boolean,
  store: GitStore = getStore()
): Promise<WatchEntry | null> {
  const list = await loadWatchlist(store);
  const entry = list.entries.find((e) => e.id === id);
  if (!entry) return null;
  entry.active = active;
  await saveWatchlist(list, `factory: ${active ? "resume" : "pause"} watch ${id}`, store);
  return entry;
}

/** Auto mode records the result of a scan pass against an entry. */
export async function recordScanResult(
  id: string,
  result: { at: string; topScore?: number; count?: number },
  store: GitStore = getStore()
): Promise<void> {
  const list = await loadWatchlist(store);
  const entry = list.entries.find((e) => e.id === id);
  if (!entry) return;
  entry.lastScannedAt = result.at;
  entry.lastTopScore = result.topScore;
  entry.lastCount = result.count;
  await saveWatchlist(list, `factory: scan result for watch ${id}`, store);
}

/** The entries auto mode should scan this pass. */
export async function activeWatches(store: GitStore = getStore()): Promise<WatchEntry[]> {
  const list = await loadWatchlist(store);
  return list.entries.filter((e) => e.active);
}
