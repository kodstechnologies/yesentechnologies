import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Anchor, BatteryCharging, Settings2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuoteModal } from "@/components/QuoteModal";
import { ELCO_MODELS, ELCO_COMPARISON, ELCO_INTEGRATION } from "@/content/elco";
import { MARINE_FAQS } from "@/content/marine-faqs";
import "@/styles/elco.css";

const images = [
  { url: "https://yesen-bucket.s3.ap-south-1.amazonaws.com/boat/elco-ep20-lifestyle.jpg.jpeg", alt: "ELCO EP-20 electric outboard operating on a red boat", caption: "EP-20 · On-water installation", type: "lifestyle" },
  { url: "https://yesen-bucket.s3.ap-south-1.amazonaws.com/boat/elco-ep-30.jpg.jpeg", alt: "ELCO EP-30 electric outboard showing its complete motor, shaft and propeller", caption: "EP-30 · Motor, shaft & propeller", type: "product" },
  { url: "https://yesen-bucket.s3.ap-south-1.amazonaws.com/boat/elco-ep50-action.jpg.jpeg", alt: "ELCO EP-50 electric outboard powering a yellow Whaly boat", caption: "EP-50 · Electric propulsion in operation", type: "lifestyle" },
];
const title = "ELCO EP-Series Electric Outboards | YESEN Technologies";
const description = "Explore ELCO EP-20, EP-30 and EP-50 electric outboards, with vessel assessment, marine battery integration, controls and commissioning by YESEN Technologies.";

export const Route = createFileRoute("/products/elco")({
  head: () => ({
    meta: [{ title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }],
    links: [{ rel: "canonical", href: "https://yesen.website/products/elco" }],
  }),
  component: ElcoPage,
});

function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = false as boolean;
  return <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .55 }}>{children}</motion.div>;
}

function ElcoFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="elco-faq-list">
    {MARINE_FAQS.map((f, i) => {
      const isOpen = open === i;
      return <div key={f.q} className="elco-faq-item">
        <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`elco-faq-a-${i}`} className="elco-faq-q">
          <span className="elco-faq-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <span className="elco-faq-text">{f.q}</span>
          <span className={`elco-faq-plus${isOpen ? " open" : ""}`} aria-hidden="true"><Plus size={16} strokeWidth={1.8} /></span>
        </button>
        {isOpen && <p id={`elco-faq-a-${i}`} className="elco-faq-a">{f.a}</p>}
      </div>;
    })}
  </div>;
}

function ElcoPage() {
  const { openQuote } = useQuoteModal();
  const enquire = (model?: string) => openQuote({ service: "products", type: model ? `ELCO ${model}` : "ELCO", message: model ? `I would like to enquire about the ELCO ${model} electric outboard.` : "I would like to discuss an ELCO electric propulsion project." });
  return <div className="elco-page font-sans">
    <main>
      <section className="elco-hero">
        <div className="elco-hero-visual">
          <img className="elco-hero-image" src="https://yesen-bucket.s3.ap-south-1.amazonaws.com/boat/elco-hero-landscape.jpg.jpeg" alt="ELCO electric outboard fitted to a red Whaly boat beside the water" fetchPriority="high" decoding="async" />
          <div className="elco-wrap elco-hero-copy">
            <Button asChild variant="link" className="h-auto p-0 text-brand-ivory"><Link to="/products"><ArrowLeft /> Back to Products</Link></Button>
            <p className="elco-eyebrow mt-7">Elco Motor Yachts · Electric Outboards</p>
            <h1>ELCO EP-Series</h1>
          </div>
          <p className="elco-hero-credit">Official Elco Motor Yachts imagery</p>
        </div>
        <div className="elco-wrap elco-hero-summary">
            <p>Electric outboards, engineered into complete propulsion systems by YESEN Technologies.</p>
            <div className="elco-hero-actions">
              <Button asChild size="lg"><a href="#motors">Explore the range <ArrowUpRight /></a></Button>
              <Button variant="outline" size="lg" onClick={() => enquire()}>Discuss your project <ArrowUpRight /></Button>
            </div>
        </div>
      </section>
      <div className="elco-band"><div className="elco-wrap">
        <span className="flex items-center gap-3"><Anchor size={19} /> EP-20 / EP-30 / EP-50</span>
        <span className="flex items-center gap-3"><BatteryCharging size={19} /> 48 V & 96 V battery systems</span>
        <span className="flex items-center gap-3"><Settings2 size={19} /> Engineered around your vessel</span>
      </div></div>

      <section className="elco-section elco-wrap">
        <Reveal><div className="elco-intro">
          <div><p className="elco-eyebrow">Marine electric propulsion</p><h2 className="elco-heading">More than a motor.<br />A complete system.</h2></div>
          <div className="elco-copy space-y-5">
            <p>Electric outboards let boat owners, builders and operators move away from petrol propulsion without redesigning the hull around an inboard drive. YESEN Technologies works with ELCO electric outboards manufactured by Elco Motor Yachts in the USA, matching the motor to your vessel, sizing and integrating the battery, designing the electrical and control architecture, and supporting installation.</p>
            <p>A motor is only one part of an electric boat. Performance, safety and reliability depend on how the motor, battery, protection and controls work together. YESEN assesses your vessel and its operational cycle first, then recommends a propulsion package — a system selected for your boat, rather than a motor chosen on horsepower alone.</p>
          </div>
        </div></Reveal>
      </section>

      <section id="motors" className="elco-models scroll-mt-20"><div className="elco-wrap">
        <div className="elco-models-head">
        <p className="elco-eyebrow">The EP-Series</p><h2 className="elco-heading">Three motors. The right fit for your boat.</h2>
        <div className="elco-model-links">{ELCO_MODELS.map(m => <Button key={m.id} asChild variant="outline"><a href={`#${m.id}`}>{m.name}<ArrowUpRight /></a></Button>)}</div>
        </div>
        {ELCO_MODELS.map((m, i) => <Reveal key={m.id}><article id={m.id} className={`elco-model-row ${i % 2 === 1 ? "elco-model-reverse" : ""}`}>
          <figure className={`elco-model-figure elco-model-${images[i]?.type}`}>
            <img className="elco-model-image" src={images[i]?.url} alt={images[i]?.alt} loading="lazy" decoding="async" />
            <figcaption>{images[i]?.caption}<span>Elco Motor Yachts</span></figcaption>
          </figure>
          <div className="elco-model-copy">
            <p className="elco-eyebrow">ELCO Electric Outboard</p><h3>{m.name}</h3>
            <dl className="elco-model-stats"><div><dt>Nominal voltage</dt><dd>{m.voltage} V</dd></div><div><dt>Electrical input</dt><dd>{m.inputKw} kW</dd></div><div><dt>Weight</dt><dd>{m.weightKg} kg</dd></div></dl>
            <p className="elco-copy">{m.description}</p>
            <h4>Key features</h4><ul className="elco-feature-list">{m.features.map(f => <li key={f}><Check size={15} /><span>{f}</span></li>)}</ul>
            <h4>Suitable applications</h4><ul className="elco-feature-list">{m.applications.map(a => <li key={a}><Anchor size={15} /><span>{a}</span></li>)}</ul>
            <p className="mt-5 text-xs text-muted-foreground">{m.weightLb} lb ({m.weightKg} kg) · max {m.rpm.toLocaleString("en-US")} RPM</p>
            <Button className="mt-6" size="lg" onClick={() => enquire(m.name)}>Enquire about the {m.name}<ArrowUpRight /></Button>
          </div>
        </article></Reveal>)}
      </div></section>

      <section className="elco-section elco-wrap">
        <p className="elco-eyebrow">Specifications</p><h2 className="elco-heading">Compare the EP-Series</h2>
        <p className="elco-copy mt-4 max-w-3xl">Elco’s comparable HP and replacement ranges are manufacturer designations, subject to vessel assessment. Electrical input is not shaft output power. Unconfirmed values remain TBC.</p>
        <div className="elco-table-shell" tabIndex={0} role="region" aria-label="ELCO motor technical comparison">
          <table className="elco-table"><caption className="sr-only">Technical comparison of ELCO EP-20, EP-30 and EP-50 electric outboards</caption><thead><tr><th scope="col">Specification</th>{ELCO_MODELS.map(m => <th key={m.id} scope="col">ELCO {m.name}</th>)}</tr></thead>
            <tbody>{ELCO_COMPARISON.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Product images: Elco Motor Yachts. Specifications as supplied; final system selection follows engineering assessment.</p>
      </section>

      <section className="elco-integration elco-section"><div className="elco-wrap">
        <p className="elco-eyebrow">YESEN integration</p><h2 className="elco-heading">Complete Marine Electric<br />Propulsion Solutions by YESEN</h2>
        <p className="elco-copy mt-5 max-w-3xl">Choosing a motor is one step in an electric propulsion project. YESEN Technologies brings the motor, battery, controls and charging together as one engineered system.</p>
        <div className="elco-integration-grid">{ELCO_INTEGRATION.map(([heading, copy], i) => <Reveal key={heading}><div className="elco-integration-item"><span className="elco-eyebrow">{String(i + 1).padStart(2, "0")}</span><h3>{heading}</h3><p>{copy}</p></div></Reveal>)}</div>
      </div></section>
      <section className="elco-section elco-wrap" aria-labelledby="elco-faq-title">
        <p className="elco-eyebrow">Electric propulsion FAQ</p>
        <h2 id="elco-faq-title" className="elco-heading">Your questions, answered.</h2>
        <p className="elco-copy mt-4 max-w-3xl">The questions we are most often asked about moving a vessel to electric propulsion. You will find more in our <Link className="elco-faq-link" to="/faq">full FAQ</Link>.</p>
        <div className="elco-faq-shell"><ElcoFaq /></div>
      </section>
      <section className="elco-next elco-section"><div className="elco-wrap"><div><h2 className="elco-heading">Your vessel. Your duty cycle.<br />Your propulsion system.</h2><p className="mt-5 text-sm">Start with a conversation about your boat and its requirements.</p></div><Button size="lg" variant="secondary" onClick={() => enquire()}>Discuss your electric propulsion project<ArrowUpRight /></Button></div></section>
    </main>
  </div>;
}