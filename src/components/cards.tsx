import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/format";
import type { CaseStudySummary, JobOpeningSummary, PostSummary, ServiceLink } from "@/lib/types";

export function ServiceCard({ service }: { service: ServiceLink }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="focus-ring group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon name={service.icon} className="size-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        Learn more
        <ArrowUpRight
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudySummary }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="focus-ring group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5"
    >
      <div className="bg-hero-glow relative overflow-hidden px-6 pt-8 pb-6">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <p className="relative text-5xl font-bold tracking-tight text-white">{study.headline_metric}</p>
        <p className="relative mt-1 text-sm font-medium text-accent-300">{study.headline_label}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {study.industry_name && <Tag tone="brand">{study.industry_name}</Tag>}
          {study.service_title && <Tag>{study.service_title}</Tag>}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-brand-700">{study.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{study.summary}</p>
        <p className="mt-5 text-xs font-medium tracking-wide text-slate-500 uppercase">{study.client_label}</p>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-slate-900/5">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <Tag tone="brand">{post.category}</Tag>
        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
      </div>
      <h3 className="mt-4 text-lg leading-snug font-semibold text-slate-900 group-hover:text-brand-700">
        <Link href={`/insights/${post.slug}`} className="focus-ring rounded after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
      <p className="mt-5 flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="size-3.5" aria-hidden="true" /> {post.reading_minutes} min read
      </p>
    </article>
  );
}

export function JobCard({ job }: { job: JobOpeningSummary }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="focus-ring group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">{job.department}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900 group-hover:text-brand-700">{job.title}</h3>
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden="true" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="size-4" aria-hidden="true" /> {job.employment_type} · {job.experience}
          </span>
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700">
        View role <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
