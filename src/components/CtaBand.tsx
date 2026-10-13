import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function CtaBand({
  title = "Have a project in mind? Let's talk it through.",
  description = "Book a free 30-minute consultation. You'll speak with a senior engineer, not a salesperson, and leave with practical next steps.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 px-6 py-14 text-center shadow-2xl shadow-brand-900/20 sm:px-16">
          <div
            className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-white/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-16 -z-10 size-80 rounded-full bg-ink-950/20 blur-2xl"
            aria-hidden="true"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-brand-50">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="light" size="lg" arrow>
              Book a free consultation
            </ButtonLink>
            <ButtonLink href="/work" variant="outline-light" size="lg">
              See our work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
