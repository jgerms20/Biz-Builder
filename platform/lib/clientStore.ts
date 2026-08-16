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

/* ---------- Public API ---------- */

/** Your builds, newest first, followed by the seeded portfolio. */
export function listAll(): Project[] {
  return [...readCustom(), ...SEEDED_PROJECTS];
}

export function listCustom(): Project[] {
  return readCustom();
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
