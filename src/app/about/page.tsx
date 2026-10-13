import type { Metadata } from "next";
import { Compass, Lightbulb, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentiators, processSteps, values } from "@/config/site";
import { getStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ThinkTech is a software engineering company helping businesses design, build and scale digital products with transparency and engineering rigor.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    icon: Compass,
    title: "Our mission",
    text: "To help ambitious organizations turn ideas into dependable software, and to make working with a technology partner clear, predictable and rewarding.",
  },
  {
    icon: Lightbulb,
    title: "Our vision",
    text: "To be the engineering partner growing businesses trust first, known for the outcomes we deliver and the long-term relationships we build.",
  },
  {
    icon: ShieldCheck,
    title: "Our promise",
    text: "Honest advice, working software every sprint and full ownership of everything we build for you.",
  },
];

export default async function AboutPage() {
  const stats = await getStats();

  return (
    <>
      <PageHero
        eyebrow="About ThinkTech"
        title="We think deeply, so your technology works simply"
        description="ThinkTech is a software engineering company. We partner with startups, SMEs and enterprises to design, build and modernize the systems their businesses run on."
        crumbs={[{ label: "About" }]}
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Our story" title="Built on the belief that software should be a growth engine" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                Too many businesses have been burned by technology projects that ran late, went over budget or
                delivered something nobody used. ThinkTech was founded to do it differently.
              </p>
              <p>
                We combine product thinking, modern engineering practices and genuine transparency. You see progress
                every sprint, understand every trade-off and own everything we build. Our teams work across custom
                software, web and mobile, cloud, data & AI and ERP, so we can solve the whole problem and not just one
                piece of it.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/contact" arrow>
                Work with us
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div key={s.id} className="flex flex-col gap-1 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
                <span className="order-last text-sm text-slate-600">{s.label}</span>
                <span className="text-4xl font-bold tracking-tight text-brand-600">{s.value}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-950 py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map(({ icon: PillarIcon, title, text }) => (
              <div key={title} className="rounded-3xl bg-white/[0.03] p-8 ring-1 ring-white/10">
                <PillarIcon className="size-8 text-accent-300" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="Our values" title="What guides every decision we make" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="rounded-3xl border border-slate-200 p-8">
                <span className="text-sm font-bold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How we work" title="A delivery model built on transparency" />
            <ol className="mt-10 space-y-6">
              {processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <dl className="grid content-start gap-6 sm:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.title} className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <dt>
                  <Icon name={d.icon} className="size-6 text-brand-600" />
                  <span className="mt-4 block font-semibold text-slate-900">{d.title}</span>
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-slate-600">{d.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand title="Let's build something great together" />
    </>
  );
}
