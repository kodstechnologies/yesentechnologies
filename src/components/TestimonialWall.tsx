import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Quote, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTestimonial, fetchTestimonials, fetchVideos, type ApiTestimonial, type ApiVideo } from "@/api/testimonials";

import {
  visibleVideoTestimonials,
  type VideoTestimonial,
} from "@/data/testimonials";

type CarouselHandle = {
  scrollByCard: (dir: 1 | -1) => void;
  update: () => void;
};

function useCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef<CarouselHandle>({ scrollByCard: () => {}, update: () => {} });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    state.current.update = update;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  state.current.scrollByCard = scrollByCard;

  return {
    ref,
    canPrev,
    canNext,
    prev: () => state.current.scrollByCard(-1),
    next: () => state.current.scrollByCard(1),
  };
}

function CarouselArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
  label,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  label: string;
}) {
  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:cursor-default disabled:opacity-35 disabled:hover:border-border disabled:hover:text-foreground";
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" type="button" className={btn} onClick={onPrev} disabled={!canPrev} aria-label={`Previous ${label}`}>
        <ChevronLeft className="h-4.5 w-4.5" strokeWidth={1.6} />
      </Button>
      <Button variant="ghost" size="icon" type="button" className={btn} onClick={onNext} disabled={!canNext} aria-label={`Next ${label}`}>
        <ChevronRight className="h-4.5 w-4.5" strokeWidth={1.6} />
      </Button>
    </div>
  );
}

function RowLabel({
  children,
  count,
  arrows,
}: {
  children: React.ReactNode;
  count: number;
  arrows: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{children}</span>
        <span className="font-mono text-[11px] text-muted-foreground/60">{String(count).padStart(2, "0")}</span>
      </div>
      {arrows}
    </div>
  );
}

export default function TestimonialWall() {
  const videos = visibleVideoTestimonials();
  const videoRow = useCarousel();
  const [writtenIndex, setWrittenIndex] = useState(0);
  const [playing, setPlaying] = useState<VideoTestimonial | ApiVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    designation: "",
    testimonial: "",
  });
  const [written, setWritten] = useState<ApiTestimonial[]>([]);
  const [apiVideos, setApiVideos] = useState<ApiVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const [testimonialsData, videosData] = await Promise.all([
          fetchTestimonials({ limit: 100 }),
          fetchVideos({ limit: 100 }),
        ]);
        const visibleTestimonials = testimonialsData.testimonials.filter(
          (t) => t.showOnWebsite !== false && (t.quote || t.testimonial)
        );
        const visibleVideos = videosData.videos.filter(
          (v) => v.showOnWebsite !== false
        );
        setWritten(visibleTestimonials);
        setApiVideos(visibleVideos);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (!isLoading && written.length === 0 && videos.length === 0 && apiVideos.length === 0) return null;

  return (
    <section className="tw-section">
      <div className="tw-glow-a" aria-hidden />
      <div className="tw-glow-b" aria-hidden />

      <div className="tw-head tw-head-row">
        <div>
          <div className="tw-eyebrow">CLIENT VOICES</div>
          <h2 className="tw-title">Client voices</h2>
          <p className="tw-sub">What our clients say about working with Yesen.</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
         
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Your Testimonial</DialogTitle>
              <DialogDescription>
                Share your experience working with Yesen.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Your location"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="Your designation"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="testimonial">Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  placeholder="Share your experience..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={async () => {
                  if (!formData.name || !formData.testimonial) {
                    alert("Please fill in your name and testimonial");
                    return;
                  }

                  try {
                    setIsSubmitting(true);
                    await createTestimonial({
                      name: formData.name,
                      location: formData.location,
                      designation: formData.designation,
                      testimonial: formData.testimonial,
                    });

                    const data = await fetchTestimonials({ limit: 100 });
                    const visibleTestimonials = data.testimonials.filter(
                      (t) => t.showOnWebsite !== false && (t.quote || t.testimonial)
                    );
                    setWritten(visibleTestimonials);

                    setFormData({ name: "", location: "", designation: "", testimonial: "" });
                    setIsModalOpen(false);
                  } catch (err) {
                    console.error("Failed to submit testimonial:", err);
                    alert("Failed to submit testimonial. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit Testimonial"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl" style={{ paddingInline: "clamp(20px, 4vw, 40px)" }}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Video testimonials — carousel */}
          {(videos.length > 0 || apiVideos.length > 0) && (
            <div className="rounded-3xl border border-brand-navy/10 bg-brand-navy/[0.04] p-6 sm:p-8">
              <RowLabel
                count={videos.length + apiVideos.length}
                arrows={
                  <CarouselArrows
                    onPrev={videoRow.prev}
                    onNext={videoRow.next}
                    canPrev={videoRow.canPrev}
                    canNext={videoRow.canNext}
                    label="videos"
                  />
                }
              >
                Video testimonials
              </RowLabel>
              <div
                ref={videoRow.ref}
                className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {apiVideos.map((t) => (
                  <div key={t._id} className="w-full shrink-0 snap-start">
                    <button
                      type="button"
                      disabled={!t.videoUrl}
                      onClick={() => t.videoUrl && setPlaying(t)}
                      aria-label={t.videoUrl ? `Play video: ${t.title}` : `Video coming soon: ${t.title}`}
                      className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-default"
                    >
                      <span className="relative block aspect-video w-full">
                        {t.posterImage || t.thumbnailUrl ? (
                          <img
                            src={t.posterImage || t.thumbnailUrl}
                            alt={`Video thumbnail: ${t.title}`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <span
                            role="img"
                            aria-label={`Video placeholder: ${t.title}`}
                            className="block h-full w-full bg-[radial-gradient(120%_120%_at_20%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]"
                          />
                        )}
                        <span className="absolute inset-0 grid place-items-center bg-foreground/10 transition-colors group-hover:bg-foreground/5">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur transition-transform duration-300 group-enabled:group-hover:scale-110">
                            <Play className="ml-0.5 h-5 w-5" aria-hidden />
                          </span>
                        </span>
                      </span>
                      <span className="flex min-w-0 items-center justify-between gap-3 border-t border-border px-5 py-4">
                        <span className="min-w-0">
                          <span className="tw-name block truncate">{t.title}</span>
                          <span className="tw-role block truncate">
                            {t.name}, {t.role}
                          </span>
                        </span>
                        {!t.videoUrl && (
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            Coming soon
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                ))}
                {videos.map((t) => (
                  <div key={t.id} className="w-full shrink-0 snap-start">
                    <button
                      type="button"
                      disabled={!t.videoUrl}
                      onClick={() => t.videoUrl && setPlaying(t)}
                      aria-label={t.videoUrl ? `Play video: ${t.title}` : `Video coming soon: ${t.title}`}
                      className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-default"
                    >
                      <span className="relative block aspect-video w-full">
                        {t.posterImage ? (
                          <img
                            src={t.posterImage}
                            alt={`Video thumbnail: ${t.title}`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <span
                            role="img"
                            aria-label={`Video placeholder: ${t.title}`}
                            className="block h-full w-full bg-[radial-gradient(120%_120%_at_20%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]"
                          />
                        )}
                        <span className="absolute inset-0 grid place-items-center bg-foreground/10 transition-colors group-hover:bg-foreground/5">
                          <span className="grid h-14 w-14 place-items-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur transition-transform duration-300 group-enabled:group-hover:scale-110">
                            <Play className="ml-0.5 h-5 w-5" aria-hidden />
                          </span>
                        </span>
                        {t.isDemo && (
                          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">
                            Demo content
                          </span>
                        )}
                      </span>
                      <span className="flex min-w-0 items-center justify-between gap-3 border-t border-border px-5 py-4">
                        <span className="min-w-0">
                          <span className="tw-name block truncate">{t.title}</span>
                          <span className="tw-role block truncate">
                            {t.name}, {t.role}
                          </span>
                        </span>
                        {!t.videoUrl && (
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            Coming soon
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Written testimonials — carousel */}
          {written.length > 0 && (
            <div className="flex min-w-0 flex-col px-6 py-6 sm:px-8 sm:py-8">
              <RowLabel
                count={written.length}
                arrows={null}
              >
                Written testimonials
              </RowLabel>
              <div className="flex flex-1 flex-col" aria-live="polite" aria-atomic="true">
                {isLoading ? (
                  <div className="flex min-h-80 w-full flex-1 items-center justify-center text-center">
                    <span className="text-muted-foreground">Loading testimonials...</span>
                  </div>
                ) : (
                  written.slice(writtenIndex, writtenIndex + 1).map((t) => (
                    <figure
                      key={t._id || t.id}
                      className="m-0 flex min-h-80 w-full flex-1 flex-col items-center justify-center text-center"
                    >
                      <Quote className="h-5 w-5 shrink-0 text-primary/60" strokeWidth={1.5} aria-hidden />
                      <blockquote className="mt-5 max-w-lg text-center text-lg leading-relaxed text-brand-navy">
                        {t.quote || t.testimonial}
                      </blockquote>
                      <figcaption className="mt-auto flex items-center justify-center gap-3 pt-8 text-center">
                        <span
                          aria-hidden
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary ring-1 ring-border"
                        >
                          {t.name.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          <div className="tw-name">{t.name}</div>
                          <div className="tw-role">
                            {t.designation || t.company || t.location || ""}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  ))
                )}
              </div>
              <div className="mt-6 flex justify-center">
                <CarouselArrows
                  onPrev={() => setWrittenIndex((i) => Math.max(0, i - 1))}
                  onNext={() => setWrittenIndex((i) => Math.min(written.length - 1, i + 1))}
                  canPrev={writtenIndex > 0}
                  canNext={writtenIndex < written.length - 1}
                  label="testimonials"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {playing?.videoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video from ${playing.name}`}
          className="fixed inset-0 z-[100] grid place-items-center bg-foreground/80 p-4"
          onClick={() => setPlaying(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setPlaying(null)}
              className="absolute -top-11 right-0 grid h-9 w-9 place-items-center rounded-full bg-background text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <video
              src={playing.videoUrl}
              poster={playing.posterImage || playing.thumbnailUrl}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
