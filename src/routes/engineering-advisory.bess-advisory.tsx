import { createFileRoute } from "@tanstack/react-router";

import { AdvisoryServicePage, type AdvisoryContent } from "@/components/AdvisoryServicePage";

const TITLE = "BESS Advisory — Battery Energy Storage Engineering | YESEN Technologies";
const DESC =
  "Independent battery energy storage (BESS) advisory — use-case sizing, technology selection, specifications, safety, integration with solar and commissioning support.";
const PATH = "/engineering-advisory/bess-advisory";

export const Route = createFileRoute("/engineering-advisory/bess-advisory")({
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
  title: "BESS Advisory",
  intro:
    "Engineering support for battery energy storage systems — from choosing the right size and technology to safe installation, integration with solar and commissioning.",
  overview: {
    heading: "Storage that is sized, specified and built right",
    body: [
      "A battery system only pays off when it is matched to how it will actually be used — peak shaving, solar shifting, backup power or grid services each call for a different size, power rating and control strategy.",
      "We help owners define that use case, compare technologies and suppliers, and follow the project through design, installation and testing, with safety and long-term performance in view at every step.",
    ],
  },
  scope: [
    { title: "Use case and sizing", body: "Load and generation analysis to size energy capacity and power rating for the intended applications." },
    { title: "Technology selection", body: "Comparison of battery chemistries, system architectures and suppliers for performance, lifetime and cost." },
    { title: "Specifications and procurement", body: "Technical specifications, bid evaluation and review of warranties and performance guarantees." },
    { title: "Safety and compliance", body: "Review of fire protection, ventilation, separation distances and applicable codes and standards." },
    { title: "Integration with solar and grid", body: "Review of inverter, energy management system and control logic for hybrid and grid-connected systems." },
    { title: "Testing and commissioning", body: "Witnessing capacity, efficiency and functional tests before the system is accepted." },
  ],
  process: [
    { title: "Define", body: "We agree the goals for the storage system and gather load, tariff and site data." },
    { title: "Design", body: "Sizing, technology options and a recommended concept are prepared and reviewed with you." },
    { title: "Procure", body: "Specifications are issued and supplier offers are evaluated on a technical basis." },
    { title: "Deliver", body: "Installation is reviewed and testing witnessed until the system is accepted." },
  ],
  deliverables: [
    "Sizing and use-case study",
    "Technology and supplier comparison",
    "Technical specification for tender",
    "Safety and design review reports",
    "Commissioning witness records",
  ],
  whenToEngage: [
    "When adding storage to an existing solar plant",
    "When planning a new hybrid or microgrid system",
    "Before choosing a battery supplier",
    "At installation and commissioning",
  ],
  whoFor: [
    "Commercial and industrial sites",
    "Solar plant owners",
    "Microgrid and off-grid projects",
    "Developers and investors",
  ],
};
