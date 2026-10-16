import { SHARE_IMAGE } from "@/content/seo";
import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteChrome";
import { SolutionDetailPage } from "@/components/SolutionDetailPage";
import { MARINE_PAGES } from "@/lib/service-lines";

export const Route = createFileRoute("/marine/greenfield/electric-boat")({
  head: () => ({
    meta: [
      { title: "Electric Boat | E-MARINE — YESEN Technologies" },
      { name: "description", content: "New-build battery-electric boats designed and built by YESEN Technologies." },
      { property: "og:title", content: "Electric Boat | E-MARINE — YESEN Technologies" },
      { property: "og:description", content: "New-build battery-electric boats designed and built by YESEN Technologies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yesen.website/marine/greenfield/electric-boat" },
      { property: "og:image", content: SHARE_IMAGE },
      { name: "twitter:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/marine/greenfield/electric-boat" }],
  }),
  component: () => (
    <>
      <SiteHeader heroDark />
      <SolutionDetailPage data={MARINE_PAGES["electric-boat"]} back={{ label: "Marine Projects", to: "/projects" }} />
    </>
  ),
});
