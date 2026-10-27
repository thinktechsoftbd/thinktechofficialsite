"use client";

import { useFormStatus } from "react-dom";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { HONEYPOT_FIELD, type FormState } from "@/lib/validation";

type BaseProps = {
  name: string;
  label: string;
  state: FormState;
  required?: boolean;
  hint?: string;
  className?: string;
};

function errorFor(state: FormState, name: string) {
  return state.errors?.[name]?.[0];
}

function Describe({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error)
    return (
      <p id={id} className="mt-1.5 text-sm text-red-600">
        {error}
      </p>
    );
  if (hint)
    return (
      <p id={id} className="mt-1.5 text-xs text-slate-500">
        {hint}
      </p>
    );
  return null;
}

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {label}
      {required ? (
        <span className="text-red-600" aria-hidden="true">
          {" "}
          *
        </span>
      ) : (
        <span className="font-normal text-slate-400"> (optional)</span>
      )}
    </label>
  );
}

export function TextField({
  name,
  label,
  state,
  required,
  hint,
  className = "",
  type = "text",
  autoComplete,
  placeholder,
  defaultValue = "",
}: BaseProps & { type?: string; autoComplete?: string; placeholder?: string; defaultValue?: string }) {
  const id = `f-${name}`;
  const error = errorFor(state, name);
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={state.values?.[name] ?? defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-desc` : undefined}
        className="field"
      />
      <Describe id={`${id}-desc`} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({
  name,
  label,
  state,
  required,
  hint,
  className = "",
  rows = 5,
  placeholder,
}: BaseProps & { rows?: number; placeholder?: string }) {
  const id = `f-${name}`;
  const error = errorFor(state, name);
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        defaultValue={state.values?.[name] ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-desc` : undefined}
        className="field resize-y"
      />
      <Describe id={`${id}-desc`} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  state,
  required,
  hint,
  className = "",
  options,
  defaultValue = "",
}: BaseProps & { options: string[]; defaultValue?: string }) {
  const id = `f-${name}`;
  const error = errorFor(state, name);
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={state.values?.[name] ?? defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${id}-desc` : undefined}
        className="field"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Describe id={`${id}-desc`} error={error} hint={hint} />
    </div>
  );
}

/**
 * Off-screen field that only bots fill in. The name and label are deliberately
 * meaningless: a field called "website" was being filled by browser autofill and
 * password managers, which made real messages look like spam. The data-* flags
 * ask 1Password, LastPass, Bitwarden and Dashlane to leave it alone.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
        />
      </label>
    </div>
  );
}

export function SubmitButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonClasses("primary", "lg")} disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {pending ? "Sending…" : children}
    </button>
  );
}

export function FormAlert({ state }: { state: FormState }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <div role="alert" className="flex gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
      <CircleAlert className="size-5 shrink-0" aria-hidden="true" />
      {state.message}
    </div>
  );
}

export function FormSuccess({ title, message }: { title: string; message?: string }) {
  return (
    <div role="status" className="rounded-2xl bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
      <CircleCheck className="mx-auto size-12 text-emerald-600" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      {message && <p className="mt-2 text-slate-700">{message}</p>}
    </div>
  );
}
