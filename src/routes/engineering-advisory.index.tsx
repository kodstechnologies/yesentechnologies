import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { QuoteLink } from "@/components/QuoteModal";
import advisoryHeroVideo from "@/assets/advisory-hero-optimized.mp4.asset.json";
import heroAerial from "@/assets/advisory-hero-solar-farm.png.asset.json";
import engineerImg from "@/assets/advisory-engineer.jpg.asset.json";
import solarRows from "@/assets/advisory-solar-rows.jpg.asset.json";
import gridLines from "@/assets/advisory-grid-lines.jpg.asset.json";
import solarField from "@/assets/advisory-solar-field.jpg.asset.json";

const TITLE = "Solar + BESS Engineering Advisory | YESEN Technologies Pvt Ltd";
const DESC =
  "Independent Owner's Engineering, technical due diligence and BESS advisory across the full Solar + BESS lifecycle — from concept to operations.";

export const Route = createFileRoute("/engineering-advisory/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://yesen.website/assets/emarine-decarbonize-PE95gLeC.jpg" },
      { name: "twitter:image", content: "https://yesen.website/assets/emarine-decarbonize-PE95gLeC.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/engineering-advisory" }],
  }),
  component: AdvisoryPage,
});

const CHALLENGES = [
  ["Grid integration", "Interconnection and compliance requirements are becoming project-critical."],
  ["Technology selection", "Choosing the right BESS configuration and OEM affects performance for decades."],
  ["EPC/OEM coordination", "Multiple contractors and suppliers must be aligned to a single technical outcome."],
  ["Performance guarantees", "Yield, availability and degradation assumptions need independent verification."],
  ["Construction quality", "Design intent has to survive contact with the construction site."],
  ["Commissioning", "Systems must prove they perform to specification before handover."],
  ["Warranty & degradation", "Long-term asset value depends on evidence gathered from day one."],
  ["Bankability", "Lenders and investors need independent technical evidence, not vendor assurance."],
];

const LIFECYCLE = [
  ["Develop", "Feasibility studies & concept design"],
  ["Procure", "Technical specs, RFP support, bid evaluation"],
  ["Build", "Design review, construction QA/QC"],
  ["Operate", "Warranty support, asset optimisation"],
  ["Transact", "Technical due diligence, investor support"],
];

const OE = [
  "Your technical representative",
  "Site & resource review",
  "Detailed design review (PV/BESS, SLDs, SCADA/EMS)",
  "Supply chain & OEM due diligence",
  "Construction site supervision",
  "Commissioning & performance testing",
];

const IE = [
  "Technical Due Diligence (TDD)",
  "Energy & Performance Yield Review",
  "BESS Technical Review (Augmentation, Fire Safety, Degradation)",
  "Contract & Bankability Support",
  "Risk Register & Mitigation Planning",
];

const BESS = [
  ["Augmentation & degradation", "Independent review of long-term capacity planning and degradation risk."],
  ["Fire & safety review", "Independent assessment of BESS safety design and risk."],
  ["Integrated PV/BESS design review", "BESS reviewed as part of the wider electrical and controls design."],
  ["BESS supply chain review", "OEM due diligence extended to battery technology suppliers."],
  ["System architecture & sizing", "Dedicated standalone sizing studies."],
  ["PCS / EMS review", "Standalone controls-level technical review."],
  ["Thermal management", "Dedicated thermal-risk assessment."],
  ["Integration studies", "Formal Solar + BESS integration deliverable."],
];

const PROTECT = [
  ["CAPEX", "Avoiding unnecessary design cost and technically unsuitable procurement decisions."],
  ["Quality", "Independent review of design, equipment and construction execution."],
  ["Performance", "Protecting energy yield, availability and BESS performance against project objectives."],
  ["Bankability", "Identifying technical risks before they affect financing, contracts or investment decisions."],
];

const WHY = [
  ["Scalable support", "Our platform is designed to handle multi-country, multi-project pipelines."],
  ["Global standard + local execution", "Regional grid code knowledge combined with international technical benchmarks."],
  ["Risk-first approach", "We focus on actionable risk, not paperwork."],
  ["Technical control tower", "Not bureaucracy — one independent point of engineering judgment."],
];

const REGIONS = [
  ["Australia", "400+", "29"],
  ["United States", "45+", "18"],
  ["South Africa", "10+", "24"],
  ["Vietnam", "05", "2"],
  ["India", "25+", "400"],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-brand-forest">
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display-xl mt-4 max-w-3xl text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] text-brand-navy">
      {children}
    </h2>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 border-l-2 border-brand-leaf pl-5 text-[0.95rem] leading-[1.8] text-brand-navy">
      <strong>What this means for you:</strong> {children}
    </p>
  );
}

function Grid({ items, cols = 4 }: { items: string[][]; cols?: number }) {
  return (
    <div
      className={`mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 ${
        cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"
      }`}
    >
      {items.map(([t, d], i) => (
        <div key={t} className="bg-background p-6">
          <span className="font-mono text-[0.65rem] tracking-[0.28em] text-brand-leaf">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="display-xl mt-3 text-lg text-brand-navy">{t}</h3>
          <p className="mt-2 text-[0.9rem] leading-[1.7] text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}

const section = "px-6 py-14 sm:px-10 sm:py-20";
const inner = "mx-auto w-full max-w-[70rem]";

function Figure({ src, alt, ratio = "aspect-[21/9]" }: { src: string; alt: string; ratio?: string }) {
  return (
    <figure className={`mt-10 overflow-hidden rounded-3xl border border-border ${ratio}`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </figure>
  );
}

function AdvisoryPage() {
  return (
    <div className="advisory-page relative min-h-screen bg-canvas font-sans text-foreground antialiased">
      <SiteHeader heroDark />
      <main className="relative z-10">
        <section className="advisory-overview-hero relative isolate w-full overflow-hidden bg-brand-navy">
          <div className="relative min-h-[28rem] w-full sm:min-h-[36rem]">
            <video
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full origin-center object-cover [backface-visibility:hidden]"
              style={{
                transform: "translate3d(-50%, -50%, 0)",
                filter: "contrast(1.05) saturate(1.07)",
              }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              tabIndex={-1}
              aria-hidden="true"
            >
              <source src={advisoryHeroVideo.url} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 z-10 bg-brand-navy/50" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-brand-navy/90 via-brand-navy/55 to-transparent sm:h-52" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-brand-navy/85 via-brand-navy/45 to-transparent sm:h-56" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-brand-navy/70 via-brand-navy/35 to-transparent sm:w-3/4" />
          <div className={inner + " relative z-20 px-6 pt-32 pb-14 sm:px-10 sm:pt-40"}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-leaf/40 bg-brand-leaf/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-brand-leaf">
              <Compass className="h-3.5 w-3.5" strokeWidth={1.8} />
              Engineering Advisory
            </span>
            <h1 className="display-xl mt-6 max-w-4xl text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1.05] text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.55)]">
              Solar + BESS{" "}
              <span className="accent-italic text-brand-leaf [text-shadow:0_2px_18px_rgb(0_0_0/0.65)]">Engineering Advisory</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.85] text-white/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.5)] sm:text-lg">
              Your independent technical partner — from project concept to operations.
            </p>
            <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-2">
              <div>
                <Eyebrow>Mission</Eyebrow>
                <p className="mt-3 leading-[1.8] text-white/80">
                  Address the world's energy crisis by making clean and affordable energy available
                  for everyone — transforming industries with clean, innovative technology for a
                  sustainable future.
                </p>
              </div>
              <div>
                <Eyebrow>Vision</Eyebrow>
                <p className="mt-3 leading-[1.8] text-white/80">
                  An equal world where everyone has access to affordable, reliable and sustainable
                  energy.
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className={section}>
          <div className={inner}>
            <Eyebrow>The industry challenge</Eyebrow>
            <H2>Solar + BESS projects carry technical risk that grows with complexity</H2>
            <Grid items={CHALLENGES} />
          </div>
        </section>

        <section className={`${section} bg-secondary`}>
          <div className={inner}>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Eyebrow>Where we fit</Eyebrow>
                <H2>The technical bridge</H2>
                <p className="mt-6 leading-[1.85] text-muted-foreground">
                  YESEN Technologies acts as the independent technical bridge between investors,
                  developers, EPCs, lenders and equipment suppliers. We sell engineering judgment, not
                  just drafting hours.
                </p>
                <ul className="mt-6 space-y-3 text-brand-navy">
                  <li>• Repeatable delivery playbook: concept to operations</li>
                  <li>• Regional execution with international standards</li>
                  <li>• Independent decisions on design, risk and bankability</li>
                </ul>
                <Note>
                  we sit on your side of the table — one independent engineering voice from first
                  feasibility sketch to final handover, accountable only to your project's outcome.
                </Note>
              </div>
              <figure className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={engineerImg.url}
                  alt="Engineer reviewing systems on a laptop"
                  loading="lazy"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </figure>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                ["Development & procurement", ["Feasibility studies", "Concept design", "RFP & technical specs", "Bid evaluation"]],
                ["Execution & operations", ["Construction quality (QA/QC)", "Warranty & asset optimisation", "Lender/investor support (TDD)"]],
              ].map(([h, list]) => (
                <div key={h as string} className="rounded-2xl border border-border bg-background p-7">
                  <Eyebrow>{h as string}</Eyebrow>
                  <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-brand-navy">
                    {(list as string[]).map((l) => (
                      <li key={l} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-leaf" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={section}>
          <div className={inner}>
            <Eyebrow>Our advisory lifecycle</Eyebrow>
            <H2>Support across the complete Solar + BESS lifecycle</H2>
            <Grid items={LIFECYCLE} cols={5} />
            <Note>one partner across the entire project — no risk of things falling between phases.</Note>
          </div>
        </section>

        <section className={`${section} bg-secondary`}>
          <div className={`${inner} grid gap-10 lg:grid-cols-2`}>
            <div>
              <Eyebrow>Owner's engineering</Eyebrow>
              <H2>Your technical representative, concept through handover</H2>
              <ol className="mt-8 space-y-3">
                {OE.map((o, i) => (
                  <li key={o} className="flex gap-4 border-b border-border pb-3 text-brand-navy">
                    <span className="font-mono text-[0.7rem] text-brand-leaf">{String(i + 1).padStart(2, "0")}</span>
                    {o}
                  </li>
                ))}
              </ol>
              <Note>confidence that CAPEX, schedule and technical quality are actively protected — not just documented after the fact.</Note>
            </div>
            <div>
              <Eyebrow>Independent engineering / TDD</Eyebrow>
              <H2>One independent opinion, for every stakeholder</H2>
              <p className="mt-6 leading-[1.8] text-muted-foreground">
                An independent technical opinion for investors, lenders and asset owners.
              </p>
              <ol className="mt-6 space-y-3">
                {IE.map((o, i) => (
                  <li key={o} className="flex gap-4 border-b border-border pb-3 text-brand-navy">
                    <span className="font-mono text-[0.7rem] text-brand-leaf">{String(i + 1).padStart(2, "0")}</span>
                    {o}
                  </li>
                ))}
              </ol>
              <Note>serves developers, investors, lenders and asset owners alike — one opinion usable by every party in a transaction.</Note>
            </div>
          </div>
          <div className={`${inner} mt-4`}>
            <Figure src={solarRows.url} alt="Rows of solar panels under a clear sky" ratio="aspect-[21/8]" />
          </div>
        </section>

        <section className={section}>
          <div className={inner}>
            <Eyebrow>BESS technical advisory</Eyebrow>
            <H2>Dedicated depth where hybrid projects carry the most risk</H2>
            <Grid items={BESS} />
            <Note>the safety, degradation and integration risks unique to hybrid systems get specialist attention a standalone solar review would miss.</Note>
            <Figure src={gridLines.url} alt="High-voltage grid transmission lines at sunset" ratio="aspect-[21/8]" />
          </div>
        </section>

        <section className={`${section} bg-secondary`}>
          <div className={inner}>
            <Eyebrow>How we protect your project</Eyebrow>
            <H2>Independent insight. Lower risk. Better outcomes.</H2>
            <Grid items={PROTECT} />
          </div>
        </section>

        <section className={section}>
          <div className={inner}>
            <Eyebrow>Why work with us</Eyebrow>
            <H2>Independence, integration and execution</H2>
            <Grid items={WHY} />
          </div>
        </section>

        <section className={`${section} bg-secondary`}>
          <div className={inner}>
            <Eyebrow>Sample projects</Eyebrow>
            <H2>Representative Owner's and Independent Engineering engagements</H2>
            <Figure src={solarField.url} alt="Ground-mounted solar plant in a green field" ratio="aspect-[21/8]" />
            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-border py-8">
              {[["5", "Countries"], ["485+", "Projects engineered"], ["473 MWp", "Capacity engineered (DC)"]].map(([n, l]) => (
                <div key={l}>
                  <div className="display-xl text-[clamp(1.6rem,4vw,3rem)] text-brand-navy">{n}</div>
                  <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {REGIONS.map(([c, p, m]) => (
                <div key={c} className="rounded-2xl border border-border bg-background p-5">
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brand-forest">{c}</div>
                  <div className="display-xl mt-3 text-2xl text-brand-navy">{p}</div>
                  <div className="text-xs text-muted-foreground">projects</div>
                  <div className="mt-2 text-sm text-brand-navy">{m} MWp DC</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={section}>
          <div className={`${inner} text-center`}>
            <Eyebrow>Let's talk</Eyebrow>
            <h2 className="display-xl mx-auto mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] text-brand-navy">
              Engineering confidence for{" "}
              <span className="accent-italic text-brand-forest">Solar + BESS</span> investments
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Let's discuss your upcoming Solar + BESS project.
            </p>
            <QuoteLink
              initial={{ service: "advisory" }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3 text-sm text-background transition-opacity hover:opacity-90"
            >
              Get a quote <ArrowRight className="h-4 w-4" />
            </QuoteLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
