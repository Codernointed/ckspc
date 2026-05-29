# CKSPC Unified Platform

This repository is now **one Next.js app** that contains two linked experiences sharing a single backend:

1. **The public website** (`ckspc.vercel.app`) — the polished marketing/community site.
2. **The operations console** (`/hq`, `/finance`, `/welfare`, …) — the heavyweight church-management platform described in `CKSPC_Church_Platform_Document.md`.

The public site's content is **editable from the admin** (`/website`), backed by a real Postgres database. This document explains the architecture and how to run it.

---

## Architecture

### Route groups (multiple root layouts)

There is intentionally **no `app/layout.tsx`**. Instead each experience is its own root layout, which gives the marketing site and the navy admin dashboard fully isolated stylesheets:

```
app/
  globals.css            ← public site design system (warm linen)
  admin.css              ← admin design system (Sovereign navy)
  (public)/              ← root layout: <html>, Lenis smooth-scroll, public metadata
    page.tsx             ← "/" home (server component; reads editable content)
    leadership/ media/ ministries/ visit/
  (admin)/               ← root layout: <html>, auth guard, Sidebar
    hq/ branch/[slug]/ members/ departments/ fellowships/ hr/
    finance/ welfare/ inventory/ sermons/ devotions/ events/
    comms/ reports/ roles/ audit/ settings/
    website/             ← CMS: edit the public homepage content
  (auth)/
    login/               ← credentials login
  api/auth/[...nextauth] ← Auth.js route handler

components/   public components + admin chrome (Sidebar, Topbar, DataTable…) + website/
lib/
  db/        Drizzle schema, client (Neon), seed
  auth/      Auth.js config + RBAC role model
  content.ts editable-content schema, defaults, getHomeContent()
  actions/   server actions (saveHomeSection)
  mock-data.ts  ← still backs the admin modules not yet migrated to the DB
```

Crossing between the public site and the admin triggers a full page load (different root layouts) — desirable, since smooth-scroll/animation chrome should not bleed into data tables.

### Backend

| Concern | Choice |
|---|---|
| Database | **Neon Postgres** (project `ckspc-platform`, id `still-water-88112500`) |
| ORM / migrations | **Drizzle** (`lib/db/schema.ts`, `npm run db:push`) |
| Auth | **Auth.js v5** (credentials + JWT sessions), `lib/auth/config.ts` |
| Access control | Role model in `lib/auth/rbac.ts`; nav filtered + module guards |

The Neon client is configured with `fetch` caching disabled (`lib/db/index.ts`) so the framework never serves a stale DB read.

### How "editable website" works (the proven vertical slice)

1. `lib/content.ts` declares each home section's **editable fields** and **default copy** (single source of truth, shared by seed + runtime).
2. `/website` (admin) renders a form per section; saving calls the `saveHomeSection` server action, which is **RBAC-guarded** (`website` module) and upserts into the `site_content` table, then revalidates `/`.
3. The public home (`app/(public)/page.tsx`, `force-dynamic`) calls `getHomeContent()` and passes the data into `Welcome`, `VisionMission`, and `ConnectCta`. If the DB is empty/unreachable, components fall back to their built-in defaults, so the site always renders.

This same pattern extends to the rest of the site (hero slides, branches, sermons, gallery) as those modules are migrated off `mock-data.ts`.

---

## Running locally

```bash
npm install
# .env.local already contains DATABASE_URL (Neon) and AUTH_SECRET
npm run db:push     # apply schema to Neon
npm run db:seed     # church profile, branches, users, home content
npm run dev         # http://localhost:3000
```

### Seeded logins (password `ckspc-admin`)

| Email | Role | Sees |
|---|---|---|
| `overseer@ckspc.org` | General Overseer | everything |
| `admin@ckspc.org` | National Administrator | everything |
| `madina.pastor@ckspc.org` | Branch Pastor | branch-scoped modules |

The sidebar shows only the modules a role can reach (RBAC). Visit `/website` as the overseer/admin to edit the homepage and watch `/` update.

### DB scripts

| Script | Purpose |
|---|---|
| `npm run db:push` | Push schema changes to Neon |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:seed` | Reset/seed reference + demo data |
| `npm run db:studio` | Open Drizzle Studio |

---

## Status & next steps

**Done:**
- Two codebases merged into one app with isolated styling.
- Neon + Drizzle + Auth.js + RBAC foundation.
- Admin login + role-aware navigation + sign-out.
- Editable homepage content, end-to-end (admin → DB → public), verified.
- **Branches fully DB-driven**: public directory reads from the DB; admin `/branches`
  lets you add (church plants), edit (name, location, pastor, service times, photo, HQ
  flag), and delete branches — changes publish to the public site instantly. New branches
  get their own `/branch/[slug]` dashboard automatically.
- **Downloadable user guide** — `CKSPC_Platform_Guide.docx` (walkthrough + logins + how-to).

**Next, module by module** (remaining admin pages render from `lib/mock-data.ts`):
1. Migrate **Members**, **Finance**, **Welfare** to the DB, reusing the branches/`site_content`
   server-action pattern.
2. **User-invite screen** under Roles & access (create logins without touching the DB).
3. Add **per-route module guards** so direct URLs (not just the nav) enforce RBAC.
4. Extend the CMS to the **hero carousel, stats, gallery, leadership** sections.
5. **Image upload** for branches/content (needs a storage bucket — e.g. Vercel Blob / R2).
6. Audit logging, maker/checker on finance, digital giving (Paystack), notifications.
7. Multi-tenancy (`church_id`) for the eventual SaaS phase.
