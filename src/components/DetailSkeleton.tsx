import { Container } from "@/components/ui/Container";

// Fallback shown while a detail page streams in (only for URLs that were not
// prerendered at build time).
export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="bg-hero-glow">
        <Container className="animate-pulse py-20 lg:py-24">
          <div className="h-4 w-40 rounded bg-white/10" />
          <div className="mt-6 h-10 w-full max-w-2xl rounded bg-white/10" />
          <div className="mt-4 h-5 w-full max-w-xl rounded bg-white/10" />
        </Container>
      </div>
      <Container className="animate-pulse space-y-4 py-16">
        <div className="h-4 w-full max-w-3xl rounded bg-slate-100" />
        <div className="h-4 w-full max-w-2xl rounded bg-slate-100" />
        <div className="h-4 w-full max-w-3xl rounded bg-slate-100" />
      </Container>
    </div>
  );
}
