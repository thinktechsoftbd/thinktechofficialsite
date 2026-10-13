"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/app/actions";
import { budgetRanges } from "@/config/site";
import { initialFormState } from "@/lib/validation";
import { FormAlert, FormSuccess, Honeypot, SelectField, SubmitButton, TextArea, TextField } from "./fields";

export function ContactForm({
  services,
  defaultService = "",
  sourcePage,
}: {
  services: string[];
  defaultService?: string;
  sourcePage: string;
}) {
  const [state, action] = useActionState(submitInquiry, initialFormState);

  if (state.status === "success") {
    return <FormSuccess title="Message sent" message={state.message} />;
  }

  return (
    <form action={action} className="relative space-y-5" noValidate>
      <Honeypot />
      <input type="hidden" name="source_page" value={sourcePage} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="full_name" label="Full name" autoComplete="name" required state={state} />
        <TextField name="email" label="Work email" type="email" autoComplete="email" required state={state} />
        <TextField name="company" label="Company" autoComplete="organization" state={state} />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" state={state} />
        <SelectField
          name="service_interest"
          label="What can we help with?"
          options={[...services, "Something else"]}
          defaultValue={defaultService}
          state={state}
        />
        <SelectField name="budget_range" label="Estimated budget" options={budgetRanges} state={state} />
      </div>
      <TextArea
        name="message"
        label="Tell us about your project"
        required
        rows={5}
        placeholder="Goals, timeline, current systems. Anything that helps us understand what you need."
        state={state}
      />
      <FormAlert state={state} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          We&apos;ll only use your details to respond to this inquiry. Happy to sign an NDA first.
        </p>
        <SubmitButton className="shrink-0">Send message</SubmitButton>
      </div>
    </form>
  );
}
