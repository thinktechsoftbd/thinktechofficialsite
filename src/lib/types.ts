export type Service = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  icon: string;
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
};

export type ServiceLink = Pick<Service, "slug" | "title" | "summary" | "icon">;

export type Industry = {
  id: number;
  slug: string;
  name: string;
  summary: string;
  challenges: string[];
  solutions: string[];
  icon: string;
};

export type Outcome = { metric: string; label: string };

export type CaseStudySummary = {
  slug: string;
  title: string;
  client_label: string;
  headline_metric: string;
  headline_label: string;
  summary: string;
  technologies: string[];
  industry_slug: string | null;
  industry_name: string | null;
  service_slug: string | null;
  service_title: string | null;
};

export type CaseStudy = CaseStudySummary & {
  challenge: string;
  solution: string;
  outcomes: Outcome[];
  duration: string | null;
  team_size: string | null;
  published_at: string;
};

export type Testimonial = {
  id: number;
  quote: string;
  author_name: string;
  author_role: string;
  company: string | null;
  rating: number | null;
};

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author_name: string;
  reading_minutes: number;
  published_at: string;
};

export type Post = PostSummary & { body: string; updated_at: string };

export type JobOpeningSummary = {
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience: string;
  summary: string;
  posted_at: string;
};

export type JobOpening = JobOpeningSummary & {
  id: number;
  responsibilities: string[];
  requirements: string[];
  nice_to_have: string[];
};

export type Stat = { id: number; value: string; label: string };

export type Faq = { id: number; question: string; answer: string };
