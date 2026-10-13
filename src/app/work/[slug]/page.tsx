import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { DetailSkeleton } from "@/components/DetailSkeleton";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { getCaseStudies, getCaseStudy } from "@/lib/data";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: "article", title: study.title, description: study.summary },
  };
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <CaseStudyDetail params={params} />
    </Suspense>
  );
}

async function CaseStudyDetail({ params }: Pick<PageProps<"/work/[slug]">, "params">) {
  const { slug } = await params;
  const [study, all] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);
  if (!study) notFound();

  const index = all.findIndex((s) => s.slug === study.slug);
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;

  const facts = [
    { label: "Client", value: study.client_label },
    { label: "Industry", value: study.industry_name },
    { label: "Service", value: study.service_title },
    { label: "Duration", value: study.duration },
    { label: "Team", value: study.team_size },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <>
      <PageHero
        eyebrow="Case study"
        title={study.title}
        description={study.summary}
        crumbs={[{ label: "Work", href: "/work" }, { label: study.client_label }]}
      />

      <section className="relative -mt-10">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-3xl bg-slate-200 shadow-xl ring-1 shadow-slate-900/5 ring-slate-200 sm:grid-cols-3">
            {study.outcomes.map((o) => (
              <div key={o.label} className="flex flex-col gap-1 bg-white p-8">
                <dt className="text-sm text-slate-600">{o.label}</dt>
                <dd className="order-first text-4xl font-bold tracking-tight text-brand-600">{o.metric}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-16 lg:grid-cols-12">
          <article className="space-y-12 lg:col-span-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">The challenge</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{study.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Our solution</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{study.solution}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Technology</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <li key={t}>
                    <Tag tone="brand">{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Project at a glance</h2>
              <dl className="mt-6 space-y-5">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs text-slate-500">{f.label}</dt>
                    <dd className="mt-0.5 font-medium text-slate-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {study.service_slug && (
                <Link
                  href={`/services/${study.service_slug}`}
                  className="focus-ring mt-8 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  About this service <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </aside>
        </Container>
      </section>

      {next && (
        <section className="border-t border-slate-200">
          <Container>
            <Link
              href={`/work/${next.slug}`}
              className="focus-ring group flex flex-col gap-2 rounded py-12 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="block text-sm font-semibold text-brand-600">Next case study</span>
                <span className="mt-1 block text-xl font-semibold text-slate-900 group-hover:text-brand-700">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                className="size-6 text-brand-600 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
