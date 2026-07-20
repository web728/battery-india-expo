# India Battery International Show 2026 — Website

Production website for **India Battery International Show 2026** (2–4 October 2026, Auto Cluster
Exhibition Center, Pune) — built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Supabase.

The site is fully functional today with **zero configuration**: every page renders, every form
validates and submits, and submissions are logged server-side. Connecting Supabase and Resend (both
optional, see below) upgrades forms from "logged to console" to "persisted to a database and emailed."

## Content policy

Every page is scoped to what the official show brochure (`public/downloads/*.pdf`) actually says.
Earlier drafts of this site invented a full conference/speakers system and a B2B-networking platform
that had no basis in real event materials — those have been removed. There is no Programme, Speakers,
Conference Agenda, or B2B Networking section. Exhibitor and visitor categories in `src/lib/content/`
are transcribed verbatim from the brochure's Exhibitor Profile / Visitor Profile lists, not invented.
Where the brochure gives no specifics (stand pricing, sponsorship tiers), the site asks a direct
question via the enquiry form rather than presenting fabricated packages.

## What's here

- **58 routes**: homepage, About, Exhibit, Visit, Exhibitor Directory, Venue & Travel, Media Centre,
  legal pages, login, participant dashboard, and an admin CMS.
- **5 working forms** (visitor registration, exhibitor enquiry, sponsor enquiry, contact, newsletter) —
  client + server validation with Zod, rate-limited API routes, reference-number generation, QR visitor
  pass, and transactional email templates.
- **A real, working brochure download** — the actual event brochure PDF is served from
  `/downloads/india-battery-international-show-2026-brochure.pdf`, not a placeholder link.
- **No fabricated content.** Anything not confirmed by the organizer (exhibitors, statistics, prices)
  is rendered as an explicit placeholder ("To Be Announced", "Coming Soon") sourced from small,
  obviously-editable TypeScript files under `src/lib/content/`.
- **SEO**: per-page metadata + canonical URLs, `sitemap.xml`, `robots.txt`, dynamic OG image, JSON-LD
  (Organization, Event, Breadcrumb, FAQ).
- **Accessibility**: semantic landmarks, skip link, visible focus states, labelled form fields with
  live error messaging, `prefers-reduced-motion` support, keyboard-operable nav and accordions.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Forms/validation | React Hook Form patterns + Zod |
| Database/auth | Supabase (Postgres + Auth) |
| Email | Resend |
| Icons | lucide-react (+ custom SVGs for brand/social icons, which lucide no longer ships) |
| QR codes | `qrcode` |

> **Note on Next.js version**: this project pins to Next 16, which renamed `middleware.ts` to
> `proxy.ts` and made `params`/`searchParams` promises. If you're used to older Next conventions,
> skim `node_modules/next/dist/docs/` before making routing changes.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> (or whichever port your dev script prints). The site works immediately —
forms will succeed and log their payload to the terminal instead of writing to a database.

### Environment variables

Copy `.env.example` to `.env.local` and fill in what you have:

```bash
cp .env.example .env.local
```

Everything is optional. Nothing crashes if it's missing — see the table below for what each variable
unlocks.

| Variable | Unlocks |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Participant login (`/login`), dashboard (`/dashboard`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Form submissions persist to Postgres; Admin CMS (`/admin`) becomes reachable |
| `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS` | Real transactional emails (confirmations, acknowledgements) instead of console logs |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | Analytics scripts (only loaded after cookie consent) |
| `NEXT_PUBLIC_SITE_URL` | Overrides the production domain used in metadata/sitemap/emails |

### Setting up Supabase (database, auth, admin CMS)

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql` — this creates every table (registrations,
   leads, exhibitors, sponsors, gallery items, testimonials, consent records, audit logs, etc.),
   enums, and starter row-level-security policies.
3. Copy **Project URL**, **anon public key**, and **service role key** from *Project Settings → API*
   into `.env.local`.
4. Create your own account by signing up through Supabase Auth (e.g. via the `/login` page's password
   reset flow, or directly in the Supabase dashboard under *Authentication → Users*).
5. In the `profiles` table, set your row's `role` to `super_admin` (or any of the roles listed in the
   `user_role` enum in `schema.sql`) — this is what grants access to `/admin`.
6. Restart the dev server. `/admin`, `/dashboard`, and `/login` now work end-to-end; every form
   persists submissions instead of just logging them.

### Setting up email (Resend)

1. Create an account at [resend.com](https://resend.com) and verify a sending domain.
2. Add `RESEND_API_KEY` and `EMAIL_FROM_ADDRESS` to `.env.local`.
3. Templates live in `src/lib/email/templates.ts` — edit the copy there; the HTML wrapper is in the
   same file's `baseTemplate()` function.

## Editing content

Almost all copy that isn't a full page of prose lives in small, typed files under
`src/lib/content/` and `src/lib/site-config.ts` — edit these directly (no rebuild step beyond
`npm run dev`/`build` picking up the change):

| File | Controls |
|---|---|
| `src/lib/site-config.ts` | Event name, dates, venue, organizer, contacts, WhatsApp number, social links |
| `src/lib/content/nav.ts` | Header/footer navigation |
| `src/lib/content/sectors.ts` | The 13 Exhibitor Profile categories (verbatim from the brochure) |
| `src/lib/content/exhibitor-categories.ts` | The 14 Visitor Profile categories (verbatim from the brochure) |
| `src/lib/content/stats.ts` | Homepage statistic cards — replace placeholder text with real numbers once confirmed |
| `src/lib/content/faqs.ts` | Exhibitor/visitor FAQs |
| `src/lib/content/home-content.ts` | Why Exhibit / Why Visit benefits, Why Pune points, download list |
| `src/lib/content/exhibitors.ts` | Exhibitor directory + testimonials — **intentionally empty**, see below |

**Do not add placeholder companies, people, or numbers to `exhibitors.ts` or the testimonials array.**
These are empty by design per the no-fabrication requirement; populate them only with organizer-confirmed
data, ideally by wiring the admin CMS to the corresponding Supabase table (`exhibitors`, `testimonials`)
rather than editing the TypeScript file directly once the site is live.

Once Supabase is connected, the intent is for the admin CMS (`/admin`) to become the actual source of
truth for exhibitors, sponsors and news — the TypeScript files under `src/lib/content/` remain the
source of truth for structural content (sectors, FAQs) that isn't row-level CMS data.

## Admin CMS

`/admin` is gated by Supabase Auth + a role check (see `src/lib/auth.ts`). It provides:

- An overview with live counts pulled from key tables.
- A generic module viewer (`/admin/[module]`) for every table listed in `src/lib/admin-modules.ts` —
  registrations, all lead types, exhibitors, sponsors, galleries, FAQs, etc.

This is intentionally a **read-oriented, generically-driven** admin (a real read/write CRUD UI for
every module is out of scope for a single build pass). Content edits happen either directly in
the Supabase table editor, or by extending `/admin/[module]/page.tsx` with write forms per module as
the team's workflow requires — the RLS policies and table shapes in `schema.sql` are already in place
to support that.

## Participant dashboard & login

`/login` uses Supabase Auth (email + password, with a "forgot password" reset-email flow). `/dashboard`
reads the logged-in user's `profiles.role` and renders one of two dashboard shells (visitor, exhibitor)
— see `src/app/dashboard/page.tsx`. Without Supabase configured, both routes show a clear "not yet
configured" state instead of erroring.

## Deployment

The project is a standard Next.js app and deploys cleanly to Vercel (recommended) or any Node.js host:

```bash
npm run build
npm run start
```

**Vercel:**
1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the environment variables from `.env.example` in Project Settings → Environment Variables.
4. Deploy. `next build` runs automatically.

**Self-hosted / other platforms:** `npm run build && npm run start` starts a Node server on port 3000
(set `PORT` to override). All API routes (`src/app/api/*`) run as standard Node route handlers — no
special serverless configuration is required, though Vercel will deploy them as serverless functions
automatically.

Before going live:
- [ ] Run `supabase/schema.sql` against your production Supabase project and set production env vars.
- [ ] Set a real `RESEND_API_KEY` and verify your sending domain.
- [ ] Replace placeholder statistics once confirmed by the organizer.
- [ ] Populate `exhibitors` and `testimonials` only with approved, confirmed data.
- [ ] Have legal counsel review the six draft legal pages (`/privacy-policy`, `/terms`,
      `/registration-terms`, `/cancellation-policy`, `/cookies`, `/accessibility`) — they are marked
      "Draft for Legal Review" and are `noindex` until reviewed (remove that flag in each page's
      `metadata.robots` once approved).
- [ ] Add a real favicon/app icons (currently using the Next.js default `favicon.ico` placeholder).
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` / GTM / Meta Pixel / LinkedIn Insight IDs if analytics are
      required at launch.

## Project structure

```
src/
  app/                    Routes (App Router). Each folder under app/ is a URL segment.
    api/                  Form submission endpoints (POST-only route handlers)
    admin/                Admin CMS (auth-gated layout + generic module viewer)
    dashboard/            Participant dashboard (role-based)
  components/
    ui/                   Generic UI primitives (Button, Card, form fields, accordion, etc.)
    layout/                Header, Footer, mobile menu, consent banner, sticky mobile bar
    sections/              Homepage/section-level building blocks (Hero, PageHero, benefit grids, ...)
    forms/                  The 5 form components (client-side validation + submit handling)
    seo/                    JSON-LD components, analytics script loader
    dashboard/              Dashboard shell components
  lib/
    content/                Editable site content (see table above)
    validations/            Zod schemas, shared by client forms and API routes
    email/                  Email templates + send() wrapper
    supabase/               Browser/server/service Supabase clients
    site-config.ts           Event facts (name, dates, venue, contacts)
    admin-modules.ts         Admin CMS module registry
    auth.ts                  Session/role helpers
    analytics.ts              trackEvent() + event name constants
supabase/
  schema.sql                Full Postgres schema, RLS policies, and enums
```

## Testing what you built

```bash
npm run build   # type-checks every route and statically generates all 58 pages
npm run lint     # ESLint (React Compiler rules included)
npm run dev      # local dev server with Turbopack + fast refresh
```
