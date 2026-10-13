import { connection } from "next/server";
import { query } from "@/lib/db";

// Liveness + database check for uptime monitors and load balancers.
export async function GET() {
  await connection();
  try {
    await query("SELECT 1");
    return Response.json({ status: "ok", database: "up" });
  } catch {
    return Response.json({ status: "degraded", database: "down" }, { status: 503 });
  }
}
