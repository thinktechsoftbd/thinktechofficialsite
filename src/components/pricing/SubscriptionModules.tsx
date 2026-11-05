import { Layers } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSubscriptionModules } from "@/lib/data";

// Active modules from the shared database. Left out when there are none.
export async function SubscriptionModules() {
  const modules = await getSubscriptionModules();
  if (!modules.length) return null;

  return (
    <section id="subscription-software" className="scroll-mt-20 border-t border-slate-200 bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Subscription software"
          title="Ready-made software, by subscription"
          description="Products we build, host and maintain. Subscribe monthly or yearly and start using them right away."
        />
        {/* Flex rather than grid so one or two modules sit centred under the heading. */}
        <ul className="mt-12 flex flex-wrap justify-center gap-6">
          {modules.map((module) => (
            <li
              key={module.objectId}
              className="flex w-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Layers className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{module.moduleName}</h3>
              {module.remarks && <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{module.remarks}</p>}
              <div className="mt-6">
                <ButtonLink href="/contact" variant="ghost" arrow>
                  Ask about {module.moduleName}
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
