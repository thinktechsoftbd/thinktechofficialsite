import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard, PostCard, ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { HeroVisual } from "@/components/home/HeroVisual";
import { differentiators, engagementModels, processSteps, techStack } from "@/config/site";
import {
  getFaqs,
  getFeaturedCaseStudies,
  getIndustries,
  getPosts,
  getServiceLinks,
  getStats,
  getTestimonials,
} from "@/lib/data";

export default async function HomePage() {
  const [stats, services, caseStudies, industries, testimonials, posts, faqs] = await Promise.all([
    getStats(),
    getServiceLinks(),
    getFeaturedCaseStudies(3),
    getIndustries(),
    getTestimonials(),
    getPosts(3),
    getFaqs(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-glow relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="grid items-center gap-16 pt-16 pb-24 sm:pt-24 lg:grid-cols-2 lg:pt-28 lg:pb-32">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300 ring-1 ring-white/10">
              <span className="size-1.5 rounded-full bg-accent-400" aria-hidden="true" />
              Software engineering partner for growing businesses
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              Software engineered for <span className="text-gradient">what&apos;s next</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-slate-300 sm:text-xl">
              We design, build and scale custom software, web and mobile apps, ERP systems and practical AI, with a
              live demo every sprint so you always know where your project stands.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg" arrow>
                Book a free consultation
              </ButtonLink>
              <ButtonLink href="/work" variant="outline-light" size="lg">
                See our work
              </ButtonLink>
            </div>
          </div>
          <HeroVisual />
        </Container>

        {stats.length > 0 && (
          <div className="border-t border-white/10 bg-white/[0.02]">
            <Container>
              <dl className="grid grid-cols-2 divide-white/10 py-8 lg:grid-cols-4 lg:divide-x">
                {stats.map((s) => (
                  <div key={s.id} className="flex flex-col gap-1 px-4 py-3 text-center">
                    <dt className="text-sm text-slate-400">{s.label}</dt>
                    <dd className="order-first text-3xl font-bold tracking-tight text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </div>
        )}
      </section>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="What we do"
              title="End-to-end engineering under one roof"
              description="From the first workshop to long-term support, one accountable team covers strategy, design, engineering, quality and operations."
            />
            <ButtonLink href="/services" variant="secondary" arrow className="self-start lg:self-auto">
              All services
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why ThinkTech + process */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Why ThinkTech"
                title="A partner you can hold accountable"
                description="We earn trust through transparency and engineering rigor, not promises."
              />
              <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                {differentiators.map((d) => (
                  <div key={d.title}>
                    <dt>
                      <span className="flex size-10 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm ring-1 ring-slate-200">
                        <Icon name={d.icon} className="size-5" />
                      </span>
                      <span className="mt-4 block font-semibold text-slate-900">{d.title}</span>
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-slate-600">{d.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl bg-ink-900 p-8 sm:p-10">
              <h3 className="text-sm font-semibold tracking-wide text-accent-300 uppercase">How we deliver</h3>
              <ol className="mt-8 space-y-7">
                {processSteps.map((step, i) => (
                  <li key={step.title} className="relative flex gap-5">
                    {i < processSteps.length - 1 && (
                      <span className="absolute top-10 bottom-[-1.75rem] left-5 w-px bg-white/10" aria-hidden="true" />
                    )}
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured work */}
      {caseStudies.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Our work"
                title="Outcomes, not just output"
                description="A few of the ways we've helped organizations move faster, operate leaner and serve customers better."
              />
              <ButtonLink href="/work" variant="secondary" arrow className="self-start lg:self-auto">
                All case studies
              </ButtonLink>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} study={cs} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Industries */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <Container>
          <SectionHeading
            dark
            align="center"
            eyebrow="Industries"
            title="Domain knowledge that shortens every project"
            description="We bring proven patterns, integrations and compliance know-how from the sectors we serve."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className="focus-ring group flex h-full flex-col rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 transition-colors hover:bg-white/[0.06] hover:ring-white/20"
                >
                  <Icon name={ind.icon} className="size-7 text-accent-300" />
                  <h3 className="mt-4 font-semibold text-white">{ind.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{ind.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Engagement models */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Engagement models"
            title="Flexible ways to work together"
            description="Pick the model that matches your stage. We'll recommend one honestly, and you can switch as your needs change."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {engagementModels.map((m, i) => (
              <div
                key={m.title}
                className={`relative rounded-3xl p-8 ring-1 ${
                  i === 1 ? "bg-ink-900 text-white ring-ink-900" : "bg-white ring-slate-200"
                }`}
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-xl ${
                    i === 1 ? "bg-white/10 text-accent-300" : "bg-brand-50 text-brand-600"
                  }`}
                >
                  <Icon name={m.icon} className="size-6" />
                </span>
                <h3 className={`mt-6 text-xl font-semibold ${i === 1 ? "text-white" : "text-slate-900"}`}>
                  {m.title}
                </h3>
                <p className={`mt-1 text-sm font-medium ${i === 1 ? "text-accent-300" : "text-brand-600"}`}>
                  {m.fit}
                </p>
                <ul className={`mt-6 space-y-3 text-sm ${i === 1 ? "text-slate-300" : "text-slate-600"}`}>
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <ArrowRight
                        className={`mt-0.5 size-4 shrink-0 ${i === 1 ? "text-accent-300" : "text-brand-500"}`}
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech stack */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <SectionHeading
              eyebrow="Technology"
              title="The right tool for each job"
              description="We're technology-agnostic and choose proven, well-supported stacks your team can maintain."
            />
            <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-2">
              {Object.entries(techStack).map(([group, items]) => (
                <div key={group}>
                  <dt className="text-sm font-semibold text-slate-900">{group}</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {items.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-white px-3 py-1.5 text-sm text-slate-700 shadow-xs ring-1 ring-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading align="center" eyebrow="Client voices" title="What partnering with us feels like" />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.id} className="flex flex-col rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
                  <Quote className="size-8 text-brand-300" aria-hidden="true" />
                  {t.rating && (
                    <div className="mt-4 flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }, (_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                  )}
                  <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-slate-200 pt-4">
                    <p className="font-semibold text-slate-900">{t.author_name}</p>
                    <p className="text-sm text-slate-500">
                      {t.author_role}
                      {t.company ? `, ${t.company}` : ""}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Insights */}
      {posts.length > 0 && (
        <section className={`py-20 sm:py-28 ${testimonials.length > 0 ? "bg-slate-50" : ""}`}>
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Insights"
                title="Notes from the engineering floor"
                description="Practical guidance on building, scaling and modernizing software."
              />
              <ButtonLink href="/insights" variant="secondary" arrow className="self-start lg:self-auto">
                All insights
              </ButtonLink>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-3">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions we hear often"
              description={
                <>
                  Can&apos;t find your answer?{" "}
                  <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
                    Ask us directly
                  </Link>
                  .
                </>
              }
            />
            <div className="lg:col-span-2">
              <FaqList faqs={faqs} />
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
