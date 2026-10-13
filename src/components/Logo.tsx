import Link from "next/link";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="tt-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5b5ff5" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#tt-grad)" />
      <path d="M8 10.5h16M16 10.5V23" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="22.5" cy="21.5" r="2.25" fill="#fff" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-md" aria-label="ThinkTech home">
      <LogoMark />
      <span className={`text-xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
        Think<span className={dark ? "text-accent-300" : "text-brand-600"}>Tech</span>
      </span>
    </Link>
  );
}
