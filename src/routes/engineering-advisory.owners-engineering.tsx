import { createFileRoute } from "@tanstack/react-router";

import { AdvisoryServicePage, type AdvisoryContent } from "@/components/AdvisoryServicePage";

const TITLE = "Owner's Engineering for Solar and BESS Projects | YESEN Technologies";
const DESC =
  "Independent owner's engineering for solar PV and battery storage projects — design review, procurement support, construction monitoring, testing and commissioning.";
const PATH = "/engineering-advisory/owners-engineering";

export const Route = createFileRoute("/engineering-advisory/owners-engineering")({
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
  title: "Owner's Engineering",
  intro:
    "We act as the project owner's technical team — protecting quality, schedule and long-term performance from early design through to commissioning and handover of solar PV and battery storage plants.",
  overview: {
    heading: "Your engineer on the owner's side of the table",
    body: [
      "EPC contractors and equipment suppliers have their own priorities. An owner's engineer represents only the asset owner, checking that what is designed, bought and built matches the contract, the applicable standards and the performance the investment depends on.",
      "Our engineers review designs, follow the supply chain, inspect work on site and witness testing, so issues are caught when they are cheapest to fix — on paper or during construction, not after the plant is energised.",
    ],
  },
  scope: [
    { title: "Design review", body: "Independent review of layouts, single-line diagrams, cable sizing, earthing, structures and energy yield assumptions against the contract and relevant standards." },
    { title: "Specifications and tenders", body: "Preparing technical specifications and evaluating EPC and equipment bids on a like-for-like technical basis." },
    { title: "Equipment and factory checks", body: "Reviewing datasheets and certificates for modules, inverters, batteries and transformers, and witnessing factory inspections where needed." },
    { title: "Construction monitoring", body: "Regular site inspections, quality checks, punch lists and progress tracking against the agreed schedule." },
    { title: "Testing and commissioning", body: "Witnessing pre-commissioning and commissioning tests and checking results before the plant is accepted." },
    { title: "Handover and documentation", body: "Verifying as-built drawings, O&M manuals and warranty documents so the owner receives a complete record of the asset." },
  ],
  process: [
    { title: "Kick-off", body: "We review the contract, design basis and schedule, and agree the inspection and reporting plan with you." },
    { title: "Design stage", body: "Design packages are reviewed and comments tracked until every item is closed out." },
    { title: "Build stage", body: "Site visits, quality inspections and progress reports keep you informed of risks early." },
    { title: "Acceptance", body: "Testing is witnessed, defects are listed and handover is supported until the plant is accepted." },
  ],
  deliverables: [
    "Design review reports with tracked comments",
    "Technical specifications and bid evaluations",
    "Site inspection and progress reports",
    "Commissioning witness records",
    "Punch lists and handover checklist",
  ],
  whenToEngage: [
    "Before issuing an EPC tender",
    "When you need an independent view of a contractor's design",
    "During construction, to monitor quality and progress",
    "At commissioning and acceptance",
  ],
  whoFor: [
    "Independent power producers",
    "Commercial and industrial asset owners",
    "Developers and investors",
    "Public sector and institutional clients",
  ],
};
