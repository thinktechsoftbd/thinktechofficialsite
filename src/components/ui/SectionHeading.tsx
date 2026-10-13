export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-sm font-semibold tracking-wide uppercase ${dark ? "text-accent-300" : "text-brand-600"}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg text-pretty ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      )}
    </div>
  );
}
