import { z } from "zod";

const URL_PATTERN = /^https?:\/\/\S+\.\S+/i;

// Optional fields arrive as "" (or are missing); store them as NULL.
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .default("")
    .transform((v) => v || null);

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || URL_PATTERN.test(v), "Please enter a full URL starting with https://")
  .default("")
  .transform((v) => v || null);

const name = z.string().trim().min(2, "Please enter your name.").max(120);
const email = z.string().trim().max(254).pipe(z.email("Please enter a valid email address."));
const sourcePage = z
  .string()
  .max(300)
  .default("")
  .transform((v) => (v.startsWith("/") ? v : null));

export const inquirySchema = z.object({
  full_name: name,
  email,
  phone: optionalText(40),
  company: optionalText(160),
  country: optionalText(80),
  service_interest: optionalText(120),
  budget_range: optionalText(40),
  message: z.string().trim().min(20, "Please tell us a little more (at least 20 characters).").max(5000),
  source_page: sourcePage,
});

export const newsletterSchema = z.object({
  email,
  source_page: sourcePage,
});

export const applicationSchema = z.object({
  job_slug: z.string().trim().min(1).max(200),
  full_name: name,
  email,
  phone: optionalText(40),
  linkedin_url: optionalUrl,
  portfolio_url: optionalUrl,
  resume_url: z
    .string()
    .trim()
    .max(500)
    .refine((v) => URL_PATTERN.test(v), "Please share a link to your CV (Google Drive, Dropbox, etc.)."),
  cover_letter: optionalText(5000),
});

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

/** Plain string values from FormData, without React's internal $ACTION_ fields. */
export function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$ACTION") && typeof value === "string") values[key] = value;
  }
  return values;
}
