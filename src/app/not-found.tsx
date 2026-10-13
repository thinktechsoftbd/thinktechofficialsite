import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-hero-glow relative isolate overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="py-32 text-center">
        <p className="text-gradient text-7xl font-bold tracking-tight">404</p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-300">
          The page may have moved, or the link may be out of date.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
