import { SHARE_IMAGE } from "@/content/seo";
import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteChrome";
import { SolutionDetailPage } from "@/components/SolutionDetailPage";
import { MARINE_PAGES } from "@/lib/service-lines";

export const Route = createFileRoute("/marine/retrofit/vessel-retrofit")({
  head: () => ({
    meta: [
      { title: "Vessel Retrofit | E-MARINE — YESEN Technologies" },
      { name: "description", content: "Convert existing diesel vessels to electric propulsion with YESEN Technologies." },
      { property: "og:title", content: "Vessel Retrofit | E-MARINE — YESEN Technologies" },
      { property: "og:description", content: "Convert existing diesel vessels to electric propulsion with YESEN Technologies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yesen.website/marine/retrofit/vessel-retrofit" },
      { property: "og:image", content: SHARE_IMAGE },
      { name: "twitter:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yesen.website/marine/retrofit/vessel-retrofit" }],
  }),
  component: () => (
    <>
      <SiteHeader heroDark />
      <SolutionDetailPage data={MARINE_PAGES["vessel-retrofit"]} back={{ label: "Marine Projects", to: "/projects" }} />
    </>
  ),
});
