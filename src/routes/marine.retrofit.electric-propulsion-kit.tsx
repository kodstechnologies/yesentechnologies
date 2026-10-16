import { SHARE_IMAGE } from "@/content/seo";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteChrome";
import { SolutionDetailPage } from "@/components/SolutionDetailPage";
import { MARINE_PAGES } from "@/lib/service-lines";
import retrofitImg from "@/assets/emarine-retrofit-batteries.png.asset.json";

const URL = "https://yesen.website/marine/retrofit/electric-propulsion-kit";
const T = "Electric Propulsion Kit for Retrofits | E-MARINE — YESEN Technologies";
const D = "Convert an existing vessel to electric with a YESEN propulsion kit: electric motor, B-Kool Marine Battery System and M-CONTROL monitoring.";
const base = MARINE_PAGES["electric-propulsion-kit"];
const data = {
  ...base,
  titleLines: ["Propulsion Kit", "Retrofit"],
  tagline: "Replace diesel with electric drive on the vessel you already own",
  image: retrofitImg.url,
  imageAlt: "B-Kool marine batteries installed onboard during a vessel retrofit",
  features: ["Hull & drivetrain assessment", "Electric motor & drive", "B-Kool Marine Battery System", "M-CONTROL monitoring & control (feature)", "Installation & commissioning"],
  intro: "For existing vessels, we start with an assessment of the hull, drivetrain and duty cycle, then size and install an electric motor, B-Kool batteries, controls and M-CONTROL monitoring in place of the existing engine.",
  faqs: [
    { q: "Can my existing boat be converted?", a: "Many can. Share your vessel details and we will assess the hull, drivetrain and route to confirm fit." },
    { q: "Who installs the retrofit kit?", a: "We install and commission the kit, or support your yard through the conversion." },
  ],
};

export const Route = createFileRoute("/marine/retrofit/electric-propulsion-kit")({
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
