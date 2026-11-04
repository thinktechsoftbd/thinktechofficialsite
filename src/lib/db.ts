import "server-only";
import { Pool, type QueryResultRow } from "pg";

declare global {
  var __thinktechPool: Pool | undefined;
}

// Schema that holds the website tables. Queries use plain table names and every
// connection's search_path is set to this schema, so if the tables move, only
// DATABASE_SCHEMA in .env.local has to change (then restart the server).
function databaseSchema() {
  const schema = process.env.DATABASE_SCHEMA || "public";
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(schema)) {
    throw new Error(`DATABASE_SCHEMA "${schema}" is not a valid schema name.`);
  }
  return schema;
}

function createPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  }
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    options: `-c search_path=${databaseSchema()}`,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

// Reuse one pool across hot reloads in development.
function getPool() {
  globalThis.__thinktechPool ??= createPool();
  return globalThis.__thinktechPool;
}

export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []): Promise<T[]> {
  const { rows } = await getPool().query<T>(text, params);
  return rows;
}
