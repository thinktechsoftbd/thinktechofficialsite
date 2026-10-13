"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { companyNav } from "@/config/site";
import type { ServiceLink } from "@/lib/types";

type MenuId = "services" | "company" | null;

const simpleLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
];

const topLinkClass =
  "focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 data-[active=true]:text-brand-700";

// usePathname suspends while prerendering dynamic routes, so it lives in a
// small component behind its own Suspense boundary.
function ActiveLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} className={topLinkClass} data-active={active} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <Link href={href} className={topLinkClass}>
          {children}
        </Link>
      }
    >
      <ActiveLink href={href}>{children}</ActiveLink>
    </Suspense>
  );
}

export function NavBar({ services }: { services: ServiceLink[] }) {
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  // Hover already opens a menu, so a mouse click must not toggle it shut again.
  // Keyboard activation (detail === 0) toggles.
  const onMenuClick = (id: Exclude<MenuId, null>) => (e: React.MouseEvent) =>
    setOpenMenu((current) => (e.detail === 0 && current === id ? null : id));

  return (
    <header className="sticky top-0 z-50">
      {/* The blur lives on its own layer: backdrop-filter on <header> itself would
          become the containing block for the fixed mobile panel and collapse it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-slate-200/70 bg-white/85 backdrop-blur-lg"
      />
      <nav
        ref={navRef}
        aria-label="Main"
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
            <button
              type="button"
              className={topLinkClass}
              aria-expanded={openMenu === "services"}
              aria-controls="menu-services"
              onClick={onMenuClick("services")}
              onMouseEnter={() => setOpenMenu("services")}
            >
              Services
              <ChevronDown
                className={`size-4 transition-transform ${openMenu === "services" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              id="menu-services"
              hidden={openMenu !== "services"}
              className="absolute top-full left-1/2 w-[min(46rem,90vw)] -translate-x-1/2 pt-3"
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                <ul className="grid grid-cols-2 gap-1 p-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        onClick={closeAll}
                        className="focus-ring group flex gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Icon name={s.icon} className="size-5" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">{s.title}</span>
                          <span className="mt-0.5 line-clamp-2 block text-xs text-slate-500">{s.summary}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between bg-slate-50 px-6 py-3 text-sm">
                  <span className="text-slate-600">Not sure what you need? We&apos;ll help you scope it.</span>
                  <Link
                    href="/services"
                    onClick={closeAll}
                    className="focus-ring inline-flex items-center gap-1 rounded font-semibold text-brand-700 hover:text-brand-800"
                  >
                    All services <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {simpleLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}

          <div className="relative" onMouseLeave={() => setOpenMenu(null)}>
            <button
              type="button"
              className={topLinkClass}
              aria-expanded={openMenu === "company"}
              aria-controls="menu-company"
              onClick={onMenuClick("company")}
              onMouseEnter={() => setOpenMenu("company")}
            >
              Company
              <ChevronDown
                className={`size-4 transition-transform ${openMenu === "company" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div id="menu-company" hidden={openMenu !== "company"} className="absolute top-full right-0 w-72 pt-3">
              <ul className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
                {companyNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      className="focus-ring block rounded-xl px-4 py-3 transition-colors hover:bg-slate-50"
                    >
                      <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{item.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className={buttonClasses("primary")}>
            Book a free consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="focus-ring -mr-2 rounded-md p-2 text-slate-700 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
      >
        <div className="space-y-6 px-4 py-6">
          <details className="group" open>
            <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-base font-semibold text-slate-900">
              Services
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="mt-2 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={closeAll}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name={s.icon} className="size-5 text-brand-600" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <ul className="space-y-1 border-t border-slate-100 pt-4">
            {[...simpleLinks, ...companyNav].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={closeAll}
                  className="block rounded-lg px-2 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={closeAll} className={`${buttonClasses("primary", "lg")} w-full`}>
            Book a free consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
