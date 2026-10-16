import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "@/components/QuoteModal";
import { COMPARE, FAQS, SYSTEM_SUMMARY } from "@/content/land-solar";

const NAMES = { "grid-tie": "Grid-tie", hybrid: "Hybrid", "off-grid": "Off-grid" } as const;

/** Grid-tie / hybrid / off-grid summary: comparison column, selected FAQs and estimate link. */
export function SystemSummary({ system }: { system: keyof typeof SYSTEM_SUMMARY }) {
  const { openQuote } = useQuoteModal();
  const d = SYSTEM_SUMMARY[system];
  const others = (Object.keys(NAMES) as (keyof typeof NAMES)[]).filter((k) => k !== system);
  return (
    <section className="solar-section"><div className="solar-inner">
      <div className="solar-section-head"><div><span className="solar-eyebrow">{NAMES[system]} at a glance</span><h2>How a {NAMES[system].toLowerCase()} system <em>works.</em></h2></div><p>{d.intro}</p></div>
      <div className="land-table-wrap" role="region" aria-label={`${NAMES[system]} summary`} tabIndex={0}>
        <table className="land-table"><tbody>{COMPARE.map(([k, ...v]) => <tr key={k}><th scope="row">{k}</th><td>{v[d.col]}</td></tr>)}</tbody></table>
      </div>
      {d.extra.length > 0 && <ul className="land-badge-row">{d.extra.map((e) => <li key={e} className="land-badge">{e}</li>)}</ul>}
      <div className="mt-8">{FAQS.filter(([q]) => (d.faqs as readonly string[]).includes(q)).map(([q, a], i) => <details key={q} className="solar-faq-item"><summary><span className="solar-small-number">0{i + 1}</span><h3>{q}</h3><Plus size={18} className="solar-faq-plus" /></summary><p>{a}</p></details>)}</div>
      <div className="land-cta-row mt-8">
        <Button size="lg" className="solar-quote" onClick={() => openQuote({ service: "land" })}>Get a Solar Estimate <ArrowUpRight aria-hidden="true" /></Button>
        {others.map((o) => <Link key={o} to={`/land-based/${o}`} className="land-inline-link self-center">{NAMES[o]} systems</Link>)}
      </div>
    </div></section>
  );
}
