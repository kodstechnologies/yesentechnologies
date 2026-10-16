import { HEADLINE_STATS } from "@/content/company";
import c1 from "@/assets/p001-cover.jpg.asset.json";
import c2 from "@/assets/p002-cover.jpg.asset.json";
import c3 from "@/assets/p003-cover.jpg.asset.json";
import c4 from "@/assets/p004-cover.jpg.asset.json";
import c5 from "@/assets/p005-cover.jpg.asset.json";
import c6 from "@/assets/p006-cover.jpg.asset.json";
// Original 007/008 covers were 156px thumbnails and rendered blurry; use full-size real photos.
import c8Url from "@/assets/ongoing-houseboat.jpg";
const c8 = { url: c8Url };
import guamCover from "@/assets/guam-roof-b.jpg";
import guamCover2 from "@/assets/guam-roof-a.jpg";
import c9 from "@/assets/p009-cover.jpg.asset.json";
import g1b from "@/assets/p001-g2.jpg.asset.json";
import g2b from "@/assets/p002-g2.jpg.asset.json";
import g2c from "@/assets/p002-g3.jpg.asset.json";
import g2d from "@/assets/p002-g4.jpg.asset.json";
import g2e from "@/assets/p002-g5.jpg.asset.json";
import g2f from "@/assets/p002-g6.jpg.asset.json";
import g3b from "@/assets/p003-g2.jpg.asset.json";
import g3c from "@/assets/p003-g3.jpg.asset.json";
import g9b from "@/assets/p009-g2.jpg.asset.json";
import sp1 from "@/assets/solar-proj-1.jpg.asset.json";
import sp2 from "@/assets/solar-proj-2.jpg.asset.json";
import sp3 from "@/assets/solar-proj-3.jpg.asset.json";
import sp4 from "@/assets/solar-proj-4.jpg.asset.json";
import sp5 from "@/assets/solar-proj-5.jpg.asset.json";
import shikara from "@/assets/ytpl-boat-1-hq.png.asset.json";
import cial from "@/assets/ytpl-boat-2-hq.png.asset.json";
import hydel from "@/assets/ytpl-boat-3-hq.png.asset.json";
import leisure from "@/assets/ytpl-boat-4-hq.jpeg.asset.json";
import solarBoat from "@/assets/ytpl-boat-5-hq.jpeg.asset.json";
import houseRetrofit from "@/assets/ytpl-boat-6-hq.png.asset.json";
import houseTwo from "@/assets/ytpl-boat-7-hq.jpeg.asset.json";
import houseFour from "@/assets/ytpl-boat-8-hq.png.asset.json";

export type ProjectStatus = "complete" | "progress" | "pilot" | "profile";

export type ProjectRecord = {
  id: string;
  serviceLine: "Land-Based" | "Marine" | "Engineering Advisory";
  client?: string;
  capacity?: string;
  showPublicly?: boolean;
  contractValue?: string;
  status: ProjectStatus;
  statusLabel: string;
  title: string;
  loc: string;
  country: string;
  timeline: string;
  technology: string;
  summary: string;
  body: string;
  specs: Array<[string, string]>;
  cover: string;
  gallery: string[];
};

/** Supplied vessel profiles; completion/location are not inferred from photographs. */
export const PRESENTATION_MARINE_PROJECTS: ProjectRecord[] = [
  {
    id: "015", serviceLine: "Marine", status: "profile", statusLabel: "Vessel profile",
    title: "Shikara Solar Boat", loc: "Location not specified", country: "Location not specified", timeline: "",
    technology: "Solar charging · 8.4 kW electric outboard",
    summary: "A 12 m leisure tourism boat with electric propulsion and solar charging.",
    body: "Shikara Solar Boat is designed for 12 adults, combining an 8.4 kW outboard motor with a 30 kWh YSPL lithium battery pack for leisure tourism.",
    specs: [["Passenger capacity", "12 adults"], ["Length × breadth", "12 m × 3 m"], ["Electric motor", "8.4 kW outboard motor"], ["Battery capacity", "30 kWh (YSPL)"], ["Battery type", "Lithium"], ["Application", "Leisure tourism"], ["Vessel speed", "7–8 knots"]],
    cover: shikara.url, gallery: [shikara.url],
  },
  {
    id: "016", serviceLine: "Marine", status: "profile", statusLabel: "Vessel profile",
    title: "Hydel Tourism Electric Boat", loc: "Location not specified", country: "Location not specified", timeline: "",
    technology: "Electric retrofit · twin 8 kW outboards",
    summary: "A 12 m leisure tourism boat retrofitted with electric propulsion.",
    body: "Hydel Tourism Electric Boat accommodates 25 adults. Its electric retrofit pairs twin 8 kW outboard motors with a 70 kWh YSPL liquid-cooled lithium battery pack.",
    specs: [["Passenger capacity", "25 adults"], ["Length × breadth", "12 m × 4.5 m"], ["Electric motor", "Twin 8 kW outboard motors"], ["Battery capacity", "70 kWh (YSPL)"], ["Battery type", "Lithium, liquid-cooled"], ["Application", "Leisure tourism"], ["Vessel speed", "10 knots"]],
    cover: hydel.url, gallery: [hydel.url],
  },
  {
    id: "017", serviceLine: "Marine", status: "profile", statusLabel: "Vessel profile",
    title: "Electric Leisure Boat", loc: "Location not specified", country: "Location not specified", timeline: "",
    technology: "Solar charging · twin 8 kW electric outboards",
    summary: "An 8 m leisure boat with electric propulsion and solar charging.",
    body: "An electric leisure boat for 10 adults, equipped with twin 8 kW electric outboard motors and a 20 kWh YSPL liquid-cooled lithium battery pack.",
    specs: [["Passenger capacity", "10 adults"], ["Length × breadth", "8 m × 3.5 m"], ["Electric motor", "Twin 8 kW electric outboards"], ["Battery capacity", "20 kWh (YSPL)"], ["Battery type", "Lithium, liquid-cooled"], ["Application", "Leisure tourism"], ["Vessel speed", "6–7 knots"]],
    cover: leisure.url, gallery: [leisure.url],
  },
  {
    id: "018", serviceLine: "Marine", status: "profile", statusLabel: "Vessel profile",
    title: "Solar Electric Boat", loc: "Location not specified", country: "Location not specified", timeline: "",
    technology: "Solar charging · 15 kW electric outboard",
    summary: "An 8 m leisure tourism boat with electric propulsion and solar charging.",
    body: "Solar Electric Boat accommodates 20 adults and combines a 15 kW electric outboard motor with a 45 kWh YSPL lithium battery pack.",
    specs: [["Passenger capacity", "20 adults"], ["Length × breadth", "8 m × 3.5 m"], ["Electric motor", "15 kW electric outboard motor"], ["Battery capacity", "45 kWh (YSPL)"], ["Battery type", "Lithium"], ["Application", "Leisure tourism"], ["Vessel speed", "7–8 knots"]],
    cover: solarBoat.url, gallery: [solarBoat.url],
  },
  {
    id: "019", serviceLine: "Marine", status: "profile", statusLabel: "Vessel profile",
    title: "Electric House Boat — Retrofit", loc: "Location not specified", country: "Location not specified", timeline: "",
    technology: "Electric retrofit · 400 V / 55 kW inboard",
    summary: "A conventional three-bedroom houseboat retrofitted with electric propulsion.",
    body: "A 27 m houseboat retrofit for tourism, with three bedrooms accommodating four adults each. A 400 V / 55 kW inboard motor is powered by a 400 V / 60 kWh YSPL liquid-cooled lithium battery pack.",
    specs: [["Accommodation", "3 bedrooms × 4 adults"], ["Length × breadth", "27 m × 6 m"], ["Electric motor", "1 × 400 V / 55 kW inboard"], ["Battery capacity", "400 V / 60 kWh (YSPL)"], ["Battery type", "Lithium, liquid-cooled"], ["Application", "Tourism"], ["Vessel speed", "4–5 knots"]],
    cover: houseRetrofit.url, gallery: [houseRetrofit.url],
  },
  {
    id: "020", serviceLine: "Marine", status: "progress", statusLabel: "Under construction",
    title: "Solar Electric House Boat — 2 Bedroom", loc: "Location not specified", country: "Location not specified", timeline: "Under construction",
    technology: "New build · twin 96 V / 35 kW inboards",
    summary: "A new-build two-bedroom solar-electric houseboat by YESEN Technologies, under construction.",
    body: "Built by YESEN Technologies for leisure tourism, this 27 m solar-electric houseboat has two bedrooms accommodating four adults each. Twin 96 V / 35 kW inboard motors are paired with an 80 kWh liquid-cooled lithium battery system.",
    specs: [["Accommodation", "2 bedrooms × 4 adults"], ["Length × breadth", "27 m × 6 m"], ["Electric motor", "2 × 96 V / 35 kW inboard motors"], ["Battery capacity", "96 V / 80 kWh"], ["Battery type", "Lithium, liquid-cooled"], ["Application", "Tourism"], ["Vessel speed", "4–5 knots"], ["Builder", "YESEN Technologies"], ["Status", "Under construction"]],
    cover: houseTwo.url, gallery: [houseTwo.url],
  },
  {
    id: "021", serviceLine: "Marine", status: "progress", statusLabel: "Under construction",
    title: "Solar Electric House Boat — 4 Bedroom", loc: "Location not specified", country: "Location not specified", timeline: "Under construction",
    technology: "New build · twin 96 V / 35 kW inboards",
    summary: "A new-build four-bedroom solar-electric houseboat by YESEN Technologies, under construction.",
    body: "Built by YESEN Technologies for leisure tourism, this 27 m solar-electric houseboat has four bedrooms accommodating four adults each. Twin 96 V / 35 kW inboard motors are paired with an 80 kWh liquid-cooled lithium battery system.",
    specs: [["Accommodation", "4 bedrooms × 4 adults"], ["Length × breadth", "27 m × 6 m"], ["Electric motor", "2 × 96 V / 35 kW inboard motors"], ["Battery capacity", "96 V / 80 kWh"], ["Battery type", "Lithium, liquid-cooled"], ["Application", "Tourism"], ["Vessel speed", "4–5 knots"], ["Builder", "YESEN Technologies"], ["Status", "Under construction"]],
    cover: houseFour.url, gallery: [houseFour.url],
  },
];

export const PROJECT_LOG: ProjectRecord[] = [
  {
    id: "001",
    serviceLine: "Marine",
    status: "complete",
    statusLabel: "Completed",
    title: "CIAL Solar Boat",
    loc: "India",
    country: "India",
    timeline: "Deployed 2021",
    technology: "Solar charging · twin 15 kW electric outboards",
    summary: "A 15 m ferry for 25 adults with electric propulsion and solar charging.",
    body: "CIAL Solar Boat combines electric propulsion and solar charging for ferry operations. Twin 15 kW electric outboards are supported by an 80 kWh YSPL lithium battery pack with liquid cooling and class approval.",
    specs: [
      ["Type", "Solar-electric passenger ferry"],
      ["Deployed", "2021"],
      ["Location", "India"],
      ["Technology", "E-MARINE electrification kit"],
      ["Passenger capacity", "25 adults"],
      ["Length × breadth", "15 m × 3 m"],
      ["Electric motor", "Twin 15 kW electric outboards"],
      ["Battery capacity", "80 kWh (YSPL)"],
      ["Battery type", "Lithium, liquid-cooled, class approved"],
      ["Application", "Ferry operations"],
      ["Vessel speed", "7–8 knots"],
    ],
    cover: cial.url,
    gallery: [cial.url, c1.url, g1b.url],
  },
  {
    id: "002",
    serviceLine: "Marine",
    status: "progress",
    statusLabel: "In progress",
    title: "Solar houseboats — Tourism",
    loc: "India",
    country: "India",
    timeline: "Nov 2025 → Aug 2026",
    technology: "Solar-electric houseboats + shore infrastructure",
    summary:
      "Design, fabrication and supply of luxury solar houseboats with complete shore infrastructure.",
    body: "The project encompasses design, fabrication, and supply of 2 BHK and 4 BHK solar-electric houseboats, along with shore infrastructure including a ticketing counter, jetty, and waiting room facilities.",
    specs: [
      ["Awarded", "13 Nov 2025"],
      ["Target completion", "31 Aug 2026"],
      ["Unit types", "2 BHK, 4 BHK"],
      ["Location", "India"],
      ["Scope", "Houseboats + shore infrastructure"],
    ],
    cover: c2.url,
    gallery: [c2.url, g2b.url, g2c.url, g2d.url, g2e.url, g2f.url],
  },
  {
    id: "003",
    serviceLine: "Land-Based",
    capacity: "114.48 kWp",
    contractValue: "USD 188,471",
    showPublicly: false,
    status: "complete",
    statusLabel: "Complete",
    title: "Commercial Centre solar",
    loc: "USA",
    country: "USA",
    timeline: "Completed",
    technology: "Rooftop solar PV — 114.48 kWp",
    summary: "Rooftop solar installation for a commercial centre.",
    body: "Full rooftop solar deployment for a commercial centre, including racking installation and anchoring with waterproofing completed.",
    specs: [

      ["Solar modules installed", "212 nos."],
      ["Installed capacity", "114.48 kWp"],
      ["Location", "USA"],
    ],
    cover: c3.url,
    gallery: [c3.url, g3b.url, g3c.url],
  },
  {
    id: "004",
    serviceLine: "Land-Based",
    status: "complete",
    statusLabel: "Complete",
    title: "House solar installations",
    loc: "USA",
    country: "USA",
    timeline: "Completed",
    technology: "Residential rooftop solar PV",
    summary: "Several residential rooftop solar installations.",
    body: "Multiple house solar installations completed as part of YESEN's residential clean-energy work.",
    specs: [
      ["Category", "Residential solar"],
      ["Location", "USA"],
      ["Status", "Complete"],
    ],
    cover: c4.url,
    gallery: [c4.url],
  },
  {
    id: "005",
    serviceLine: "Land-Based",
    status: "complete",
    statusLabel: "Complete",
    title: "House solar installations",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "Residential rooftop solar PV",
    summary: "Several residential rooftop solar installations across India.",
    body: "Multiple house solar installations completed across India as part of YESEN's residential clean-energy work.",
    specs: [
      ["Category", "Residential solar"],
      ["Location", "India"],
      ["Status", "Complete"],
    ],
    cover: c5.url,
    gallery: [c5.url],
  },
  {
    id: "006",
    serviceLine: "Land-Based",
    status: "complete",
    statusLabel: "Complete",
    title: `${HEADLINE_STATS[2].value}+ MNRE solar installations`,
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "MNRE rooftop solar PV",
    summary: "Over 200 MNRE-registered solar installations delivered across India.",
    body: "YESEN has delivered more than 200 solar installations under MNRE (Ministry of New and Renewable Energy) schemes across India.",
    specs: [
      ["Installations", "200+"],
      ["Programme", "MNRE"],
      ["Location", "India"],
    ],
    cover: c6.url,
    gallery: [c6.url],
  },
  {
    id: "008",
    serviceLine: "Marine",
    status: "complete",
    statusLabel: "Complete",
    title: "Solar-electric houseboat",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "Solar-electric houseboat",
    summary: "Solar-electric houseboat delivered for tourism operations.",
    body: "A completed houseboat project built with clean marine propulsion and solar integration.",
    specs: [
      ["Type", "Houseboat"],
      ["Location", "India"],
      ["Status", "Complete"],
    ],
    cover: c8.url,
    gallery: [c8.url],
  },
  {
    id: "009",
    serviceLine: "Marine",
    client: "CIAL",
    status: "complete",
    statusLabel: "Complete",
    title: "Electric boat",
    loc: "India",
    country: "India",
    timeline: "Completed",
    technology: "E-MARINE electric propulsion",
    summary: "Electric boat delivered for airport operations.",
    body: "A completed electric boat project featuring E-MARINE's electrification systems and onboard control console.",
    specs: [
      ["Client", "CIAL"],
      ["Type", "Electric boat"],
      ["Location", "India"],
    ],
    cover: c9.url,
    gallery: [c9.url, g9b.url],
  },
  { id: "010", serviceLine: "Land-Based", capacity: "114.5 kWp", status: "complete", statusLabel: "Completed", title: "114.5 kWp Carport Rooftop Solar Installation", loc: "Guam", country: "Guam", timeline: "Completed", technology: "On-grid carport rooftop solar — 114.5 kWp", summary: "114.5 kWp on-grid carport rooftop solar for a commercial site in Guam.", body: "A 114.5 kWp on-grid carport rooftop solar installation delivered for a commercial application in Guam.", specs: [["System capacity", "114.5 kWp"], ["System type", "On-grid"], ["Application", "Commercial"], ["Location", "Guam"]], cover: sp5.url, gallery: [sp5.url, guamCover2, guamCover] },
  { id: "011", serviceLine: "Land-Based", capacity: "20 kWp", status: "complete", statusLabel: "Completed", title: "20 kWp Carport Rooftop Solar Installation", loc: "Abu Dhabi, UAE", country: "UAE", timeline: "Completed", technology: "Hybrid carport solar — 20 kWp + 46 kWh lithium", summary: "20 kWp hybrid carport rooftop solar with 46 kWh lithium storage in Abu Dhabi.", body: "A 20 kWp hybrid carport rooftop solar installation with 46 kWh of lithium battery storage, delivered for a commercial application in Abu Dhabi, UAE.", specs: [["System capacity", "20 kWp"], ["Lithium capacity", "46 kWh"], ["System type", "Hybrid"], ["Application", "Commercial"], ["Location", "Abu Dhabi, UAE"]], cover: sp4.url, gallery: [sp4.url] },
  { id: "012", serviceLine: "Land-Based", capacity: "3 kWp", status: "complete", statusLabel: "Completed", title: "3 kWp Residential Rooftop Solar Installation", loc: "Angamally, Kerala", country: "India", timeline: "Completed", technology: "On-grid residential rooftop solar — 3 kWp", summary: "3 kWp on-grid residential rooftop solar in Angamally, Kerala.", body: "A 3 kWp on-grid rooftop solar installation for a residence in Angamally, Kerala.", specs: [["System capacity", "3 kWp"], ["System type", "On-grid"], ["Application", "Residential"], ["Location", "Angamally, Kerala"]], cover: sp1.url, gallery: [sp1.url] },
  { id: "013", serviceLine: "Land-Based", capacity: "3 kWp", status: "complete", statusLabel: "Completed", title: "3 kWp Residential Rooftop Solar Installation", loc: "Ernakulam, Kerala", country: "India", timeline: "Completed", technology: "On-grid residential rooftop solar — 3 kWp", summary: "3 kWp on-grid residential rooftop solar in Ernakulam, Kerala.", body: "A 3 kWp on-grid rooftop solar installation for a residence in Ernakulam, Kerala.", specs: [["System capacity", "3 kWp"], ["System type", "On-grid"], ["Application", "Residential"], ["Location", "Ernakulam, Kerala"]], cover: sp3.url, gallery: [sp3.url] },
  { id: "014", serviceLine: "Land-Based", status: "complete", statusLabel: "Completed", title: "Kerala's First Milk Bank — Ernakulam General Hospital", loc: "Ernakulam, Kerala", country: "India", timeline: "Completed", technology: "Yesen Sustain uninterrupted power system", summary: "Uninterrupted power for Kerala's first milk bank, keeping milk preserved for over three months.", body: "Kerala's first Milk Bank is located at the General Hospital in Ernakulam. Since its inception, the unique milk bank has been a boon for newborns, and especially prematurely born babies. Yesen Sustain's solution powers high inductive loads like milk pasteurizer, freezer, refrigerators, pumps etc. providing uninterrupted power to the milk bank facility ensuring the integrity of the milk. Now with Yesen Sustain the milk can be preserved for more than three months. Reliable and quality power is the basic requirement for any healthcare facility, and our systems ensure that reliable power is available 24 hours.", specs: [["Facility", "Ernakulam General Hospital"], ["Loads", "Pasteurizer, freezer, refrigerators, pumps"], ["Power", "Uninterrupted, 24 hours"], ["Application", "Healthcare"], ["Location", "Ernakulam, Kerala"]], cover: sp2.url, gallery: [sp2.url] },
  ...PRESENTATION_MARINE_PROJECTS,
];

export const STATUS_STYLES: Record<ProjectStatus | "live", string> = {
  complete: "bg-brand-leaf/12 text-brand-forest",
  progress: "bg-brand-blue/12 text-brand-navy",
  pilot: "bg-amber-500/12 text-amber-700",
  profile: "bg-brand-blue/12 text-brand-navy",
  live: "bg-brand-leaf/12 text-brand-forest",
};

export const STATUS_DOT: Record<ProjectStatus | "live", string> = {
  complete: "bg-brand-forest",
  progress: "bg-brand-blue",
  pilot: "bg-amber-600",
  profile: "bg-brand-blue",
  live: "bg-brand-forest",
};

export function findProject(id: string) {
  return PROJECT_LOG.find((p) => p.id === id);
}

export function selectProjects(serviceLine = "all", status = "all") {
  return PROJECT_LOG.filter(project =>
    (serviceLine === "all" || project.serviceLine === serviceLine) &&
    (status === "all" || project.status === status),
  );
}

/** Previous / next records for cross-navigation between project files. */
export function projectNeighbours(id: string) {
  const i = PROJECT_LOG.findIndex((p) => p.id === id);
  if (i < 0) return { prev: undefined, next: undefined };
  const prev = PROJECT_LOG[(i - 1 + PROJECT_LOG.length) % PROJECT_LOG.length];
  const next = PROJECT_LOG[(i + 1) % PROJECT_LOG.length];
  return { prev, next };
}
