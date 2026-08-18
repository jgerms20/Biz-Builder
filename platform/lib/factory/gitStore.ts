import fs from "fs";
import path from "path";

/* ============================================================
   GIT STORE

   The one adapter between "state as committed files under
   factory/" and the two runtimes that touch it.

   Two backends, chosen automatically:

   - LOCAL  — a real checkout is present (dev server, or a Claude
              Code session). Reads/writes the filesystem directly.
              Writing does NOT commit; the caller (or the agent)
              owns git. This keeps the hub honest in dev and lets
              agents batch their own commits per PROTOCOL.md.

   - GITHUB — no writable checkout (Vercel). Reads and writes go
              through the GitHub Contents API. Each write is its
              own commit, which is exactly the granularity the
              ticket-per-file model wants.

   Selection: if FACTORY_GITHUB_TOKEN (or GITHUB_TOKEN) + repo are
   configured AND the local factory dir is not writable, use
   GITHUB. Otherwise LOCAL. An explicit FACTORY_BACKEND env var
   overrides.

   Everything above this module is unaware of which backend ran.
   ============================================================ */

export type Backend = "local" | "github";

export interface StoredFile {
  path: string; // repo-relative, e.g. "factory/tickets/tkt_x.json"
  content: string;
  sha?: string; // github blob sha, needed to update/delete
}

export interface GitStore {
  backend: Backend;
  read(repoPath: string): Promise<StoredFile | null>;
  list(dirPath: string): Promise<string[]>; // repo-relative file paths
  write(repoPath: string, content: string, message: string): Promise<void>;
  remove(repoPath: string, message: string): Promise<void>;
}

/* ---------- Config ---------- */

function repoRoot(): string {
  // platform/ is one level under the repo root.
  return path.resolve(process.cwd(), "..");
}

function githubConfig(): { token: string; owner: string; repo: string; branch: string } | null {
  const token = process.env.FACTORY_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const slug = process.env.FACTORY_REPO || "jgerms20/Biz-Builder";
  const branch = process.env.FACTORY_BRANCH || "claude/business-builder-platform-Atjwj";
  if (!token || !slug.includes("/")) return null;
  const [owner, repo] = slug.split("/");
  return { token, owner, repo, branch };
}

function localFactoryWritable(): boolean {
  try {
    const dir = path.join(repoRoot(), "factory");
    fs.accessSync(dir, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export function chooseBackend(): Backend {
  const forced = process.env.FACTORY_BACKEND;
  if (forced === "local" || forced === "github") return forced;
  if (githubConfig() && !localFactoryWritable()) return "github";
  return "local";
}

/* ---------- LOCAL backend ---------- */

function localStore(): GitStore {
  const root = repoRoot();
  const abs = (p: string) => path.join(root, p);

  return {
    backend: "local",
    async read(repoPath) {
      try {
        const content = fs.readFileSync(abs(repoPath), "utf-8");
        return { path: repoPath, content };
      } catch {
        return null;
      }
    },
    async list(dirPath) {
      try {
        const dir = abs(dirPath);
        return fs
          .readdirSync(dir, { withFileTypes: true })
          .filter((e) => e.isFile() && !e.name.startsWith("."))
          .map((e) => `${dirPath}/${e.name}`);
      } catch {
        return [];
      }
    },
    async write(repoPath, content) {
      const target = abs(repoPath);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content, "utf-8");
    },
    async remove(repoPath) {
      try {
        fs.unlinkSync(abs(repoPath));
      } catch {
        // already gone
      }
    },
  };
}

/* ---------- GITHUB backend ---------- */

function githubStore(cfg: NonNullable<ReturnType<typeof githubConfig>>): GitStore {
  const api = "https://api.github.com";
  const headers = {
    Authorization: `Bearer ${cfg.token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  const contentsUrl = (repoPath: string) =>
    `${api}/repos/${cfg.owner}/${cfg.repo}/contents/${repoPath.split("/").map(encodeURIComponent).join("/")}`;

  async function getFile(repoPath: string): Promise<StoredFile | null> {
    const res = await fetch(`${contentsUrl(repoPath)}?ref=${encodeURIComponent(cfg.branch)}`, {
      headers,
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub read ${repoPath}: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { content?: string; sha: string };
    const content = json.content ? Buffer.from(json.content, "base64").toString("utf-8") : "";
    return { path: repoPath, content, sha: json.sha };
  }

  return {
    backend: "github",
    read: getFile,
    async list(dirPath) {
      const res = await fetch(`${contentsUrl(dirPath)}?ref=${encodeURIComponent(cfg.branch)}`, {
        headers,
      });
      if (res.status === 404) return [];
      if (!res.ok) throw new Error(`GitHub list ${dirPath}: ${res.status}`);
      const json = (await res.json()) as Array<{ type: string; name: string }>;
      return json
        .filter((e) => e.type === "file" && !e.name.startsWith("."))
        .map((e) => `${dirPath}/${e.name}`);
    },
    async write(repoPath, content, message) {
      const existing = await getFile(repoPath);
      const res = await fetch(contentsUrl(repoPath), {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message,
          content: Buffer.from(content, "utf-8").toString("base64"),
          branch: cfg.branch,
          ...(existing?.sha ? { sha: existing.sha } : {}),
        }),
      });
      if (!res.ok) throw new Error(`GitHub write ${repoPath}: ${res.status} ${await res.text()}`);
    },
    async remove(repoPath, message) {
      const existing = await getFile(repoPath);
      if (!existing?.sha) return;
      const res = await fetch(contentsUrl(repoPath), {
        method: "DELETE",
        headers,
        body: JSON.stringify({ message, sha: existing.sha, branch: cfg.branch }),
      });
      if (!res.ok) throw new Error(`GitHub delete ${repoPath}: ${res.status}`);
    },
  };
}

/* ---------- Public factory ---------- */

let cached: GitStore | null = null;

export function getStore(): GitStore {
  if (cached) return cached;
  const backend = chooseBackend();
  if (backend === "github") {
    const cfg = githubConfig();
    if (cfg) {
      cached = githubStore(cfg);
      return cached;
    }
  }
  cached = localStore();
  return cached;
}

/** True when the hub can actually persist factory state right now. */
export function storeIsWritable(): boolean {
  const backend = chooseBackend();
  return backend === "github" ? githubConfig() !== null : localFactoryWritable();
}

/* ---------- Typed JSON helpers ---------- */

export async function readJson<T>(store: GitStore, repoPath: string): Promise<T | null> {
  const file = await store.read(repoPath);
  if (!file) return null;
  try {
    return JSON.parse(file.content) as T;
  } catch {
    return null;
  }
}

export async function writeJson(
  store: GitStore,
  repoPath: string,
  value: unknown,
  message: string
): Promise<void> {
  await store.write(repoPath, JSON.stringify(value, null, 2), message);
}
