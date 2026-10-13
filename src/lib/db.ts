import "server-only";
import { Pool, type QueryResultRow } from "pg";

declare global {
  var __thinktechPool: Pool | undefined;
}

function createPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  }
  return new Pool({
    connectionString: process.env.DATABASE_URL,
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
