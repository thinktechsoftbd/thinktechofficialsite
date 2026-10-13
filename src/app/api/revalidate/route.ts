import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAGS, type ContentTag } from "@/lib/data";

// Refresh cached pages after content changes in the database (for example
// from the ERP back office):
//
//   curl -X POST https://<site>/api/revalidate \
//     -H "Authorization: Bearer $REVALIDATE_SECRET" \
//     -H "Content-Type: application/json" \
//     -d '{"tags": ["posts"]}'
//
// Omit "tags" to refresh all content.

function authorized(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const header = request.headers.get("authorization") ?? "";
  if (!secret || !header.startsWith("Bearer ")) return false;
  const given = Buffer.from(header.slice(7));
  const expected = Buffer.from(secret);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requested: unknown;
  try {
    requested = (await request.json())?.tags;
  } catch {
    requested = undefined; // empty or non-JSON body: refresh everything
  }

  const tags: ContentTag[] = Array.isArray(requested)
    ? requested.filter((t): t is ContentTag => (CONTENT_TAGS as readonly unknown[]).includes(t))
    : [...CONTENT_TAGS];

  if (!tags.length) {
    return Response.json({ error: `Unknown tags. Valid tags: ${CONTENT_TAGS.join(", ")}` }, { status: 400 });
  }

  for (const tag of tags) revalidateTag(tag, "max");
  return Response.json({ revalidated: tags });
}
