import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, web and mobile apps, data & AI, cloud & DevOps, ERP, UI/UX design and QA. End-to-end engineering services from ThinkTech.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to take software from idea to impact"
        description="Engage us for a single capability or a complete product team. Every service runs on the same delivery playbook: transparent, test-driven and outcome-focused."
        crumbs={[{ label: "Services" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="space-y-6">
            {services.map((s, i) => (
              <article
                key={s.slug}
                className="group grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-xl hover:shadow-slate-900/5 lg:grid-cols-12 lg:p-10"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon name={s.icon} className="size-6" />
                    </span>
                    <span className="text-sm font-semibold text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
                    <Link href={`/services/${s.slug}`} className="focus-ring rounded hover:text-brand-700">
                      {s.title}
                    </Link>
                  </h2>
                  <p className="mt-2 font-medium text-brand-700">{s.tagline}</p>
                  <p className="mt-4 leading-relaxed text-slate-600">{s.summary}</p>
                  <Link
                    href={`/services/${s.slug}`}
                    className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Explore {s.title.toLowerCase()}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
                <div className="lg:col-span-7 lg:border-l lg:border-slate-100 lg:pl-10">
                  <h3 className="text-sm font-semibold text-slate-900">Capabilities</h3>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm text-slate-600 sm:grid-cols-2">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.technologies.map((t) => (
                      <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Not sure which service you need?" />
    </>
  );
}
