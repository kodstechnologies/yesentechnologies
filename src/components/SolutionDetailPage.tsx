import { PROJECT_LOG } from "@/lib/projects-log";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Gauge, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SiteFooter } from "@/components/SiteChrome";
import { MarineInquiryDrawer } from "@/components/MarineInquiryDrawer";
import { QuoteLink } from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";

export type SolutionDetail = {
  index: string;
  title: string;
  titleLines: string[];
  tagline: string;
  Icon: LucideIcon;
  image: string;
  imageAlt: string;
  features: string[];
  intro: string;
  included: { Icon: LucideIcon; title: string; body: string }[];
  stats: { value: string; label: string }[];
  process: { n: string; title: string; body: string }[];
  applications: { Icon: LucideIcon; title: string; body: string }[];
  faqs: { q: string; a: string }[];
  benefits?: { title: string; body: string }[];
  whyChoose?: { title: string; body: string }[];
  scalability?: string;
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SolutionDetailPage({
  data,
  back = { label: "Home", to: "/" },
}: {
  data: SolutionDetail;
  back?: { label: string; to: string };
}) {
  const { Icon } = data;
  const projectsBack = back.to === "/land-based";
  const service = back.to === "/land-based" || data.title === "Solar Integration" ? "land" : "marine";
  const related = PROJECT_LOG.filter(p => p.serviceLine === (service === "land" ? "Land-Based" : "Marine")).slice(0, 3);
  const mode = data.title === "Vessel Retrofit" ? "Retrofit (existing vessel)" : service === "marine" && data.title !== "Electric Propulsion Kit" ? "Greenfield (new build)" : "";
  const subtype = ({ "Grid Tie Solar": "Grid Tie", "Off Grid Solar": "Off Grid", "Hybrid Solar": "Hybrid", "Microgrids": "Microgrid" } as Record<string,string>)[data.title] || data.title;

  return (
    <div className="me-page min-h-screen font-sans antialiased">
      <main className="relative z-10">
        {/* HERO */}
        <section className="me-hero relative isolate overflow-hidden">
          <div className="mx-auto w-full max-w-[80rem] px-6 pb-20 pt-32 sm:px-10">
            <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">
              {projectsBack && (
                <>
                  <Link to="/" className="me-back">
                    <ArrowLeft size={15} strokeWidth={1.8} />
                    <span>Home</span>
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
              <Link to={projectsBack ? back.to : "/"} className="me-back">
                <ArrowLeft size={15} strokeWidth={1.8} />
                <span>{projectsBack ? back.label : "Home"}</span>
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/70">{data.title}</span>
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
              <Reveal>
                <div className="flex items-center gap-3.5">
                  <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-white/14 bg-white/[0.03] text-white">
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                </div>

                <div className="my-8 h-px w-full bg-white/14" />

                <h1 className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold uppercase leading-[1.06] tracking-[-0.01em] text-white">
                  {data.titleLines.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                      {i < data.titleLines.length - 1 ? null : null}
                    </span>
                  ))}
                </h1>
                <p className="mt-6 max-w-[30rem] text-[1.05rem] leading-relaxed text-white/60">
                  {data.tagline}
                </p>
                {data.benefits && <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="me-quote-btn h-auto whitespace-normal text-left"><QuoteLink initial={{ service, type: subtype, mode }}>Request a Retrofit Feasibility Assessment</QuoteLink></Button>
                  <Button asChild variant="outline" className="h-auto whitespace-normal border-brand-ivory/30 bg-brand-ivory text-brand-navy hover:bg-brand-ivory/90 hover:text-brand-navy"><Link to="/contact">Talk to a Marine Electrification Engineer</Link></Button>
                </div>}

                <ul className="mt-9 grid gap-3.5 sm:grid-cols-2">
                  {data.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[0.95rem] text-white/85">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-sky/45 bg-brand-sky/15 text-brand-sky">
                        <Check size={12} strokeWidth={2.6} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="me-visual">
                  <img src={data.image} alt={data.imageAlt} loading="lazy" decoding="async" />
                  <span className="me-visual-index" aria-hidden="true">
                    {data.index}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="me-band">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">What&apos;s Included</p>
              <h2 className="me-h2 mt-4">How we deliver {data.title}</h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-white/60">{data.intro}</p>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {data.included.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <article className="me-card h-full">
                    <span className="me-card-icon">
                      <c.Icon size={18} strokeWidth={1.9} />
                    </span>
                    <h3 className="me-h3">{c.title}</h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-white/60">{c.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            {data.stats.length > 0 && <Reveal delay={0.1}>
              <div className="me-stats">
                {data.stats.map((s) => (
                  <div key={s.label} className="me-stat">
                    <p className="me-stat-value">{s.value}</p>
                    <p className="mt-2 text-[0.85rem] leading-snug text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>}
          </div>
        </section>

        {data.benefits && <section className="me-band me-band-alt"><div className="mx-auto max-w-[80rem] px-6 sm:px-10">
          <Reveal><p className="me-eyebrow">Electric propulsion retrofit</p><h2 className="me-h2 mt-4">Why retrofit to electric propulsion?</h2></Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{data.benefits.map((benefit) => <Reveal key={benefit.title}><h3 className="me-h3">{benefit.title}</h3><p className="mt-3 text-sm leading-relaxed text-brand-ivory/70">{benefit.body}</p></Reveal>)}</div>
        </div></section>}

        {/* PROCESS */}
        <section className="me-band me-band-alt">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">Our Process</p>
              <h2 className="me-h2 mt-4">How it works</h2>
            </Reveal>

            <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
              {data.process.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07}>
                  <div className="me-step">
                    <span className="me-step-num">{p.n}</span>
                    <h3 className="me-h3 mt-4">{p.title}</h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-white/60">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="me-band">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">Where It Fits</p>
              <h2 className="me-h2 mt-4">Built for these applications</h2>
              {data.scalability && <p className="mt-5 text-base leading-relaxed text-brand-ivory/70">{data.scalability}</p>}
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {data.applications.map((a, i) => (
                <Reveal key={a.title} delay={(i % 4) * 0.06}>
                  <article className="me-app h-full">
                    <span className="me-app-icon">
                      <a.Icon size={17} strokeWidth={1.8} />
                    </span>
                    <h4 className="font-display text-[1.02rem] font-semibold text-white">
                      {a.title}
                    </h4>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-white/60">{a.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {data.title === "Electric Propulsion Kit" && <section className="me-band me-band-alt"><div className="mx-auto grid max-w-[80rem] gap-6 px-6 sm:px-10 md:grid-cols-2">{["Greenfield (new build)", "Retrofit (existing vessel)"].map(build => <article key={build} className="me-card"><h2 className="me-h3">{build}</h2><p className="mt-3 text-white/65">Electric motor, B-Kool Marine Battery System and monitoring integrated for {build.startsWith("Greenfield") ? "a new vessel's design and commissioning" : "an existing vessel following an assessment of its hull, drivetrain and duty cycle"}.</p><QuoteLink initial={{service: "marine", type: subtype, mode: build}} className="mt-5 inline-block text-brand-sky">Get a quote →</QuoteLink></article>)}</div></section>}
        {related.length > 0 && <section className="me-band"><div className="mx-auto max-w-[80rem] px-6 sm:px-10"><h2 className="me-h2">Related projects</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{related.map(p => <Link key={p.id} to="/projects/$projectId" params={{ projectId: p.id }} className="me-card block"><h3 className="me-h3">{p.title}</h3><p className="mt-3 text-white/65">{p.country} · {p.statusLabel}</p></Link>)}</div></div></section>}
        {data.whyChoose && <section className="me-band"><div className="mx-auto max-w-[80rem] px-6 sm:px-10">
          <Reveal><h2 className="me-h2">Why choose YESEN Technologies?</h2></Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">{data.whyChoose.map((point) => <Reveal key={point.title}><h3 className="me-h3">{point.title}</h3><p className="mt-3 text-sm leading-relaxed text-brand-ivory/70">{point.body}</p></Reveal>)}</div>
        </div></section>}
        {/* FAQ */}
        <section className="me-band me-band-alt">
          <div className="mx-auto w-full max-w-[80rem] px-6 sm:px-10">
            <Reveal className="mx-auto max-w-[40rem] text-center">
              <p className="me-eyebrow">Questions</p>
              <h2 className="me-h2 mt-4">Frequently asked</h2>
            </Reveal>

            <div className="mx-auto mt-12 flex max-w-[48rem] flex-col gap-3">
              {data.faqs.filter(f => f.q.trim() && f.a.trim()).map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <details className="me-faq">
                    <summary>
                      <span>{f.q}</span>
                      <span className="me-faq-toggle" aria-hidden="true">
                        <Plus size={14} strokeWidth={2.2} />
                      </span>
                    </summary>
                    <p>{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INQUIRY */}
        <section className="me-band me-inquiry">
          <div className="mx-auto flex w-full max-w-[80rem] flex-wrap items-center justify-between gap-10 px-6 sm:px-10">
            <Reveal className="max-w-[34rem]">
              <p className="me-eyebrow">Get in Touch</p>
              <h2 className="me-h2 mt-4">
                Interested in <span className="me-grad">{data.title}</span>?
              </h2>
              <p className="mt-4 text-[1rem] leading-relaxed text-white/60">
                Tell us a little about your site, vessel or project and our team will get back to
                you with next steps.
              </p>

            </Reveal>

            <Reveal delay={0.1}>
              <QuoteLink initial={{ service, type: subtype, mode }} className="me-quote-btn">{data.benefits ? "Request a Retrofit Feasibility Assessment" : "Get a quote"}</QuoteLink>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
