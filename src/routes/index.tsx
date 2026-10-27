import { EMarineSections } from "@/components/EMarineSections";
import { EmailChooser } from "@/components/EmailChooser";
import { FOOTER_LINKS } from "@/content/footer-navigation";
import { QuoteLink } from "@/components/QuoteModal";
import { createFileRoute, Link } from "@tanstack/react-router";
import ProjectsPhotos from "@/components/ProjectsPhotos";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Facebook,
  Instagram,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Ship,
  Smartphone,
  Sun,
  Youtube,
  Zap,
} from "lucide-react";



import { Logo } from "@/components/Logo";
import { CountryFlag } from "@/components/CountryFlag";
import { MobileNav } from "@/components/MobileNav";
import { NavMenu } from "@/components/NavMenu";
import { LAND_LINKS, MARINE_GREENFIELD, MARINE_RETROFIT, ADVISORY_LINKS, type ServiceLink } from "@/lib/service-lines";

import { SplashScreen } from "@/components/SplashScreen";
import TestimonialWall from "@/components/TestimonialWall";


import WhyYesen from "@/components/WhyYesen";
import { onScrollFrame } from "@/lib/scroll-scrub";

import TechDeepDive from "@/components/TechDeepDive";



import projectGuamMain from "@/assets/project-guam-main.jpg";
import projectGuam2 from "@/assets/project-guam-2.jpg";
import projectGuam3 from "@/assets/project-guam-3.jpg";
import projectHouseSolar from "@/assets/project-house-solar.jpg";
import projectKeralaHouse from "@/assets/project-kerala-house.jpg";
import projectCialBoat from "@/assets/project-cial-boat.jpg";
import projectCarport from "@/assets/project-carport.jpg";
import ongoingDam from "@/assets/ongoing-patratu-dam.jpg";
import ongoingHouseboat from "@/assets/ongoing-houseboat.jpg";
import ongoingInt1 from "@/assets/ongoing-int-1.jpg";
import ongoingInt2 from "@/assets/ongoing-int-2.jpg";
import ongoingInt3 from "@/assets/ongoing-int-3.jpg";
import capabilitySolutions from "@/assets/capability-solutions.jpg";
import capabilityProducts from "@/assets/capability-products.jpg";
import capabilityProjects from "@/assets/capability-projects.jpg";

import { CinematicHero } from "@/components/CinematicHero";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YESEeN Technologies Pvt Ltd | Sustainable Energy & Clean Tech" },
      {
        name: "description",
        content:
          "YESEN Technologies Pvt Ltd designs solar, energy storage, e-marine and clean water solutions that transform lives across Asia, Australia and the Middle East.",
      },
      { property: "og:title", content: "YESEeN Technologies Pvt Ltd | Sustainable Energy & Clean Tech" },
      {
        property: "og:description",
        content:
          "Solar farms, hybrid microgrids, electric marine propulsion and rural electrification — engineered for a sustainable world.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yesen.website/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/" }],
  }),
  component: Home,
});




const FEATURES = [
  {
    id: "01",
    title: "Real-Time Monitoring & Control",
    body: "Live vessel data, battery status, motor performance, and system health, at your fingertips.",
    Icon: LineChart,
  },
  {
    id: "02",
    title: "Operational Cost & Data Analytics",
    body: "Track energy usage, predict maintenance needs, and optimize routes with actionable insights.",
    Icon: BarChart3,
  },
  {
    id: "03",
    title: "Access From Everywhere",
    body: "Web & mobile apps with data mining and predictive insights for proactive fleet management.",
    Icon: Smartphone,
  },
];

// TODO: card images are reused placeholders — replace with real project photos.
const CAPABILITIES = [
  {
    title: "Land & Earth",
    Icon: Sun,
    body: "Utility-scale and on-site solar with battery storage — designed, built and maintained to cut energy costs and carbon for decades.",
    to: "/land-based",
    bg: capabilityProducts,
  },
  {
    title: "Marine",
    Icon: Ship,
    body: "Electric propulsion for new builds and retrofits — quiet, emission-free boats and ferries, from houseboats and shikaras to passenger vessels.",
    to: "/marine",
    bg: capabilityProjects,
  },
  {
    title: "Engineering Advisory",
    Icon: Zap,
    body: "Owner's engineering, technical due diligence and BESS advisory — independent expertise that keeps your renewable project bankable and buildable.",
    to: "/engineering-advisory",
    bg: capabilitySolutions,
  },
];





const VALUES = [
  {
    label: "Mission",
    body: "To develop green technologies that make economic sense, so they can be used by people anywhere — from smart cities to the remotest parts of the earth.",
    image: capabilitySolutions,
    points: [
      "Green tech that pays for itself",
      "Deployable in the remotest terrain",
      "Built for smart cities and villages alike",
    ],
  },
  {
    label: "Vision",
    body: "To design, develop and patent greener products, intelligently adapting global technologies into solutions communities can maintain with local resources and local talent.",
    image: projectHouseSolar,
    points: [
      "Patented, in-house engineering",
      "Global technology, local adaptation",
      "Serviceable with local talent",
    ],
  },
  {
    label: "Values",
    body: "A more equal world where everyone has access to affordable, reliable and sustainable energy — reducing economic disparity while tackling climate change.",
    image: projectGuamMain,
    points: [
      "Affordable, reliable, sustainable",
      "Energy access as an equaliser",
      "Climate action with real economics",
    ],
  },
];
import productBkool from "@/assets/product-bkool.jpg";
import elcoHero from "@/assets/elco-hero-landscape.jpg.asset.json";


const BRANDS = [
  {
    name: "B-Kool",
    kind: "In-house · YESEN Technologies",
    headline: "Marine battery power,",
    accent: "engineered in-house.",
    body: "Our own marine battery system for electric and solar-electric vessels — built for the heat and humidity of working waters.",
    image: productBkool,
    chips: ["Marine batteries", "Electric & solar boats", "Retrofit ready"],
    to: "/products",
    cta: "Explore B-Kool",
  },
  {
    name: "ELCO",
    kind: "Electric outboards · EP series",
    headline: "Electric outboards,",
    accent: "EP-20 to EP-50.",
    body: "Elco brushless PMAC outboards, engineered by YESEN into complete vessel systems — batteries, controls and charging.",
    image: elcoHero.url,
    chips: ["EP-20 / EP-30 / EP-50", "48–96 V", "YESEN integrated"],
    to: "/products/elco",
    cta: "Explore ELCO",
  },
];



const IMPACT_STATS = [
  {
    service: "Marine Projects",
    value: 80,
    prefix: "",
    suffix: "+",
    label: "VESSELS ELECTRIFIED THROUGH MARINE SOLUTIONS",
    source: "YESEN Technologies",
  },
  {
    service: "Land & Earth",
    // Matches HEADLINE_STATS (48 MW installed) used on the Projects page.
    value: 48,
    prefix: "",
    suffix: " MW",
    label: "LAND-BASED SOLAR & RENEWABLE ENERGY INSTALLED",
    source: "YESEN Technologies",
  },
  {
    service: "Engineering Advisory",
    // Matches ADVISORY_STATS.capacity (473 MWp) used on the Advisory pages.
    value: 473,
    prefix: "",
    suffix: " MWp",
    label: "CAPACITY ENGINEERED THROUGH ENGINEERING ADVISORY",
    source: "YESEN Technologies",
  },
  {
    service: "All services",
    value: 12,
    prefix: "",
    suffix: "+",
    label: "COUNTRIES SERVED ACROSS MARINE & LAND PROJECTS",
    source: "YESEN Technologies",
  },
];

/** Counts up from 0 to the target once it scrolls into view. */
function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(to);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce) and (scripting: none)").matches;

    let raf = 0;
    const run = () => {
      if (done.current) return;
      done.current = true;
      if (reduce) {
        setValue(to);
        return;
      }
      setValue(0);
      const start = performance.now();
      const duration = 1600;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(to * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}



function ServiceSquares({ items, label, columns = 3 }: { items: ServiceLink[]; label: string; columns?: number }) {
  return (
    <ul className={`service-square-links grid gap-2 ${columns === 4 ? "grid-cols-4" : "grid-cols-3"}`} aria-label={label}>
      {items.map((service) => (
        <li key={service.to} className="min-w-0">
          <Link to={service.to} className="flex h-[4.5rem] w-full items-center justify-center rounded-md border border-brand-forest/25 bg-surface-tint p-2 text-center font-sans text-sm font-semibold leading-snug text-brand-navy transition-colors hover:border-brand-forest hover:bg-brand-forest hover:text-brand-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-forest sm:text-base">
            {service.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CapabilitiesSlider() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Sticky stacking on every device: cards taller than the screen stick at
  // (screen height - card height) so their full content scrolls into view first.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const sections = Array.from(wrap.querySelectorAll<HTMLElement>("[data-capability-slide]"));
    const fit = () => sections.forEach((s) => { s.style.top = `${Math.min(0, window.innerHeight - s.offsetHeight)}px`; });
    fit();
    const ro = new ResizeObserver(fit);
    sections.forEach((s) => ro.observe(s));
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, []);
  return (
    <div ref={wrapRef} className="relative mt-6">
      {CAPABILITIES.map(({ title, body, Icon, to, bg }, i) => (
        <section
          key={title}
          data-capability-slide={i}
          className="sticky top-0 flex min-h-[100svh] items-center bg-background py-10 lg:py-12"
          style={{ zIndex: i + 1 }}
          aria-label={title}
        >
          <div className="mx-auto grid w-full min-w-0 max-w-[92rem] items-center gap-10 px-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
            <div data-reveal="left" className="order-2 min-w-0 lg:order-1">
              <span className="flex items-center gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-leaf bg-brand-leaf text-brand-navy">
                  <Icon className="h-5 w-5" strokeWidth={1.4} />
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.34em] text-brand-navy/45">
                  {String(i + 1).padStart(2, "0")} / {String(CAPABILITIES.length).padStart(2, "0")}
                </span>
              </span>
              <h3 className="display-xl mt-6 text-4xl text-brand-navy sm:text-[3.4rem]">{title}</h3>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.9] text-brand-navy/80">{body}</p>
              <div className="mt-5 max-w-lg">
                {to === "/land-based" && <ServiceSquares items={LAND_LINKS} label="Land & Earth services" columns={4} />}
                {to === "/marine" && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase text-brand-forest">Greenfield</h4>
                      <ServiceSquares items={MARINE_GREENFIELD} label="Marine Greenfield services" />
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase text-brand-forest">Retrofit</h4>
                      <ServiceSquares items={MARINE_RETROFIT} label="Marine Retrofit services" />
                    </div>
                  </div>
                )}
                {to === "/engineering-advisory" && <ServiceSquares items={ADVISORY_LINKS} label="Engineering Advisory services" />}
              </div>
            </div>

            <div data-reveal="right" data-reveal-delay={100} className="order-1 flex w-full min-w-0 justify-center lg:order-2 lg:justify-end">
              <div className="relative aspect-square w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] border border-brand-navy/12 shadow-[0_50px_120px_-70px_rgb(1_33_84/0.8)] sm:max-w-[28rem]">
                <img
                  src={bg}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center"
                  style={{ filter: "saturate(1.06) contrast(1.02)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_35%,transparent_60%,rgb(1_33_84/0.28)_100%)]" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}


function FeatureCards() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map(({ id, title, body, Icon }, i) => (
        <article
          key={id}
          data-card-slide
          data-slide-delay={i * 100}
          className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-[0_20px_50px_-30px_color-mix(in_oklab,var(--brand-navy)_25%,transparent)] sm:p-9"
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.6} />
            <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg bg-[#eef5fb] px-2 font-mono text-[0.75rem] font-medium tracking-[0.04em] text-brand-navy">
              {id}
            </span>
          </div>
          <h3 className="mt-6 text-lg font-semibold leading-snug text-brand-navy sm:text-xl">
            {title}
          </h3>
          <p className="mt-3 text-[0.9rem] leading-[1.75] text-muted-foreground">
            {body}
          </p>
        </article>
      ))}
    </div>
  );
}









const MARINE_VIDEO_ID = "RPlyTItE_AA";

const embedSrc = (id: string, vq = "hd1080") =>
  `https://www.youtube-nocookie.com/embed/${id}` +
  `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0` +
  `&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&vq=${vq}&hd=1&enablejsapi=1`;


const MARINE_VIDEO_SRC = embedSrc(MARINE_VIDEO_ID);



/** Reveals every [data-reveal] element as it scrolls into view, with stagger. */
function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce) and (scripting: none)").matches) return;
    const timers = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (el.classList.contains("is-revealed") || timers.has(el)) return;
            const delay = Number(el.dataset.revealDelay ?? 0);
            timers.set(el, window.setTimeout(() => {
              el.classList.add("is-revealed");
              timers.delete(el);
            }, delay));
          } else if (entry.boundingClientRect.bottom <= 0 || entry.boundingClientRect.top >= window.innerHeight) {
            window.clearTimeout(timers.get(el));
            timers.delete(el);
            el.classList.remove("is-revealed");
          }
        });
      },
      { threshold: [0, 0.12], rootMargin: "0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, []);
}

/**
 * Cards slide horizontally in the direction of scrolling: entering from the right
 * while scrolling down, from the left while scrolling up. Repeats on re-entry.
 */
function useDirectionalCardSlide() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-card-slide]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce) and (scripting: none)").matches) return;
    const timers = new Map<HTMLElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (el.classList.contains("is-slid") || timers.has(el)) return;
            const delay = Number(el.dataset.slideDelay ?? 0);
            timers.set(el, window.setTimeout(() => {
              el.classList.add("is-slid");
              timers.delete(el);
            }, delay));
          } else if (entry.boundingClientRect.bottom <= 0 || entry.boundingClientRect.top >= window.innerHeight) {
            window.clearTimeout(timers.get(el));
            timers.delete(el);
            el.style.setProperty("--card-slide", entry.boundingClientRect.bottom <= 0 ? "-80px" : "80px");
            el.classList.remove("is-slid");
          }
        });
      },
      { threshold: [0, 0.15], rootMargin: "0px" },
    );
    nodes.forEach((n) => observer.observe(n));

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      observer.disconnect();
    };
  }, []);
}

/**
 * Sticky homepage header. Keeping its scroll state here means a hide/show
 * toggle re-renders ~30 nodes instead of the entire homepage.
 */
const HomeHeader = React.memo(function HomeHeader() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    return onScrollFrame(() => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current + 4;
      const goingUp = y < lastScrollY.current - 4;
      if (goingDown || goingUp) {
        setHeaderHidden(goingDown && y > 120);
        lastScrollY.current = y;
      }
      setAtTop(y < 40);
    });
  }, []);

  return (
    <header
      /* Transform-only transition: fading opacity at the same time left a ghost
         trail as the compositor re-rasterised the blurred bar mid-slide. */
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 will-change-transform ${headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div
        className={`transition-[background-color,border-color] duration-700 ${atTop ? "bg-transparent" : "border-b border-border/60 bg-shell"
          }`}
      >
        <div
          className={`relative mx-auto grid w-full max-w-[100rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-[padding] duration-700 sm:gap-6 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-3 lg:px-6 xl:gap-6 xl:px-12 ${atTop ? "py-4 sm:py-7" : "py-3 sm:py-4"
            }`}
        >

          <Link to="/" aria-label="YESEN Technologies Pvt Ltd home" className="min-w-0 shrink-0">
            <Logo
              className={`w-auto max-w-[58vw] transition-[height] duration-300 ${atTop ? "h-9 sm:h-12 lg:h-8 xl:h-10" : "h-8 sm:h-10 lg:h-8 xl:h-9"}`}
              variant={atTop ? "light" : "dark"}
            />
          </Link>

          <NavMenu light={atTop} align="end" />
          <Link to="/enquire" className="hidden h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-brand-navy/15 bg-shell px-6 font-sans text-[0.68rem] font-bold text-brand-navy shadow-sm transition-colors hover:border-brand-navy/30 hover:bg-brand-ivory lg:inline-flex xl:text-[0.72rem]">
            Get a quote
          </Link>

          <MobileNav tone={atTop ? "light" : "dark"} />

        </div>
      </div>
    </header>
  );
});


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
    lines: ["YESEN Technologies Pvt Ltd", "5th floor, YESEN Enclave, Vallamattam Estate", "Ravipuram, Kochi, Kerala 682015"],
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
    lines: ["YESEN Technologies — MENA", "Malaysian Trade Center Building", "114 Oud Metha, PO Box 7854", "Dubai, UAE"],
    tel: "+971 568 089 912",
  },
  {
    country: "Australia",
    flag: "au" as const,
    lines: ["YESEN Technologies Pvt Ltd", "4 Dalurrba, Lyons", "Darwin, NT – 0810"],
    tel: "+61 411 899 154",
  },
];




/**
 * Card with a cursor-tracked iridescent titanium sheen and refracting abstract
 * shapes; hovering distorts the front copy away and refracts the detail in.
 */
function IridescentCard({
  className = "",
  slideDelay,
  autoSweep = false,
  children,
}: {
  className?: string;
  slideDelay?: number;
  /** Sweep the sheen on its own timing instead of following the cursor. */
  autoSweep?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Rect + shape list are measured once per hover instead of per mousemove, and
  // all style writes are coalesced into a single animation frame.
  const rect = useRef<DOMRect | null>(null);
  const shapes = useRef<HTMLElement[]>([]);
  const point = useRef({ x: 50, y: 50 });
  const raf = useRef(0);

  const paint = () => {
    raf.current = 0;
    const el = ref.current;
    if (!el) return;
    const { x, y } = point.current;
    el.style.setProperty("--mx", `${x.toFixed(1)}%`);
    el.style.setProperty("--my", `${y.toFixed(1)}%`);
    el.style.setProperty("--irid", "1");
    shapes.current.forEach((s, i) => {
      const pull = 0.16 + i * 0.1;
      s.style.transform = `translate3d(${((x - 50) * pull).toFixed(1)}px, ${((y - 50) * pull).toFixed(1)}px, 0) scale(${1 + i * 0.08})`;
    });
  };

  const onEnter = () => {
    if (autoSweep) return;
    const el = ref.current;
    if (!el) return;
    rect.current = el.getBoundingClientRect();
    shapes.current = Array.from(el.querySelectorAll<HTMLElement>(".irid-shape"));
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoSweep) return;
    const el = ref.current;
    if (!el) return;
    if (!rect.current) onEnter();
    const r = rect.current;
    if (!r) return;
    point.current = {
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    };
    if (!raf.current) raf.current = requestAnimationFrame(paint);
  };

  const onLeave = () => {
    if (autoSweep) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = 0;
    rect.current = null;
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--irid", "0");
    shapes.current.forEach((s) => {
      s.style.transform = "translate3d(0,0,0)";
    });
  };

  return (
    <div
      ref={ref}
      data-card-slide
      data-slide-delay={slideDelay}
      tabIndex={0}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`irid-card ${autoSweep ? "irid-auto" : ""} ${className}`}
    >


      <span
        className="irid-shape left-[8%] top-[10%] h-32 w-32"
        style={{ background: "oklch(0.82 0.16 200 / 0.9)" }}
        aria-hidden
      />
      <span
        className="irid-shape right-[6%] top-[35%] h-40 w-40"
        style={{ background: "oklch(0.8 0.17 305 / 0.8)" }}
        aria-hidden
      />
      <span
        className="irid-shape bottom-[6%] left-[38%] h-28 w-28"
        style={{ background: "oklch(0.86 0.16 120 / 0.85)" }}
        aria-hidden
      />
      {children}
    </div>
  );
}


function Home() {

  useScrollReveal();
  useDirectionalCardSlide();



  return (
    <div className="relative min-h-screen bg-canvas font-sans text-foreground antialiased">
      {/* Detached parallax backdrop — sits behind every floating panel */}
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop-grid" />
      </div>

      <SplashScreen />



      {/* Minimal wide-tracked header — isolated so its scroll state never
          re-renders the rest of the homepage. */}
      <HomeHeader />


      <div className="relative z-10">

        <main id="top" className="site-panels">

          <CinematicHero />

          {/* Business Impact Stats Bar */}
          <section className="relative border-b border-border bg-surface-tint/60">
            <div className="mx-auto w-full max-w-[100rem] px-6 py-14 sm:px-10 sm:py-16 lg:py-[4.5rem]">
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                {IMPACT_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative min-w-0 sm:px-6 lg:px-6 lg:first:pl-0"
                  >
                    {/* Vertical divider */}
                    <span
                      className="pointer-events-none absolute left-0 top-1/2 hidden h-3/4 w-px -translate-y-1/2 bg-border lg:block lg:first:hidden"
                      aria-hidden="true"
                    />

                    <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-brand-leaf">
                      {stat.service}
                    </p>
                    <p className="display-xl whitespace-nowrap text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1] text-brand-navy transition-colors duration-500 group-hover:text-brand-forest lg:text-[clamp(2.4rem,2.8vw,3.6rem)]">
                      <CountUp
                        to={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.value % 1 !== 0 ? 2 : 0}
                      />
                    </p>

                    <span className="mt-2 block h-px w-10 origin-left scale-x-0 bg-brand-leaf transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                    <p className="mt-5 max-w-[18rem] font-mono text-[0.62rem] uppercase leading-[1.8] tracking-[0.26em] text-muted-foreground">
                      {stat.label}
                    </p>

                    <span className="sr-only">Source: {stat.source}</span>
                  </div>
                ))}
              </div>

              {/* Sourcing footnote */}
              <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-5 sm:mt-14 lg:mt-16">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground/80">
                  Verified by
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-border/80 bg-shell/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-brand-navy/70">
                    YESEN Technologies
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Capabilities — editorial service rows */}
          <section
            id="products"
            className="mx-auto w-full max-w-[100rem] !overflow-visible px-6 pt-10 sm:px-10 sm:pt-14"
          >
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span data-reveal className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
                  What we do
                </span>
                <h2
                  data-reveal
                  data-reveal-delay={80}
                  className="display-xl mt-5 max-w-3xl text-4xl text-brand-navy sm:text-6xl"
                >
                  Land, marine and advisory work for a{" "}
                  <span className="accent-italic">warming world</span>
                </h2>
              </div>
            </div>

            <CapabilitiesSlider />

          </section>


          {/* Intro — Who we are */}
          <section
            id="about"
            className="relative overflow-hidden bg-white px-6 py-12 text-brand-navy sm:px-10 sm:py-12"
          >


            <div className="relative mx-auto w-full max-w-[92rem]">
              <div className="flex items-center gap-5">
                <span className="h-px w-16 bg-brand-leaf" />
                <span
                  data-reveal
                  className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest"
                >
                  Who we are
                </span>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-12">
                {/* Headline card */}
                <article
                  className="window-square border border-brand-navy/40 bg-brand-navy p-10 text-brand-ivory shadow-[0_24px_60px_-40px_color-mix(in_oklab,var(--brand-navy)_45%,transparent)] transition-shadow duration-500 hover:shadow-[0_32px_80px_-40px_color-mix(in_oklab,var(--brand-navy)_55%,transparent)] sm:p-14 lg:col-span-7">
                  <h2
                    className="display-xl text-4xl text-brand-ivory sm:text-6xl lg:text-[4rem]"
                  >
                    Engineering a{" "}
                    <span className="accent-italic text-brand-leaf">sustainable</span> tomorrow
                  </h2>
                  <p className="mt-10 max-w-2xl text-lg leading-[1.85] text-brand-ivory/80 sm:text-xl">
                    YESEN Technologies Pvt Ltd, formed in 2019, is an engineering and
                    technology company focused on developing, integrating and delivering
                    sustainable products.
                  </p>
                </article>


                {/* Belief + Focus cards */}
                <div className="grid gap-8 lg:col-span-5">
                  {[
                    {
                      no: "01 — Belief",
                      body: "We support green technology initiatives and believe that innovation becomes meaningful only when it solves real human problems.",
                      image: capabilitySolutions,
                      points: [
                        "Innovation measured by human impact",
                        "Technology that communities can own",
                        "Long-term partnerships, not one-off installs",
                      ],
                    },
                    {
                      no: "02 — Focus",
                      body: "Our focus is on practical engineering solutions, especially in the marine sector, where cleaner alternatives are urgently needed.",
                      image: projectHouseSolar,
                      points: [
                        "Electric and hybrid marine propulsion",
                        "Design, fabrication and commissioning",
                        "Field-proven across South Asia",
                      ],
                    },
                  ].map((c) => (
                    <article
                      key={c.no}
                      className="window-square relative h-56 overflow-hidden border border-brand-blue/40 bg-brand-blue text-brand-ivory sm:h-60"
                    >
                      <div className="absolute inset-0 flex flex-col justify-center p-10 sm:p-12">
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-ivory/70">
                          {c.no}
                        </span>
                        <p className="mt-5 text-base leading-[1.9] text-brand-ivory/90">
                          {c.body}
                        </p>
                      </div>
                    </article>
                  ))}

                </div>
              </div>

              {/* Founding milestone card */}
              <article
                className="window-square mt-8 grid gap-10 border border-brand-navy/40 bg-brand-navy p-10 text-brand-ivory sm:p-14 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-4">
                  <p className="display-xl text-6xl leading-none text-brand-leaf sm:text-8xl">
                    2019
                  </p>
                  <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-ivory/70">
                    Year founded
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-base leading-[1.95] text-brand-ivory/85 sm:text-lg">
                    YESEN Technologies Pvt Ltd was founded to develop, integrate, and deliver sustainable
                    marine products. We support green technology initiatives with practical
                    engineering solutions — from vessel design and fabrication to testing,
                    launching, and commissioning.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {["Vessel design", "Fabrication", "Testing", "Launching", "Commissioning"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-brand-ivory/30 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-ivory/80 transition-colors duration-300 hover:border-brand-leaf hover:text-brand-leaf"
                        >

                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </article>

            </div>
          </section>

          {/* Mission / Vision / Values */}
          <section className="mx-auto w-full max-w-[100rem] px-6 pb-12 sm:px-10 sm:pb-16">
            <div className="grid gap-6 border-t border-border pt-10 lg:grid-cols-3">
              {VALUES.map((v, i) => (
                <article
                  key={v.label}
                  data-card-slide
                  data-slide-delay={i * 110}
                  className="group window-square relative overflow-hidden border border-border bg-card transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-brand-leaf/60 hover:shadow-[0_36px_70px_-40px_rgb(1_33_84_/_0.5)]"
                >

                  {/* Ambient image wash, revealed softly on hover */}
                  <img decoding="async"
                    src={v.image}
                    alt={`${v.label} project photograph`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-15"
                  />
                  {/* Leaf accent bar wipes in from the left */}
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-leaf transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                  <div className="relative flex h-full flex-col justify-between gap-6 p-8">
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-brand-leaf">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="display-xl text-3xl text-brand-navy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 sm:text-4xl">
                        {v.label}
                      </h3>
                      <p className="mt-4 text-[0.95rem] leading-[1.8] text-muted-foreground">
                        {v.body}
                      </p>
                    </div>

                    {/* Points slide up + fade in on hover */}
                    <ul className="space-y-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brand-navy">
                      {v.points.map((p, pi) => (
                        <li
                          key={p}
                          className="flex translate-y-3 items-start gap-2.5 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                          style={{ transitionDelay: `${120 + pi * 90}ms` }}
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-leaf" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}

            </div>
          </section>

          {/* Why YESEN */}
          <WhyYesen />

          {/* Technology deep dive */}
          <TechDeepDive />








          {/* E-MARINE teaser → full overview lives on /marine */}
          <section id="solutions" className="bg-secondary px-6 py-14 sm:px-10 sm:py-20">
            <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div data-reveal="left" className="max-w-3xl">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest">E-MARINE</span>
                <h2 className="display-xl mt-6 text-4xl text-brand-navy sm:text-6xl">
                  Clean propulsion for a <span className="accent-italic">sustainable world</span>
                </h2>
                <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.9] text-muted-foreground">
                  New electric boats and conversions of existing vessels — no sound, no vibration, no fumes.
                </p>
              </div>
              <a
                href="#emarine"
                data-reveal="right"
                className="inline-flex h-12 w-fit items-center gap-3 rounded-full bg-brand-navy px-7 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-ivory transition-opacity hover:opacity-90"
              >
                Explore E-MARINE <span aria-hidden>→</span>
              </a>
            </div>
          </section>

          {/* Full E-MARINE showcase — also shown on /marine */}
          <EMarineSections />

          {/* Completed / Ongoing projects — scroll-driven flip */}
          <ProjectsPhotos />

          {/* Product lines — B-Kool battery system and ELCO electric outboards */}
          <section id="b-kool" className="mx-auto w-full max-w-[100rem] px-6 pb-16 pt-14 sm:px-10 sm:pb-20">
            <span data-reveal className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
              Products
            </span>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="display-xl mt-6 max-w-3xl text-4xl text-brand-navy sm:text-6xl"
            >
              B-Kool <span className="accent-italic">and ELCO</span>
            </h2>



            <div className="mt-10 grid min-w-0 gap-5 md:grid-cols-2 lg:gap-6">
              {BRANDS.map((b, i) => (
                <Link
                  key={b.name}
                  to={b.to}
                  aria-label={`${b.name} — ${b.cta}`}
                  data-card-slide
                  data-slide-delay={i * 120}
                  className="group relative isolate flex min-h-[19rem] flex-col overflow-hidden rounded-[1.5rem] border border-brand-navy/10 bg-brand-navy p-6 text-brand-ivory shadow-[0_30px_70px_-55px_rgb(1_33_84/0.9)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_40px_90px_-50px_rgb(1_33_84/0.95)] sm:p-8"
                >
                  <img
                    decoding="async"
                    loading="lazy"
                    src={b.image}
                    alt={`${b.name} — ${b.chips[0]}`}
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-navy from-45% via-brand-navy/90 to-brand-navy/50" />
                  <div className="relative flex items-start justify-between gap-3">
                    <span className="rounded-full border border-brand-ivory/25 bg-brand-navy/30 px-2.5 py-1 text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-brand-ivory/85 backdrop-blur-md">
                      {b.kind}
                    </span>
                    <span className="text-[0.62rem] tracking-[0.18em] text-brand-ivory/60">0{i + 1}</span>
                  </div>
                  <div className="relative mt-auto pt-5">
                    <span className="display-xl block text-[2.1rem] leading-none text-brand-ivory drop-shadow-[0_4px_24px_rgb(1_33_84/0.6)] sm:text-5xl">{b.name}</span>
                    <h3 className="mt-3 max-w-md text-lg font-semibold leading-snug text-brand-ivory sm:text-xl">
                      {b.headline} <span className="accent-italic font-normal text-brand-leaf">{b.accent}</span>
                    </h3>
                    <p className="mt-2 max-w-md text-[0.85rem] leading-[1.65] text-brand-ivory/75">{b.body}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {b.chips.map((c) => (
                        <span key={c} className="rounded-full border border-brand-ivory/20 px-2 py-1 text-[0.62rem] uppercase tracking-[0.08em] text-brand-ivory/80">
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-brand-ivory px-4 py-2.5 text-[0.8rem] font-semibold text-brand-navy transition-colors duration-500 group-hover:bg-brand-leaf">
                      {b.cta}
                      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>






          {/* Testimonials */}
          <TestimonialWall />





          {/* Contact CTA */}
          <section id="contact" data-panel-bg="navy" className="bg-brand-navy px-6 py-14 text-center text-brand-ivory sm:px-10 sm:py-16">
            <span
              data-reveal
              className="inline-block rounded-full border border-brand-leaf/50 bg-brand-leaf/15 px-4 py-1.5 font-mono text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-brand-leaf"
            >
              Idea → Reality
            </span>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="display-xl mx-auto mt-8 max-w-5xl text-4xl sm:text-7xl"
            >
              Let's build something <span className="accent-italic text-brand-leaf">sustainable</span>{" "}
              together
            </h2>
            <p
              data-reveal
              data-reveal-delay={140}
              className="mx-auto mt-8 max-w-2xl text-base leading-[1.9] text-brand-ivory/80"
            >
              Tell us about your site, your load profile or your sustainability target — our
              engineers will come back with an approach.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
              <Link
                to="/contact"
                className="rounded-full border border-brand-ivory/60 bg-brand-navy/25 px-8 py-4 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-brand-ivory backdrop-blur-md transition-all duration-300 hover:border-brand-leaf hover:bg-brand-leaf hover:text-brand-navy"
              >
                Contact us
              </Link>
            </div>
          </section>

        </main>

        <footer className="relative z-10 mx-auto mb-[clamp(0.5rem,2vw,2rem)] w-[calc(100%-2*clamp(0.5rem,2vw,2rem))] max-w-[108rem] overflow-hidden rounded-[clamp(1rem,2vw,2rem)] border border-border bg-shell shadow-[0_40px_90px_-45px_color-mix(in_oklab,var(--brand-navy)_60%,transparent)]">
          <div className="footer-navigation mx-auto grid w-full max-w-[100rem] grid-cols-2 gap-x-6 gap-y-10 px-6 py-16 sm:grid-cols-4 sm:gap-x-8 sm:px-12 xl:grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]">
            <div className="col-span-2 min-w-0 sm:col-span-4 xl:col-span-1" data-reveal="left">
              <Logo className="h-11 w-auto max-w-[62vw] sm:h-14 md:h-auto md:w-56 md:max-w-full" />
              <p className="mt-4 text-[0.78rem] font-medium tracking-[0.02em] text-brand-forest">
                Erstwhile known as YESEN Sustain Pvt Ltd
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
                        target="_blank"
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

            {FOOTER_LINKS.map((col, i) => (
              <div key={col.heading} className="min-w-0" data-reveal data-reveal-delay={100 + i * 90}>
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
                {OFFICES.map((office, i) => (
                  <li key={office.country} className="flex min-w-0 flex-col gap-3 sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:gap-y-3" data-reveal data-reveal-delay={80 + i * 70}>
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
      </div>
    </div>
  );
}

