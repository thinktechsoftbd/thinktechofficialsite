import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { CaseStudyGrid } from "@/components/FilterTabs";
import { PageHero } from "@/components/PageHero";
import { getCaseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work & Case Studies",
  description:
    "Case studies showing how ThinkTech helps businesses ship better software faster, with measurable results across industries.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Results our clients can measure"
        description="Every engagement starts with a business goal. Here's how our teams turned goals into outcomes."
        crumbs={[{ label: "Work" }]}
      />
      <section className="py-20 sm:py-24">
        <Container>
          {studies.length > 0 ? (
            <CaseStudyGrid studies={studies} />
          ) : (
            <p className="text-slate-600">Case studies are coming soon.</p>
          )}
        </Container>
      </section>
      <CtaBand title="Want results like these?" />
    </>
  );
}
