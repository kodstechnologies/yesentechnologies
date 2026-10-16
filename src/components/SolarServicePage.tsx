import { SystemSummary } from '@/components/SystemSummary';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, BatteryCharging, Building2, Check, CircuitBoard, Network, Plus, ShieldCheck, Sun, UtilityPole, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuoteModal } from '@/components/QuoteModal';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { SOLAR_SERVICES, type SolarService, type SolarServiceKey } from '@/content/solar-services';
import { PROJECT_LOG } from '@/lib/projects-log';

const NODE_ICONS = { solar: Sun, inverter: Zap, battery: BatteryCharging, grid: UtilityPole, loads: Building2, control: CircuitBoard };
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = false as boolean;
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
function QuoteLink({ data, light = false }: { data: SolarService; light?: boolean }) {
  const { openQuote } = useQuoteModal();
  return <Button size="lg" className={`solar-quote ${light ? 'solar-quote-light' : ''}`} onClick={() => openQuote({ service: 'land', type: data.quoteType })}>Get a quote <ArrowUpRight aria-hidden="true" /></Button>;
}
function Operation({ data }: { data: SolarService }) {
  const [selected, setSelected] = useState(0);
  const mode = data.modes[selected] ?? data.modes[0];
  return <section className="solar-operation solar-section" aria-labelledby="solar-operation-title">
    <div className="solar-inner">
      <Reveal className="solar-section-head"><div><span className="solar-eyebrow">02 / Energy in motion</span><h2 id="solar-operation-title">How the system <em>works.</em></h2></div><p>Different conditions. A defined response.<br />Explore the operating strategy.</p></Reveal>
      <div className="solar-mode-tabs" role="tablist" aria-label="System operating conditions">{data.modes.map((item, i) => <Button key={item.label} variant="ghost" role="tab" id={`solar-tab-${i}`} aria-selected={selected === i} aria-controls="solar-mode-panel" className={`solar-mode-tab ${selected === i ? 'is-selected' : ''}`} onClick={() => setSelected(i)}><span className="solar-tab-index">0{i + 1}</span>{item.label}</Button>)}</div>
      <div role="tabpanel" id="solar-mode-panel" aria-labelledby={`solar-tab-${selected}`}>
        <div className="solar-network" aria-label="System components"><span className="solar-network-label"><Network size={14} /> System architecture</span><div className="solar-node-grid">{data.nodes.map((node, i) => { const Icon = NODE_ICONS[node.kind]; return <div key={node.label} className={`solar-node ${mode.active.includes(i) ? 'is-active' : ''}`}><div className="solar-node-symbol"><Icon strokeWidth={1.3} size={30} /></div><strong>{node.label}</strong><span>{node.detail}</span>{i < data.nodes.length - 1 && <ArrowRight className="solar-node-arrow" size={19} aria-hidden="true" />}</div>; })}</div></div>
        <div className="solar-mode-copy"><div><h3>{mode.title}</h3><p>{mode.body}</p></div><aside><ShieldCheck size={20} strokeWidth={1.5} /><p>{mode.note}</p></aside></div>
      </div>
    </div>
  </section>;
}
export function SolarServicePage({ service }: { service: SolarServiceKey }) {
  const data = SOLAR_SERVICES[service];
  const projects = PROJECT_LOG.filter(p => p.serviceLine === 'Land-Based' && p.showPublicly !== false && p.cover).slice(0, 2);
  return <div className={`solar-page solar-page-${service} font-sans`}>
    <SiteHeader heroDark />
    <main>
      <section className="solar-hero">
        <img className="solar-hero-image" src={data.hero} alt={data.heroAlt} fetchPriority="high" decoding="async" />
        <div className="solar-hero-shade" />
        <div className="solar-inner solar-hero-inner">
          <div className="solar-back-group">
            <Link to="/" className="solar-back"><ArrowLeft size={14} /> Home</Link>
            <Link to="/land-based" className="solar-back"><ArrowLeft size={14} /> Land & Earth</Link>
          </div>
          <div className="solar-hero-copy"><span className="solar-eyebrow">YESEN / Solar systems / {data.number}</span><h1>{data.title}</h1><p className="solar-hero-subtitle">{data.subtitle}</p><p className="solar-hero-summary">{data.summary}</p><QuoteLink data={data} light /></div>
          <div className="solar-hero-bottom"><div className="solar-hero-markers">{data.markers.map(marker => <span key={marker}><Check size={13} />{marker}</span>)}</div><span className="solar-hero-number" aria-hidden="true">{data.number} / 04</span></div>
        </div>
      </section>
      <section className="solar-intro solar-section">
        <div className="solar-inner">
          <Reveal className="solar-intro-grid"><div><span className="solar-eyebrow">01 / Built around your site</span><h2>{data.premise}</h2></div><div className="solar-intro-copy"><p>{data.intro}</p><span className="solar-inline-label"><Sun size={16} /> Generation. Demand. Engineering.</span></div></Reveal>
          <div className="solar-applications">{data.applications.map((item, i) => <Reveal key={item.title} className="solar-application"><span className="solar-small-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
        </div>
      </section>
      {service !== 'microgrid' && <SystemSummary system={service as 'grid-tie' | 'hybrid' | 'off-grid'} />}
      <Operation key={service} data={data} />
      <section className="solar-design solar-section">
        <div className="solar-inner">
          <Reveal className="solar-section-head"><div><span className="solar-eyebrow">03 / The engineering decisions</span><h2>{data.designTitle}</h2></div><p>{data.designIntro}</p></Reveal>
          <div className="solar-design-grid"><Reveal className="solar-design-visual"><img src={data.detailImage} alt={data.detailAlt} loading="lazy" decoding="async" /><div className="solar-design-caption"><ShieldCheck size={24} /><p>{data.boundary}</p></div></Reveal><div className="solar-decisions">{data.decisions.map((item, i) => <Reveal key={item.title} className="solar-decision"><span className="solar-small-number">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></Reveal>)}</div></div>
        </div>
      </section>
      <section className="solar-delivery solar-section"><div className="solar-inner"><Reveal className="solar-section-head"><div><span className="solar-eyebrow">04 / From assessment to operation</span><h2>Engineering that carries <em>through.</em></h2></div><p>A clear path from the first site inputs to a system your team can operate.</p></Reveal><div className="solar-delivery-grid">{data.deliverables.map((item, i) => <Reveal key={item.title} className="solar-delivery-step"><span>{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div></div></section>
      {projects.length > 0 && <section className="solar-projects solar-section"><div className="solar-inner"><Reveal className="solar-section-head"><div><span className="solar-eyebrow">05 / Land-based work</span><h2>Engineering, <em>on site.</em></h2></div><Button asChild variant="link" className="solar-text-link"><Link to="/projects">All projects <ArrowUpRight /></Link></Button></Reveal><div className="solar-project-grid">{projects.map(project => <Link key={project.id} to="/projects/$projectId" params={{ projectId: project.id }} className="solar-project"><div className="solar-project-image"><img src={project.cover} alt={project.title} loading="lazy" /><span>{project.statusLabel}</span></div><div className="solar-project-caption"><div><span className="solar-eyebrow">{project.country}</span><h3>{project.title}</h3></div><ArrowUpRight size={24} /></div></Link>)}</div></div></section>}
      <section className="solar-faq solar-section"><div className="solar-inner solar-faq-grid"><Reveal><span className="solar-eyebrow">Before you begin</span><h2>The questions <em>that matter.</em></h2><p>A useful system proposal starts with the right information.</p></Reveal><div>{data.faqs.map((faq, i) => <details key={faq.q} className="solar-faq-item"><summary><span className="solar-small-number">0{i + 1}</span><h3>{faq.q}</h3><Plus size={18} className="solar-faq-plus" /></summary><p>{faq.a}</p></details>)}</div></div></section>
      <section className="solar-next solar-section"><div className="solar-inner"><div className="solar-next-main"><div><span className="solar-eyebrow">Your next energy decision</span><h2>Let’s engineer your<br /><em>{data.quoteType.toLowerCase()} system.</em></h2><p>Share your location, consumption and project priorities.</p></div><QuoteLink data={data} /></div><nav className="solar-alternatives" aria-label="Other solar systems">{Object.values(SOLAR_SERVICES).filter(item => item.key !== service).map(item => <Link key={item.key} to={`/land-based/${item.key}`} className="solar-alternative"><span className="solar-small-number">{item.number}</span><span>{item.title}</span><ArrowUpRight size={19} /></Link>)}</nav><div className="solar-sources"><span>Technical references</span>{data.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={12} /></a>)}</div></div></section>
    </main>
    <SiteFooter />
  </div>;
}
