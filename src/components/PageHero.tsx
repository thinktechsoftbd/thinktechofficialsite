import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-hero-glow relative isolate overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="py-16 sm:py-20 lg:py-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-slate-200">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="animate-fade-up max-w-3xl">
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 text-lg text-pretty text-slate-300 sm:text-xl">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
