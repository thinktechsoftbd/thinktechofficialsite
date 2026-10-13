# ThinkTech — Official Website

Corporate website for ThinkTech, built with **Next.js 16** (App Router, Cache Components), **Tailwind CSS 4** and **PostgreSQL**.
All content (services, industries, case studies, insights, jobs, FAQs, stats, testimonials) lives in the `thinktecherp` database, and every form submission (inquiries, job applications, newsletter sign-ups) is written back to it so the ERP can pick it up.

## Quick start

```bash
npm install
cp .env.example .env.local      # then fill in DATABASE_URL etc.
npm run db:setup                # create the `website` schema + seed starter content
npm run dev                     # http://localhost:3000
```

Production:

```bash
npm run build                   # needs DB access: pages are prerendered from the database
npm run start
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | `postgres://user:password@host:5432/thinktecherp` |
| `DATABASE_SSL` | `true` if the database requires TLS |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used in the sitemap, canonical URLs and Open Graph tags |
| `REVALIDATE_SECRET` | Bearer token for `POST /api/revalidate` |

## Database

Everything lives in a dedicated **`website` schema** so it can share `thinktecherp` with ERP modules without name clashes.

| Table | Written by | Notes |
| --- | --- | --- |
| `services`, `industries`, `case_studies`, `posts`, `job_openings`, `testimonials`, `stats`, `faqs` | Back office / ERP | Shown when `is_published` / `is_open` is true, ordered by `sort_order` |
| `inquiries` | Contact forms | `status`: new → contacted → qualified → won / lost / spam |
| `job_applications` | Careers pages | `status`: received → screening → interview → offer → hired / rejected |
| `newsletter_subscribers` | Footer form | Unique per email (case-insensitive) |

Scripts:

- `npm run db:migrate` applies `db/schema.sql`. It is idempotent and safe to re-run.
- `npm run db:seed` upserts the starter content in `db/seed-data.mjs`. It never touches lead tables.
- `npm run db:status` prints row counts.

Insight articles (`posts.body`) use lightweight markdown: `## heading`, `### subheading`, `- bullet`, `**bold**`, `*italic*`, with paragraphs separated by blank lines.

## Caching and content updates

Pages are prerendered from the database and cached (`cacheLife("hours")`), so content edits appear within about an hour. To publish immediately after editing content, call:

```bash
curl -X POST https://<your-site>/api/revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["posts"]}'
```

Valid tags: `services`, `industries`, `case-studies`, `testimonials`, `posts`, `jobs`, `stats`, `faqs`. Omit the body to refresh everything.
New detail pages (for example a new post slug) work immediately without a rebuild.

`GET /api/health` returns `{"status":"ok","database":"up"}` for uptime monitors.

## Project structure

```
db/schema.sql            schema (website.*)
db/seed-data.mjs         starter content
scripts/db.mjs           migrate / seed / status CLI
src/config/site.ts       company details, nav, engagement models, process, tech stack
src/lib/data.ts          cached database queries
src/app/actions.ts       server actions for the three forms (zod-validated, honeypot spam trap)
src/app/**/page.tsx      routes: /, /services, /industries, /work, /insights, /careers, /about, /contact, /privacy
```

## Before launch checklist

- [ ] Replace the placeholder contact details and social links in `src/config/site.ts`.
- [ ] Replace the **sample** case studies, testimonials and job openings with real ones, or unpublish them:
      `UPDATE website.case_studies SET is_published = false;` (likewise `testimonials.is_published`, `job_openings.is_open`).
- [ ] Update `website.stats` with real figures (projects delivered, clients, team size, years).
- [ ] Have the privacy policy (`src/app/privacy/page.tsx`) reviewed for your jurisdiction.
- [ ] Use a strong database password and a least-privilege DB user for the website (it needs SELECT on content tables and INSERT on lead tables only), and restrict port 5432 to the web server's IP.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain and generate a new `REVALIDATE_SECRET`.
