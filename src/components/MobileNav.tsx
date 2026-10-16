import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { QuoteLink } from "@/components/QuoteModal";
import { MAIN_NAV, NAV_OVERVIEW } from "@/lib/service-lines";

// FAQ intentionally lives in the footer quick links on phones, not here.
const ITEMS = MAIN_NAV;


/**
 * Hamburger + full-screen sheet navigation for phones and small tablets.
 * Hidden from `md` up, where the inline header nav takes over.
 */
export function MobileNav({ tone = "dark", quoteAsPage = true }: { tone?: "dark" | "light"; quoteAsPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  // The header uses backdrop-filter, which would trap a `fixed` overlay inside
  // it — so the sheet is portalled to <body> once we're on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <Button variant="ghost"
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border backdrop-blur-md transition-colors ${
          tone === "light"
             ? "border-brand-ivory/40 bg-shell/10 text-brand-ivory"
             : "border-brand-navy/15 bg-shell/70 text-brand-navy"
        }`}
      >
        <Menu size={19} strokeWidth={1.6} />
      </Button>

      {mounted
        ? createPortal(
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-shell shadow-[0_0_80px_-20px_rgb(1_33_84/0.6)] transition-transform duration-400 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
            <Link to="/" className="min-w-0" onClick={() => setOpen(false)} aria-label="YESEN Technologies Pvt Ltd home">
              <Logo className="h-auto max-h-9 w-auto max-w-full" />
            </Link>
            <Button variant="ghost"
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-brand-navy"
            >
              <X size={18} strokeWidth={1.6} />
            </Button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 pb-8" aria-label="Mobile">
            <ul className="divide-y divide-border">
              {ITEMS.map((item) => (
                <li key={item.label}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    {item.groups ? (
                      <Button variant="ghost"
                        type="button"
                        aria-expanded={expanded === item.label}
                        aria-label={`Show ${item.label}`}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="h-auto min-h-[3.25rem] min-w-0 justify-start whitespace-normal rounded-none px-0 text-left font-sans text-sm font-semibold text-brand-navy"
                      >
                        {item.label}
                      </Button>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="flex min-h-[3.25rem] flex-1 items-center font-mono text-[0.78rem] uppercase tracking-[0.22em] text-brand-navy"
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.groups && (
                      <Button variant="ghost"
                        type="button"
                        aria-label={`Show ${item.label}`}
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="grid h-11 w-11 place-items-center text-brand-navy"
                      >
                        <ChevronDown size={18} className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                      </Button>
                    )}
                  </div>
                  {item.groups && expanded === item.label && (
                    <div className="pb-3 pl-4">
                      {NAV_OVERVIEW[item.to] && (
                        <Link to={NAV_OVERVIEW[item.to].to} onClick={() => setOpen(false)} className="mb-1 flex min-h-[2.5rem] items-center border-b border-border text-sm font-semibold text-brand-forest">
                          {NAV_OVERVIEW[item.to].label}
                        </Link>
                      )}
                      {item.groups.map((g, gi) => (
                        <div key={g.heading ?? gi}>
                          {g.heading && (
                            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-brand-forest">
                              {g.heading}
                            </p>
                          )}
                          {g.items.map((s) => (
                            <Link
                              key={s.label + s.to}
                              to={s.to}
                              onClick={() => setOpen(false)}
                              className="flex min-h-[2.5rem] items-center text-sm text-muted-foreground"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {quoteAsPage ? (
              <Link
                to="/enquire"
                onClick={() => setOpen(false)}
                className="mt-6 flex min-h-[3rem] items-center justify-center rounded-full bg-brand-navy px-6 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brand-ivory"
              >
                Get a quote
              </Link>
            ) : (
              <QuoteLink
                onClick={() => setOpen(false)}
                className="mt-6 flex min-h-[3rem] items-center justify-center rounded-full bg-brand-navy px-6 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brand-ivory"
              >
                Get a quote
              </QuoteLink>
            )}

            <a
              href="mailto:info@yesentechnologies.com"
              className="mt-5 block break-all text-center text-sm text-muted-foreground"
            >
              info@yesentechnologies.com
            </a>
          </nav>
        </div>
      </div>,
            document.body,
          )
        : null}
    </div>
  );
}
