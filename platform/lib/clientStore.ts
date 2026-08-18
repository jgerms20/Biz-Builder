"use client";

import { SEEDED_PROJECTS, type Project } from "./projects";
import type { StarterKit, KitSection } from "./schemas";

/* ============================================================
   CLIENT-SIDE PERSISTENCE

   The server is a generation engine, not a database. On a
   read-only host (Vercel) anything the server writes dies at the
   next cold start, so the founder's own builds live here instead
   — in the browser, surviving restarts and redeploys.

   The seeded portfolio stays server-side and static; it is the
   same for everyone and never changes.

   To move to real multi-device storage later, swap the two
   read/write functions for API calls against Vercel KV or
   Postgres. Everything above them is unaware.
   ============================================================ */

const KEY = "bizbuilder.projects.v1";
const OVERRIDES_KEY = "bizbuilder.overrides.v1";

function available(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function readCustom(): Project[] {
  if (!available()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Project[]) : [];
  } catch {
    // Corrupt or unreadable — start clean rather than breaking the page.
    return [];
  }
}

function writeCustom(projects: Project[]): void {
  if (!available()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(projects));
  } catch {
    // Quota exceeded or storage disabled. The session still holds
    // the data in React state, and every kit exports to Markdown.
  }
}

/* ------------------------------------------------------------
   OVERRIDES

   The seeded portfolio is static and shared, but some of its
   facts — a live URL guessed at seed time, a status that has
   moved on — are only correct until they are not. Rather than
   making the whole seeded record mutable, corrections live in a
   separate, tiny map keyed by project id. It layers over both
   seeded and custom projects on read, so every consumer of
   listAll()/get() sees the corrected value with no extra work.
   ------------------------------------------------------------ */

export interface ProjectOverride {
  url?: string;
  status?: Project["status"];
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readOverrides(): Record<string, ProjectOverride> {
  if (!available()) return {};
  try {
    const raw = window.localStorage.getItem(OVERRIDES_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainObject(parsed)) return {};

    // Keep only entries that actually look like overrides; a stray
    // value should not be able to poison a project record on read.
    const clean: Record<string, ProjectOverride> = {};
    for (const [id, value] of Object.entries(parsed)) {
      if (!isPlainObject(value)) continue;
      const next: ProjectOverride = {};
      if (typeof value.url === "string") next.url = value.url;
      if (typeof value.status === "string") {
        next.status = value.status as Project["status"];
      }
      if (Object.keys(next).length > 0) clean[id] = next;
    }
    return clean;
  } catch {
    // Corrupt or unreadable — fall back to the underlying record.
    return {};
  }
}

function writeOverrides(overrides: Record<string, ProjectOverride>): void {
  if (!available()) return;
  try {
    window.localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  } catch {
    // Quota exceeded or storage disabled — the session still holds
    // the corrected value in React state.
  }
}

/** Shallow-merge only the keys the override actually defines. */
function applyOverride(
  project: Project,
  override: ProjectOverride | undefined
): Project {
  if (!override) return project;
  const merged: Project = { ...project };
  if (override.url !== undefined) merged.url = override.url;
  if (override.status !== undefined) merged.status = override.status;
  return merged;
}

/** Every correction the founder has made in this browser. */
export function getOverrides(): Record<string, ProjectOverride> {
  return readOverrides();
}

/**
 * Record a correction for one project. Keys set to `undefined` are
 * dropped from the override rather than stored, so clearing a field
 * restores the underlying value instead of blanking it.
 */
export function setOverride(id: string, patch: ProjectOverride): void {
  if (!id) return;
  const overrides = readOverrides();
  const next: ProjectOverride = { ...overrides[id] };

  if ("url" in patch) {
    if (patch.url === undefined) delete next.url;
    else next.url = patch.url;
  }
  if ("status" in patch) {
    if (patch.status === undefined) delete next.status;
    else next.status = patch.status;
  }

  if (Object.keys(next).length === 0) delete overrides[id];
  else overrides[id] = next;

  writeOverrides(overrides);
}

/** Drop every correction for one project, restoring the original. */
export function clearOverride(id: string): void {
  const overrides = readOverrides();
  if (!(id in overrides)) return;
  delete overrides[id];
  writeOverrides(overrides);
}

/* ---------- Public API ---------- */

/** Your builds, newest first, followed by the seeded portfolio. */
export function listAll(): Project[] {
  const overrides = readOverrides();
  return [...readCustom(), ...SEEDED_PROJECTS].map((p) =>
    applyOverride(p, overrides[p.id])
  );
}

export function listCustom(): Project[] {
  const overrides = readOverrides();
  return readCustom().map((p) => applyOverride(p, overrides[p.id]));
}

export function get(id: string): Project | undefined {
  return listAll().find((p) => p.id === id);
}

export function isSeeded(id: string): boolean {
  return SEEDED_PROJECTS.some((p) => p.id === id);
}

export function save(project: Project): Project {
  // Seeded projects are read-only; nothing to persist.
  if (isSeeded(project.id)) return project;

  const custom = readCustom();
  const idx = custom.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    custom[idx] = project;
  } else {
    custom.unshift(project);
  }
  writeCustom(custom);
  return project;
}

export function remove(id: string): boolean {
  if (isSeeded(id)) return false;
  const custom = readCustom();
  const next = custom.filter((p) => p.id !== id);
  if (next.length === custom.length) return false;
  writeCustom(next);
  return true;
}

/** Merge a freshly generated section into a project and persist it. */
export function saveSection(
  projectId: string,
  section: KitSection,
  value: unknown
): Project | undefined {
  const project = get(projectId);
  if (!project) return undefined;

  const updated: Project = {
    ...project,
    kit: { ...(project.kit ?? {}), [section]: value } as StarterKit,
  };
  return save(updated);
}

/** Unique id across both custom and seeded projects. */
export function uniqueId(base: string): string {
  const taken = new Set(listAll().map((p) => p.id));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

const ACCENTS: Project["accent"][] = ["signal", "amber", "ion", "violet", "rose"];

export function nextAccent(): Project["accent"] {
  return ACCENTS[readCustom().length % ACCENTS.length];
}
