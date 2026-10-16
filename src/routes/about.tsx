import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Compass,
  Cpu,
  Gauge,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Sun,
  Waves,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ManifestoPanel } from "@/components/ManifestoPanel";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { WORLD_DOTS } from "@/components/world-map-dots";
import { LAND_LINKS, MARINE_GREENFIELD, MARINE_RETROFIT } from "@/lib/service-lines";

import heroVideo from "@/assets/about-hero-v2-optimized.mp4.asset.json";
import ourStoryVideo from "@/assets/our-story-optimized.mp4.asset.json";
import landSolarImg from "@/assets/advisory-hero-solar-aerial.jpg.asset.json";
import marineBoatImg from "@/assets/sunboat-ii.png.asset.json";
import retrofitBattImg from "@/assets/emarine-retrofit-batteries.png.asset.json";
import advisoryEngImg from "@/assets/advisory-engineer.jpg.asset.json";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | YESEN Technologies — Land & Earth, Boat Electrification and Engineering Advisory" },
      {
        name: "description",
        content:
          "YESEN Technologies engineers land-based solar and battery systems, boat electrification and independent engineering advisory for clean energy projects.",
      },
      {
        property: "og:title",
        content: "About Us | YESEN Technologies — Land & Earth, Boat Electrification and Engineering Advisory",
      },
      {
        property: "og:description",
        content:
          "Founded in 2019, YESEN designs, builds and commissions land-based solar systems, electric boats and retrofits, and advises on utility-scale solar and BESS projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://yesen.website/assets/emarine-decarbonize-PE95gLeC.jpg" },
      { name: "twitter:image", content: "https://yesen.website/assets/emarine-decarbonize-PE95gLeC.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/about" }],
  }),
  component: AboutPage,
});

/* -------------------------------------------------------------------------- */
/* Motion helpers                                                             */
/* -------------------------------------------------------------------------- */

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
}) {
  const offset = from === "left" ? { x: -60, y: 0 } : from === "right" ? { x: 60, y: 0 } : { x: 0, y: 34 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line mask reveal used on the oversized editorial headlines. */
function MaskLines({ lines, className = "" }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <span ref={ref} className={`uc-mask ${inView ? "is-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className="uc-mask-line">
          <span className="uc-mask-inner" style={{ ["--mi" as string]: i }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = false as boolean;
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    setValue(0);
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */



const STORY_CARDS = [
  { title: "Founded in 2019", body: "Born from a conviction that clean energy on land and water is overdue.", Icon: Compass },
  { title: "End-to-End Solutions", body: "Design, fabrication, retrofit, testing, launch and commissioning.", Icon: Wrench },
  { title: "Sustainable by Design", body: "Every system is engineered to lower emissions from day one.", Icon: Leaf },
  { title: "Engineering Excellence", body: "The same rigour across solar plants, battery systems and vessels.", Icon: Gauge },
];

const VALUES = [
  { title: "Innovation", body: "We look past convention to find answers real sites and real vessels need.", Icon: Lightbulb },
  { title: "Sustainability", body: "Cleaner air, land and waterways are the measure of every decision.", Icon: Leaf },
  { title: "Engineering Excellence", body: "Precision, testing and documentation on every deliverable.", Icon: Gauge },
  { title: "Responsibility", body: "To clients, crews and the communities that depend on them.", Icon: ShieldCheck },
];

const CAPABILITIES = [
  { title: "Land & Earth", body: "Grid-tie, off-grid, hybrid and microgrid systems with battery storage.", Icon: Sun },
  { title: "Boat Electrification", body: "Electric and solar-electric boats, propulsion kits and battery architecture.", Icon: BatteryCharging },
  { title: "Engineering Advisory", body: "Owner's engineering, due diligence and BESS advisory for solar projects.", Icon: Gauge },
  { title: "Marine Projects", body: "New-build electric and solar-electric vessels engineered as one system.", Icon: Waves },
  { title: "Boat Retrofits", body: "Converting existing diesel boats to electric power without losing service.", Icon: Wrench },
  { title: "Smart Monitoring Systems", body: "Telemetry, diagnostics and monitoring for plants, batteries and vessels.", Icon: Cpu },
  { title: "Testing and Commissioning", body: "Site testing, sea trials and handover you can trust.", Icon: ShieldCheck },
];

const FOCUS_AREAS = [
  {
    kicker: "Land",
    title: "Land & Earth",
    body: "Solar and battery systems for homes, businesses and communities — designed, installed and commissioned by our own engineers, from a single rooftop to a full microgrid.",
    image: landSolarImg.url,
    alt: "Aerial view of a large solar installation",
    Icon: Sun,
    to: "/land-based",
    cta: "Land & Earth",
    links: LAND_LINKS.map(({ label, to }) => ({ label, to })),
  },
  {
    kicker: "Marine",
    title: "Marine Projects",
    body: "Clean energy for life on the water — new-build electric and solar-electric vessels, engineered with the hull, power system and controls designed together.",
    image: marineBoatImg.url,
    alt: "Sunboat II solar-electric vessel on the water",
    pos: "center 60%",
    Icon: Waves,
    to: "/projects",
    cta: "Marine Projects",
    links: MARINE_GREENFIELD.slice(0, 2).map(({ label, to }) => ({ label, to })),
  },
  {
    kicker: "Boat electrification",
    title: "Boat Electrification",
    body: "Taking boats off diesel — electric propulsion kits for new builds and conversions of existing vessels, powered by our in-house B-Kool marine battery system.",
    image: retrofitBattImg.url,
    alt: "Marine battery system installed onboard during an electric conversion",
    Icon: BatteryCharging,
    to: "/marine/retrofit/vessel-retrofit",
    cta: "Electrify a boat",
    links: [
      { label: "Vessel Retrofit", to: "/marine/retrofit/vessel-retrofit" },
      { label: "Electric Propulsion Kit", to: "/marine/retrofit/electric-propulsion-kit" },
      { label: "B-Kool battery", to: "/products" },
    ],
  },
  {
    kicker: "Advisory",
    title: "Engineering Advisory",
    body: "Independent engineering support for solar and storage investments — owner's engineering, technical due diligence and BESS advisory.",
    image: advisoryEngImg.url,
    alt: "Engineer reviewing a solar installation on site",
    Icon: Cpu,
    to: "/engineering-advisory",
    cta: "Engineering Advisory",
    links: [
      { label: "Owner's Engineering", to: "/engineering-advisory/owners-engineering" },
      { label: "Technical Due Diligence", to: "/engineering-advisory/technical-due-diligence" },
      { label: "BESS Advisory", to: "/engineering-advisory/bess-advisory" },
    ],
  },
];

/** Rotating word column — reference "OUR DIFFERENCE" band. */
const DIFF_WORDS = ["INNOVATIVE", "SUSTAINABLE", "PRECISE", "RESPONSIBLE"];

const LOCATIONS = [
  {
    name: "Kerala, India",
    x: 71.2,
    y: 52.6,
    entity: "YESEN Technologies Pvt Ltd",
    address: ["5th floor, YESEN Enclave, Vallamattam Estate", "Ravipuram, Kochi, Kerala 682015"],
    phone: "+91 77080 07554",
    lat: 9.9702,
    lng: 76.2807,
  },
  {
    name: "Delaware, USA",
    x: 25.4,
    y: 39.4,
    entity: "YESEN Technologies Inc.",
    address: ["8 The Green, Ste A", "Dover, DE 19901"],
    phone: "+1 33 2240 8989",
    lat: 39.1573,
    lng: -75.5244,
  },
  {
    name: "Dubai, UAE",
    x: 65.1,
    y: 44.6,
    entity: "YESEN Technologies — MENA",
    address: ["Malaysian Trade Center Building, 114 Oud Metha", "PO Box 7854, Dubai, UAE"],
    phone: "+971 568 089 912",
    lat: 25.2436,
    lng: 55.3122,
  },
  {
    name: "Darwin, Australia",
    x: 82.6,
    y: 70.5,
    entity: "YESEN Technologies Pvt Ltd",
    address: ["4 Dalurrba, Lyons", "Darwin, NT – 0810"],
    phone: "+61 411 899 154",
    lat: -12.405,
    lng: 130.88,
  },
];

const STATS = [
  { label: "Countries served", value: 12 },
  { label: "Solar installations", value: 200, suffix: "+" },
  { label: "Projects completed", value: 85, suffix: "+" },
  { label: "Stakeholders impacted", value: 50, suffix: "k+" },
];


/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

/** Scroll-parallax tile used in the staggered "Our Story" collage. */
function DriftTile({
  children,
  depth = 60,
  className = "",
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  return (
    <motion.div ref={ref} style={{ y }} className={`uc-tile ${className}`}>
      {children}
    </motion.div>
  );
}

/** Reference "OUR DIFFERENCE" band: fixed phrase + rotating word stack. */
function DifferenceBand() {
  const [active, setActive] = useState(0);
  const reduce = false as boolean;

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % DIFF_WORDS.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="uc-diff">
      <div className="uc-diff-inner">
        <p className="uc-eyebrow">Our Difference</p>
        <span className="uc-diff-mark">::</span>
        <p className="uc-diff-phrase">Everything we build is</p>
        <ul className="uc-diff-words" aria-label="Yesen difference">
          {DIFF_WORDS.map((word, i) => (
            <li key={word} className={`uc-diff-word ${active === i ? "is-active" : ""}`}>
              {word}
            </li>
          ))}
        </ul>
        <span className="uc-diff-mark uc-diff-mark-end">::</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function AboutPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const [activeLocation, setActiveLocation] = useState(0);

  // Some browsers ignore the autoplay attribute on hydrated media; nudge it.
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const start = () => {
      const el = heroVideoRef.current;
      if (!el) return;
      el.muted = true;
      void el.play().catch(() => {});
    };
    start();
    const id = window.setTimeout(start, 600);
    window.addEventListener("pointerdown", start, { once: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointerdown", start);
    };
  }, []);



  return (
    <div className="about-page uc-about relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />
      <div className="about-particles" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>

      <SiteHeader />

      <main className="relative z-10">
        {/* ------------------------------------------------ SECTION 1 — HERO */}
        <section ref={heroRef} className="relative isolate overflow-hidden">
          <div className="about-ring about-ring-a" aria-hidden="true" />
          <div className="about-ring about-ring-b" aria-hidden="true" />

          <div className="about-hero-stage">
            <div className="about-hero-media" aria-hidden="true">
              <video
                ref={heroVideoRef}
                src={heroVideo.url}
                className="about-hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={(event) => {
                  const el = event.currentTarget;
                  el.muted = true;
                  void el.play().catch(() => {});
                }}
              />
              <div className="about-hero-scrim" />
            </div>

            <div className="uc-hero-inner">
              <motion.p
                className="uc-hero-kicker"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                Engineering the future of
              </motion.p>

              <h1 className="uc-hero-title">
                <MaskLines lines={["CLEAN ENERGY ON", "LAND AND WATER"]} />
              </h1>

              <div className="uc-hero-foot">
                <motion.p
                  className="uc-hero-lede"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  YESEN Technologies Pvt Ltd develops sustainable engineering across three
                  service lines: land-based solar and battery systems, boat electrification for new and
                  existing vessels, and engineering advisory for solar and BESS projects.
                </motion.p>

                <motion.div
                  className="uc-hero-actions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href="#capabilities" className="about-btn about-btn-primary">
                    Explore What We Do <ArrowRight size={16} />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- SECTION 2 — OUR STORY */}
        <section className="uc-section">
          <div className="uc-shell uc-story">
            <div className="uc-story-copy">
              <div className="uc-story-sticky">
                <p className="uc-eyebrow">Our Story</p>
                <h2 className="uc-story-lead">
                  <MaskLines lines={["It’s not about us —", "it’s about the energy transition."]} />
                </h2>
                <div className="uc-story-body">
                  <p>
                    YESEN Technologies Pvt Ltd was founded in 2019 to develop, integrate, and
                    deliver sustainable products and engineering solutions for land-based solar, boat electrification and clean energy projects.
                  </p>
                  <p>We believe innovation becomes meaningful only when it solves real-world problems.</p>
                  <p>
                    Our expertise includes design, fabrication, retrofitting, testing, launching, and
                    commissioning.
                  </p>
                </div>
              </div>
            </div>

            <div className="uc-story-collage">
              <DriftTile depth={70} className="uc-tile-a">
                <div className="uc-frame uc-frame-video">
                  <video
                    className="uc-story-video"
                    data-src={ourStoryVideo.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    title="YESEN Technologies Pvt Ltd film"
                  />
                </div>
              </DriftTile>

              {STORY_CARDS.map(({ title, body, Icon }, i) => (
                <DriftTile
                  key={title}
                  depth={45 + i * 18}
                  className={["uc-tile-b", "uc-tile-c", "uc-tile-d", "uc-tile-e"][i]}
                >
                  <article className="uc-note">
                    <span className="about-icon">
                      <Icon size={18} />
                    </span>
                    <h3 className="uc-note-title">{title}</h3>
                    <p className="uc-note-body">{body}</p>
                  </article>
                </DriftTile>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------- SECTION 2B — THREE AREAS OF WORK */}
        <section className="uc-section">
          <div className="uc-shell">
            <div className="uc-stand-head">
              <h2 className="uc-big">
                <MaskLines lines={["LAND, MARINE,", "BOATS & ADVISORY"]} className="uc-big-mask" />
              </h2>
              <Reveal delay={0.12}>
                <p className="uc-stand-note">
                  One engineering team working across four areas — solar power on land, clean marine
                  projects, electrification of new and existing boats, and engineering advisory.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
              {FOCUS_AREAS.map((area, i) => (
                <Reveal key={area.title} delay={(i % 2) * 0.1}>
                  <article className="group relative flex h-full min-h-[34rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-brand-navy">
                    <img
                      src={area.image}
                      alt={area.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: "pos" in area ? (area as { pos: string }).pos : undefined }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/5" />
                    <span className="absolute left-6 top-6 rounded-full bg-background/85 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-brand-navy backdrop-blur">
                      {String(i + 1).padStart(2, "0")} · {area.kicker}
                    </span>
                    <div className="relative p-7 sm:p-9">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-brand-ivory/25 bg-brand-ivory/10 text-brand-ivory backdrop-blur">
                        <area.Icon size={19} />
                      </span>
                      <h3 className="display-xl mt-5 text-[clamp(1.7rem,2.6vw,2.4rem)] text-brand-ivory">{area.title}</h3>
                      <p className="mt-3 max-w-lg text-[0.95rem] leading-[1.75] text-brand-ivory/75">{area.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {area.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              to={l.to}
                              className="inline-flex items-center gap-1.5 rounded-full border border-brand-ivory/20 bg-brand-ivory/10 px-3.5 py-1.5 text-[0.8rem] font-medium text-brand-ivory backdrop-blur transition-colors hover:bg-brand-ivory hover:text-brand-navy"
                            >
                              {l.label} <ArrowRight size={12} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link to={area.to} className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-ivory">
                        {area.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------- SECTION 3 — OUR DIFFERENCE */}
        <DifferenceBand />

        {/* ------------------------------------- SECTION 4 — MISSION & VISION */}
        <section className="uc-section">
          <div className="uc-shell">
            <p className="uc-eyebrow">Our Mission &amp; Vision</p>
            <div className="uc-fea">
              {[
                {
                  label: "Mission",
                  body: "Accelerating the transition toward clean energy on land and electric transport on water.",
                  Icon: Compass,
                },
                {
                  label: "Vision",
                  body: "Cleaner power for communities, businesses and waterways.",
                  Icon: Waves,
                },
              ].map(({ label, body, Icon }, i) => (
                <motion.article
                  key={label}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.12 }}
                  className="uc-fea-panel"
                >
                  <span className="uc-fea-ghost" aria-hidden="true">
                    {label.toUpperCase()}
                  </span>
                  <span className="about-icon about-icon-lg">
                    <Icon size={22} />
                  </span>
                  <h3 className="uc-fea-title">{label.toUpperCase()}</h3>
                  <p className="uc-fea-body">{body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------ SECTION 5 — WHAT WE STAND FOR */}
        <section className="uc-section uc-stand">
          <div className="uc-shell">
            <div className="uc-stand-head">
              <h2 className="uc-big">
                <MaskLines lines={["WHAT WE", "STAND FOR"]} className="uc-big-mask" />
              </h2>
              <Reveal delay={0.12}>
                <p className="uc-stand-note">
                  Our values aren’t a list on the wall. They shape every decision we make, every
                  drawing we release and every system we commission, on land or on water.
                </p>
              </Reveal>
            </div>

            <ul className="uc-rows">
              {VALUES.map(({ title, body, Icon }, i) => (
                <motion.li
                  key={title}
                  className="uc-row"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="uc-row-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="uc-row-title">{title.toUpperCase()}</h3>
                  <p className="uc-row-body">{body}</p>
                  <span className="uc-row-icon">
                    <Icon size={18} strokeWidth={1.4} />
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------ SECTION 6 — OUR CAPABILITIES */}
        <section id="capabilities" className="uc-section scroll-mt-16">
          <div className="uc-shell">
            <div className="uc-stand-head">
              <h2 className="uc-big">
                <MaskLines lines={["WHAT WE", "ACTUALLY DO"]} className="uc-big-mask" />
              </h2>
              <Reveal delay={0.12}>
                <p className="uc-stand-note">
                  Seven disciplines, one delivery chain — from first sketch to site commissioning, sea trials and handover.
                </p>
              </Reveal>
            </div>

            <ul className="uc-rows">
              {CAPABILITIES.map(({ title, body, Icon }, i) => (
                <motion.li
                  key={title}
                  className="uc-row"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="uc-row-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="uc-row-title">{title.toUpperCase()}</h3>
                  <p className="uc-row-body">{body}</p>
                  <span className="uc-row-icon">
                    <Icon size={18} strokeWidth={1.4} />
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------- SECTION 7 — GLOBAL IMPACT */}
        <section className="uc-section">
          <div className="uc-shell">
            <div className="uc-trade-head">
              <h2 className="uc-big uc-big-stack">
                <MaskLines lines={["BUILT", "FOR A", "GLOBAL", "FOOTPRINT"]} className="uc-big-mask" />
              </h2>
              <Reveal delay={0.1} className="uc-trade-note">
                <p>
                  Yesen operates from offices in Kerala, Delaware, Dubai and Darwin,
                  supported by a network of fabricators, integrators and service partners.
                </p>
                <p>
                  That footprint lets us hold local expertise close to every site and vessel while delivering
                  the same engineering standard across every market we serve.
                </p>
              </Reveal>
            </div>

            <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.65fr]">
              <Reveal from="left" className="h-full">
                <div className="about-card about-map flex h-full flex-col">
                  <div className="about-map-canvas">
                    <svg viewBox="0 0 1000 500" className="about-map-grid" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <path className="about-map-land" d={WORLD_DOTS} />
                      {LOCATIONS.map((loc, i) => (
                        <circle
                          key={`halo-${loc.name}`}
                          className={`about-map-halo ${activeLocation === i ? "is-active" : ""}`}
                          cx={(loc.x / 100) * 1000}
                          cy={(loc.y / 100) * 500}
                          r={26}
                        />
                      ))}
                    </svg>

                    {LOCATIONS.map((loc, i) => (
                      <button
                        key={loc.name}
                        type="button"
                        onClick={() => setActiveLocation(i)}
                        style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                        className={`about-marker ${activeLocation === i ? "is-active" : ""}`}
                        aria-label={loc.name}
                      >
                        <span className="about-marker-dot" />
                        <span className="about-marker-label">{loc.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {LOCATIONS.map((loc, i) => (
                      <button
                        key={`tab-${loc.name}`}
                        type="button"
                        onClick={() => setActiveLocation(i)}
                        className={`rounded-full border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-colors ${
                          activeLocation === i
                            ? "border-brand-forest/40 bg-brand-forest/10 text-brand-forest"
                            : "border-brand-navy/12 bg-white/60 text-brand-navy/60 hover:text-brand-navy"
                        }`}
                      >
                        {loc.name}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="text-sm leading-relaxed text-brand-navy/70">
                      <p className="font-display text-lg text-brand-navy">{LOCATIONS[activeLocation].name}</p>
                      <p className="mt-2 font-medium text-brand-navy/85">{LOCATIONS[activeLocation].entity}</p>
                      {LOCATIONS[activeLocation].address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                      <p className="mt-2 font-mono text-xs tracking-wide text-brand-navy/60">
                        {LOCATIONS[activeLocation].phone}
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white/60">
                      <iframe
                        key={LOCATIONS[activeLocation].name}
                        title={`Map of ${LOCATIONS[activeLocation].name} office`}
                        className="h-56 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://maps.google.com/maps?q=${LOCATIONS[activeLocation].lat},${LOCATIONS[activeLocation].lng}&z=15&hl=en&output=embed`}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal from="right" className="h-full">
                <div className="grid h-full gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="about-card about-stat flex flex-col justify-center">
                      <p className="display-xl text-4xl text-brand-navy">
                        <Counter to={stat.value} suffix={stat.suffix ?? ""} />
                      </p>
                      <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-navy/55">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ------------------------------------------------ SECTION 9 — CTA */}
        <section className="relative px-6 pb-10 pt-0 sm:px-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card about-cta text-center">
              <h2 className="display-xl text-[clamp(2rem,3.6vw,3.4rem)]">
                Partner with <span className="about-highlight">YESEN Technologies Pvt Ltd</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-[1.8] text-brand-navy/70">
                The next chapter of green mobility will be written on rooftops, in solar fields and
                microgrids, and on water.
              </p>
              <div className="mt-6 flex justify-center">
                <Link to="/contact" className="about-btn about-btn-primary">
                  Start Your Journey <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <ManifestoPanel />

      <SiteFooter />
    </div>
  );
}
