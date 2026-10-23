"use server";

import { after } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/mail";
import { site } from "@/config/site";
import {
  applicationSchema,
  formValues,
  inquirySchema,
  newsletterSchema,
  type FormState,
} from "@/lib/validation";

// Hidden field that humans never fill in. Bots that do get a fake success.
const HONEYPOT = "website";

const failure = (message: string, values?: Record<string, string>, errors?: FormState["errors"]): FormState => ({
  status: "error",
  message,
  values,
  errors,
});

const serverError = (values: Record<string, string>) =>
  failure(`Sorry, something went wrong on our side. Please try again or email us at ${site.contact.email}.`, values);

export async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  if (values[HONEYPOT]) return { status: "success" };

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    return failure("Please check the highlighted fields.", values, z.flattenError(parsed.error).fieldErrors);
  }

  const d = parsed.data;
  try {
    await query(
      `INSERT INTO website.inquiries
         (full_name, email, phone, company, country, service_interest, budget_range, message, source_page)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [d.full_name, d.email, d.phone, d.company, d.country, d.service_interest, d.budget_range, d.message, d.source_page],
    );
  } catch (err) {
    console.error("submitInquiry failed", err);
    return serverError(values);
  }

  // The inquiry is already saved; email the office after the response so a slow
  // or failing mail server never delays or breaks the form.
  after(() => sendInquiryNotification(d));

  return {
    status: "success",
    message: `Thanks, ${d.full_name.split(" ")[0]}! We've received your message and will reply within one business day.`,
  };
}

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  if (values[HONEYPOT]) return { status: "success" };

  const parsed = newsletterSchema.safeParse(values);
  if (!parsed.success) {
    return failure("Please enter a valid email address.", values, z.flattenError(parsed.error).fieldErrors);
  }

  try {
    await query(
      `INSERT INTO website.newsletter_subscribers (email, source_page) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [parsed.data.email, parsed.data.source_page],
    );
  } catch (err) {
    console.error("subscribeNewsletter failed", err);
    return serverError(values);
  }

  return { status: "success", message: "You're subscribed. Look out for our next issue." };
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  if (values[HONEYPOT]) return { status: "success" };

  const parsed = applicationSchema.safeParse(values);
  if (!parsed.success) {
    return failure("Please check the highlighted fields.", values, z.flattenError(parsed.error).fieldErrors);
  }

  const d = parsed.data;
  try {
    const inserted = await query<{ id: number }>(
      `INSERT INTO website.job_applications
         (job_opening_id, full_name, email, phone, linkedin_url, portfolio_url, resume_url, cover_letter)
       SELECT id, $2, $3, $4, $5, $6, $7, $8 FROM website.job_openings WHERE slug = $1 AND is_open
       RETURNING id`,
      [d.job_slug, d.full_name, d.email, d.phone, d.linkedin_url, d.portfolio_url, d.resume_url, d.cover_letter],
    );
    if (!inserted.length) return failure("Sorry, this position is no longer accepting applications.", values);
  } catch (err) {
    console.error("submitApplication failed", err);
    return serverError(values);
  }

  return {
    status: "success",
    message: "Application received! Our talent team reviews every application and will be in touch within a week.",
  };
}
