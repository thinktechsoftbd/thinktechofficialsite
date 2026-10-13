import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { getServiceLinks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to ThinkTech about your software project. Book a free consultation and get a reply from a senior engineer within one business day.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  { title: "We reply within one business day", text: "A senior engineer reviews your message, not a bot." },
  { title: "30-minute discovery call", text: "We explore your goals and constraints, and sign an NDA first if you like." },
  { title: "Proposal within a week", text: "A clear scope, timeline, team plan and estimate." },
];

export default async function ContactPage() {
  const services = await getServiceLinks();

  const details = [
    { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Phone, label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Office", value: site.contact.address.join(", ") },
    { icon: Clock, label: "Hours", value: site.contact.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building"
        description="Tell us about your idea, challenge or existing system. We'll come back with practical next steps, with no obligation."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 shadow-slate-900/5 ring-slate-200 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Send us a message</h2>
            <p className="mt-2 mb-8 text-slate-600">Fields marked * are required.</p>
            <ContactForm services={services.map((s) => s.title)} sourcePage="/contact" />
          </div>

          <aside className="space-y-8 lg:col-span-5">
            <div className="rounded-3xl bg-ink-900 p-8">
              <h2 className="text-lg font-semibold text-white">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <dl className="space-y-5 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
              {details.map(({ icon: DetailIcon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 ring-1 ring-slate-200">
                    <DetailIcon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-sm text-slate-500">{label}</dt>
                    <dd className="font-medium text-slate-900">
                      {href ? (
                        <a href={href} className="hover:text-brand-700">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>
    </>
  );
}
