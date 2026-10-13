import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ThinkTech collects, uses and protects the personal information you share with us.",
  alternates: { canonical: "/privacy" },
};

// Template policy. Have it reviewed by legal counsel for your jurisdiction before launch.
const sections = [
  {
    title: "Information we collect",
    body: "When you contact us, subscribe to our newsletter or apply for a job, we collect the details you provide, such as your name, email address, phone number, company and message, or for applications your CV link and professional profiles.",
  },
  {
    title: "How we use it",
    body: "We use this information only to respond to your inquiry, send the newsletter you asked for, or assess your job application. We do not sell your personal information.",
  },
  {
    title: "How long we keep it",
    body: "Inquiries are kept for as long as needed to manage our relationship with you. Job applications are kept for up to 12 months unless you ask us to delete them sooner. You can unsubscribe from the newsletter at any time.",
  },
  {
    title: "Security",
    body: "Your information is stored in access-controlled systems and is only available to the ThinkTech staff who need it to respond to you.",
  },
  {
    title: "Your rights",
    body: `You can ask to access, correct or delete the personal information we hold about you by emailing ${site.contact.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" crumbs={[{ label: "Privacy policy" }]} />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
