import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { DetailSkeleton } from "@/components/DetailSkeleton";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { getJobOpening, getJobOpenings } from "@/lib/data";

export async function generateStaticParams() {
  const jobs = await getJobOpenings();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOpening(slug);
  if (!job) return { title: "Position not found" };
  return {
    title: `${job.title} — Careers`,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

export default function JobPage({ params }: PageProps<"/careers/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <JobDetail params={params} />
    </Suspense>
  );
}

async function JobDetail({ params }: Pick<PageProps<"/careers/[slug]">, "params">) {
  const { slug } = await params;
  const job = await getJobOpening(slug);
  if (!job) notFound();

  const sections = [
    { title: "What you'll do", items: job.responsibilities },
    { title: "What we're looking for", items: job.requirements },
    { title: "Nice to have", items: job.nice_to_have },
  ].filter((s) => s.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow={job.department}
        title={job.title}
        description={job.summary}
        crumbs={[{ label: "Careers", href: "/careers" }, { label: job.title }]}
      >
        <div className="flex flex-col gap-6">
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-accent-300" aria-hidden="true" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-4 text-accent-300" aria-hidden="true" /> {job.employment_type} ·{" "}
              {job.experience}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-accent-300" aria-hidden="true" /> Posted{" "}
              {formatDate(job.posted_at)}
            </span>
          </p>
          <div>
            <ButtonLink href="#apply" size="lg" arrow>
              Apply now
            </ButtonLink>
          </div>
        </div>
      </PageHero>

      <section className="py-20">
        <Container className="max-w-4xl space-y-12">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">{s.title}</h2>
              <CheckList items={s.items} className="mt-6" />
            </div>
          ))}
        </Container>
      </section>

      <section id="apply" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-20">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Apply for this role</h2>
          <p className="mt-2 text-slate-600">It takes about three minutes. We read every application.</p>
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <ApplicationForm jobSlug={job.slug} jobTitle={job.title} />
          </div>
        </Container>
      </section>
    </>
  );
}
