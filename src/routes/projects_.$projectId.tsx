import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarClock, Cpu, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { fetchProject, fetchProjects, type ProjectRecord } from "@/api/projects";

const STATUS_STYLES: Record<string, string> = {
  complete: "bg-brand-forest/10 text-brand-forest",
  progress: "bg-brand-blue/10 text-brand-blue",
  live: "bg-brand-leaf/10 text-brand-leaf",
};

const STATUS_DOT: Record<string, string> = {
  complete: "bg-brand-forest",
  progress: "bg-brand-blue",
  live: "bg-brand-leaf",
};

export const Route = createFileRoute("/projects_/$projectId")({
  loader: async ({ params }) => {
    try {
      const project = await fetchProject(params.projectId);
      return { project };
    } catch (err) {
      console.error("Failed to load project:", err);
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found | YESEN Technologies Pvt Ltd" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} | YESEN Technologies Pvt Ltd Projects`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(project.cover.startsWith("https://")
          ? [
              { property: "og:image", content: project.cover },
              { name: "twitter:image", content: project.cover },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: `https://yesen.website/projects/${project.id}` }],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData() as { project: ProjectRecord };
  const [allProjects, setAllProjects] = useState<ProjectRecord[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects({ limit: 100 });
        setAllProjects(data.projects);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-brand-ivory">
      <SiteHeader />

      <main className="px-6 pb-20 pt-28 sm:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            to="/projects"
            hash="project-log"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-navy/70 transition-colors hover:text-brand-forest"
          >
            <ArrowLeft size={14} /> Back to projects
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-[22rem] overflow-hidden rounded-lg"
          >
            {project.cover ? (
              <img
                src={project.cover}
                alt={project.title}
                className="h-full w-full object-cover"
                decoding="async"
              />
            ) : (
              <CoverFallback label={project.country} />
            )}
          </motion.div>

          <div className="mt-7 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-display text-[1.9rem] font-light leading-tight text-brand-navy sm:text-[2.3rem]">
              {project.title}
            </h1>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] ${STATUS_STYLES[project.status]}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
              {project.statusLabel}
            </span>
          </div>

          {project.country !== "Location not specified" && (
            <p className="mt-2 flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-navy/55">
              <MapPin size={12} strokeWidth={2} /> {project.country}
            </p>
          )}

          <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-brand-navy/12 bg-brand-navy/10 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Country", value: project.country },
              { icon: CalendarClock, label: "Completion", value: project.timeline },
              { icon: Cpu, label: "Technology", value: project.technology },
            ]
              .filter((item) => item.value && item.value !== "Location not specified")
              .map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/85 px-4 py-3">
                <p className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-navy/50">
                  <Icon size={11} strokeWidth={2} className="text-brand-blue" /> {label}
                </p>
                <p className="mt-1 text-[0.92rem] leading-snug text-brand-navy">{value}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl font-display text-[1.15rem] leading-relaxed text-brand-navy/90">
            {project.summary}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.specs.map(([k, v]) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-md border border-brand-navy/12 bg-white/80 px-4 py-3"
              >
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-navy/50">
                  {k}
                </p>
                <p className="mt-1 text-[0.92rem] text-brand-navy">{v}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[0.95rem] leading-[1.75] text-brand-navy/80">
            {project.body}
          </p>

          {project.gallery.length > 1 && (
            <>
            <p className="mt-12 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-navy/50">
              Site photography
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {project.gallery.map((src, i) => (
                <motion.img
                  key={src + i}
                  src={src}
                  alt={`${project.title} — image ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05 }}
                  className="h-32 w-full rounded-md border border-brand-navy/12 object-cover"
                />
              ))}
            </div>
            </>
          )}

          <ProjectPager project={project} allProjects={allProjects} />

          <div className="mt-14 border-t border-brand-navy/12 pt-8">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-navy/50">
              More projects
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {allProjects.filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.id}
                    to="/projects/$projectId"
                    params={{ projectId: p.id }}
                    className="group overflow-hidden rounded-md border border-brand-navy/12 bg-white/80 transition-transform hover:-translate-y-1"
                  >
                    {p.cover ? (
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={p.cover}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] w-full"><CoverFallback label={p.country} /></div>
                    )}
                    <p className="p-3 font-display text-[0.95rem] leading-snug text-brand-navy">
                      {p.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function ProjectPager({ project, allProjects }: { project: ProjectRecord; allProjects: ProjectRecord[] }) {
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  if (!prev || !next) return null;

  return (
    <div className="mt-12 grid gap-3 border-t border-brand-navy/12 pt-8 sm:grid-cols-2">
      {[
        { p: prev, dir: "Previous project", align: "left" as const },
        { p: next, dir: "Next project", align: "right" as const },
      ].map(({ p, dir, align }) => (
        <Link
          key={dir}
          to="/projects/$projectId"
          params={{ projectId: p.id }}
          className={`group flex items-center gap-3 rounded-md border border-brand-navy/12 bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:border-brand-blue ${
            align === "right" ? "sm:flex-row-reverse sm:text-right" : ""
          }`}
        >
          {p.cover ? (
            <img
              src={p.cover}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="h-14 w-20 shrink-0 rounded object-cover"
            />
          ) : (
            <div className="h-14 w-20 shrink-0 overflow-hidden rounded"><CoverFallback label={p.country} /></div>
          )}
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-brand-navy/50">
              {align === "left" ? <ArrowLeft size={11} /> : null}
              {dir}
              {align === "right" ? <ArrowRight size={11} /> : null}
            </span>
            <span className="mt-1 block truncate font-display text-[0.95rem] text-brand-navy">
              {p.title}
            </span>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-brand-navy/45">
              {p.country !== "Location not specified" && p.country}
              {p.timeline ? `${p.country !== "Location not specified" ? " / " : ""}${p.timeline}` : ""}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

function CoverFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-navy to-brand-blue">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-primary-foreground/80">{label}</span>
    </div>
  );
}
