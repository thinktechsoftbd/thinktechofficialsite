import type { Metadata } from "next";
import { Suspense } from "react";
import { Code2, Eye, FileSignature, KeyRound, MessagesSquare, Users } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { SubscriptionModules } from "@/components/pricing/SubscriptionModules";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Plans live in src/config/pricing.ts. The subscription software section reads
// active modules from public.subscription_module (cached for hours).
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Website, mobile app, ERP and support packages from ThinkTech. Clear prices, a free consultation and a written estimate before any work starts.",
  alternates: { canonical: "/pricing" },
};

const included = [
  { icon: MessagesSquare, title: "Free consultation", text: "A written estimate before any work starts." },
  { icon: Eye, title: "Live demo every sprint", text: "See working software every two weeks." },
  { icon: Code2, title: "Engineering discipline", text: "Code review, automated tests and CI/CD." },
  { icon: Users, title: "Senior-led team", text: "Experienced engineers stay hands-on." },
  { icon: KeyRound, title: "You own everything", text: "Source code, designs and documentation." },
  { icon: FileSignature, title: "NDA on request", text: "Signed before you share any details." },
];

const pricingFaqs = [
  {
    id: 1,
    question: "Are these prices final?",
    answer:
      "The packages are a starting point. After a free consultation we send a written quote for your exact scope, and for fixed-scope work the price you approve is the price you pay.",
  },
  {
    id: 2,
    question: "How do payments work?",
    answer:
      "Project packages are paid in milestones as work is delivered. Support plans are billed monthly, or yearly at a discount.",
  },
  {
    id: 3,
    question: "What is not included in the price?",
    answer:
      "Hosting, domains, app store accounts and paid third-party services or licences are billed separately at cost. We list them clearly in your quote.",
  },
  {
    id: 4,
    question: "Can I upgrade or change my plan later?",
    answer:
      "Yes. Many clients start with a smaller package and add features or move to a support plan as the product grows.",
  },
  {
    id: 5,
    question: "Will you sign an NDA before we discuss my project?",
    answer: "Yes. We're happy to sign an NDA before you share any details.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PricingPlans />

      <Suspense>
        <SubscriptionModules />
      </Suspense>

      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading align="center" eyebrow="Every plan" title="Included with every plan" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(({ icon: ItemIcon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <ItemIcon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-start gap-6 rounded-3xl bg-ink-900 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Need something different?</h2>
              <p className="mt-2 max-w-xl text-slate-300">
                Tell us what you&apos;re building and we&apos;ll put together a custom package and quote.
              </p>
            </div>
            <ButtonLink href="/contact" variant="light" size="lg" arrow className="shrink-0">
              Get a custom quote
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <SectionHeading eyebrow="FAQ" title="Pricing questions" />
          <div className="lg:col-span-2">
            <FaqList faqs={pricingFaqs} />
          </div>
        </Container>
      </section>

      <CtaBand title="Not sure which plan fits? Let's talk it through." />
    </>
  );
}
