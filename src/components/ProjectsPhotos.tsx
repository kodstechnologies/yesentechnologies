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
  { key: "progress", label: "Ongoing" },
  { key: "complete", label: "Completed" },
  { key: "profile", label: "Vessel profiles" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];
export default function ProjectsPhotos() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [serviceLine, setServiceLine] = useState("All projects");
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching projects from API...");
        const data = await fetchProjects({ limit: 100 });
        console.log("Projects loaded:", data.projects);
        setProjects(data.projects);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

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

  const visible = useMemo(() => {
    let filtered = projects;

    console.log("Filtering projects - filter:", filter, "serviceLine:", serviceLine, "total projects:", projects.length);
    console.log("First project data:", projects[0]);

    if (filter === "progress") {
      filtered = filtered.filter(p => p.status === "progress");
      console.log("After status filter (progress):", filtered.length);
    } else if (filter === "complete") {
      filtered = filtered.filter(p => p.status === "complete");
      console.log("After status filter (complete):", filtered.length);
    } else if (filter === "profile") {
      filtered = filtered.filter(p => p.status === "live");
      console.log("After status filter (profile):", filtered.length);
    } else {
      console.log("No status filter applied (filter is 'all')");
    }

    if (serviceLine !== "all") {
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
      console.log("After serviceLine filter:", filtered.length);
    } else {
      console.log("No serviceLine filter applied (serviceLine is 'all')");
    }

    console.log("Visible projects after filtering:", filtered.length);
    return filtered;
  }, [projects, serviceLine, filter]);

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
        {[{ key: "All projects", label: "All projects" }, { key: "Land-Based", label: "Land & Earth" }, { key: "Marine", label: "Marine" }, { key: "Engineering Advisory", label: "Engineering Advisory" }].map(line => (
          <Button key={line.key} variant="ghost" aria-pressed={serviceLine === line.key} onClick={() => setServiceLine(line.key)} className={serviceLine === line.key ? "bg-brand-navy text-brand-ivory hover:bg-brand-navy/90 hover:text-brand-ivory" : "text-brand-navy"}>
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
            className={filter === f.key ? "rounded-full bg-brand-navy text-brand-ivory hover:bg-brand-navy/90 hover:text-brand-ivory" : "rounded-full text-brand-navy"}
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
          <p className="col-span-full py-8 text-center text-brand-navy/70">No projects in this selection.</p>
        ) : (
          visible.map(project => (
            <Link key={project.id} to="/projects/$projectId" params={{ projectId: project.id }} className="pj-card-link">
              <article className="pj-card flex min-h-[22rem] h-full flex-col bg-brand-navy">
                <img src={project.cover} alt={project.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="pj-scrim" />
                <div className="pj-shine" />
                <div className="pj-content mt-auto min-h-[22rem]">
                  <span className={`pj-badge ${project.status === "progress" ? "ongoing" : "done"}`}><i />{project.statusLabel}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

    </section>
  );
}
