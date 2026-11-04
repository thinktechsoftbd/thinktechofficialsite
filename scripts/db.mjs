// Database CLI for the ThinkTech website.
//
//   node --env-file=.env.local scripts/db.mjs migrate   # create/upgrade the website tables
//   node --env-file=.env.local scripts/db.mjs seed      # upsert starter content
//   node --env-file=.env.local scripts/db.mjs setup     # migrate + seed
//   node --env-file=.env.local scripts/db.mjs status    # row counts per table
//
// Tables live in the schema named by DATABASE_SCHEMA (default "public"); it is
// set as the connection search_path, so the SQL uses plain table names.
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

const schema = process.env.DATABASE_SCHEMA || "public";
if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(schema)) {
  console.error(`DATABASE_SCHEMA "${schema}" is not a valid schema name.`);
  process.exit(1);
}

const TABLES = [
  "services", "industries", "case_studies", "testimonials", "posts", "job_openings",
  "stats", "faqs", "inquiries", "job_applications", "newsletter_subscribers",
];

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  options: `-c search_path=${schema}`,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  connectionTimeoutMillis: 15_000,
});

async function migrate() {
  const sql = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
  await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
  await client.query(sql);
  console.log(`✓ schema applied to "${schema}"`);
}

async function upsert(table, rows, conflictKey = "slug") {
  for (const row of rows) {
    const cols = Object.keys(row);
    const values = cols.map((c) => row[c]);
    const placeholders = cols.map((c, i) => (c === "outcomes" ? `$${i + 1}::jsonb` : `$${i + 1}`));
    const updates = cols.filter((c) => c !== conflictKey).map((c) => `${c} = EXCLUDED.${c}`);
    await client.query(
      `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${placeholders.join(", ")})
       ON CONFLICT (${conflictKey}) DO UPDATE SET ${updates.join(", ")}`,
      values,
    );
  }
  console.log(`✓ ${table}: ${rows.length} rows`);
}

async function replace(table, rows) {
  await client.query(`DELETE FROM ${table}`);
  for (const row of rows) {
    const cols = Object.keys(row);
    await client.query(
      `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${cols.map((_, i) => `$${i + 1}`).join(", ")})`,
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

    const { rows: svc } = await client.query("SELECT id, slug FROM services");
    const { rows: ind } = await client.query("SELECT id, slug FROM industries");
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
  // The schema may be shared with the ERP, so only report the website tables.
  const { rows } = await client.query(
    `SELECT c.relname AS table
     FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = $1 AND c.relkind = 'r' AND c.relname = ANY($2) ORDER BY 1`,
    [schema, TABLES],
  );
  if (!rows.length) return console.log(`No website tables in "${schema}" — run \`npm run db:migrate\`.`);
  console.log(`Schema: ${schema}`);
  for (const { table } of rows) {
    const { rows: [{ count }] } = await client.query(`SELECT count(*)::int AS count FROM ${table}`);
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
