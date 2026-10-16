import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { MAIN_NAV, NAV_OVERVIEW } from "@/lib/service-lines";
import type { ServiceLink } from "@/lib/service-lines";

/** Desktop main menu with hover/focus dropdowns. Shared by every header. */
export function NavMenu({ light, align = "center" }: { light: boolean; align?: "center" | "end" }) {
  const [active, setActive] = useState<string | null>(null);
  const [panelTop, setPanelTop] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  /* The panel must clear the whole header bar, not just the links row —
     otherwise it slides under the blurred bar and the two read as one block. */
  const measure = () => {
    const nav = navRef.current;
    if (!nav) return;
    const bar = nav.closest("header") ?? nav;
    setPanelTop(bar.getBoundingClientRect().bottom + 14);
  };
  const openMenu = (label: string | null) => {
    cancelClose();
    if (label) measure();
    setActive(label);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActive(null), 150);
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    const onMove = () => {
      if (active) measure();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onMove);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [active]);
  const selected = MAIN_NAV.find((item) => item.label === active);
  const grid = selected?.to === "/land-based" || selected?.to === "/engineering-advisory";
  const wide = grid || selected?.to === "/marine";
  const cls = `relative inline-flex shrink-0 items-center whitespace-nowrap px-1 py-2 font-sans text-[0.6rem] font-bold tracking-[-0.005em] transition-colors duration-300 after:absolute after:inset-x-1 after:bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 xl:px-1.5 xl:text-[0.66rem] 2xl:px-2 2xl:text-[0.78rem] ${
    light ? "text-brand-ivory hover:text-brand-leaf" : "text-brand-navy hover:text-brand-forest"
  }`;

  return (
    <div className="hidden lg:contents">
    <nav
      ref={navRef}
      className={`relative hidden min-w-0 flex-1 items-center gap-0.5 lg:flex xl:gap-1 ${align === "end" ? "justify-end" : "justify-center"}`}
      aria-label="Main"
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose();
      }}
    >
      {MAIN_NAV.map((item) =>
        item.groups ? (
          <div key={item.label} className="relative flex shrink-0 items-center">
            <button
              type="button"
              className={cls}
              aria-expanded={active === item.label}
              aria-haspopup="true"
              aria-controls={`nav-${item.label.replaceAll(" ", "-").toLowerCase()}`}
              onMouseEnter={() => openMenu(item.label)}
              onFocus={() => openMenu(item.label)}
              onClick={() => openMenu(item.label)}
            >
              {item.label}
              <ChevronDown size={12} aria-hidden className={`ml-0.5 transition-transform ${active === item.label ? "rotate-180" : ""}`} />
            </button>
          </div>
        ) : (
          <Link key={item.label} to={item.to} className={cls} onMouseEnter={() => openMenu(null)} onFocus={() => openMenu(null)}>
            {item.label}
          </Link>
        ),
      )}
    </nav>
    {mounted && selected?.groups && createPortal(
      <div
        id={`nav-${selected.label.replaceAll(" ", "-").toLowerCase()}`}
        style={wide ? { top: panelTop } : undefined}
        className={`z-50 ${
          wide ? "fixed inset-x-3 sm:inset-x-6 lg:inset-x-10" : "absolute top-full left-1/2 w-72 -translate-x-1/2 pt-2"
        }`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        onFocus={cancelClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose();
        }}
      >
        <div className={`rounded-2xl border border-border bg-card text-card-foreground shadow-xl ${wide ? "grid grid-cols-[180px_minmax(0,1fr)] gap-8 px-8 py-6 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-10 xl:px-10 xl:py-8" : "p-5"}`}>
          {wide && (
            <div className="flex flex-col items-start border-r border-border pr-6">
              {selected.to === "/marine" ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-forest/12 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-brand-forest ring-1 ring-brand-forest/30">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-leaf" />
                  E-MARINE
                </span>
              ) : (
                <span className="text-xs font-medium text-brand-forest">{selected.to === "/land-based" ? "Land & Earth" : "Engineering Advisory"}</span>
              )}
              <h2 className="mt-3 text-2xl font-semibold leading-tight">
                {selected.to === "/marine" ? "Electric solutions for every vessel." : selected.to === "/land-based" ? "Solar & storage for every site." : "Independent engineering for energy projects."}
              </h2>
            </div>
          )}
          <div className="min-w-0">
          {NAV_OVERVIEW[selected.to] && (
            <Link to={NAV_OVERVIEW[selected.to].to} onClick={() => openMenu(null)} className="mb-4 flex items-center justify-between gap-2 border-b border-border pb-4 text-base font-semibold text-brand-forest hover:text-brand-navy">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-forest/10 px-3 py-1 ring-1 ring-brand-forest/25">{NAV_OVERVIEW[selected.to].label}</span><ArrowUpRight size={15} />
            </Link>
          )}
          <div className={selected.to === "/marine" ? "grid min-w-0 grid-cols-2 gap-8" : "min-w-0"}>
            {selected.groups.map((group, gi) => (
              <div key={group.heading ?? gi}>
                {group.heading && <h3 className="mb-3 border-b border-border pb-3 text-xs font-semibold uppercase text-brand-forest">{group.heading}</h3>}
                <ul className={grid ? `grid ${selected.to === "/land-based" ? "grid-cols-4" : "grid-cols-3"} divide-x divide-border` : "space-y-1"}>
                  {group.items.map((service, index) => (
                    <li key={service.label} className="min-w-0">
                      <Link to={service.to} onClick={() => openMenu(null)} className={`group flex h-full flex-col rounded-lg text-brand-navy transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-ring ${grid ? "min-h-0 px-5 py-4 xl:px-6 xl:py-5" : "rounded-sm px-3 py-1.5"}`}>
                        {grid && <span className="mb-6 text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>}
                        <span className="flex items-start justify-between gap-2 text-base font-semibold leading-snug group-hover:text-brand-forest">
                          {service.label}<ArrowUpRight size={15} className="mt-1 shrink-0" />
                        </span>
                        {"blurb" in service && <span className="mt-2 text-left text-sm leading-relaxed text-muted-foreground">{(service as ServiceLink).blurb}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>,
      document.body,
    )}
    </div>
  );
}
