import fs from "fs";
import path from "path";
import { SEEDED_PROJECTS, type Project } from "./projects";

/* ============================================================
   Storage adapter.

   Local / VPS  -> JSON file on disk, fully persistent.
   Vercel       -> filesystem is read-only, so writes fall back to
                   process memory. Generated kits survive the session
                   but not a cold start; every kit is exportable to
                   Markdown so nothing is ever trapped.

   To make writes durable on Vercel, swap readAll/writeAll for
   Vercel KV or Postgres — the rest of the app is unaware.
   ============================================================ */

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "projects.json");

let memory: Project[] | null = null;
let diskWritable: boolean | null = null;

function canWriteDisk(): boolean {
  if (diskWritable !== null) return diskWritable;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.accessSync(DATA_DIR, fs.constants.W_OK);
    diskWritable = true;
  } catch {
    diskWritable = false;
  }
  return diskWritable;
}

function readAll(): Project[] {
  if (memory) return memory;

  if (canWriteDisk() && fs.existsSync(DATA_FILE)) {
    try {
      memory = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Project[];
      return memory;
    } catch {
      // Corrupt file — start clean rather than crashing the app.
    }
  }

  memory = [];
  return memory;
}

function writeAll(projects: Project[]): void {
  memory = projects;
  if (!canWriteDisk()) return;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), "utf-8");
  } catch {
    // Memory still holds it; export remains available.
  }
}

export function isPersistent(): boolean {
  return canWriteDisk();
}

/* ---------- Public API ---------- */

export function listProjects(): Project[] {
  const custom = readAll();
  return [...custom, ...SEEDED_PROJECTS];
}

export function getProject(id: string): Project | undefined {
  return listProjects().find((p) => p.id === id);
}

export function saveProject(project: Project): Project {
  const custom = readAll();
  const idx = custom.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    custom[idx] = project;
  } else {
    custom.unshift(project);
  }
  writeAll(custom);
  return project;
}

export function deleteProject(id: string): boolean {
  const custom = readAll();
  const next = custom.filter((p) => p.id !== id);
  if (next.length === custom.length) return false;
  writeAll(next);
  return true;
}

export function uniqueId(base: string): string {
  const existing = new Set(listProjects().map((p) => p.id));
  if (!existing.has(base)) return base;
  let n = 2;
  while (existing.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}
