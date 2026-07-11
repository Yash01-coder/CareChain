import { ChevronDown } from "lucide-react";

export default function FAQItem({ item }) {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
        <span className="text-lg font-bold text-slate-950">
          {item.question}
        </span>

        <ChevronDown
          size={22}
          className="shrink-0 text-slate-400 transition group-open:rotate-180"
        />
      </summary>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        {item.answer}
      </p>
    </details>
  );
}