const tones = {
  slate: "bg-slate-100 text-slate-700",
  brand: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
  dark: "bg-white/10 text-slate-200 ring-1 ring-white/15",
};

export function Tag({ children, tone = "slate" }: { children: React.ReactNode; tone?: keyof typeof tones }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
