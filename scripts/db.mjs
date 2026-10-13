// Database CLI for the ThinkTech website.
//
//   node --env-file=.env.local scripts/db.mjs migrate   # create/upgrade the `website` schema
//   node --env-file=.env.local scripts/db.mjs seed      # upsert starter content
//   node --env-file=.env.local scripts/db.mjs setup     # migrate + seed
//   node --env-file=.env.local scripts/db.mjs status    # row counts per table
//
// Seeding upserts content by slug and replaces only the small slug-less
// tables (stats, faqs, testimonials). Lead tables (inquiries, job
// applications, newsletter subscribers) are never touched.

import { readFile } from "node:fs/promises";
import pg from "pg";
import * as seed from "../db/seed-data.mjs";

const command = process.argv[2] ?? "setup";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  process.exit(1);
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  connectionTimeoutMillis: 15_000,
});

async function migrate() {
  const sql = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
  await client.query(sql);
  console.log("✓ schema applied");
}

async function upsert(table, rows, conflictKey = "slug") {
  for (const row of rows) {
    const cols = Object.keys(row);
    const values = cols.map((c) => row[c]);
    const placeholders = cols.map((c, i) => (c === "outcomes" ? `$${i + 1}::jsonb` : `$${i + 1}`));
    const updates = cols.filter((c) => c !== conflictKey).map((c) => `${c} = EXCLUDED.${c}`);
    await client.query(
      `INSERT INTO website.${table} (${cols.join(", ")}) VALUES (${placeholders.join(", ")})
       ON CONFLICT (${conflictKey}) DO UPDATE SET ${updates.join(", ")}`,
      values,
    );
  }
  console.log(`✓ ${table}: ${rows.length} rows`);
}

async function replace(table, rows) {
  await client.query(`DELETE FROM website.${table}`);
  for (const row of rows) {
    const cols = Object.keys(row);
    await client.query(
      `INSERT INTO website.${table} (${cols.join(", ")}) VALUES (${cols.map((_, i) => `$${i + 1}`).join(", ")})`,
      cols.map((c) => row[c]),
    );
  }
  console.log(`✓ ${table}: ${rows.length} rows`);
}

async function seedAll() {
  await client.query("BEGIN");
  try {
    await upsert("services", seed.services);
    await upsert("industries", seed.industries);

    const { rows: svc } = await client.query("SELECT id, slug FROM website.services");
    const { rows: ind } = await client.query("SELECT id, slug FROM website.industries");
    const serviceId = Object.fromEntries(svc.map((r) => [r.slug, r.id]));
    const industryId = Object.fromEntries(ind.map((r) => [r.slug, r.id]));

    await upsert(
      "case_studies",
      seed.caseStudies.map(({ industry, service, outcomes, ...rest }) => ({
        ...rest,
        industry_id: industryId[industry] ?? null,
        service_id: serviceId[service] ?? null,
        outcomes: JSON.stringify(outcomes),
      })),
    );
    await upsert("posts", seed.posts);
    await upsert("job_openings", seed.jobOpenings);
    await replace("testimonials", seed.testimonials);
    await replace("stats", seed.stats);
    await replace("faqs", seed.faqs);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}

async function status() {
  const { rows } = await client.query(`
    SELECT c.relname AS table, c.reltuples::bigint AS approx_rows
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'website' AND c.relkind = 'r' ORDER BY 1`);
  if (!rows.length) return console.log("website schema has no tables — run `npm run db:migrate`.");
  for (const { table } of rows) {
    const { rows: [{ count }] } = await client.query(`SELECT count(*)::int AS count FROM website.${table}`);
    console.log(`${table.padEnd(24)} ${count}`);
  }
}

try {
  await client.connect();
  if (command === "migrate") await migrate();
  else if (command === "seed") await seedAll();
  else if (command === "setup") {
    await migrate();
    await seedAll();
  } else if (command === "status") await status();
  else {
    console.error(`Unknown command "${command}". Use migrate | seed | setup | status.`);
    process.exitCode = 1;
  }
} catch (err) {
  console.error("✗", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
