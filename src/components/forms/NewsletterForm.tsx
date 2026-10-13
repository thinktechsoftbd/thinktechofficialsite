"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeNewsletter } from "@/app/actions";
import { initialFormState } from "@/lib/validation";
import { Honeypot } from "./fields";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring shrink-0 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400 disabled:opacity-70"
    >
      {pending ? "Subscribing…" : "Subscribe"}
    </button>
  );
}

export function NewsletterForm({ sourcePage = "/" }: { sourcePage?: string }) {
  const [state, action] = useActionState(subscribeNewsletter, initialFormState);

  if (state.status === "success") {
    return (
      <p role="status" className="text-sm font-medium text-accent-300">
        {state.message ?? "Thanks for subscribing!"}
      </p>
    );
  }

  return (
    <form action={action} className="relative" noValidate>
      <Honeypot />
      <input type="hidden" name="source_page" value={sourcePage} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          defaultValue={state.values?.email ?? ""}
          aria-invalid={state.status === "error" ? true : undefined}
          aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
        />
        <Submit />
      </div>
      {state.status === "error" && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-red-300">
          {state.message}
        </p>
      )}
    </form>
  );
}
