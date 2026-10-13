"use client";

import { useActionState } from "react";
import { submitApplication } from "@/app/actions";
import { initialFormState } from "@/lib/validation";
import { FormAlert, FormSuccess, Honeypot, SubmitButton, TextArea, TextField } from "./fields";

export function ApplicationForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [state, action] = useActionState(submitApplication, initialFormState);

  if (state.status === "success") {
    return <FormSuccess title="Thanks for applying" message={state.message} />;
  }

  return (
    <form action={action} className="relative space-y-5" noValidate aria-label={`Apply for ${jobTitle}`}>
      <Honeypot />
      <input type="hidden" name="job_slug" value={jobSlug} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="full_name" label="Full name" autoComplete="name" required state={state} />
        <TextField name="email" label="Email" type="email" autoComplete="email" required state={state} />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" state={state} />
        <TextField
          name="linkedin_url"
          label="LinkedIn profile"
          type="url"
          placeholder="https://linkedin.com/in/…"
          state={state}
        />
        <TextField
          name="resume_url"
          label="Link to your CV"
          type="url"
          required
          placeholder="https://…"
          hint="Share a Google Drive, Dropbox or OneDrive link with view access."
          state={state}
        />
        <TextField
          name="portfolio_url"
          label="Portfolio / GitHub"
          type="url"
          placeholder="https://github.com/…"
          state={state}
        />
      </div>
      <TextArea
        name="cover_letter"
        label="Why ThinkTech?"
        rows={5}
        placeholder="Tell us what excites you about this role and a project you're proud of."
        state={state}
      />
      <FormAlert state={state} />
      <SubmitButton className="w-full sm:w-auto">Submit application</SubmitButton>
    </form>
  );
}
