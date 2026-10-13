import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { query } from "./db";
import type {
  CaseStudy,
  CaseStudySummary,
  Faq,
  Industry,
  JobOpening,
  JobOpeningSummary,
  Post,
  PostSummary,
  Service,
  ServiceLink,
  Stat,
  Testimonial,
} from "./types";

// Content is cached for hours and can be refreshed on demand through
// POST /api/revalidate (see src/app/api/revalidate/route.ts).
export const CONTENT_TAGS = [
  "services",
  "industries",
  "case-studies",
  "testimonials",
  "posts",
  "jobs",
  "stats",
  "faqs",
] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];

function cached(tag: ContentTag) {
  cacheLife("hours");
  cacheTag(tag);
}

// ---------------------------------------------------------------- services

export async function getServiceLinks(): Promise<ServiceLink[]> {
  "use cache";
  cached("services");
  return query<ServiceLink>(
    `SELECT slug, title, summary, icon FROM website.services
     WHERE is_published ORDER BY sort_order, title`,
  );
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cached("services");
  return query<Service>(
    `SELECT id, slug, title, tagline, summary, description, icon, capabilities, deliverables, technologies
     FROM website.services WHERE is_published ORDER BY sort_order, title`,
  );
}

export async function getService(slug: string): Promise<Service | null> {
  "use cache";
  cached("services");
  const rows = await query<Service>(
    `SELECT id, slug, title, tagline, summary, description, icon, capabilities, deliverables, technologies
     FROM website.services WHERE slug = $1 AND is_published`,
    [slug],
  );
  return rows[0] ?? null;
}

// -------------------------------------------------------------- industries

export async function getIndustries(): Promise<Industry[]> {
  "use cache";
  cached("industries");
  return query<Industry>(
    `SELECT id, slug, name, summary, challenges, solutions, icon
     FROM website.industries WHERE is_published ORDER BY sort_order, name`,
  );
}

// ------------------------------------------------------------ case studies

const CASE_STUDY_SUMMARY_COLUMNS = `
  cs.slug, cs.title, cs.client_label, cs.headline_metric, cs.headline_label, cs.summary, cs.technologies,
  i.slug AS industry_slug, i.name AS industry_name, s.slug AS service_slug, s.title AS service_title`;

const CASE_STUDY_JOINS = `
  FROM website.case_studies cs
  LEFT JOIN website.industries i ON i.id = cs.industry_id
  LEFT JOIN website.services s ON s.id = cs.service_id`;

export async function getCaseStudies(): Promise<CaseStudySummary[]> {
  "use cache";
  cached("case-studies");
  return query<CaseStudySummary>(
    `SELECT ${CASE_STUDY_SUMMARY_COLUMNS} ${CASE_STUDY_JOINS}
     WHERE cs.is_published ORDER BY cs.is_featured DESC, cs.published_at DESC`,
  );
}

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudySummary[]> {
  "use cache";
  cached("case-studies");
  return query<CaseStudySummary>(
    `SELECT ${CASE_STUDY_SUMMARY_COLUMNS} ${CASE_STUDY_JOINS}
     WHERE cs.is_published ORDER BY cs.is_featured DESC, cs.published_at DESC LIMIT $1`,
    [limit],
  );
}

export async function getCaseStudiesForService(serviceSlug: string, limit = 3): Promise<CaseStudySummary[]> {
  "use cache";
  cached("case-studies");
  return query<CaseStudySummary>(
    `SELECT ${CASE_STUDY_SUMMARY_COLUMNS} ${CASE_STUDY_JOINS}
     WHERE cs.is_published AND s.slug = $1 ORDER BY cs.published_at DESC LIMIT $2`,
    [serviceSlug, limit],
  );
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  "use cache";
  cached("case-studies");
  const rows = await query<CaseStudy>(
    `SELECT ${CASE_STUDY_SUMMARY_COLUMNS}, cs.challenge, cs.solution, cs.outcomes, cs.duration, cs.team_size,
            to_char(cs.published_at, 'YYYY-MM-DD') AS published_at
     ${CASE_STUDY_JOINS}
     WHERE cs.slug = $1 AND cs.is_published`,
    [slug],
  );
  return rows[0] ?? null;
}

// ------------------------------------------------------------ testimonials

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cached("testimonials");
  return query<Testimonial>(
    `SELECT id, quote, author_name, author_role, company, rating
     FROM website.testimonials WHERE is_published ORDER BY sort_order, id`,
  );
}

// ------------------------------------------------------------------- posts

const POST_SUMMARY_COLUMNS = `slug, title, excerpt, category, author_name, reading_minutes,
  to_char(published_at, 'YYYY-MM-DD') AS published_at`;

export async function getPosts(limit?: number): Promise<PostSummary[]> {
  "use cache";
  cached("posts");
  return query<PostSummary>(
    `SELECT ${POST_SUMMARY_COLUMNS} FROM website.posts
     WHERE is_published AND published_at <= current_date
     ORDER BY published_at DESC, id DESC LIMIT $1`,
    [limit ?? null],
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cached("posts");
  const rows = await query<Post>(
    `SELECT ${POST_SUMMARY_COLUMNS}, body, to_char(updated_at, 'YYYY-MM-DD') AS updated_at
     FROM website.posts WHERE slug = $1 AND is_published`,
    [slug],
  );
  return rows[0] ?? null;
}

export async function getRelatedPosts(slug: string, category: string, limit = 2): Promise<PostSummary[]> {
  "use cache";
  cached("posts");
  return query<PostSummary>(
    `SELECT ${POST_SUMMARY_COLUMNS} FROM website.posts
     WHERE is_published AND slug <> $1 AND published_at <= current_date
     ORDER BY (category = $2) DESC, published_at DESC LIMIT $3`,
    [slug, category, limit],
  );
}

// -------------------------------------------------------------------- jobs

const JOB_SUMMARY_COLUMNS = `slug, title, department, location, employment_type, experience, summary,
  to_char(posted_at, 'YYYY-MM-DD') AS posted_at`;

export async function getJobOpenings(): Promise<JobOpeningSummary[]> {
  "use cache";
  cached("jobs");
  return query<JobOpeningSummary>(
    `SELECT ${JOB_SUMMARY_COLUMNS} FROM website.job_openings
     WHERE is_open ORDER BY posted_at DESC, title`,
  );
}

export async function getJobOpening(slug: string): Promise<JobOpening | null> {
  "use cache";
  cached("jobs");
  const rows = await query<JobOpening>(
    `SELECT id, ${JOB_SUMMARY_COLUMNS}, responsibilities, requirements, nice_to_have
     FROM website.job_openings WHERE slug = $1 AND is_open`,
    [slug],
  );
  return rows[0] ?? null;
}

// ------------------------------------------------------------ stats & faqs

export async function getStats(): Promise<Stat[]> {
  "use cache";
  cached("stats");
  return query<Stat>(`SELECT id, value, label FROM website.stats ORDER BY sort_order, id`);
}

export async function getFaqs(): Promise<Faq[]> {
  "use cache";
  cached("faqs");
  return query<Faq>(`SELECT id, question, answer FROM website.faqs WHERE is_published ORDER BY sort_order, id`);
}
