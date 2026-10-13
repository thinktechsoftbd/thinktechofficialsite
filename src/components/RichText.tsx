import { Fragment } from "react";

// Renders the lightweight markdown used for insight articles:
// "## " / "### " headings, "- " bullet lists, paragraphs, **bold** and *italic*.
// Output is plain React elements, so stored content can never inject HTML.

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function headingsOf(body: string) {
  return body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.slice(3).trim();
      return { id: slugify(text), text };
    });
}

export function RichText({ body }: { body: string }) {
  const blocks = body.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);

  return (
    <div className="space-y-5 text-[1.0625rem] leading-relaxed text-slate-700">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="pt-2 text-xl font-semibold text-slate-900">
              {inline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          const text = block.slice(3).trim();
          return (
            <h2 key={i} id={slugify(text)} className="scroll-mt-24 pt-4 text-2xl font-bold tracking-tight text-slate-900">
              {inline(text)}
            </h2>
          );
        }
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6 marker:text-brand-500">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
