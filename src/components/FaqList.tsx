import { Plus } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {faqs.map((faq) => (
        <details key={faq.id} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-6 rounded py-5 text-left font-semibold text-slate-900">
            {faq.question}
            <Plus
              className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="-mt-1 pb-5 leading-relaxed text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
