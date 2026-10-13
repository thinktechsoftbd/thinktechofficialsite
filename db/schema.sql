-- ThinkTech official website schema.
-- Lives in its own `website` schema so it can share the `thinktecherp`
-- database with ERP modules without table-name collisions.
-- Idempotent: safe to run repeatedly.

CREATE SCHEMA IF NOT EXISTS website;

SET search_path TO website;

-- Shared trigger to keep updated_at current.
CREATE OR REPLACE FUNCTION website.touch_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- Content tables (read by the public site)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS services (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              text NOT NULL UNIQUE,
  title             text NOT NULL,
  tagline           text NOT NULL,
  summary           text NOT NULL,
  description       text NOT NULL,
  icon              text NOT NULL DEFAULT 'code',
  capabilities      text[] NOT NULL DEFAULT '{}',
  deliverables      text[] NOT NULL DEFAULT '{}',
  technologies      text[] NOT NULL DEFAULT '{}',
  sort_order        integer NOT NULL DEFAULT 0,
  is_published      boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS industries (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              text NOT NULL UNIQUE,
  name              text NOT NULL,
  summary           text NOT NULL,
  challenges        text[] NOT NULL DEFAULT '{}',
  solutions         text[] NOT NULL DEFAULT '{}',
  icon              text NOT NULL DEFAULT 'building',
  sort_order        integer NOT NULL DEFAULT 0,
  is_published      boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_studies (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              text NOT NULL UNIQUE,
  title             text NOT NULL,
  client_label      text NOT NULL,          -- e.g. "Regional retail chain" when under NDA
  industry_id       integer REFERENCES industries(id) ON DELETE SET NULL,
  service_id        integer REFERENCES services(id) ON DELETE SET NULL,
  headline_metric   text NOT NULL,          -- e.g. "62%"
  headline_label    text NOT NULL,          -- e.g. "faster order processing"
  summary           text NOT NULL,
  challenge         text NOT NULL,
  solution          text NOT NULL,
  outcomes          jsonb NOT NULL DEFAULT '[]'::jsonb,  -- [{ "metric": "3x", "label": "..." }]
  technologies      text[] NOT NULL DEFAULT '{}',
  duration          text,
  team_size         text,
  is_featured       boolean NOT NULL DEFAULT false,
  is_published      boolean NOT NULL DEFAULT true,
  published_at      date NOT NULL DEFAULT current_date,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS case_studies_industry_idx ON case_studies(industry_id);
CREATE INDEX IF NOT EXISTS case_studies_service_idx ON case_studies(service_id);

CREATE TABLE IF NOT EXISTS testimonials (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote             text NOT NULL,
  author_name       text NOT NULL,
  author_role       text NOT NULL,
  company           text,
  rating            smallint CHECK (rating BETWEEN 1 AND 5),
  sort_order        integer NOT NULL DEFAULT 0,
  is_published      boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              text NOT NULL UNIQUE,
  title             text NOT NULL,
  excerpt           text NOT NULL,
  body              text NOT NULL,          -- lightweight markdown: ##, ###, -, paragraphs
  category          text NOT NULL,
  author_name       text NOT NULL DEFAULT 'ThinkTech Team',
  reading_minutes   smallint NOT NULL DEFAULT 5,
  is_published      boolean NOT NULL DEFAULT true,
  published_at      date NOT NULL DEFAULT current_date,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts(published_at DESC) WHERE is_published;

CREATE TABLE IF NOT EXISTS job_openings (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              text NOT NULL UNIQUE,
  title             text NOT NULL,
  department        text NOT NULL,
  location          text NOT NULL,
  employment_type   text NOT NULL DEFAULT 'Full-time',
  experience        text NOT NULL,
  summary           text NOT NULL,
  responsibilities  text[] NOT NULL DEFAULT '{}',
  requirements      text[] NOT NULL DEFAULT '{}',
  nice_to_have      text[] NOT NULL DEFAULT '{}',
  is_open           boolean NOT NULL DEFAULT true,
  posted_at         date NOT NULL DEFAULT current_date,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stats (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  value             text NOT NULL,          -- e.g. "120+"
  label             text NOT NULL,
  sort_order        integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  question          text NOT NULL,
  answer            text NOT NULL,
  sort_order        integer NOT NULL DEFAULT 0,
  is_published      boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------------------
-- Lead / submission tables (written by the public site, read by the ERP)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS inquiries (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name         text NOT NULL,
  email             text NOT NULL,
  phone             text,
  company           text,
  country           text,
  service_interest  text,
  budget_range      text,
  message           text NOT NULL,
  source_page       text,
  status            text NOT NULL DEFAULT 'new'
                    CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status, created_at DESC);

CREATE TABLE IF NOT EXISTS job_applications (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  job_opening_id    integer NOT NULL REFERENCES job_openings(id) ON DELETE CASCADE,
  full_name         text NOT NULL,
  email             text NOT NULL,
  phone             text,
  linkedin_url      text,
  portfolio_url     text,
  resume_url        text,
  cover_letter      text,
  status            text NOT NULL DEFAULT 'received'
                    CHECK (status IN ('received', 'screening', 'interview', 'offer', 'hired', 'rejected')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS job_applications_job_idx ON job_applications(job_opening_id, created_at DESC);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id                integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email             text NOT NULL,
  source_page       text,
  unsubscribed_at   timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_key ON newsletter_subscribers (lower(email));

-- updated_at triggers
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['services', 'industries', 'case_studies', 'testimonials', 'posts',
                           'job_openings', 'inquiries', 'job_applications']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %1$s_touch ON website.%1$s', t);
    EXECUTE format('CREATE TRIGGER %1$s_touch BEFORE UPDATE ON website.%1$s
                    FOR EACH ROW EXECUTE FUNCTION website.touch_updated_at()', t);
  END LOOP;
END $$;
