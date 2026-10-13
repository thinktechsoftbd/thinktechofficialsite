import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-sm shadow-brand-600/30 hover:bg-brand-700",
  secondary: "bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50 hover:ring-slate-400",
  ghost: "text-brand-700 hover:text-brand-800 px-0!",
  light: "bg-white text-ink-900 hover:bg-brand-50",
  "outline-light": "text-white ring-1 ring-white/25 hover:bg-white/10 hover:ring-white/40",
};

export const buttonClasses = (variant: Variant = "primary", size: "md" | "lg" = "md") =>
  `focus-ring group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors ${
    size === "lg" ? "px-6 py-3 text-base" : "px-5 py-2.5 text-sm"
  } ${variants[variant]}`;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonClasses(variant, size)} ${className}`}>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
    </Link>
  );
}
