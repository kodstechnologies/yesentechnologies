import { SHARE_IMAGE } from "@/content/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteChrome";
import { SolutionDetailPage } from "@/components/SolutionDetailPage";
import { MARINE_PAGES } from "@/lib/service-lines";

const URL = "https://yesen.website/marine/greenfield/electric-propulsion-kit";
const T = "Electric Propulsion Kit for New Builds | E-MARINE — YESEN Technologies";
const D = "Electric motor, B-Kool Marine Battery System and M-CONTROL monitoring, engineered into new-build vessels by YESEN Technologies.";
const base = MARINE_PAGES["electric-propulsion-kit"];
const data = {
  ...base,
  titleLines: ["Propulsion Kit", "Greenfield"],
  tagline: "Motor, battery and controls designed into your new build from day one",
  features: ["Electric motor & drive", "B-Kool Marine Battery System", "M-CONTROL monitoring & control (feature)", "Designed in at build stage", "Engineering support"],
  intro: "For new builds, we work with you and your boatbuilder from the design stage — sizing the motor, B-Kool batteries, controls and M-CONTROL monitoring around the hull, route and duty cycle, then supporting integration and commissioning.",
  faqs: [
    { q: "When should we involve YESEN in a new build?", a: "As early as possible — ideally at concept or design stage, so the drivetrain, battery space and weight distribution are planned together." },
    { q: "Do you work with our boatbuilder?", a: "Yes. We supply the kit and support your boatbuilder through integration, or install and commission it ourselves." },
  ],
};

export const Route = createFileRoute("/marine/greenfield/electric-propulsion-kit")({
  head: () => ({
    meta: [
      { title: T }, { name: "description", content: D },
      { property: "og:title", content: T }, { property: "og:description", content: D },
      { property: "og:type", content: "website" }, { property: "og:url", content: URL },
      { property: "og:image", content: SHARE_IMAGE }, { name: "twitter:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => (<><SiteHeader heroDark /><SolutionDetailPage data={data} back={{ label: "Marine Projects", to: "/projects" }} /></>),
});
