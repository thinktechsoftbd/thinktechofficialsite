import type { Metadata } from "next";
import { BookOpen, HeartHandshake, Laptop, Rocket, Sprout, Users } from "lucide-react";
import { JobCard } from "@/components/cards";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { getJobOpenings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join ThinkTech. Explore open roles in engineering, design, data & AI and consulting, and help build software that matters.",
  alternates: { canonical: "/careers" },
};

const perks = [
  { icon: Rocket, title: "Meaningful work", text: "Ship products used by real customers across many industries." },
  { icon: Sprout, title: "Grow fast", text: "Mentorship, a learning budget and clear career paths." },
  { icon: Laptop, title: "Modern tooling", text: "Current stacks, good hardware and time to do things right." },
  { icon: HeartHandshake, title: "Balance", text: "Flexible hours and hybrid working where roles allow." },
  { icon: Users, title: "Great people", text: "Collaborative, low-ego teams that review and support each other." },
  { icon: BookOpen, title: "Share knowledge", text: "Tech talks, internal guilds and space to write and speak." },
];

export default async function CareersPage() {
  const jobs = await getJobOpenings();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career building great software"
        description="We're a team of engineers, designers and problem-solvers who care about craft. If that sounds like you, we'd love to meet."
        crumbs={[{ label: "Careers" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Life at ThinkTech" title="Why people join, and stay" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map(({ icon: PerkIcon, title, text }) => (
              <li key={title} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <PerkIcon className="size-6 text-brand-600" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="openings" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title={jobs.length ? `${jobs.length} open position${jobs.length === 1 ? "" : "s"}` : "No open roles right now"}
            description={
              <>
                Don&apos;t see the right role? Send your CV to{" "}
                <a href={`mailto:${site.contact.careersEmail}`} className="font-semibold text-brand-700 hover:underline">
                  {site.contact.careersEmail}
                </a>{" "}
                and we&apos;ll keep you in mind.
              </>
            }
          />
          <div className="mt-12 space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
