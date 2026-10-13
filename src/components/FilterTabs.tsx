"use client";

import { useState } from "react";
import { CaseStudyCard, PostCard } from "@/components/cards";
import type { CaseStudySummary, PostSummary } from "@/lib/types";

const ALL = "All";

function Tabs({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {[ALL, ...options].map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className="focus-ring rounded-full px-4 py-2 text-sm font-medium ring-1 ring-slate-200 transition-colors hover:bg-slate-50 aria-pressed:bg-ink-900 aria-pressed:text-white aria-pressed:ring-ink-900"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function unique(values: (string | null)[]) {
  return [...new Set(values.filter((v): v is string => Boolean(v)))];
}

export function CaseStudyGrid({ studies }: { studies: CaseStudySummary[] }) {
  const [industry, setIndustry] = useState(ALL);
  const industries = unique(studies.map((s) => s.industry_name));
  const visible = industry === ALL ? studies : studies.filter((s) => s.industry_name === industry);

  return (
    <>
      <Tabs label="Filter by industry" options={industries} value={industry} onChange={setIndustry} />
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} case studies
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => (
          <CaseStudyCard key={s.slug} study={s} />
        ))}
      </div>
    </>
  );
}

export function PostGrid({ posts }: { posts: PostSummary[] }) {
  const [category, setCategory] = useState(ALL);
  const categories = unique(posts.map((p) => p.category));
  const visible = category === ALL ? posts : posts.filter((p) => p.category === category);

  return (
    <>
      <Tabs label="Filter by topic" options={categories} value={category} onChange={setCategory} />
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} articles
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}
