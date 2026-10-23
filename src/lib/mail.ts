import "server-only";
import { createTransport } from "nodemailer";
import type { z } from "zod";
import { site } from "@/config/site";
import type { inquirySchema } from "./validation";

type Inquiry = z.output<typeof inquirySchema>;

// SMTP settings come from the environment (see .env.example). Without them the
// site still saves every inquiry to the database; it just doesn't send email.
function smtpTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 465);
  return createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 15_000,
  });
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Visitor input goes into the subject line, so keep it to a single line.
const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

/** Emails a new project inquiry to the office. Never throws: failures are logged. */
export async function sendInquiryNotification(inquiry: Inquiry) {
  const transport = smtpTransport();
  if (!transport) {
    console.warn("SMTP is not configured; inquiry saved without an email notification.");
    return;
  }

  const fields: [string, string | null][] = [
    ["Name", inquiry.full_name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Company", inquiry.company],
    ["Service", inquiry.service_interest],
    ["Budget", inquiry.budget_range],
    ["Sent from", inquiry.source_page ? `${site.url}${inquiry.source_page}` : null],
  ];
  const filled = fields.filter((f): f is [string, string] => Boolean(f[1]));

  const text = [
    "New project inquiry from the website.",
    "",
    ...filled.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    inquiry.message,
    "",
    "Reply to this email to answer the sender directly.",
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a">
  <p style="font-size:16px;margin:0 0 16px"><strong>New project inquiry from the website</strong></p>
  <table cellpadding="6" style="border-collapse:collapse">
    ${filled
      .map(
        ([label, value]) =>
          `<tr><td style="color:#64748b;vertical-align:top">${label}</td><td>${escapeHtml(value)}</td></tr>`,
      )
      .join("\n    ")}
  </table>
  <p style="margin:20px 0 6px;color:#64748b">Message</p>
  <div style="white-space:pre-wrap;padding:12px;background:#f1f5f9;border-radius:6px">${escapeHtml(inquiry.message)}</div>
  <p style="margin-top:20px;color:#64748b;font-size:12px">Reply to this email to answer the sender directly.</p>
</div>`;

  const company = inquiry.company ? ` (${oneLine(inquiry.company)})` : "";

  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM || `${site.name} Website <${process.env.SMTP_USER}>`,
      to: process.env.INQUIRY_NOTIFY_TO || site.contact.email,
      replyTo: { name: oneLine(inquiry.full_name), address: inquiry.email },
      subject: `New inquiry: ${oneLine(inquiry.full_name)}${company}`,
      text,
      html,
    });
  } catch (err) {
    console.error("Inquiry email failed", err);
  }
}
