"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { ArrowLeft, Check, CircleCheck, LoaderCircle, Lock, Tag } from "lucide-react";
import { submitInquiry } from "@/app/actions";
import { FormAlert, Honeypot, TextField } from "@/components/forms/fields";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { findPlan, YEARLY_DISCOUNT } from "@/config/pricing";
import { formatUsd } from "@/lib/format";
import { initialFormState } from "@/lib/validation";

// Static checkout in the style of a hosting cart. Prices come from
// src/config/pricing.ts. Nothing is charged here: "Place order request" sends
// the order through the contact-form action, so it is saved as an inquiry and
// emailed to the office, which then sends a payment link or invoice.

const paymentMethods = [
  { id: "bkash", label: "bKash", note: "Pay from your bKash account" },
  { id: "nagad", label: "Nagad", note: "Pay from your Nagad account" },
  { id: "card", label: "Credit / debit card", note: "Visa, Mastercard, Amex" },
  { id: "bank", label: "Bank transfer", note: "We send our bank details" },
] as const;

const nextSteps = [
  "We review your order and confirm the scope with you, usually within one business day.",
  "You receive a secure payment link or invoice for the payment method you chose.",
  "We schedule a kickoff call and start work.",
];

export function Checkout({ categoryId, planId }: { categoryId: string; planId: string }) {
  const found = findPlan(categoryId, planId)!;
  const { category, plan } = found;
  const basePrice = plan.price ?? 0;
  const monthly = category.billing === "monthly";

  const [term, setTerm] = useState(monthly ? "12" : "full");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [payment, setPayment] = useState<(typeof paymentMethods)[number]["id"]>("bkash");
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [notes, setNotes] = useState("");
  const [state, action, pending] = useActionState(submitInquiry, initialFormState);

  // Submitted by hand rather than through <form action>: React resets a form
  // after an action, which would untick the add-ons and reset the selects
  // on screen while the cart state still had them.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  // Plan price for the chosen term.
  const months = monthly ? Number(term) : 1;
  const perMonth = monthly && term === "12" ? Math.round(basePrice * (1 - YEARLY_DISCOUNT)) : basePrice;
  const planTotal = monthly ? perMonth * months : basePrice;
  const planRegular = monthly ? basePrice * months : (plan.oldPrice ?? basePrice);
  const planSaving = planRegular - planTotal;
  const savePercent = planRegular > planTotal ? Math.round((planSaving / planRegular) * 100) : 0;

  const addons = category.addons.filter((a) => selectedAddons.includes(a.id));
  const total = planTotal + addons.reduce((sum, a) => sum + a.price, 0);
  const milestone = Math.ceil(total / 3);

  const termLabel = monthly
    ? term === "12"
      ? "12-month period"
      : "1-month period"
    : term === "full"
      ? "One-time payment"
      : "3 milestone payments";
  const paymentLabel = paymentMethods.find((m) => m.id === payment)!.label;

  const message = [
    "ORDER REQUEST (from the checkout page)",
    `Plan: ${plan.name} (${category.title})`,
    `Billing: ${termLabel}`,
    `Add-ons: ${addons.length ? addons.map((a) => `${a.name} (${formatUsd(a.price)})`).join(", ") : "none"}`,
    `Payment method: ${paymentLabel}`,
    coupon.trim() ? `Coupon code: ${coupon.trim()}` : null,
    `Total: ${formatUsd(total)}`,
    notes.trim() ? `\nNotes from the customer:\n${notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const toggleAddon = (id: string) =>
    setSelectedAddons((current) => (current.includes(id) ? current.filter((a) => a !== id) : [...current, id]));

  if (state.status === "success") {
    return (
      <section className="bg-slate-100 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
            <CircleCheck className="mx-auto size-14 text-emerald-600" aria-hidden="true" />
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Order request received</h1>
            {state.message && <p className="mt-3 text-slate-600">{state.message}</p>}
            <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <strong>{plan.name} plan</strong> · {termLabel} · {paymentLabel} ·{" "}
              <strong>{formatUsd(total)}</strong>
            </p>
            <ol className="mt-8 space-y-4 text-left">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="focus-ring inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-brand-700 ring-2 ring-brand-600 hover:bg-brand-50"
              >
                Back to pricing
              </Link>
              <Link
                href="/"
                className="focus-ring inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
              >
                Go to homepage
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-slate-100 py-10 sm:py-14">
      <Container>
        <Link
          href="/pricing"
          className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-medium text-slate-600 hover:text-brand-700"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to pricing
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Your cart</h1>

        <form onSubmit={onSubmit} noValidate className="relative mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <Honeypot />
          <input type="hidden" name="source_page" value={`/checkout/${category.id}/${plan.id}`} />
          <input type="hidden" name="service_interest" value={`${category.label}: ${plan.name}`} />
          <input type="hidden" name="budget_range" value={`${formatUsd(total)} (${monthly ? termLabel : "one-time"})`} />
          <input type="hidden" name="message" value={message} />

          <div className="space-y-6">
            {/* Plan */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Icon name={category.icon} className="size-6" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{plan.name} plan</h2>
                  <p className="text-sm text-slate-500">{category.title}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="sm:w-64">
                  <label htmlFor="checkout-term" className="field-label">
                    {monthly ? "Period" : "Payment plan"}
                  </label>
                  <select id="checkout-term" value={term} onChange={(e) => setTerm(e.target.value)} className="field">
                    {monthly ? (
                      <>
                        <option value="12">12 months (save {Math.round(YEARLY_DISCOUNT * 100)}%)</option>
                        <option value="1">1 month</option>
                      </>
                    ) : (
                      <>
                        <option value="full">Pay in full</option>
                        <option value="milestones">3 milestone payments</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="flex items-center gap-3 sm:justify-end">
                  {savePercent > 0 && (
                    <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                      Save {savePercent}%
                    </span>
                  )}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">
                      {formatUsd(monthly ? perMonth : planTotal)}
                      <span className="text-base font-medium text-slate-500">{monthly ? "/mo" : ""}</span>
                    </p>
                    {savePercent > 0 && (
                      <p className="text-sm text-slate-400 line-through">
                        {formatUsd(monthly ? basePrice : planRegular)}
                        {monthly ? "/mo" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {monthly
                  ? term === "12"
                    ? `${formatUsd(planTotal)} billed every 12 months.`
                    : "Billed monthly."
                  : term === "full"
                    ? `One-time payment. ${plan.timeline ?? ""}`
                    : `Paid in 3 parts: at kickoff, at the midpoint and on delivery. ${plan.timeline ?? ""}`}
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-ink-900 via-ink-900 to-brand-700 px-5 py-4 text-sm text-white">
                <Tag className="size-4 shrink-0 text-accent-300" aria-hidden="true" />
                Free consultation call included: we confirm the scope with you before you pay anything.
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-6 text-sm text-slate-700">
                {[plan.bonus, ...plan.features.filter((f) => f.included !== false).slice(0, 3).map((f) => f.text)]
                  .filter((item): item is string => Boolean(item))
                  .map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-600">
                        <Check className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Add-ons */}
            {category.addons.length > 0 && (
              <fieldset className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                <legend className="sr-only">Add extras</legend>
                <h2 className="text-lg font-semibold text-slate-900">Add extras</h2>
                <p className="mt-1 text-sm text-slate-500">Optional services you can add to this order.</p>
                <div className="mt-5 space-y-3">
                  {category.addons.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex cursor-pointer items-start gap-4 rounded-2xl p-4 ring-1 transition-colors ${
                          checked ? "bg-brand-50 ring-brand-500" : "ring-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-1 size-4 accent-brand-600"
                        />
                        <span className="flex-1">
                          <span className="block font-medium text-slate-900">{addon.name}</span>
                          <span className="mt-0.5 block text-sm text-slate-500">{addon.description}</span>
                        </span>
                        <span className="font-semibold whitespace-nowrap text-slate-900">+{formatUsd(addon.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* Customer details */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900">Your details</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <TextField name="full_name" label="Full name" autoComplete="name" required state={state} />
                <TextField name="email" label="Email" type="email" autoComplete="email" required state={state} />
                <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" state={state} />
                <TextField name="company" label="Company" autoComplete="organization" state={state} />
                <TextField
                  name="country"
                  label="Country"
                  autoComplete="country-name"
                  defaultValue="Bangladesh"
                  state={state}
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-notes" className="field-label">
                    Order notes <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="checkout-notes"
                    rows={3}
                    maxLength={3000}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything we should know: deadline, existing website, references…"
                    className="field resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <fieldset className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <legend className="sr-only">Payment method</legend>
              <h2 className="text-lg font-semibold text-slate-900">Payment method</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl p-4 ring-1 transition-colors ${
                      payment === method.id ? "bg-brand-50 ring-2 ring-brand-500" : "ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="size-4 accent-brand-600"
                    />
                    <span>
                      <span className="block font-medium text-slate-900">{method.label}</span>
                      <span className="block text-xs text-slate-500">{method.note}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-5 flex gap-2.5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <Lock className="mt-0.5 size-4 shrink-0 text-slate-500" aria-hidden="true" />
                You won&apos;t be charged now. After we confirm your order, we send a secure payment link or invoice
                for the method you choose.
              </p>
            </fieldset>
          </div>

          {/* Order summary */}
          <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt>
                  <span className="block font-medium text-slate-900">{plan.name} plan</span>
                  <span className="text-slate-500">{termLabel}</span>
                </dt>
                <dd className="text-right">
                  {planSaving > 0 && (
                    <span className="block text-slate-400 line-through">{formatUsd(planRegular)}</span>
                  )}
                  <span className="font-medium text-slate-900">{formatUsd(planTotal)}</span>
                </dd>
              </div>
              {addons.map((addon) => (
                <div key={addon.id} className="flex justify-between gap-4">
                  <dt className="text-slate-700">{addon.name}</dt>
                  <dd className="font-medium text-slate-900">{formatUsd(addon.price)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 text-slate-500">
                <dt>Taxes</dt>
                <dd>Added on invoice</dd>
              </div>
              <div className="flex items-end justify-between gap-4 border-t border-slate-200 pt-4">
                <dt className="text-base font-semibold text-slate-900">Total</dt>
                <dd className="text-right">
                  {planSaving > 0 && (
                    <span className="block text-sm text-slate-400 line-through">
                      {formatUsd(total + planSaving)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-slate-900">{formatUsd(total)}</span>
                </dd>
              </div>
            </dl>
            {!monthly && term === "milestones" && (
              <p className="mt-2 text-right text-xs text-slate-500">Paid as 3 × about {formatUsd(milestone)}</p>
            )}

            <div className="mt-5">
              {couponOpen ? (
                <div>
                  <label htmlFor="checkout-coupon" className="field-label">
                    Coupon code
                  </label>
                  <input
                    id="checkout-coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    maxLength={40}
                    className="field"
                    placeholder="Enter your code"
                  />
                  <p className="mt-1.5 text-xs text-slate-500">We apply valid codes when we confirm your order.</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCouponOpen(true)}
                  className="focus-ring rounded text-sm font-semibold text-brand-700 hover:underline"
                >
                  Have a coupon code?
                </button>
              )}
            </div>

            {planSaving > 0 && (
              <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                You&apos;re saving {formatUsd(planSaving)} on this order
              </p>
            )}

            {state.status === "error" && (
              <div className="mt-5">
                <FormAlert state={state} />
              </div>
            )}
            <button
              type="submit"
              disabled={pending}
              className={`${buttonClasses("primary", "lg")} mt-5 w-full disabled:cursor-wait disabled:opacity-70`}
            >
              {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
              {pending ? "Sending…" : "Place order request"}
            </button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
              <Lock className="size-3.5" aria-hidden="true" /> No payment is taken on this page
            </p>
          </aside>
        </form>
      </Container>
    </section>
  );
}
