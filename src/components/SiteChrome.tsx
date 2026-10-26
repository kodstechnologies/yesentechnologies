import { Link } from "@tanstack/react-router";
import { EmailChooser } from "@/components/EmailChooser";
import { QuoteLink } from "@/components/QuoteModal";
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { CountryFlag } from "@/components/CountryFlag";
import { MobileNav } from "@/components/MobileNav";

import { onScrollFrame } from "@/lib/scroll-scrub";

import { NavMenu } from "@/components/NavMenu";
import { FOOTER_LINKS } from "@/content/footer-navigation";



const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/yesen-technologies/",
    Icon: Linkedin,
    brand: "#0A66C2",
  },
  { label: "Facebook", href: "https://www.facebook.com/yesensustain", Icon: Facebook, brand: "#1877F2" },
  { label: "Instagram", href: "https://www.instagram.com/yesensustain/", Icon: Instagram, brand: "#E1306C" },
  { label: "YouTube", href: "https://www.youtube.com/@yesentechnologies", Icon: Youtube, brand: "#FF0000" },
  { label: "Email", href: "https://outlook.office.com/mail/deeplink/compose?to=info@yesentechnologies.com", Icon: Mail, brand: "#EA4335" },
];



const OFFICES = [
  {
    country: "India",
    flag: "in" as const,
    lines: [
      "YESEN Technologies Pvt Ltd",
      "5th floor, YESEN Enclave, Vallamattam Estate",
      "Ravipuram, Kochi, Kerala 682015",
    ],
    tel: "+91 77080 07554",
  },
  {
    country: "USA",
    flag: "us" as const,
    lines: ["YESEN Technologies Inc.", "8 The Green, Ste A", "Dover, DE 19901"],
    tel: "+1 33 2240 8989",
  },
  {
    country: "UAE",
    flag: "ae" as const,
    lines: ["YESEN ENERGIA & TECHNOLOGY - FZCO", "Building A1,", "Dubai Silicon Oasis", "Dubai, United Arab Emirates"],
    tel: "+971 568 089 912",
  },

  {
    country: "Australia",
    flag: "au" as const,
    lines: ["YESEN Technologies Pvt Ltd", "4 Dalurrba, Lyons", "Darwin, NT – 0810"],
    tel: "+61 411 899 154",
  },
];

/** Header used on light-background inner pages. Same layout language as home. */
export function SiteHeader({ heroDark = false }: { heroDark?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    // Batched into the shared scroll frame, with a small dead zone so inertial
    // scrolling can't flip the header open/closed on sub-pixel deltas.
    return onScrollFrame(() => {
      const y = window.scrollY;
      const down = y > lastY.current + 4;
      const up = y < lastY.current - 4;
      if (down || up) {
        setHidden(down && y > 120);
        lastY.current = y;
      }
      setAtTop(y < 40);
    });
  }, []);


  return (
    <header
      style={{ willChange: "transform", backfaceVisibility: "hidden" }}
      className={`fixed inset-x-0 top-0 z-50 transform-gpu transition-transform duration-300 ease-out ${hidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div
        className={`transition-colors duration-300 ${atTop ? "bg-transparent" : "border-b border-brand-navy/10 bg-shell"
          }`}
      >
        <div
          className={`relative mx-auto grid w-full max-w-[100rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-[padding] duration-300 sm:gap-6 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-3 lg:px-6 xl:gap-6 xl:px-12 ${atTop ? "py-4 sm:py-7" : "py-3 sm:py-4"
            }`}
        >
          <Link to="/" aria-label="YESEN Technologies Pvt Ltd home" className="min-w-0 shrink-0">
            <Logo
              variant={heroDark && atTop ? "light" : "dark"}
              className={`w-auto max-w-[56vw] transition-[height] duration-300 ${atTop ? "h-9 sm:h-12 lg:h-8 xl:h-10" : "h-8 sm:h-10 lg:h-8 xl:h-9"}`}
            />
          </Link>


          <NavMenu light={heroDark && atTop} align="end" />
          <Link to="/enquire" className="hidden h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-brand-navy/15 bg-shell px-6 font-sans text-[0.68rem] font-bold text-brand-navy shadow-sm transition-colors hover:border-brand-navy/30 hover:bg-brand-ivory lg:inline-flex xl:text-[0.72rem]">
            Get a quote
          </Link>

          <MobileNav tone={heroDark && atTop ? "light" : "dark"} />

        </div>

      </div>
    </header>
  );
}


export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto mb-[clamp(0.5rem,2vw,2rem)] w-[calc(100%-2*clamp(0.5rem,2vw,2rem))] max-w-[108rem] overflow-hidden rounded-[clamp(1rem,2vw,2rem)] border border-border bg-shell shadow-[0_40px_90px_-45px_color-mix(in_oklab,var(--brand-navy)_60%,transparent)]">
      <div className="footer-navigation mx-auto grid w-full max-w-[100rem] grid-cols-2 gap-x-6 gap-y-10 px-6 py-16 sm:grid-cols-4 sm:gap-x-8 sm:px-12 xl:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]">
        <div className="col-span-2 min-w-0 sm:col-span-4 xl:col-span-1">
          <Logo className="h-11 w-auto max-w-[62vw] sm:h-14 md:h-auto md:w-56 md:max-w-full" />
          <p className="mt-4 text-[0.78rem] font-medium tracking-[0.02em] text-brand-forest">
            Erstwhile YESEN Sustain Pvt Ltd
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Green technologies that make economic sense — engineered for smart cities and the
            remotest parts of the earth.
          </p>


          <h3 className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-brand-forest">
            Our networks
          </h3>
          <ul className="mt-4 flex flex-wrap items-center gap-3">
            {SOCIALS.map(({ label, href, Icon, brand }) => (
              <li key={label}>
                {label === "Email" ? (<span style={{ ["--social-brand" as string]: brand }} className="contents"><EmailChooser ariaLabel="Email" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-[var(--social-brand)] hover:bg-[var(--social-brand)] hover:text-white"><Icon size={17} /></EmailChooser></span>) : (
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    aria-label={label}
                    title={label}
                    style={{ ["--social-brand" as string]: brand }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-[var(--social-brand)] hover:bg-[var(--social-brand)] hover:text-white"
                  >
                    <Icon size={17} />
                  </a>)}
              </li>
            ))}

          </ul>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.heading} className="min-w-0">
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-brand-forest">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {col.items.map((item) => (
                <li key={item.label}>
                  {item.to === "/enquire" ? (
                    <QuoteLink className="story-link transition-colors hover:text-brand-navy">
                      {item.label}
                    </QuoteLink>
                  ) : item.to ? (
                    <Link
                      to={item.to}
                      hash={item.hash}
                      className="story-link transition-colors hover:text-brand-navy"
                    >
                      {item.label}
                    </Link>
                  ) : item.href?.startsWith("mailto:") ? (<EmailChooser className="story-link text-left transition-colors hover:text-brand-navy">{item.label}</EmailChooser>) : (<a href={item.href} className="story-link transition-colors hover:text-brand-navy">{item.label}</a>)}
                </li>
              ))}

            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-[100rem] px-6 py-12 sm:px-12">
          <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-brand-forest">
            Our global offices
          </h3>
          <ul className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {OFFICES.map((office) => (
              <li key={office.country} className="flex min-w-0 flex-col gap-3 sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:gap-y-3">
                <div className="flex items-center gap-3">
                  <span className="block h-5 w-[1.875rem] shrink-0 overflow-hidden rounded-sm [&>svg]:block [&>svg]:h-full [&>svg]:w-full">
                    <CountryFlag code={office.flag} title={office.country} />
                  </span>
                  <span className="text-sm font-semibold text-brand-navy">{office.country}</span>
                </div>
                <address className="space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={`tel:${office.tel.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 self-start whitespace-nowrap border-t border-border pt-3 text-sm font-medium leading-relaxed text-muted-foreground transition-colors hover:text-brand-navy"
                >
                  <Phone size={14} className="shrink-0 text-brand-leaf" aria-hidden />
                  {office.tel}
                </a>

              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[100rem] flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-12">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            © {new Date().getFullYear()} YESEN Technologies Pvt Ltd
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            Technology by Nature
          </p>
        </div>
      </div>
    </footer>
  );
}
