import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcon, type SocialNetwork } from "@/components/ui/SocialIcon";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site } from "@/config/site";
import { getIndustries, getServiceLinks } from "@/lib/data";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export async function Footer() {
  const [services, industries] = await Promise.all([getServiceLinks(), getIndustries()]);

  const columns = [
    { title: "Services", links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
    {
      title: "Industries",
      links: industries.slice(0, 6).map((i) => ({ label: i.name, href: `/industries#${i.slug}` })),
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Our work", href: "/work" },
        { label: "Insights", href: "/insights" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-ink-950 text-slate-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{site.description}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <span>{site.contact.address.join(", ")}</span>
              </li>
            </ul>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {(Object.entries(site.social) as [SocialNetwork, string][]).map(([network, href]) => (
                <li key={network}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ThinkTech on ${network === "x" ? "X" : network[0].toUpperCase() + network.slice(1)}`}
                    className="focus-ring flex size-9 items-center justify-center rounded-full bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <SocialIcon network={network} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-semibold text-white">{col.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-slate-400 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 md:grid-cols-2 md:items-center md:p-8">
          <div>
            <h2 className="text-lg font-semibold text-white">Engineering insights, once a month</h2>
            <p className="mt-1 text-sm text-slate-400">
              Practical notes on software delivery, cloud and AI. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
