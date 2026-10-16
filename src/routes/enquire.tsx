import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { QuoteForm, INTEREST_KEYS, type InterestKey } from "@/components/QuoteForm";

export const Route = createFileRoute("/enquire")({
  head: () => ({
    meta: [
      { title: "Get a Quote | YESEN — Land & Earth, Marine, Advisory & Products" },
      {
        name: "description",
        content:
          "Request a quote from YESEN Technologies for land-based solar and storage, marine electrification (E-MARINE), engineering advisory or the B-Kool battery system — one step-by-step form.",
      },
      { property: "og:title", content: "Get a Quote | YESEN — Land & Earth, Marine, Advisory & Products" },
      {
        property: "og:description",
        content:
          "One step-by-step form for land-based solar, marine electrification and engineering advisory — our engineers reply within 1–2 working days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/enquire" }],
  }),
  validateSearch: (s: Record<string, unknown>): { service?: InterestKey; type?: string; mode?: string } => ({
    service: typeof s.service === "string" && INTEREST_KEYS.includes(s.service) ? (s.service as InterestKey) : undefined,
    type: typeof s.type === "string" ? s.type : undefined,
    mode: typeof s.mode === "string" && s.mode ? s.mode : undefined,
  }),
  component: EnquirePage,
});

function EnquirePage() {
  const search = Route.useSearch();
  return (
    <main className="relative min-h-screen bg-shell pb-10 pt-24">
      <div className="relative mx-auto w-full max-w-[80rem] px-4 sm:px-8">
        <Link
          to="/"
          className="mb-5 inline-flex h-11 items-center gap-2 rounded-full border border-brand-navy/15 bg-brand-ivory px-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-navy transition-colors hover:border-brand-leaf"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
        <QuoteForm initial={search} />
      </div>
    </main>
  );
}
