import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { PostGrid } from "@/components/FilterTabs";
import { PageHero } from "@/components/PageHero";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical articles on software delivery, AI, cloud, ERP and mobile development from the ThinkTech engineering team.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Ideas and lessons from building software"
        description="Hands-on guidance from our engineers, designers and consultants. No buzzwords, just what works."
        crumbs={[{ label: "Insights" }]}
      />
      <section className="py-20 sm:py-24">
        <Container>
          {posts.length > 0 ? <PostGrid posts={posts} /> : <p className="text-slate-600">Articles are coming soon.</p>}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
