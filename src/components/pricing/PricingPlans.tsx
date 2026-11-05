"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { Check, Gift, KeyRound, MessagesSquare, Minus, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import {
  pricingCategories,
  YEARLY_DISCOUNT,
  type CompareValue,
  type Plan,
  type PricingCategory,
} from "@/config/pricing";
import type { PricingModule } from "@/lib/modules";

const money = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const trust = [
  { icon: ShieldCheck, text: "Fixed price for fixed scope" },
  { icon: MessagesSquare, text: "Free consultation & estimate" },
  { icon: KeyRound, text: "You own the source code" },
];

type Pricing = { price: number | null; oldPrice?: number; suffix: string; billedNote: string };

// Works out what a card shows for the selected billing period.
function pricingFor(plan: Plan, category: PricingCategory, yearly: boolean): Pricing {
  if (plan.price === null) {
    return { price: null, suffix: "", billedNote: plan.timeline ?? "Quoted after a free consultation" };
  }
  if (category.billing === "one-time") {
    return {
      price: plan.price,
      oldPrice: plan.oldPrice,
      suffix: "one-time",
      billedNote: ["One-time payment", plan.timeline].filter(Boolean).join(" · "),
    };
  }
  if (!yearly) return { price: plan.price, oldPrice: plan.oldPrice, suffix: "/mo", billedNote: "Billed monthly" };
  const monthly = Math.round(plan.price * (1 - YEARLY_DISCOUNT));
  return {
    price: monthly,
    oldPrice: plan.price,
    suffix: "/mo",
    billedNote: `$${money.format(monthly * 12)} billed every 12 months`,
  };
}

const percentOff = (price: number, oldPrice: number) => Math.round((1 - price / oldPrice) * 100);

// Priced plans open their checkout page; custom-quote plans go to the contact form.
const planHref = (plan: Plan, category: PricingCategory) =>
  plan.price === null ? "/contact" : `/checkout/${category.id}/${plan.id}`;

// What the tab bar has selected: a plan category ("cat:websites") or a
// subscription module from the database ("mod:<object id>").
type Selection = `cat:${string}` | `mod:${string}`;

const subscriptionPerks = [
  "Built, hosted and maintained by ThinkTech",
  "Pay monthly or yearly",
  "Start using it right away",
];

// `modules` are the active subscription products (subscription_module). They
// appear as pills in the hero and as tabs next to the plan categories.
export function PricingPlans({ modules = [] }: { modules?: PricingModule[] }) {
  const [selected, setSelected] = useState<Selection>(`cat:${pricingCategories[0].id}`);
  const [yearly, setYearly] = useState(true);
  const activeModule = modules.find((m) => `mod:${m.id}` === selected);
  const category = pricingCategories.find((c) => `cat:${c.id}` === selected) ?? pricingCategories[0];

  // Hero pills pick the module tab and bring the plans section into view.
  const showModule = (id: string) => {
    setSelected(`mod:${id}`);
    document.getElementById("pricing-plans")?.scrollIntoView({ behavior: "smooth" });
  };

  const tabClass =
    "focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-slate-600 transition-colors hover:text-slate-900 aria-pressed:bg-ink-900 aria-pressed:text-white";

  return (
    <>
      {/* Hero with the subscription product pills */}
      <section className="bg-hero-glow relative isolate overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-brand-600/30 to-transparent"
          aria-hidden="true"
        />
        <Container className="py-16 text-center sm:py-20 lg:py-24">
          <p className="text-sm font-semibold text-accent-300">Plans & pricing</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Simple pricing for software that grows with you
          </h1>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-300">
            {trust.map(({ icon: TrustIcon, text }) => (
              <li key={text} className="inline-flex items-center gap-2">
                <TrustIcon className="size-4 text-accent-300" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          {modules.length > 0 && (
            <ul aria-label="Ready-made software" className="mt-10 flex flex-wrap justify-center gap-3">
              {modules.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    aria-controls="pricing-plans"
                    onClick={() => showModule(m.id)}
                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-white/15 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <Icon name={m.icon} className="size-4 text-accent-300" />
                    {m.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Plans, with the category and product tabs on top */}
      <section id="pricing-plans" className="scroll-mt-20 bg-slate-100 py-16 sm:py-20">
        <Container>
          <div
            role="group"
            aria-label="Plans and products"
            className="-mx-4 mb-10 flex items-center gap-1 overflow-x-auto bg-white p-1.5 shadow-sm ring-1 ring-slate-200 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:rounded-3xl"
          >
            {pricingCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={selected === `cat:${c.id}`}
                onClick={() => setSelected(`cat:${c.id}`)}
                className={tabClass}
              >
                <Icon name={c.icon} className="size-4" />
                {c.label}
              </button>
            ))}
            {modules.length > 0 && <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" aria-hidden="true" />}
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={selected === `mod:${m.id}`}
                onClick={() => setSelected(`mod:${m.id}`)}
                className={tabClass}
              >
                <Icon name={m.icon} className="size-4" />
                {m.name}
              </button>
            ))}
          </div>

          {activeModule ? (
            <ModulePanel module={activeModule} />
          ) : (
            <>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{category.title}</h2>
                  <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-600">
                    <span className="font-medium text-slate-900">All plans include:</span>
                    {category.includes.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5">
                        <Check className="size-4 text-emerald-600" aria-hidden="true" />
                        {item}
                      </span>
                    ))}
                  </p>
                </div>

                {category.billing === "monthly" && (
                  <div
                    role="group"
                    aria-label="Billing period"
                    className="inline-flex self-start rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200 lg:self-auto"
                  >
                    {[
                      { label: "Monthly", value: false },
                      { label: "Yearly", value: true },
                    ].map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        aria-pressed={yearly === option.value}
                        onClick={() => setYearly(option.value)}
                        className="focus-ring inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-slate-700 transition-colors aria-pressed:bg-ink-900 aria-pressed:text-white"
                      >
                        {option.label}
                        {option.value && (
                          <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                            Save {Math.round(YEARLY_DISCOUNT * 100)}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
                {category.plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    pricing={pricingFor(plan, category, yearly)}
                    href={planHref(plan, category)}
                  />
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-slate-500">{category.note}</p>
            </>
          )}
        </Container>
      </section>

      {/* Comparison table (plan categories only; products have no plan data) */}
      {!activeModule && (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Compare our plans</h2>
            <p className="mt-3 text-lg text-slate-600">See at a glance what each plan includes: {category.title}.</p>
            <CompareTable category={category} yearly={yearly} />
          </Container>
        </section>
      )}
    </>
  );
}

function ModulePanel({ module }: { module: PricingModule }) {
  return (
    <article className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:grid-cols-5 lg:p-10">
      <div className="lg:col-span-3">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon name={module.icon} className="size-7" />
        </span>
        <p className="mt-6 text-sm font-semibold tracking-wide text-brand-600 uppercase">Subscription software</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{module.name}</h2>
        {module.description && (
          <p className="mt-5 leading-relaxed whitespace-pre-line text-slate-600">{module.description}</p>
        )}
      </div>

      <div className="flex flex-col rounded-2xl bg-ink-900 p-8 text-white lg:col-span-2">
        <h3 className="text-lg font-semibold">Subscription</h3>
        <ul className="mt-5 space-y-3 text-sm text-slate-300">
          {subscriptionPerks.map((perk) => (
            <li key={perk} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-accent-300" aria-hidden="true" />
              {perk}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-400">Subscription prices are shared on request.</p>
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link
            href="/contact"
            className="focus-ring inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400"
          >
            Get pricing for {module.name}
          </Link>
          <a
            href={`#${module.anchor}`}
            className="focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-200 ring-1 ring-white/20 transition-colors hover:bg-white/10"
          >
            See all subscription software
          </a>
        </div>
      </div>
    </article>
  );
}

function PlanCard({ plan, pricing, href }: { plan: Plan; pricing: Pricing; href: string }) {
  const featured = Boolean(plan.featured);
  const discount = pricing.price !== null && pricing.oldPrice ? percentOff(pricing.price, pricing.oldPrice) : 0;
  const badge = [featured ? "Most popular" : null, discount > 0 ? `${discount}% off` : null].filter(Boolean).join(" • ");

  return (
    <article
      className={`relative flex flex-col rounded-3xl p-8 ${
        featured
          ? "bg-gradient-to-b from-brand-900 via-ink-900 to-ink-900 text-white shadow-2xl ring-2 shadow-brand-900/30 ring-brand-500 lg:-mt-4"
          : "bg-white shadow-sm ring-1 ring-slate-200"
      }`}
    >
      <div className="flex min-h-7 justify-end">
        {badge && <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">{badge}</span>}
      </div>

      <h3 className={`mt-2 text-2xl font-bold ${featured ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
      <p className={`mt-2 min-h-12 text-sm leading-relaxed ${featured ? "text-slate-300" : "text-slate-600"}`}>
        {plan.description}
      </p>

      <div className="mt-6 min-h-24">
        {pricing.oldPrice && pricing.price !== null && (
          <p className="text-sm text-slate-400 line-through">
            ${money.format(pricing.oldPrice)}
          </p>
        )}
        {pricing.price === null ? (
          <p className={`mt-5 text-4xl font-bold tracking-tight ${featured ? "text-white" : "text-slate-900"}`}>
            Custom quote
          </p>
        ) : (
          <p className="flex items-start gap-1">
            <span className={`mt-2 text-xl font-semibold ${featured ? "text-white" : "text-slate-900"}`}>$</span>
            <span className={`text-5xl font-bold tracking-tight ${featured ? "text-white" : "text-slate-900"}`}>
              {money.format(pricing.price)}
            </span>
            <span className={`self-end pb-1.5 text-sm font-medium ${featured ? "text-slate-300" : "text-slate-500"}`}>
              {pricing.suffix}
            </span>
          </p>
        )}
      </div>

      <Link
        href={href}
        className={`focus-ring mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors ${
          featured
            ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-400"
            : "text-brand-700 ring-2 ring-brand-600 hover:bg-brand-50"
        }`}
      >
        {pricing.price === null ? "Request a quote" : "Choose plan"}
      </Link>
      <p className={`mt-3 text-center text-xs ${featured ? "text-slate-400" : "text-slate-500"}`}>{pricing.billedNote}</p>

      {plan.bonus && (
        <div
          className={`mt-6 flex items-center justify-between gap-4 rounded-2xl p-4 text-sm ${
            featured ? "bg-white/5 text-slate-200 ring-1 ring-white/10" : "bg-slate-100 text-slate-700"
          }`}
        >
          <span>
            <strong className={featured ? "text-white" : "text-slate-900"}>Bonus:</strong> {plan.bonus}
          </span>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
            <Gift className="size-5" aria-hidden="true" />
          </span>
        </div>
      )}

      <ul className="mt-6 space-y-3 text-sm">
        {plan.features.map((f) => {
          const included = f.included !== false;
          return (
            <li key={f.text} className="flex gap-3">
              {included ? (
                <Check
                  className={`mt-0.5 size-4 shrink-0 ${featured ? "text-accent-300" : "text-emerald-600"}`}
                  aria-hidden="true"
                />
              ) : (
                <Minus className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden="true" />
              )}
              <span
                className={
                  !included
                    ? "text-slate-400"
                    : f.highlight
                      ? `font-semibold ${featured ? "text-accent-300" : "text-brand-700"}`
                      : featured
                        ? "text-slate-200"
                        : "text-slate-700"
                }
              >
                {!included && <span className="sr-only">Not included: </span>}
                {f.text}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function CompareCell({ value }: { value: CompareValue }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto size-5 text-emerald-600" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="mx-auto size-5 text-slate-300" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-slate-700">{value}</span>;
}

function CompareTable({ category, yearly }: { category: PricingCategory; yearly: boolean }) {
  const plans = category.plans;

  return (
    <div className="mt-10 overflow-x-auto rounded-3xl ring-1 ring-slate-200">
      <table className="w-full min-w-[44rem] border-collapse text-sm">
        <caption className="sr-only">Comparison of {category.title.toLowerCase()}</caption>
        <thead>
          <tr className="bg-slate-50">
            <th scope="col" className="sticky left-0 w-1/3 bg-slate-50 p-5 text-left font-semibold text-slate-500">
              Features
            </th>
            {plans.map((plan) => {
              const pricing = pricingFor(plan, category, yearly);
              return (
                <th
                  key={plan.name}
                  scope="col"
                  className={`p-5 text-center align-top ${plan.featured ? "bg-brand-50" : ""}`}
                >
                  <span className="block text-base font-bold text-slate-900">{plan.name}</span>
                  <span className="mt-1 block text-sm font-normal text-slate-600">
                    {pricing.price === null ? "Custom quote" : `$${money.format(pricing.price)} ${pricing.suffix}`}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {category.compare.map((group) => (
            <Fragment key={group.group}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={plans.length + 1}
                  className="border-t border-slate-200 bg-white px-5 pt-6 pb-2 text-left text-xs font-bold tracking-wide text-brand-700 uppercase"
                >
                  {group.group}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-t border-slate-100">
                  <th scope="row" className="sticky left-0 bg-white px-5 py-3.5 text-left font-normal text-slate-700">
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={plans[i]?.name ?? i}
                      className={`px-5 py-3.5 text-center ${plans[i]?.featured ? "bg-brand-50/50" : ""}`}
                    >
                      <CompareCell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-slate-200">
            <td className="sticky left-0 bg-white p-5" />
            {plans.map((plan) => (
              <td key={plan.id} className={`p-5 text-center ${plan.featured ? "bg-brand-50/50" : ""}`}>
                <Link
                  href={planHref(plan, category)}
                  className={`focus-ring inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : "text-brand-700 ring-2 ring-brand-600 hover:bg-brand-50"
                  }`}
                >
                  {plan.price === null ? "Request a quote" : `Choose ${plan.name}`}
                </Link>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
