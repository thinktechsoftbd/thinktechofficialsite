import type { Metadata } from "next";
import { CircleAlert, CircleCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getIndustries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Software solutions for healthcare, fintech, retail, logistics, manufacturing, education, real estate and travel, built by ThinkTech.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Software that understands your industry"
        description="Every sector has its own regulations, integrations and customer expectations. We bring that context to day one of your project."
        crumbs={[{ label: "Industries" }]}
      >
        <nav aria-label="Jump to industry">
          <ul className="flex flex-wrap gap-2">
            {industries.map((i) => (
              <li key={i.slug}>
                <a
                  href={`#${i.slug}`}
                  className="focus-ring inline-flex rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-slate-200 ring-1 ring-white/15 transition-colors hover:bg-white/10"
                >
                  {i.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container className="space-y-8">
          {industries.map((ind) => (
            <article
              key={ind.slug}
              id={ind.slug}
              className="grid scroll-mt-24 gap-8 rounded-3xl border border-slate-200 bg-white p-8 lg:grid-cols-12 lg:p-10"
            >
              <div className="lg:col-span-5">
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={ind.icon} className="size-6" />
                </span>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">{ind.name}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{ind.summary}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Common challenges</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {ind.challenges.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-brand-50/60 p-6">
                  <h3 className="text-sm font-semibold tracking-wide text-brand-700 uppercase">What we build</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    {ind.solutions.map((s) => (
                      <li key={s} className="flex gap-2.5">
                        <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CtaBand title="Don't see your industry? We'd still love to hear from you." />
    </>
  );
}
