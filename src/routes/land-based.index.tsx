import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import solarAerial from "@/assets/advisory-hero-solar-aerial.jpg.asset.json";
import heroVideo from "@/assets/land-hero-solar.mp4.asset.json";
import { Button } from "@/components/ui/button";
import { QuoteLink } from "@/components/QuoteModal";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LAND_LINKS } from "@/lib/service-lines";
import { COMPARE, FAQS } from "@/content/land-solar";

const TITLE = "Solar Installation for Homes, Businesses and Industry | YESEN Technologies";
const DESC = "Grid-tie, hybrid and off-grid solar engineered by YESEN Technologies, from 3 kWp rooftops to 1 MWp solar farms.";

export const Route = createFileRoute("/land-based/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/land-based" }],
  }),
  component: LandPage,
});

const SERVICES = [
  { title: "Residential Solar", type: "Residential Solar", cta: "Enquire about home solar", body: "Rooftop systems for homes, starting from 3 kWp, as grid-tie, hybrid or off-grid installations.", points: ["Sized to your home — from your roof area and monthly consumption.", "Built for heavy monsoon rain and wind: mounting, cabling and protection.", "Net metering: where it applies, export surplus power and receive bill credits. We guide the application.", "Low upkeep: periodic panel cleaning and system checks.", "Backup option: choose hybrid if power cuts are a concern."] },
  { title: "Commercial Solar", type: "Commercial Solar", cta: "Enquire about commercial solar", body: "Solar for shops, offices, institutions and hospitality properties that want to reduce running costs and meet sustainability goals.", points: ["Energy and load assessment, so the system is sized to your actual needs.", "Guidance on financing options and incentives that may apply.", "A greener footprint that supports your sustainability targets and brand.", "Continuity: hybrid and off-grid designs keep critical loads running through outages."] },
  { title: "Industrial Solar", type: "Industrial Solar", cta: "Enquire about industrial solar", body: "Larger systems for factories and processing sites, where high daytime consumption can often use solar generation directly. We design around your load profile, available area and grid connection, on rooftops or on land.", points: [] },
  { title: "Solar Farms up to 1 MWp", type: "Solar Farm", cta: "Discuss a solar farm project", body: "Ground-mounted plants for landowners, developers and businesses that want a dedicated generation site. We handle design, installation and commissioning, with the system configuration confirmed for each project.", points: [] },
];

const WHY = [
  ["System-level engineering", "We design the whole system: panels, inverter, batteries where needed, protection and grid connection."],
  ["Honest sizing", "We recommend the size and type your site needs, not the largest system we can sell."],
  ["All three system types", "Grid-tie, hybrid and off-grid, so the recommendation is not limited to one design."],
  ["Homes to solar farms", "One team for a 3 kWp rooftop or a 1 MWp plant."],
  ["Support after installation", "We stay involved after commissioning."],
];

const PROCESS = [
  ["Consultation", "We learn about your energy needs and explain your solar options."],
  ["Site assessment", "A technical survey of your roof or land, shading and grid connection."],
  ["System selection and proposal", "We recommend grid-tie, hybrid or off-grid, size the system, and give you a savings estimate and subsidy guidance for eligible homes."],
  ["Installation and grid integration", "Professional installation, grid connection and testing."],
  ["Activation and after-sales support", "We commission the system and support it for long-term performance."],
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = false as boolean;
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Cta({ label, light = false, variant, contact = false }: { label: string; light?: boolean; variant?: "outline"; contact?: boolean }) {
  return <Button asChild size="lg" variant={variant} className={variant ? "land-cta-outline" : `solar-quote ${light ? "solar-quote-light" : ""}`}>
    {contact ? <Link to="/contact">{label} <ArrowUpRight aria-hidden="true" /></Link> : <QuoteLink initial={{ service: "land" }}>{label} <ArrowUpRight aria-hidden="true" /></QuoteLink>}
  </Button>;
}

function LandPage() {
  return <div className="solar-page font-sans">
    <SiteHeader heroDark />
    <main>
      <section className="solar-hero">
        <video className="solar-hero-image" src={heroVideo.url} poster={solarAerial.url} autoPlay muted loop playsInline preload="auto" aria-label="Aerial footage of ground-mounted solar arrays" />
        <div className="solar-hero-shade" />
        <div className="solar-inner solar-hero-inner">
          <div />
          <div className="solar-hero-copy">
            <span className="solar-eyebrow">YESEN / Land &amp; Earth</span>
            <h1>Solar for homes, businesses and industry</h1>
            <p className="solar-hero-subtitle">Cut your electricity costs with a solar system engineered by YESEN Technologies.</p>
            <p className="solar-hero-summary">Grid-tie, hybrid and off-grid systems, from 3 kWp rooftops to solar farms of 1 MWp.</p>
            <div className="land-cta-row"><Cta label="Get a Solar Estimate" light /><Cta label="Talk to a Solar Expert" variant="outline" contact /></div>
          </div>
          <div className="solar-hero-bottom"><div className="solar-hero-markers">{["Grid-tie", "Hybrid", "Off-grid", "3 kWp – 1 MWp"].map(m => <span key={m}><Check size={13} />{m}</span>)}</div></div>
        </div>
      </section>

      <section className="solar-section land-tiles-section"><div className="solar-inner">
        <nav className="land-tiles" aria-label="Solar system types">{LAND_LINKS.map((l, i) => <Link key={l.to} to={l.to} className="land-tile"><span className="solar-small-number">0{i + 1}</span><strong>{l.label}</strong><span className="land-tile-blurb">{l.blurb}</span><ArrowUpRight size={18} className="land-tile-arrow" aria-hidden="true" /></Link>)}</nav>
      </div></section>

      <section className="solar-intro solar-section"><div className="solar-inner">
        <Reveal className="solar-intro-grid"><div><span className="solar-eyebrow">01 / Built around your site</span><h2>Designed around how you <em>use power.</em></h2></div>
          <div className="solar-intro-copy"><p>The right solar system depends on how you use power, how reliable your grid supply is and whether you need electricity during outages. YESEN Technologies surveys your roof or land, studies your consumption and recommends the system type and size that fit. We then install it and support you after commissioning. Whether you are a homeowner, a business or an industrial site, all three system types — grid-tie, hybrid and off-grid — are available to you.</p></div></Reveal>
      </div></section>

      <section className="solar-section land-services"><div className="solar-inner">
        <Reveal className="solar-section-head"><div><span className="solar-eyebrow">02 / Our solar services</span><h2>From rooftops to <em>solar farms.</em></h2></div></Reveal>
        <div className="land-service-grid">{SERVICES.map((s, i) => <Reveal key={s.title} className="land-service">
          <span className="solar-small-number">0{i + 1}</span><h3>{s.title}</h3><p>{s.body}</p>
          {s.points.length > 0 && <ul>{s.points.map(p => <li key={p}><Check size={14} aria-hidden="true" />{p}</li>)}</ul>}
          <QuoteText type={s.type} label={s.cta} />
        </Reveal>)}</div>
      </div></section>

      <section className="solar-section"><div className="solar-inner">
        <Reveal className="solar-section-head"><div><span className="solar-eyebrow">03 / Choose the right system</span><h2>Grid-tie, hybrid or <em>off-grid.</em></h2></div><p>Explore each system in detail: {LAND_LINKS.slice(0, 3).map((l, i) => <span key={l.to}>{i > 0 && " · "}<Link to={l.to} className="land-inline-link">{l.label}</Link></span>)}</p></Reveal>
        <div className="land-table-wrap" role="region" aria-label="Solar system comparison" tabIndex={0}>
          <table className="land-table"><thead><tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col"><Link to="/land-based/grid-tie" className="land-inline-link">Grid-tie</Link></th><th scope="col"><Link to="/land-based/hybrid" className="land-inline-link">Hybrid</Link></th><th scope="col"><Link to="/land-based/off-grid" className="land-inline-link">Off-grid</Link></th></tr></thead>
            <tbody>{COMPARE.map(([k, ...v]) => <tr key={k}><th scope="row">{k}</th>{v.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table>
        </div>
      </div></section>

      <section className="solar-section land-subsidy"><div className="solar-inner land-two-col">
        <Reveal><span className="solar-eyebrow">04 / Government subsidy for home solar</span><p className="land-badge-row"><span className="land-badge">Residential only</span></p><h2>PM Surya Ghar: <em>Muft Bijli Yojana.</em></h2>
          <p className="land-para">Homeowners installing grid-connected rooftop solar may qualify for a central government subsidy. The scheme applies to residential rooftop systems only, so commercial and industrial projects are not covered. Applications are made on the national portal, <a className="land-inline-link" href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer">pmsuryaghar.gov.in</a>. We help you work out the right system size for your home and guide you through the process. Eligibility for systems with battery storage, such as hybrid, is confirmed at proposal stage.</p></Reveal>
        <Reveal><table className="land-table land-subsidy-table"><thead><tr><th scope="col">System capacity</th><th scope="col">Central subsidy</th></tr></thead>
          <tbody><tr><td>1 kW</td><td>₹30,000</td></tr><tr><td>2 kW</td><td>₹60,000</td></tr><tr><td>3 kW and above</td><td>₹78,000 (maximum)</td></tr></tbody></table></Reveal>
      </div></section>

      <section className="solar-section"><div className="solar-inner">
        <Reveal className="solar-section-head"><div><span className="solar-eyebrow">05 / Why choose YESEN Technologies</span><h2>Engineering you can <em>rely on.</em></h2></div></Reveal>
        <div className="solar-applications land-why">{WHY.map(([t, b], i) => <Reveal key={t} className="solar-application"><span className="solar-small-number">0{i + 1}</span><h3>{t}</h3><p>{b}</p></Reveal>)}</div>
        <div className="land-badge-row">{["Founded 2019", "48 MW land-based solar installed", "200+ MNRE-registered installations in Kerala"].map(b => <span key={b} className="land-badge">{b}</span>)}</div>
      </div></section>

      <section className="solar-delivery solar-section"><div className="solar-inner">
        <Reveal className="solar-section-head"><div><span className="solar-eyebrow">06 / Our process</span><h2>A smooth solar <em>journey.</em></h2></div><Cta label="Book a free consultation" contact /></Reveal>
        <div className="solar-delivery-grid land-process">{PROCESS.map(([t, b], i) => <Reveal key={t} className="solar-delivery-step"><span>{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{b}</p></Reveal>)}</div>
      </div></section>

      <section className="solar-faq solar-section"><div className="solar-inner solar-faq-grid">
        <Reveal><span className="solar-eyebrow">Frequently asked questions</span><h2>The questions <em>that matter.</em></h2><p>A useful proposal starts with the right information.</p></Reveal>
        <div>{FAQS.map(([q, a], i) => <details key={q} className="solar-faq-item"><summary><span className="solar-small-number">{String(i + 1).padStart(2, "0")}</span><h3>{q}</h3><Plus size={18} className="solar-faq-plus" /></summary><p>{a}</p></details>)}</div>
      </div></section>

      <section className="solar-next solar-section"><div className="solar-inner">
        <span className="solar-eyebrow">Explore solar systems</span>
        <nav className="solar-alternatives" aria-label="Solar systems">{LAND_LINKS.map((l, i) => <Link key={l.to} to={l.to} className="solar-alternative"><span className="solar-small-number">0{i + 1}</span><span>{l.label}</span><ArrowUpRight size={19} /></Link>)}</nav>
      </div></section>
    </main>
    <SiteFooter />
  </div>;
}

function QuoteText({ type, label }: { type: string; label: string }) {
  return <Button asChild variant="link" className="solar-text-link land-service-link"><QuoteLink initial={{ service: "land", type }}>{label} <ArrowUpRight size={15} aria-hidden="true" /></QuoteLink></Button>;
}
