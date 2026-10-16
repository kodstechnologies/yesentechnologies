import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Bell,
  Bluetooth,
  Cable,
  CircuitBoard,
  Cloud,
  Cpu,
  Gauge,
  LayoutDashboard,
  LineChart,
  Leaf,
  Nfc,
  Recycle,
  Ship,
  ShieldCheck,
  Smartphone,
  Sun,
  Thermometer,
  Timer,
  Volume2,
  Waves,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";
import { useRef } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

import heroVideo from "@/assets/products-hero-bkool-optimized.mp4.asset.json";
import shotBkool from "@/assets/product-bkool.jpg";
import shotElco from "@/assets/elco-ep-50.jpg.asset.json";
import { BKOOL } from "@/content/company";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products | YESEN Technologies Pvt Ltd — Marine Electrification Systems" },
      {
        name: "description",
        content:
          "B-KOOL — the YESEN Technologies IRS-approved marine LFP battery system with integrated BMS, and thermal management.",
      },
      {
        property: "og:title",
        content: "Products | YESEN Technologies Pvt Ltd — Marine Electrification Systems",
      },
      {
        property: "og:description",
        content:
          "Discover the next generation of marine electrification technologies — cleaner, quieter, smarter and more sustainable waterways.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/products" }],
  }),
  component: ProductsPage,
});

/* -------------------------------------------------------------------------- */

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
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

const PRODUCTS = [
  {
    no: "01",
    name: "B-KOOL",
    tag: "Marine Battery System",
    body: "Advanced LFP battery systems engineered for marine applications with maximum safety, reliability and performance.",
    image: shotBkool,
    accent: "leaf" as const,
    to: "/products/b-kool" as const,
    chips: [
      ...BKOOL.certifications.map((label) => ({ label, Icon: BadgeCheck })),
      { label: "Integrated BMS", Icon: CircuitBoard },
      { label: "Wi-Fi Connectivity", Icon: Wifi },
      { label: "Bluetooth Monitoring", Icon: Bluetooth },
      { label: "CAN & Modbus", Icon: Cable },
      { label: "Hot Swap Ready", Icon: Nfc },
      { label: "Thermal Management", Icon: Thermometer },
    ],
  },
  {
    no: "02",
    name: "ELCO",
    tag: "EP-Series Electric Outboards",
    body: "Electric outboards, engineered into complete propulsion systems by YESEN Technologies. Explore the ELCO EP-20, EP-30 and EP-50 with vessel assessment, battery integration, controls and installation support.",
    image: shotElco.url,
    accent: "leaf" as const,
    to: "/products/elco" as const,
    chips: [
      { label: "48 V & 96 V Systems", Icon: BatteryCharging },
      { label: "Brushless PMAC", Icon: Zap },
      { label: "Tiller or Remote", Icon: Gauge },
      { label: "Battery Integration", Icon: CircuitBoard },
      { label: "Charging Engineering", Icon: Cable },
      { label: "Installation Support", Icon: Wrench },
    ],
  },
];


const BENEFITS = [
  { label: "Zero Emissions", Icon: Leaf },
  { label: "Reduced Operating Costs", Icon: LineChart },
  { label: "Silent Operation", Icon: Volume2 },
  { label: "Reduced Maintenance", Icon: Wrench },
  { label: "Longer Service Life", Icon: Timer },
  { label: "Greater Reliability", Icon: ShieldCheck },
  { label: "Sustainable Transport", Icon: Recycle },
  { label: "Intelligent Monitoring", Icon: Cpu },
];


/* -------------------------------------------------------------------------- */

function ProductsPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />
      <div className="about-particles" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>

      <SiteHeader />

      <main className="relative z-10">
        {/* -------------------------------------------------- HERO */}
        <section ref={heroRef} className="relative isolate overflow-hidden">
          <div className="about-ring about-ring-a" aria-hidden="true" />
          <div className="about-ring about-ring-b" aria-hidden="true" />

          <div className="pd-hero-stage">
            <div className="pd-hero-media" aria-hidden="true">
              <video
                className="pd-hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={heroVideo.url} type="video/mp4" />
              </video>
              <div className="pd-hero-scrim" />
            </div>

            <div className="pd-hero-inner mx-auto w-full max-w-[100rem]">
              <Reveal className="relative z-10">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-navy/12 bg-white/70 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-forest shadow-[0_10px_30px_-20px_rgb(12_46_92/0.6)] backdrop-blur-xl">
                    <Waves size={13} className="about-float" /> Our Products
                  </span>
                  <span className="pd-hero-meta text-brand-navy/45">B-KOOL / IRS approved LFP</span>
                </div>

                <h1 className="pd-hero-title display-xl mt-8 max-w-4xl text-[clamp(2.3rem,5vw,4.4rem)] leading-[1.06]">
                  Powering the Future of{" "}
                  <span className="pd-hero-accent">Clean Energy</span> on Land and Water
                </h1>

                <div className="pd-hero-rule mt-9 max-w-3xl" />

                <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <p className="pd-hero-copy max-w-lg text-[0.95rem] leading-[1.85] text-brand-navy/80">
                    Discover the next generation of marine electrification technologies engineered to
                    create cleaner, quieter, smarter and more sustainable waterways.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                    <a href="#catalogue" className="about-btn about-btn-primary">
                      Explore Products <ArrowRight size={16} />
                    </a>
                  </div>

                </div>
              </Reveal>
            </div>

          </div>
        </section>


        {/* -------------------------------------------- PRODUCT CARDS */}
        <section id="catalogue" className="relative scroll-mt-16 px-6 py-10 sm:px-12 lg:py-12">
          <div className="mx-auto grid w-full max-w-[100rem] gap-6 lg:grid-cols-2 lg:items-stretch">
            {PRODUCTS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={(i % 2) * 0.08}
                from={i % 2 ? "right" : "left"}
                className="h-full"
              >
                <article
                  className={`about-card product-card product-${p.accent} relative flex h-full flex-col${
                    !("to" in p && p.to) ? " product-card-fill" : ""
                  }`}
                >

                  <div className="product-shot">
                    <img decoding="async" src={p.image} alt={`${p.name} — ${p.tag}`} loading="lazy" />
                  </div>

                  <span className="product-no">{p.no}</span>
                  <h2 className="product-name">{p.name}</h2>
                  <p className="mt-1 font-display text-lg text-brand-navy">{p.tag}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-navy/65">{p.body}</p>

                  {p.chips.length > 0 && (
                    <div className="mt-6 grid gap-3 border-t border-brand-navy/8 pt-6 sm:grid-cols-3">
                      {p.chips.map(({ label, Icon }) => (
                        <div key={label} className="product-chip">
                          <span className="product-chip-icon about-float">
                            <Icon size={15} strokeWidth={1.6} />
                          </span>
                          {label}
                        </div>
                      ))}
                    </div>
                  )}

                  {"to" in p && p.to ? (
                    <Link to={p.to} aria-label={`Explore ${p.name}`} className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" />
                  ) : (
                    <p className="mt-auto flex items-center gap-2 pt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-navy/45">
                      <span className="h-px w-6 bg-brand-navy/20" />
                      Partner brand
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -------------------------------------------- BENEFITS */}
        <section className="relative px-6 py-10 sm:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal className="text-center">
              <p className="about-eyebrow">Why It Matters</p>
              <h2 className="display-xl mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
                Built for a Cleaner Tomorrow
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
              {BENEFITS.map(({ label, Icon }, i) => (
                <Reveal key={label} delay={(i % 4) * 0.06}>
                  <div className="about-card flex h-full flex-col items-center gap-3 px-4 py-6 text-center">
                    <span className="about-icon about-float">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <p className="text-xs font-semibold leading-snug text-brand-navy/80">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
