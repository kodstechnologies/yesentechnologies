import { fetchProjects, type ProjectRecord, type ApiProjectStatus } from "@/api/projects";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

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

const TITLE_WORDS = ["From", "pilot", "to", "fleet", "—", "in", "our", "own", "photos."];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "progress", label: "In Progress" },
  { key: "complete", label: "Completed" },
  { key: "profile", label: "Vessel profiles" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];
export default function ProjectsPhotos() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [serviceLine, setServiceLine] = useState("all");
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching projects from API with filters:", { filter, serviceLine });
        
        // Map frontend filter keys to backend status values
        let statusFilter: ApiProjectStatus | undefined;
        if (filter === "progress") {
          statusFilter = "inprogress";
        } else if (filter === "complete") {
          statusFilter = "completed";
        } else if (filter === "profile") {
          statusFilter = "live";
        }
        // If filter is "all", statusFilter remains undefined
        
        // Map serviceLine to category
        let categoryFilter: string | undefined;
        if (serviceLine === "land") {
          categoryFilter = "land and earth";
        } else if (serviceLine === "marine") {
          categoryFilter = "marine";
        } else if (serviceLine === "advisory") {
          categoryFilter = "advisory";
        }
        // If serviceLine is "all", categoryFilter remains undefined
        
        const data = await fetchProjects({ 
          limit: 100,
          status: statusFilter,
          category: categoryFilter
        });
        
        console.log("Projects loaded from API:", data.projects.length);
        setProjects(data.projects);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [filter, serviceLine]); // Re-fetch when filters change

  /* title blur-to-focus reveal */
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const words = Array.from(title.querySelectorAll<HTMLElement>(".pj-word"));
    words.forEach((w, i) => {
      w.style.transition = `opacity .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s, transform .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s, filter .8s cubic-bezier(.16,1,.3,1) ${i * 0.045}s`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          words.forEach((w) => {
            w.style.opacity = "1";
            w.style.transform = "translateY(0)";
            w.style.filter = "blur(0px)";
          });
          const sub = subRef.current;
          if (sub) {
            sub.style.transition =
              "opacity .9s cubic-bezier(.16,1,.3,1) .5s, transform .9s cubic-bezier(.16,1,.3,1) .5s";
            sub.style.opacity = "1";
            sub.style.transform = "translateY(0)";
          }
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(title);
    return () => io.disconnect();
  }, []);

  /* staggered reveal for the filtered cards */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".pj-card"));
    cards.forEach((card) => card.classList.remove("in-view"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const siblings = Array.from(grid.querySelectorAll<HTMLElement>(".pj-card"));
          const i = siblings.indexOf(card);
          card.style.transitionDelay = `${Math.min(i, 5) * 0.06}s`;
          card.classList.add("in-view");
          io.unobserve(card);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );

    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, [filter, serviceLine]);

  // Since filtering is now done on the backend, just use projects directly
  const visible = projects;

  return (
    <section id="projects" className="pj-section">
      <div className="pj-grain" aria-hidden />

      <div className="pj-head">
        <div className="pj-eyebrow">Proof of Work</div>
        <h2 ref={titleRef} className="pj-title">
          {TITLE_WORDS.map((w, i) => (
            <span key={`${w}-${i}`} className="pj-word">
              {w === "fleet" ? <em>fleet</em> : w}{" "}
            </span>
          ))}
        </h2>
        <p ref={subRef} className="pj-sub">
          Project imagery illustrates our work.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Homepage project categories">
        {[
          { key: "all", label: "All projects" }, 
          { key: "land", label: "Land & Earth" }, 
          { key: "marine", label: "Marine" }, 
          { key: "advisory", label: "Engineering Advisory" }
        ].map(line => (
          <Button 
            key={line.key} 
            variant="ghost" 
            aria-pressed={serviceLine === line.key} 
            onClick={() => setServiceLine(line.key)} 
            disabled={isLoading}
            className={serviceLine === line.key 
              ? "bg-brand-navy text-brand-ivory hover:bg-brand-navy/90 hover:text-brand-ivory" 
              : "text-brand-navy"
            }
          >
            {line.label}
          </Button>
        ))}
      </div>
      <div className="mx-auto mb-12 mt-8 flex max-w-full flex-wrap justify-center gap-2" role="group" aria-label="Homepage project status">
        {FILTERS.map((f) => (
          <Button
            variant="ghost"
            aria-pressed={filter === f.key}
            key={f.key}
            type="button"
            disabled={isLoading}
            className={filter === f.key 
              ? "rounded-full bg-brand-navy text-brand-ivory hover:bg-brand-navy/90 hover:text-brand-ivory" 
              : "rounded-full text-brand-navy"
            }
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <div ref={gridRef} className="pj-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="col-span-full py-8 text-center text-brand-navy/70">Loading projects...</p>
        ) : error ? (
          <p className="col-span-full py-8 text-center text-red-500">Error: {error}</p>
        ) : visible.length === 0 ? (
          <p className="col-span-full py-8 text-center text-brand-navy/70">No projects in this selection. (Filter: {filter}, ServiceLine: {serviceLine})</p>
        ) : (
          visible.map((project, idx) => (
            <Link key={project.id} to="/projects/$projectId" params={{ projectId: project.id }} className="block group">
              <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 h-full min-h-[22rem]">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={project.cover} 
                    alt={project.title} 
                    loading="lazy" 
                    decoding="async" 
                    className="h-full w-full object-cover transition-transform group-hover:scale-105" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-semibold mb-3 backdrop-blur-sm ${
                    project.status === "progress" 
                      ? "border-blue-400 text-blue-400 bg-blue-400/10" 
                      : project.status === "complete"
                      ? "border-green-400 text-green-400 bg-green-400/10"
                      : "border-yellow-400 text-yellow-400 bg-yellow-400/10"
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      project.status === "progress" 
                        ? "bg-blue-400" 
                        : project.status === "complete"
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`} />
                    {project.statusLabel}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-white/90 line-clamp-2">{project.summary}</p>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

    </section>
  );
}
