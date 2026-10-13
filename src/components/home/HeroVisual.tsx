import { CircleCheck, GitBranch, Rocket } from "lucide-react";

// Decorative "delivery dashboard" illustrating how ThinkTech works:
// sprint demos, automated checks and continuous releases.
export function HeroVisual() {
  const checks = [
    { label: "Unit & integration tests", value: "1,284 passed" },
    { label: "Security scan", value: "0 critical" },
    { label: "Lighthouse performance", value: "98 / 100" },
  ];
  const sprint = [
    { label: "Customer portal", pct: 100 },
    { label: "Payments integration", pct: 82 },
    { label: "Analytics dashboard", pct: 64 },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg select-none lg:mx-0">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-brand-600/30 to-accent-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/10 bg-ink-900/80 p-5 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-400/20">
            Sprint 14 · demo ready
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {sprint.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">{s.label}</span>
                <span className="text-slate-400">{s.pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
          <p className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <GitBranch className="size-3.5 text-accent-300" /> main · pipeline #2481
          </p>
          <ul className="mt-3 space-y-2">
            {checks.map((c) => (
              <li key={c.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-400">
                  <CircleCheck className="size-3.5 text-emerald-400" />
                  {c.label}
                </span>
                <span className="font-medium text-slate-200">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-xl border border-white/10 bg-ink-800/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-10">
        <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500">
          <Rocket className="size-4 text-white" />
        </span>
        <div>
          <p className="text-xs text-slate-400">Deployed to production</p>
          <p className="text-sm font-semibold text-white">v2.14.0 · zero downtime</p>
        </div>
      </div>
    </div>
  );
}
