import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { QuoteLink } from "@/components/QuoteModal";
import { ADVISORY_LINKS } from "@/lib/service-lines";
import heroVideo from "@/assets/advisory-hero-optimized.mp4.asset.json";
import heroPoster from "@/assets/advisory-hero-solar-farm.png.asset.json";
import solarField from "@/assets/advisory-solar-field.jpg.asset.json";
import heroAerial from "@/assets/advisory-hero-solar-aerial.jpg.asset.json";

/** Each advisory page gets its own hero and photo band so the three never look alike. */
const MEDIA: Record<string, { video?: string; band: string }> = {
  "/engineering-advisory/owners-engineering": { band: solarField.url },
  "/engineering-advisory/technical-due-diligence": { band: heroAerial.url },
  "/engineering-advisory/bess-advisory": { video: heroVideo.url, band: heroPoster.url },
};

export type AdvisoryContent = {
  eyebrow: string;
  title: string;
  intro: string;
  overview: { heading: string; body: string[] };
  scope: { title: string; body: string }[];
  process: { title: string; body: string }[];
  deliverables: string[];
  whenToEngage: string[];
  whoFor: string[];
};

export function AdvisoryServicePage({ c, current }: { c: AdvisoryContent; current: string }) {
  const others = ADVISORY_LINKS.filter((l) => l.to !== current);
  const link = ADVISORY_LINKS.find((l) => l.to === current);
  const media = MEDIA[current] ?? { band: heroPoster.url };
  return (
    <div className="advisory-detail-page min-h-screen bg-background font-sans antialiased">
      <SiteHeader heroDark />
      <main className="relative z-10 pb-16 pt-32 sm:pt-40">
        {/* Hero */}
        <section className="relative -mt-32 flex min-h-[80vh] items-end overflow-hidden bg-brand-navy px-6 pb-20 pt-48 text-brand-ivory sm:-mt-40 sm:px-12">
          {media.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={media.video}
              poster={link?.image ?? heroPoster.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : (
            <img
              src={link?.image ?? heroPoster.url}
              alt=""
              aria-hidden="true"
              className="adv-hero-zoom absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 to-brand-navy/35" />
          <div className="relative mx-auto w-full max-w-[90rem]">
            <Link
              to="/engineering-advisory"
              className="mb-7 flex w-fit items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-brand-leaf transition-colors hover:text-brand-ivory"
            >
              <ArrowLeft size={13} /> Engineering Advisory
            </Link>
            <h1 className="display-xl mt-5 max-w-5xl text-4xl text-brand-ivory drop-shadow-lg sm:text-6xl lg:text-7xl">{c.title}</h1>
            <p className="mt-7 max-w-3xl text-[1.05rem] leading-[1.85] text-brand-ivory/85">{c.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <QuoteLink
                initial={{ service: "advisory" }}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-ivory px-7 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-navy transition-transform hover:-translate-y-0.5"
              >
                Get a quote <ArrowRight size={15} />
              </QuoteLink>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-brand-ivory/40 px-7 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-ivory transition-colors hover:bg-brand-ivory/10"
              >
                Talk to an engineer
              </Link>
            </div>
          </div>
        </section>

        {/* Image band */}
        {media.band && (
          <section className="mt-24 px-6 sm:px-12">
            <div className="mx-auto w-full max-w-[90rem] overflow-hidden rounded-2xl">
              <img src={media.band} alt={`${c.eyebrow} — YESEN engineering advisory`} loading="lazy" className="aspect-[21/8] w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </section>
        )}

        {/* Overview */}
        <section className="mt-24 px-6 sm:px-12">
          <div className="mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brand-forest">Overview</span>
              <h2 className="display-xl mt-4 text-3xl text-brand-navy sm:text-4xl">{c.overview.heading}</h2>
            </div>
            <div className="space-y-5 text-[1rem] leading-[1.9] text-muted-foreground">
              {c.overview.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Scope */}
        <section className="mt-24 px-6 sm:px-12">
          <div className="mx-auto w-full max-w-[90rem]">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brand-forest">Scope of work</span>
            <h2 className="display-xl mt-4 text-3xl text-brand-navy sm:text-4xl">What we cover</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.scope.map((s, i) => (
                <article
                  key={s.title}
                  className="rounded-[1.4rem] border border-brand-navy/10 bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-mono text-[0.65rem] tracking-[0.2em] text-brand-forest">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-brand-navy">{s.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-[1.8] text-muted-foreground">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mt-24 bg-brand-navy px-6 py-20 text-brand-ivory sm:px-12">
          <div className="mx-auto w-full max-w-[90rem]">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brand-ivory/70">How we work</span>
            <h2 className="display-xl mt-4 text-3xl sm:text-4xl">Our process</h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {c.process.map((p, i) => (
                <li key={p.title} className="border-t border-brand-ivory/20 pt-6">
                  <span className="font-mono text-sm text-brand-ivory/60">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-[1.8] text-brand-ivory/75">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Deliverables + when */}
        <section className="mt-24 px-6 sm:px-12">
          <div className="mx-auto grid w-full max-w-[90rem] gap-6 lg:grid-cols-3">
            {[
              { h: "Deliverables", items: c.deliverables },
              { h: "When to engage us", items: c.whenToEngage },
              { h: "Who it is for", items: c.whoFor },
            ].map((b) => (
              <div key={b.h} className="rounded-[1.4rem] border border-brand-navy/10 bg-card p-8">
                <h3 className="font-display text-2xl font-semibold text-brand-navy">{b.h}</h3>
                <ul className="mt-6 space-y-3">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.95rem] leading-[1.7] text-muted-foreground">
                      <Check size={17} className="mt-1 shrink-0 text-brand-forest" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-24 px-6 sm:px-12">
          <div className="mx-auto w-full max-w-[90rem]">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brand-forest">Related advisory services</span>
            <div className="mt-6 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
              {others.map((o) => (
                <Link key={o.to} to={o.to} className="group flex items-center justify-between py-6">
                  <span className="font-display text-2xl font-semibold text-brand-navy">{o.label}</span>
                  <ArrowUpRight className="text-brand-navy transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-[1.4rem] bg-brand-navy p-8 text-brand-ivory sm:p-10">
              <p className="font-display text-2xl">Need independent engineering support?</p>
              <QuoteLink
                initial={{ service: "advisory" }}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-ivory px-7 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-navy"
              >
                Get a quote <ArrowRight size={15} />
              </QuoteLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
