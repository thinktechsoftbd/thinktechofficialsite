import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Clock } from "lucide-react";
import { PostCard } from "@/components/cards";
import { CtaBand } from "@/components/CtaBand";
import { DetailSkeleton } from "@/components/DetailSkeleton";
import { PageHero } from "@/components/PageHero";
import { RichText, headingsOf } from "@/components/RichText";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { formatDate } from "@/lib/format";
import { getPost, getPosts, getRelatedPosts } from "@/lib/data";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
      authors: [post.author_name],
    },
  };
}

export default function PostPage({ params }: PageProps<"/insights/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <PostDetail params={params} />
    </Suspense>
  );
}

async function PostDetail({ params }: Pick<PageProps<"/insights/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.category);
  const toc = headingsOf(post.body);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author_name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/insights/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: post.category }]}
      >
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
          <span className="font-medium text-slate-200">{post.author_name}</span>
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" /> {post.reading_minutes} min read
          </span>
        </p>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <p className="mb-8 text-xl leading-relaxed text-pretty text-slate-600">{post.excerpt}</p>
            <RichText body={post.body} />
          </article>
          {toc.length > 1 && (
            <aside className="hidden lg:col-span-4 lg:block">
              <nav aria-label="On this page" className="sticky top-24 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h2 className="text-sm font-semibold text-slate-900">On this page</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-slate-600 hover:text-brand-700">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-16">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
