import { QuoteLink } from "@/components/QuoteModal";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import emarineDecarbonize from "@/assets/emarine-decarbonize.jpg";
import keralaSolarBoat from "@/assets/Kerala_Solar_Boat_trimmed-light.mp4.asset.json";
import boatShikara from "@/assets/ytpl-boat-1-sharp.png";
import boatCial from "@/assets/ytpl-boat-2-sharp.png";
import boatHydel from "@/assets/ytpl-boat-3-sharp.png";
import boatLeisure from "@/assets/ytpl-boat-4-hq.jpeg.asset.json";
import boatSolarElectric from "@/assets/ytpl-boat-5-hq.jpeg.asset.json";
import boatHouseRetrofit from "@/assets/ytpl-boat-6-sharp.png";
import boatHouse2br from "@/assets/ytpl-boat-7-hq.jpeg.asset.json";
import boatHouse4br from "@/assets/ytpl-boat-8-hq.png.asset.json";

/** Homepage E-MARINE showcase: featured solution, decarbonising and fleet. */
export function EMarineSections() {
  const featuredVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <div id="emarine" data-emarine>
          {/* Featured solution → Decarbonizing → Retrofit (horizontal scroll swipe) */}
          <SolutionsSwipe>
            {/* Slide 1 — Featured solution */}
            <section className="bg-secondary px-6 py-12 sm:px-10 sm:py-16">
              <div className="mx-auto grid w-full max-w-[100rem] items-center gap-16 lg:grid-cols-2">
                <div data-reveal="left">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest">
                    Featured solution
                  </span>
                  <h2 className="display-xl mt-6 text-4xl text-brand-navy sm:text-6xl">
                    E-Marine: clean propulsion for a{" "}
                    <span className="accent-italic">sustainable world</span>
                  </h2>
                  <p className="mt-8 max-w-xl text-[0.95rem] leading-[1.9] text-muted-foreground">
                    Our E-Marine systems remove boating emissions and support sustainable
                    boating to a new level — no sound, no vibration, no fumes, no breakdowns. We have
                    delivered comprehensive e-boating systems in India and Australia.
                  </p>
                  <QuoteLink
                    initial={{ service: "marine" }}
                    className="link-quiet mt-10 inline-block font-display text-lg"
                  >
                    Discuss an e-marine project
                  </QuoteLink>
                </div>
                <div
                  data-media-reveal
                  data-reveal-delay={120}
                  className="window-square relative isolate aspect-video w-full bg-brand-navy"
                >
                  <video
                    ref={featuredVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <source data-src={keralaSolarBoat.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 via-transparent to-transparent" />
                </div>
              </div>
            </section>

            {/* Slide 2 — Decarbonizing the marine sector (slide 7) */}
            <section className="bg-secondary px-6 py-10 sm:px-10 sm:py-14">
              <div className="mx-auto grid w-full max-w-[100rem] items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                <div data-reveal="left">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest">
                    E-Marine
                  </span>
                  <h2 className="display-xl mt-5 text-4xl text-brand-navy sm:text-6xl">
                    Decarbonizing the{" "}
                    <span className="accent-italic text-brand-forest">marine sector</span>
                  </h2>
                  <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.9] text-muted-foreground">
                    Marine systems built for daily service — IRS-approved battery packs,
                    intelligent monitoring and safety layers engineered for life on the water.
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2.5">
                    {EMARINE_TAGS.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-brand-navy/15 bg-background px-4 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-brand-navy/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <figure
                  data-reveal="right"
                  data-media-reveal
                  data-reveal-delay={120}
                  className="window-square relative isolate aspect-[4/3] w-full overflow-hidden bg-brand-navy lg:aspect-square"
                >
                  <img decoding="async"
                    src={emarineDecarbonize}
                    alt="E-Marine electric propulsion vessel at sea"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 z-10 p-6 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-brand-ivory/90 sm:p-8">
                    Zero emission propulsion · India · Australia
                  </figcaption>
                </figure>
              </div>
            </section>


            {/* Slide 3 — What can we retrofit (slide 9) */}
            <RetrofitShowcase />
          </SolutionsSwipe>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* E-Marine — slide 7 tags + slide 9 retrofit showcase                        */
/* -------------------------------------------------------------------------- */

const EMARINE_TAGS = [
  "B-Kool",
  "M-CONTROL monitoring & control (feature)",
  "IRS approved LFP",
  "YESEN Technologies Pvt Ltd",
];

/** Real YSPL fleet — supplied capability profile (delivered + under construction). */
const RETROFIT_VESSELS = [
  {
    name: "Shikara Solar Boat",
    image: boatShikara,
    status: "In service",
    specs: "12 m × 3 m · 12 guests · 8.4 kW outboard · 30 kWh lithium · 7–8 kn",
  },
  {
    name: "CIAL Solar Boat",
    image: boatCial,
    status: "In service",
    specs: "15 m ferry · 25 guests · twin 15 kW outboard · 80 kWh liquid-cooled · 7–8 kn",
  },
  {
    name: "Hydel Tourism Boat",
    image: boatHydel,
    status: "In service",
    specs: "12 m × 4.5 m · 25 guests · twin 8 kW outboard · 70 kWh liquid-cooled · 10 kn",
  },
  {
    name: "Electric Leisure Boat",
    image: boatLeisure.url,
    status: "In service",
    specs: "8 m × 3.5 m · 10 guests · twin 8 kW outboard · 20 kWh liquid-cooled · 6–7 kn",
  },
  {
    name: "Solar Electric Boat",
    image: boatSolarElectric.url,
    status: "In service",
    specs: "8 m × 3.5 m · 20 guests · 15 kW outboard · 45 kWh lithium · 7–8 kn",
  },
  {
    name: "Electric House Boat",
    image: boatHouseRetrofit,
    status: "Retrofit",
    specs: "27 m × 6 m · 3 bedrooms · 55 kW inboard · 60 kWh liquid-cooled · 4–5 kn",
  },
  {
    name: "House Boat · 2 Bedroom",
    image: boatHouse2br.url,
    status: "Under construction",
    specs: "27 m × 6 m new build · twin 35 kW inboard · 80 kWh liquid-cooled · 4–5 kn",
  },
  {
    name: "House Boat · 4 Bedroom",
    image: boatHouse4br.url,
    status: "Under construction",
    specs: "27 m × 6 m new build · twin 35 kW inboard · 80 kWh liquid-cooled · 4–5 kn",
  },
];

function RetrofitShowcase() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);

  const select = (i: number, manual = false) => {
    if (manual) pausedUntil.current = Date.now() + 8000;
    setActive(i);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !window.matchMedia("(max-width: 767px)").matches) return;
    // Wait for the width transition, then scroll only the rail, never the page.
    const fit = () => {
      const card = rail.children.item(active);
      if (card instanceof HTMLElement) {
        rail.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      }
    };
    const timer = window.setTimeout(fit, 720);
    window.addEventListener("resize", fit);
    return () => { window.clearTimeout(timer); window.removeEventListener("resize", fit); };
  }, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail || document.hidden || !window.matchMedia("(max-width: 767px)").matches || Date.now() < pausedUntil.current) return;
      const rect = rail.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setActive((i) => (i + 1) % RETROFIT_VESSELS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-secondary px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto w-full max-w-[100rem]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <span
              data-reveal
              className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-brand-forest"
            >
              What we build &amp; retrofit
            </span>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="display-xl mt-5 text-4xl text-brand-navy sm:text-5xl"
            >
              YSPL boats already{" "}
              <span className="accent-italic">on the water</span>
            </h2>
          </div>
          <p
            data-reveal
            data-reveal-delay={140}
            className="max-w-xl text-[0.9rem] leading-[1.85] text-muted-foreground"
          >
            Electric vessels delivered with YESEN systems — tourism boats, ferries and
            houseboats running on our lithium packs — plus new solar-electric builds
            now under construction.
          </p>
        </div>

        {/* Inline expanding fleet rail — hover/focus, or tap on touchscreens. */}
        <div ref={railRef} onTouchStart={() => { pausedUntil.current = Date.now() + 8000; }} className="fleet-rail no-scrollbar relative mt-8 flex h-[26rem] gap-2 overflow-x-auto pb-2 sm:gap-3 lg:mt-10 lg:h-[min(26rem,46vh)]" data-boat-rail>
          {RETROFIT_VESSELS.map((v, i) => {
            const open = active === i;
            return (
              <Button
                key={v.name}
                variant="ghost"
                type="button"
                onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) select(i, true); }}
                onFocus={() => select(i, true)}
                onClick={() => select(i, true)}
                aria-label={v.name}
                aria-expanded={open}
                className={`fleet-vessel group relative block h-full shrink-0 overflow-hidden rounded-none border-0 bg-brand-navy p-0 text-left whitespace-normal hover:bg-brand-navy transition-[width,flex-grow] duration-700 ease-out lg:min-w-0 lg:basis-0 ${open ? "w-[88%] sm:w-[65%] lg:grow-[9]" : "w-12 sm:w-14 lg:grow"}`}
              >
                <span className="absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center bg-brand-navy px-2 text-brand-ivory sm:w-14">
                  <span className="font-display text-base leading-tight whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{v.name}</span>
                </span>
                <span className={`absolute inset-y-0 left-12 right-0 grid grid-rows-[minmax(0,1fr)_auto] bg-background transition-opacity duration-500 sm:left-14 ${open ? "opacity-100 delay-150" : "opacity-0 pointer-events-none"}`} aria-hidden={!open}>
                  <span className="block min-h-0 overflow-hidden bg-secondary">
                    <img decoding="async" src={v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover" />
                  </span>
                  <span className="block border-t border-border bg-background px-3 py-1.5 sm:px-4 sm:py-2">
                    <span className="block font-mono text-[0.55rem] uppercase text-brand-forest sm:text-[0.6rem]">{v.status}</span>
                    <span className="block text-[0.6rem] leading-snug text-muted-foreground sm:text-xs">
                      {v.specs}
                    </span>
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Stacked panels: each slide scrolls in over the previous one                  */
/* -------------------------------------------------------------------------- */
function SolutionsSwipe({ children, bare = false }: { children: React.ReactNode; bare?: boolean }) {
  const slides = React.Children.toArray(children);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const panels = Array.from(wrap.querySelectorAll<HTMLElement>("[data-solution-slide]"));
    const fit = () => panels.forEach((panel) => {
      panel.style.top = `${Math.min(0, window.innerHeight - panel.offsetHeight)}px`;
    });
    fit();
    const observer = new ResizeObserver(fit);
    panels.forEach((panel) => observer.observe(panel));
    window.addEventListener("resize", fit);
    return () => { observer.disconnect(); window.removeEventListener("resize", fit); };
  }, []);

  return (
    <div ref={wrapRef} data-solutions-swipe className="relative">
      {slides.map((child, i) => (
        <div
          key={i}
          data-solution-slide={i}
          className={`sticky top-0 flex min-h-[100svh] flex-col justify-center ${
            bare ? "bg-background" : "bg-secondary"
          }`}
          style={{
            zIndex: i + 1,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}


