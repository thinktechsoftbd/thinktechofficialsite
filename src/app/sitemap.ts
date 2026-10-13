import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getCaseStudies, getJobOpenings, getPosts, getServiceLinks } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, studies, posts, jobs] = await Promise.all([
    getServiceLinks(),
    getCaseStudies(),
    getPosts(),
    getJobOpenings(),
  ]);

  const url = (path: string) => `${site.url}${path}`;

  const staticPages = ["", "/services", "/industries", "/work", "/insights", "/about", "/careers", "/contact", "/privacy"];

  return [
    ...staticPages.map((p) => ({ url: url(p), priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), priority: 0.9 })),
    ...studies.map((s) => ({ url: url(`/work/${s.slug}`), priority: 0.7 })),
    ...posts.map((p) => ({ url: url(`/insights/${p.slug}`), lastModified: p.published_at, priority: 0.6 })),
    ...jobs.map((j) => ({ url: url(`/careers/${j.slug}`), lastModified: j.posted_at, priority: 0.5 })),
  ];
}
