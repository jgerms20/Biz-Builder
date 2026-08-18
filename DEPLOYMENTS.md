# Deployment map

This repository is a monorepo of separate websites. Each one is its own Vercel
project, distinguished **only** by the Root Directory setting.

Get that setting wrong and Vercel builds a different business's site under your
URL. That is the single most common failure here, and it is silent — the build
succeeds, it just serves the wrong thing.

| Vercel project should serve | Root Directory | Notes |
|---|---|---|
| **Biz Builder platform** (the operating console) | `platform` | The home base. Everything else is a build it tracks. |
| The Comeback Truck | `comeback-truck` | |
| DG Creations | `daniel-german` | |
| Milton German Bookkeeping | `milton-german` | |
| Nicholas German | `nicholas-german` | |
| Janie Bell's Alterations | `.` *(repo root)* | ⚠️ See below |

## The root-directory trap

Janie Bell's site lives at the **repository root**, not in a subfolder. So any
Vercel project whose Root Directory is left blank builds Janie's site.

That means a misconfigured project fails in one of two ways:

- **Root Directory blank** → serves Janie Bell's Alterations
- **Root Directory pointing at the wrong folder** → serves whichever business
  owns that folder

If a URL is showing the wrong business, this setting is almost always why.

## Fixing a project that serves the wrong site

Vercel → the project → **Settings → General → Root Directory** → set it from the
table above → **Save** → **Deployments → ⋯ → Redeploy**.

The Root Directory change alone does not rebuild. You have to trigger the
redeploy.

## Environment variables

Set these per project in Vercel → Settings → Environment Variables. Nothing here
breaks the build if missing — the site deploys and renders, and then the form
fails silently at submit, which is a worse failure mode than a broken build.

| Project | Required | Optional |
|---|---|---|
| Biz Builder platform | `ANTHROPIC_API_KEY` | — |
| The Comeback Truck | `GMAIL_USER`, `GMAIL_PASS`, `NEXT_PUBLIC_SITE_URL` | `BOOKING_EMAIL` |
| DG Creations | `GMAIL_USER`, `GMAIL_APP_PASSWORD` | `CONTACT_EMAIL` |
| Milton German | `GMAIL_USER`, `GMAIL_APP_PASSWORD` | `CONTACT_EMAIL` |
| Nicholas German | `GMAIL_USER`, `GMAIL_PASS` | `BOOKING_EMAIL` |
| Janie Bell | `GMAIL_USER`, `GMAIL_APP_PASSWORD` | `CONTACT_EMAIL` |

**Watch the password variable name — it is not consistent across the sites.**
Comeback Truck and Nicholas German read `GMAIL_PASS`; DG Creations, Milton, and
Janie Bell read `GMAIL_APP_PASSWORD`. Setting the wrong one leaves mail silently
broken. Worth standardising the next time these are touched.

`NEXT_PUBLIC_SITE_URL` on the Comeback Truck is what the printed QR codes encode.
If it is wrong or unset, flyers already in circulation point somewhere else.

## Adding the platform as the main project

The console is meant to be the front door — the place you start from and return
to as each new business gets built.

1. vercel.com → **Add New → Project** → import `jgerms20/Biz-Builder`
2. **Root Directory → `platform`**
3. **Environment Variables → `ANTHROPIC_API_KEY`**
4. Deploy

If you want it on the shortest URL and something else currently holds that name,
rename the other project first — Vercel frees the subdomain immediately.
