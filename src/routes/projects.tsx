import { pageHead } from "@/content/seo";
import { ProjectPlaceholder } from "@/components/ProjectPlaceholder";
import { HEADLINE_STATS, PARTNERS } from "@/content/company";

import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, Cpu, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { fetchProjects, type ProjectRecord } from "@/api/projects";
import { LAND_LINKS, MARINE_GREENFIELD, MARINE_RETROFIT } from "@/lib/service-lines";
import { PROJECT_LOG, STATUS_DOT, STATUS_STYLES, type ProjectStatus } from "@/lib/projects-log";

import { ProjectInquiryDrawer } from "@/components/ProjectInquiryDrawer";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

import heroFerry from "@/assets/hero-eferry-clean.jpg";
import pjHeroVideo from "@/assets/projects-hero-optimized.mp4.asset.json";

export const Route = createFileRoute("/projects")({
  head: () => pageHead('/projects', 'Projects | YESEN Technologies', 'Explore land-based solar systems, marine engineering and completed and ongoing YESEN projects.'),
  component: ProjectsPage,
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
  const offset =
    from === "left" ? { x: -50, y: 0 } : from === "right" ? { x: 50, y: 0 } : { x: 0, y: 32 };
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

const TICKER = HEADLINE_STATS.map(s => `${s.value}${s.suffix} ${s.label.toUpperCase()}`).join(" · ");

const READOUTS = HEADLINE_STATS.slice(0,3).map(s => ({ val: `${s.value}${s.suffix}`, lbl: s.label }));


const ROUTE_STOPS = [
  { n: "01", title: "01 — Consultation", copy: "Understanding site, scale and requirements." },
  { n: "02", title: "02 — Design", copy: "Engineering and full system design." },
  { n: "03", title: "03 — Fabrication", copy: "Quality build and integration." },
  { n: "04", title: "04 — Testing", copy: "Rigorous testing and quality assurance." },
  { n: "05", title: "05 — Commissioning", copy: "Deployment and sea trials." },
  { n: "06", title: "06 — Operations", copy: "Ongoing monitoring and support." },
] as const;



/* -------------------------------------------------------------------------- */

function SectionHead({
  tag,
  title,
  copy,
}: {
  tag: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="mx-auto w-full max-w-[100rem]">
      <p className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-brand-forest">
        <span className="h-px w-6 bg-brand-forest/60" />
        {tag}
      </p>
      <h2 className="pjx-heading mt-4">{title}</h2>
      {copy ? (
        <p className="mt-3 max-w-lg text-[0.95rem] leading-[1.9] text-brand-navy/70">{copy}</p>
      ) : null}
      <span className="pjx-rule" aria-hidden="true" />
    </Reveal>
  );
}



function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects({ limit: 100 });
        setProjects(data.projects);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="about-page relative min-h-screen font-sans text-brand-navy antialiased">
      <div className="about-aurora" aria-hidden="true" />

      <SiteHeader />

      <main className="relative z-10">
        {/* ------------------------------------------------------- TICKER BAR */}
        <div className="pj-header-clear overflow-hidden border-y border-brand-navy/10 bg-brand-navy py-2">
          <div className="pj-ticker flex w-max whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.3em] text-brand-ivory/70 [animation:jm-ticker_36s_linear_infinite]">
            <span className="shrink-0 px-8">{TICKER}</span>
            <span className="shrink-0 px-8">{TICKER}</span>
            <span className="shrink-0 px-8">{TICKER}</span>
          </div>
        </div>

        {/* --------------------------------------- HERO — instrument panel */}
        <section ref={heroRef} className="projects-overview-hero relative isolate overflow-hidden">
          <div className="grid w-full lg:grid-cols-[0.9fr_1.1fr]">
            {/* left readout panel */}
            <div className="relative flex flex-col justify-between bg-brand-navy px-6 py-14 sm:px-12 lg:py-20">
              <Reveal>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-brand-ivory/55">
                  Index 001 / Technology by Nature
                </p>
                <h1 className="display-xl mt-8 text-[clamp(2.3rem,5vw,4.4rem)] leading-[1.06] text-brand-ivory">
                  Clean energy, engineered for water, land and{" "}
                  <span className="text-brand-leaf">everywhere between</span>
                </h1>
                <p className="mt-6 max-w-md text-[0.95rem] leading-[1.9] text-brand-ivory/70">
                  Solar-electric marine systems, off-grid power and smart infrastructure — deployed
                  across India, the Gulf and the Pacific.
                </p>
                <a
                  href="#project-log"
                  className="mt-8 inline-flex items-center gap-2 border border-brand-ivory/40 px-6 py-3 font-mono text-[0.66rem] uppercase tracking-[0.28em] text-brand-ivory transition-colors hover:border-brand-leaf hover:bg-brand-leaf hover:text-brand-navy"
                >
                  View project log <ArrowRight size={14} />
                </a>
              </Reveal>

              <Reveal delay={0.15} className="mt-12">
                <div className="flex flex-wrap gap-10 border-t border-brand-ivory/15 pt-7">
                  {READOUTS.map((r) => (
                    <div key={r.lbl} className="font-mono">
                      <p className="text-[1.6rem] font-semibold leading-none text-brand-leaf">
                        {r.val}
                      </p>
                      <p className="mt-2 text-[0.58rem] uppercase tracking-[0.28em] text-brand-ivory/55">
                        {r.lbl}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* right image frame */}
            <div className="relative order-first min-h-[22rem] overflow-hidden bg-brand-navy/90 lg:order-none lg:min-h-[34rem]">
              <video
                src={pjHeroVideo.url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                className="pointer-events-none absolute left-5 top-5 h-6 w-6 border-l-2 border-t-2 border-brand-leaf/80"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b-2 border-r-2 border-brand-leaf/80"
                aria-hidden="true"
              />
              <p className="absolute bottom-6 left-6 flex items-center gap-2 bg-brand-navy/60 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-brand-ivory/85 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-leaf" />
                Live deployment
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- PROJECT LOG */}
        <ProjectLogSection projects={projects} isLoading={isLoading} />


        {/* --------------------------------------------- EXECUTION ROUTE */}
        <section className="relative border-y border-brand-navy/10 bg-white/55 px-6 py-12 sm:px-12">
          <SectionHead tag="Execution route" title="From first contact to ongoing operations" />

          <div className="relative mx-auto mt-10 w-full max-w-[62rem]">

            <span
              className="absolute left-5 top-0 h-full w-px bg-brand-navy/15 sm:left-1/2 sm:-translate-x-1/2"
              aria-hidden="true"
            />

            {ROUTE_STOPS.map((s, i) => {
              const rightSide = i % 2 === 1;
              return (
                <Reveal
                  key={s.n}
                  delay={i * 0.06}
                  from={rightSide ? "right" : "left"}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="grid grid-cols-[2.5rem_1fr] items-start sm:grid-cols-[1fr_3rem_1fr]">
                    {/* left cell */}
                    <div
                      className={`hidden sm:block ${rightSide ? "" : "order-1 pr-8 text-right"}`}
                    >
                      {!rightSide ? (
                        <>
                          <p className="font-display text-[1.02rem] text-brand-navy">{s.title}</p>
                          <p className="mt-1.5 text-[0.85rem] leading-[1.8] text-brand-navy/65">
                            {s.copy}
                          </p>
                        </>
                      ) : null}
                    </div>

                    {/* node */}
                    <div className="order-2 flex justify-center">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-brand-navy/40 bg-white font-mono text-[0.66rem] font-semibold text-brand-navy">
                        {s.n}
                      </span>
                    </div>

                    {/* right cell (also mobile content) */}
                    <div className="order-3 pl-6 sm:pl-8">
                      {rightSide ? (
                        <>
                          <p className="font-display text-[1.02rem] text-brand-navy">{s.title}</p>
                          <p className="mt-1.5 text-[0.85rem] leading-[1.8] text-brand-navy/65">
                            {s.copy}
                          </p>
                        </>
                      ) : (
                        <div className="sm:hidden">
                          <p className="font-display text-[1.02rem] text-brand-navy">{s.title}</p>
                          <p className="mt-1.5 text-[0.85rem] leading-[1.8] text-brand-navy/65">
                            {s.copy}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------- CERTIFIED ALLIANCES */}
        <section className="relative px-6 py-12 sm:px-12">
          <SectionHead tag="Technology partners" title="Technology partners" />

          <div className="mx-auto mt-8 grid w-full max-w-[100rem] grid-cols-2 gap-px border border-brand-navy/12 bg-brand-navy/12 sm:grid-cols-4">

            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.04}>
                <div className="group relative h-full bg-white/80 px-4 py-9 text-center">
                  <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-brand-leaf opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-brand-leaf opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="font-display text-[0.98rem] text-brand-navy/70 transition-colors group-hover:text-brand-navy">
                    {p.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-brand-navy/45">
                    {p.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- CTA */}
        <section className="relative px-6 pb-16 pt-4 sm:px-12">
          <Reveal className="mx-auto w-full max-w-[100rem]">
            <div className="about-card pjx-cta">
              <div className="relative z-10 max-w-xl px-2 py-6 sm:px-6 sm:py-10">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-brand-forest">
                  Log a new mission
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.9vw,2.6rem)] leading-[1.15] text-brand-blue">
                  Let&apos;s Build a <span className="about-highlight">Sustainable</span>
                  <br />
                  Marine Future Together.
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-[1.9] text-brand-navy/70">
                  Tell us about your site, your fleet, or your city — we&apos;ll get back with
                  what&apos;s possible.
                </p>
                <ProjectInquiryDrawer
                  triggerClassName="about-btn about-btn-primary mt-8"
                  triggerLabel="Get In Touch"
                />
              </div>

              <img
                decoding="async"
                src={heroFerry}
                alt="Solar electric ferry"
                loading="lazy"
                className="pjx-cta-shot"
              />
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const FILTERS = [
  { key: "all", label: "All projects" },
  { key: "complete", label: "Complete" },
  { key: "progress", label: "In progress" },
  { key: "profile", label: "Vessel profiles" },
] as const;

function ProjectLogSection({ projects, isLoading }: { projects: ProjectRecord[]; isLoading: boolean }) {
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const [serviceLine, setServiceLine] = useState("All projects");

  const visibleStatic = useMemo(
    () => PROJECT_LOG.filter(p => (filter === "all" || p.status === filter) && (serviceLine === "All projects" || p.serviceLine === serviceLine)),
    [filter, serviceLine],
  );

  const visibleApi = useMemo(() => {
    let filtered = projects;

    if (filter === "progress") {
      filtered = filtered.filter(p => p.status === "progress");
    } else if (filter === "complete") {
      filtered = filtered.filter(p => p.status === "complete");
    } else if (filter === "profile") {
      filtered = filtered.filter(p => p.status === "live");
    }

    if (serviceLine !== "All projects") {
      filtered = filtered.filter(p => {
        const category = p.category?.toLowerCase() || "";
        const type = p.type?.toLowerCase() || "";
        if (serviceLine === "Land-Based") {
          return category.includes("land") || type.includes("land") || type.includes("solar") || type.includes("earth");
        } else if (serviceLine === "Marine") {
          return category.includes("marine") || type.includes("marine") || type.includes("boat") || type.includes("ferry") || type.includes("vessel");
        } else if (serviceLine === "Engineering Advisory") {
          return category.includes("advisory") || type.includes("advisory") || type.includes("consulting");
        }
        return true;
      });
    }

    return filtered;
  }, [projects, filter, serviceLine]);

  return (
    <section id="project-log" className="relative scroll-mt-28 px-6 py-12 sm:px-12">
      <SectionHead
        tag="Projects"
        title="Land & Earth and Marine"
      />

      <div className="mx-auto mt-8 grid w-full max-w-[100rem] gap-8 border-b border-brand-navy/15 pb-10 lg:grid-cols-2">
        {[
          { title: "Land & Earth", to: "/land-based", image: LAND_LINKS[0]?.image, groups: [{ heading: "Solar & storage", items: LAND_LINKS }] },
          { title: "Marine", to: "/marine/greenfield/electric-boat", image: MARINE_GREENFIELD[0]?.image, groups: [{ heading: "Greenfield", items: MARINE_GREENFIELD }, { heading: "Retrofit", items: MARINE_RETROFIT }] },
        ].map(category => (
          <div key={category.to} className="min-w-0">
            <Link to={category.to} resetScroll className="group relative block h-60 overflow-hidden bg-brand-navy">
              <img src={category.image} alt={category.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6 text-brand-ivory">
                <span className="font-display text-2xl">{category.title}</span><ArrowRight size={22} className="shrink-0" />
              </span>
            </Link>
            <div className={`mt-5 grid gap-5 ${category.groups.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {category.groups.map(group => <div key={group.heading}>
                <h3 className="mb-2 font-mono text-xs uppercase text-brand-forest">{group.heading}</h3>
                {group.items.map(item => <Link key={item.label} to={item.to} resetScroll className="flex items-center justify-between gap-3 border-b border-brand-navy/10 py-3 text-sm text-brand-navy transition-colors hover:text-brand-forest">{item.label}<ArrowRight size={15} className="shrink-0" /></Link>)}
              </div>)}
            </div>
          </div>
        ))}
      </div>

      {/* API-powered projects grid */}
      <div className="mx-auto mt-8 flex w-full max-w-[100rem] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Project categories">
          {[{ key: "All projects", label: "All projects" }, { key: "Land-Based", label: "Land & Earth" }, { key: "Marine", label: "Marine" }, { key: "Engineering Advisory", label: "Engineering Advisory" }].map(line => <Button key={line.key} variant="ghost" aria-pressed={serviceLine === line.key} onClick={() => setServiceLine(line.key)} className={serviceLine === line.key ? "bg-brand-navy text-brand-ivory hover:bg-brand-navy/90 hover:text-brand-ivory" : "text-brand-navy"}>{line.label}</Button>)}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Project status">
        {FILTERS.map((f) => (
          <Button
            variant="ghost"
            aria-pressed={filter === f.key}
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] transition-colors ${
              filter === f.key
                ? "border-brand-navy bg-brand-navy text-brand-ivory"
                : "border-brand-navy/15 bg-white/70 text-brand-navy hover:border-brand-blue"
            }`}
          >
            {f.label}
          </Button>
        ))}
        </div>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-[84rem] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="col-span-full py-10 text-center text-muted-foreground">Loading projects...</p>
        ) : (
          visibleApi.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 6) * 0.05}>
              <Link
                to="/projects/$projectId"
                params={{ projectId: p.id }}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-navy/12 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(11,42,74,0.10)]"
              >
                <div className="relative h-40 overflow-hidden">
                  {p.cover ? <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  /> : <ProjectPlaceholder />}
                  <span className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/0 to-transparent" />
                  <span className="absolute bottom-3 left-3 font-mono text-[0.66rem] tracking-[0.2em] text-brand-ivory">
                    {String(i + 1).padStart(3, '0')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-[1.02rem] leading-snug text-brand-navy">
                    {p.title}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-brand-navy/55">
                    {p.country !== "Location not specified" && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={11} strokeWidth={2} /> {p.country}
                      </span>
                    )}
                    {p.timeline && <span className="inline-flex items-center gap-1.5"><CalendarClock size={11} strokeWidth={2} /> {p.timeline}</span>}
                  </p>
                  {p.technology && <p className="mt-2 flex items-start gap-1.5 text-left text-[0.78rem] leading-snug text-brand-navy/70">
                    <Cpu size={12} strokeWidth={2} className="mt-[0.15rem] shrink-0 text-brand-blue" />
                    {p.technology}
                  </p>}


                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${STATUS_STYLES[p.status]}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
                      {p.statusLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-blue transition-colors group-hover:text-brand-forest">
                      Open file <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))
        )}
      </div>
      {!isLoading && visibleApi.length === 0 && <p className="mx-auto mt-8 max-w-[84rem] py-10 text-center text-muted-foreground">No projects in this category match the selected status.</p>}
    </section>
  );
}
