import { SHARE_IMAGE } from "@/content/seo";
import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteChrome";
import { SolutionDetailPage } from "@/components/SolutionDetailPage";
import { MARINE_PAGES } from "@/lib/service-lines";

export const Route = createFileRoute("/marine/greenfield/solar-electric-boat")({
  head: () => ({
    meta: [
      { title: "Solar Electric Boat | E-MARINE — YESEN Technologies" },
      { name: "description", content: "New-build solar electric vessels with integrated solar roofs and B-Kool Marine Battery System batteries." },
      { property: "og:title", content: "Solar Electric Boat | E-MARINE — YESEN Technologies" },
      { property: "og:description", content: "New-build solar electric vessels with integrated solar roofs and B-Kool Marine Battery System batteries." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yesen.website/marine/greenfield/solar-electric-boat" },
      { property: "og:image", content: SHARE_IMAGE },
      { name: "twitter:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/marine/greenfield/solar-electric-boat" }],
  }),
  component: () => (
    <>
      <SiteHeader heroDark />
      <SolutionDetailPage data={MARINE_PAGES["solar-electric-boat"]} back={{ label: "Marine Projects", to: "/projects" }} />
    </>
  ),
});
