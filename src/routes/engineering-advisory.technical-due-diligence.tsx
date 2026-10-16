import { createFileRoute } from "@tanstack/react-router";

import { AdvisoryServicePage, type AdvisoryContent } from "@/components/AdvisoryServicePage";

const TITLE = "Technical Due Diligence for Solar and Storage Assets | YESEN Technologies";
const DESC =
  "Independent technical due diligence for solar PV and battery storage projects — design, yield, equipment, contracts and operating performance reviewed for investors and lenders.";
const PATH = "/engineering-advisory/technical-due-diligence";

export const Route = createFileRoute("/engineering-advisory/technical-due-diligence")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://yesen.website${PATH}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `https://yesen.website${PATH}` }],
  }),
  component: () => <AdvisoryServicePage c={CONTENT} current={PATH} />,
});

const CONTENT: AdvisoryContent = {
  eyebrow: "Engineering Advisory",
  title: "Technical Due Diligence",
  intro:
    "An independent technical review of solar PV and battery storage projects, so investors, lenders and buyers understand the risks before they commit capital.",
  overview: {
    heading: "Know what you are investing in",
    body: [
      "Whether a project is still on paper, under construction or already operating, its value rests on technical assumptions: how much energy it will produce, how long the equipment will last and whether the contracts protect the owner.",
      "We test those assumptions independently and set out the findings in a clear report, rating each risk and recommending how it can be reduced — so decisions are based on evidence rather than a seller's figures.",
    ],
  },
  scope: [
    { title: "Site and design", body: "Review of site conditions, layout, electrical design, grid connection and permits against good industry practice." },
    { title: "Energy yield", body: "Check of resource data, loss assumptions and yield estimates used in the financial model." },
    { title: "Equipment", body: "Assessment of modules, inverters, batteries and other major equipment, including supplier track record and warranties." },
    { title: "Contracts", body: "Technical review of EPC, O&M and supply contracts: guarantees, liquidated damages, warranties and responsibilities." },
    { title: "Operating assets", body: "For running plants, analysis of monitoring data, availability, performance ratio and maintenance records, plus a site inspection." },
    { title: "Financial model inputs", body: "Confirmation that technical inputs such as degradation, availability and O&M costs are reasonable." },
  ],
  process: [
    { title: "Data room review", body: "We go through the documents provided and list missing information early." },
    { title: "Site visit", body: "Where appropriate, engineers inspect the site or operating plant." },
    { title: "Analysis", body: "Design, yield, equipment and contracts are assessed and each risk is rated." },
    { title: "Reporting", body: "A clear report with findings, risk ratings and recommendations, followed by a walkthrough with your team." },
  ],
  deliverables: [
    "Red-flag report for early decisions",
    "Full technical due diligence report",
    "Risk register with ratings and mitigations",
    "Review of financial model technical inputs",
    "Q&A support during the transaction",
  ],
  whenToEngage: [
    "Before acquiring a project or operating plant",
    "Before financial close with lenders",
    "When refinancing an operating asset",
    "When an existing plant is underperforming",
  ],
  whoFor: [
    "Investors and funds",
    "Banks and lenders",
    "Buyers and sellers of assets",
    "Developers preparing for financing",
  ],
};
