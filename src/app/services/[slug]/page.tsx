import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudyCard, ServiceCard } from "@/components/cards";
import { ContactForm } from "@/components/forms/ContactForm";
import { DetailSkeleton } from "@/components/DetailSkeleton";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/config/site";
import { getCaseStudiesForService, getService, getServiceLinks } from "@/lib/data";

export async function generateStaticParams() {
  const services = await getServiceLinks();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | ThinkTech`, description: service.summary },
  };
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }: Pick<PageProps<"/services/[slug]">, "params">) {
  const { slug } = await params;
  const [service, allServices, caseStudies] = await Promise.all([
    getService(slug),
    getServiceLinks(),
    getCaseStudiesForService(slug),
  ]);
  if (!service) notFound();

  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.tagline}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#start" size="lg" arrow>
            Discuss your project
          </ButtonLink>
          <ButtonLink href="/work" variant="outline-light" size="lg">
            See related work
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{service.description}</p>

            <h2 className="mt-14 text-2xl font-bold tracking-tight text-slate-900">What we offer</h2>
            <CheckList items={service.capabilities} className="mt-6 sm:columns-2 sm:gap-8 [&>li]:mb-3 [&>li]:break-inside-avoid" />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">What you get</h2>
              <CheckList items={service.deliverables} className="mt-5 text-sm" />
            </div>
            <div className="rounded-3xl bg-ink-900 p-8">
              <h2 className="text-lg font-semibold text-white">Technologies we use</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <li key={t} className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/10">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container>
          <SectionHeading eyebrow="Our process" title="How a project runs with us" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <span className="text-sm font-bold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-semibold text-slate-900">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {caseStudies.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading eyebrow="Proof" title={`${service.title} in action`} />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} study={cs} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section id="start" className="scroll-mt-20 py-20">
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Get started"
              title="Tell us what you're building"
              description="Share a few details and a senior engineer will reply within one business day with questions, ideas and next steps."
            />
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 shadow-slate-900/5 ring-slate-200 sm:p-10 lg:col-span-3">
            <ContactForm
              services={allServices.map((s) => s.title)}
              defaultService={service.title}
              sourcePage={`/services/${service.slug}`}
            />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20">
        <Container>
          <SectionHeading eyebrow="Explore more" title="Related services" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {otherServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
