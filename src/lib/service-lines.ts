import { BKOOL, VESSEL_TYPES } from "@/content/company";
import {
  Anchor,
  BatteryCharging,
  Building2,
  Cable,
  Factory,
  Gauge,
  Home,
  Mountain,
  Network,
  PlugZap,
  Recycle,
  Sailboat,
  Ship,
  Sun,
  Tent,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";

import imgHouseSolar from "@/assets/project-house-solar.jpg";
import imgCarport from "@/assets/project-carport.jpg";
import imgKeralaHouse from "@/assets/project-kerala-house.jpg";
import imgGuam from "@/assets/project-guam-3.jpg";
import retrofitImg from "@/assets/retrofit-sunboat.png.asset.json";
import cialImg from "@/assets/cial-vembanad.png.asset.json";
import sunboatImg from "@/assets/sunboat-ii.png.asset.json";
import battImg from "@/assets/emarine-retrofit-batteries.png.asset.json";
import propulsionImg from "@/assets/marine-propulsion.jpg.asset.json";
import advEngineer from "@/assets/advisory-engineer.jpg.asset.json";
import advSolarRows from "@/assets/advisory-solar-rows.jpg.asset.json";
import advGridLines from "@/assets/advisory-grid-lines.jpg.asset.json";

import type { SolutionDetail } from "@/components/SolutionDetailPage";

export type ServiceLink = { label: string; to: string; blurb: string; image: string };

/* ------------------------------------------------------------------ */
/* Navigation structure — shared by headers, mobile menu and footers.   */
/* ------------------------------------------------------------------ */

export const LAND_LINKS: ServiceLink[] = [
  { label: "Grid Tie", to: "/land-based/grid-tie", blurb: "Solar that feeds the grid and cuts your power bill.", image: imgCarport },
  { label: "Off Grid", to: "/land-based/off-grid", blurb: "Independent solar and storage where there is no grid.", image: imgKeralaHouse },
  { label: "Hybrid", to: "/land-based/hybrid", blurb: "Grid, solar and batteries working together with backup.", image: imgHouseSolar },
  { label: "Microgrid", to: "/land-based/microgrid", blurb: "Community and campus-scale generation and storage.", image: imgGuam },
];

export const MARINE_GREENFIELD: ServiceLink[] = [
  { label: "Electric Boat", to: "/marine/greenfield/electric-boat", blurb: "New-build battery-electric vessels.", image: cialImg.url },
  { label: "Solar Electric Boat", to: "/marine/greenfield/solar-electric-boat", blurb: "New-build vessels with integrated solar.", image: sunboatImg.url },
  { label: "Electric Propulsion Kit", to: "/marine/greenfield/electric-propulsion-kit", blurb: "Motor, battery and controls for your new build.", image: propulsionImg.url },
];

export const MARINE_RETROFIT: ServiceLink[] = [
  { label: "Vessel Retrofit", to: "/marine/retrofit/vessel-retrofit", blurb: "Convert an existing diesel vessel to electric.", image: retrofitImg.url },
  { label: "Electric Propulsion Kit", to: "/marine/retrofit/electric-propulsion-kit", blurb: "Drop-in electric drive for existing hulls.", image: battImg.url },
];

export const ADVISORY_LINKS: ServiceLink[] = [
  { label: "Owner's Engineering", to: "/engineering-advisory/owners-engineering", blurb: "Your technical team on the owner's side, from design to handover.", image: advEngineer.url },
  { label: "Technical Due Diligence", to: "/engineering-advisory/technical-due-diligence", blurb: "Independent review of solar and storage assets before you commit.", image: advSolarRows.url },
  { label: "BESS Advisory", to: "/engineering-advisory/bess-advisory", blurb: "Battery storage sizing, specification, safety and integration.", image: advGridLines.url },
];

export type NavItem = {
  label: string;
  to: string;
  groups?: { heading?: string; items: { label: string; to: string }[] }[];
};

export const MAIN_NAV: NavItem[] = [
  { label: "Land & Earth", to: "/land-based", groups: [{ items: LAND_LINKS }] },
  {
    label: "Marine",
    to: "/marine",
    groups: [
      { heading: "Greenfield", items: MARINE_GREENFIELD },
      { heading: "Retrofit", items: MARINE_RETROFIT },
    ],
  },
  { label: "Engineering Advisory", to: "/engineering-advisory", groups: [{ items: ADVISORY_LINKS }] },
  { label: "Products", to: "/products" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Page content                                                        */
/* ------------------------------------------------------------------ */

const LAND_PROCESS = [
  { n: "01", title: "Site survey", body: "Roof or ground area, shading, structure and existing electrical setup are assessed on site." },
  { n: "02", title: "Load study", body: "Your consumption pattern is mapped so the system is sized to real demand, not guesswork." },
  { n: "03", title: "Design & approvals", body: "Array layout, single-line diagram and utility or regulatory approvals handled for you." },
  { n: "04", title: "Install & commission", body: "Installation, testing, commissioning and handover with monitoring set up." },
];

const MARINE_PROCESS = [
  { n: "01", title: "Route & duty study", body: "Route length, speed, passenger load and daily operating hours define the energy need." },
  { n: "02", title: "Naval & electrical design", body: "Hull, propulsion, battery and power system engineered together." },
  { n: "03", title: "Build & integrate", body: "Fabrication and system integration with our shipyard partners." },
  { n: "04", title: "Trials & handover", body: "Sea trials, certification support, crew training and after-sales service." },
];

export const LAND_PAGES: Record<string, SolutionDetail> = {
  "grid-tie": {
    index: "01",
    title: "Grid Tie Solar",
    titleLines: ["Grid Tie", "Solar"],
    tagline: "Generate your own power, export the surplus",
    Icon: PlugZap,
    image: imgCarport,
    imageAlt: "Solar carport installation connected to the grid",
    features: ["Rooftop & ground-mount", "Net metering ready", "Lower electricity bills", "Remote monitoring", "No battery required"],
    intro:
      "A grid-tie system connects solar directly to the utility grid. Daytime consumption is met by the sun, surplus is exported, and the grid covers the rest — the simplest way to cut energy costs on homes, businesses and institutions.",
    included: [
      { Icon: Sun, title: "Solar array", body: "Panels and mounting structures engineered for your roof or ground site." },
      { Icon: Zap, title: "Grid-tie inverter", body: "Converts solar power and synchronises it with the utility supply." },
      { Icon: Gauge, title: "Monitoring", body: "Live generation and savings data on web and mobile." },
    ],
    stats: [],
    process: LAND_PROCESS,
    applications: [
      { Icon: Home, title: "Homes", body: "Rooftop systems that offset household consumption." },
      { Icon: Building2, title: "Commercial buildings", body: "Offices, hotels and retail with high daytime loads." },
      { Icon: Factory, title: "Industry", body: "Factory roofs and open land for large self-consumption." },
      { Icon: Cable, title: "Carports", body: "Parking shade that doubles as a power plant." },
    ],
    faqs: [
      { q: "Does a grid-tie system work during a power cut?", a: "No — for safety a grid-tie inverter shuts down when the grid fails. If you need backup, choose a hybrid system." },
      { q: "Do I need batteries?", a: "No. The grid acts as your buffer, which keeps the system simpler and lower in cost." },
      { q: "Who handles the utility approval?", a: "We prepare the documentation and support the net-metering application with your utility." },
    ],
  },
  "off-grid": {
    index: "02",
    title: "Off Grid Solar",
    titleLines: ["Off Grid", "Solar"],
    tagline: "Reliable power where the grid doesn't reach",
    Icon: Mountain,
    image: imgKeralaHouse,
    imageAlt: "Off-grid solar installation on a remote building",
    features: ["Solar + battery storage", "Full energy independence", "Remote & island sites", "Generator replacement", "Low maintenance"],
    intro:
      "Off-grid systems combine solar generation with battery storage to supply power around the clock without any grid connection — for remote homes, resorts, telecom sites and island communities.",
    included: [
      { Icon: Sun, title: "Solar generation", body: "Array sized for worst-case season, not average sunshine." },
      { Icon: BatteryCharging, title: "Battery storage", body: "Lithium storage sized for your autonomy needs." },
      { Icon: Zap, title: "Off-grid inverter", body: "Stable AC power with optional generator backup." },
    ],
    stats: [],
    process: LAND_PROCESS,
    applications: [
      { Icon: Tent, title: "Resorts & eco-stays", body: "Silent, fuel-free power for guests in remote locations." },
      { Icon: Home, title: "Remote homes", body: "Full household power without a grid line." },
      { Icon: Network, title: "Telecom & utilities", body: "Dependable supply for unattended equipment." },
      { Icon: Waves, title: "Island sites", body: "Replacing diesel generation on islands and coasts." },
    ],
    faqs: [
      { q: "How many days of autonomy do I get?", a: "It is a design choice — we size storage to the number of cloudy days your site must ride through." },
      { q: "Can a generator be added?", a: "Yes, a generator can be integrated as a backup for extended poor weather." },
    ],
  },
  hybrid: {
    index: "03",
    title: "Hybrid Solar",
    titleLines: ["Hybrid", "Solar"],
    tagline: "Grid savings with battery backup",
    Icon: BatteryCharging,
    image: imgHouseSolar,
    imageAlt: "Hybrid rooftop solar system on a house",
    features: ["Solar + grid + battery", "Backup during outages", "Peak-hour savings", "Smart energy management", "Expandable storage"],
    intro:
      "A hybrid system connects to the grid and adds battery storage. You save on bills like a grid-tie system, and keep critical loads running when the grid goes down.",
    included: [
      { Icon: Sun, title: "Solar array", body: "Generation sized for daytime loads and battery charging." },
      { Icon: BatteryCharging, title: "Battery bank", body: "Storage for backup and evening consumption." },
      { Icon: Gauge, title: "Hybrid inverter & EMS", body: "Automatically balances solar, battery and grid." },
    ],
    stats: [],
    process: LAND_PROCESS,
    applications: [
      { Icon: Home, title: "Homes", body: "Backup for essentials with everyday savings." },
      { Icon: Building2, title: "Hospitals & schools", body: "Uninterrupted power for critical services." },
      { Icon: Factory, title: "Businesses", body: "Protect operations from grid instability." },
      { Icon: Zap, title: "Peak shaving", body: "Use stored energy when tariffs are highest." },
    ],
    faqs: [
      { q: "What is the difference between hybrid and off-grid?", a: "A hybrid system stays connected to the grid and uses it as an extra source; off-grid systems run entirely on their own." },
      { q: "Can I add batteries to my existing grid-tie system?", a: "Often yes — we assess your current inverter and recommend the right upgrade path." },
    ],
  },
  microgrid: {
    index: "04",
    title: "Microgrids",
    titleLines: ["Micro", "grids"],
    tagline: "Local generation and storage for whole communities",
    Icon: Network,
    image: imgGuam,
    imageAlt: "Solar microgrid installation",
    features: ["Multiple energy sources", "Island or grid-connected", "Central energy management", "Community & campus scale", "Resilient supply"],
    intro:
      "A microgrid is a local power network with its own generation, storage and control. It can run connected to the main grid or independently, keeping villages, campuses and islands powered reliably.",
    included: [
      { Icon: Sun, title: "Distributed generation", body: "Solar and other sources combined across the site." },
      { Icon: BatteryCharging, title: "Central storage", body: "Battery energy storage for stability and night-time supply." },
      { Icon: Network, title: "Microgrid controller", body: "Manages sources, loads and grid connection automatically." },
    ],
    stats: [],
    process: LAND_PROCESS,
    applications: [
      { Icon: Waves, title: "Islands", body: "Reducing diesel dependence for island communities." },
      { Icon: Building2, title: "Campuses", body: "Universities, hospitals and business parks." },
      { Icon: Home, title: "Villages", body: "Shared clean power for rural communities." },
      { Icon: Recycle, title: "Industrial parks", body: "Resilient supply for clustered industry." },
    ],
    faqs: [
      { q: "How big is a microgrid?", a: "Anything from a single campus to a whole island — it is designed around the loads it serves." },
      { q: "Can it integrate existing generators?", a: "Yes, existing diesel or other generators can be integrated and run only when needed." },
    ],
  },
};

export const MARINE_PAGES: Record<string, SolutionDetail> = {
  "electric-boat": {
    index: "01",
    title: "Electric Boat",
    titleLines: ["Electric", "Boat"],
    tagline: "New-build battery-electric vessels",
    Icon: Ship,
    image: cialImg.url,
    imageAlt: "Electric passenger boat on calm water",
    features: ["Zero emissions", "Silent operation", BKOOL.name, "Lower running costs", "Designed from keel up"],
    intro:
      "We design and build electric boats from the hull up — propulsion, B-Kool Marine Battery System batteries, charging and controls engineered together for the route you run.",
    included: [
      { Icon: Ship, title: "Vessel design", body: "Hull and layout optimised for electric efficiency." },
      { Icon: BatteryCharging, title: "B-Kool Marine Battery System battery system", body: "IRS-approved LFP batteries with integrated BMS." },
      { Icon: Zap, title: "Propulsion & charging", body: "Electric drive and shore charging matched to your duty cycle." },
    ],
    stats: [],
    process: MARINE_PROCESS,
    applications: [
      { Icon: Ship, title: "Passenger ferries", body: "Short and medium routes with fixed schedules." },
      { Icon: Sailboat, title: "Tourism boats", body: "Quiet cruising for sightseeing and leisure." },
      { Icon: Anchor, title: "Workboats", body: "Harbour, patrol and utility duties." },
      { Icon: Waves, title: "Houseboats", body: "Silent hotel-load and propulsion power." },
    ],
    faqs: [
      { q: "How far can an electric boat go?", a: "Range is designed around your route — we size battery capacity to your daily distance with margin." },
      { q: "How is it charged?", a: "From shore power at the jetty; we design the charging infrastructure as part of the project." },
    ],
  },
  "solar-electric-boat": {
    index: "02",
    title: "Solar Electric Boat",
    titleLines: ["Solar Electric", "Boat"],
    tagline: "New-build vessels powered by the sun",
    Icon: Sun,
    image: sunboatImg.url,
    imageAlt: "Solar electric vessel with roof-mounted solar panels",
    features: ["Integrated solar roof", "Battery-electric drive", "Extended range", "Minimal charging need", "Zero emissions"],
    intro:
      "A solar electric boat carries its own power plant on the roof. Solar panels top up the batteries while underway, cutting charging needs and operating cost.",
    included: [
      { Icon: Sun, title: "Marine solar roof", body: "Panels integrated into the vessel's canopy design." },
      { Icon: BatteryCharging, title: BKOOL.name, body: "Marine LFP storage for propulsion and onboard loads." },
      { Icon: Gauge, title: "Energy management", body: "Balances solar, battery and shore charging automatically." },
    ],
    stats: [],
    process: MARINE_PROCESS,
    applications: [
      { Icon: Ship, title: "Solar ferries", body: "Daytime passenger routes." },
      { Icon: Sailboat, title: "Backwater tourism", body: "Silent cruising in sensitive waters." },
      { Icon: Waves, title: "Houseboats", body: "Fuel-free stays on the water." },
      { Icon: Anchor, title: "Lake & reservoir boats", body: "Where fuel is restricted or banned." },
    ],
    faqs: [
      { q: "Can it run purely on solar?", a: "On many slow, daytime routes solar covers a large share; batteries and shore charging cover the rest." },
    ],
  },
  "electric-propulsion-kit": {
    index: "03",
    title: "Electric Propulsion Kit",
    titleLines: ["Electric", "Propulsion Kit"],
    tagline: "Motor, battery and controls — for new builds and existing hulls",
    Icon: Zap,
    image: propulsionImg.url,
    imageAlt: "Electric marine propulsion motor",
    features: ["Electric motor & drive", BKOOL.name, "M-CONTROL monitoring & control (feature)", "New builds or retrofit", "Engineering support"],
    intro:
      "Our electric propulsion kit packages the motor, B-Kool Marine Battery System batteries, controls and M-CONTROL monitoring for boatbuilders and owners — for greenfield vessels and for retrofitting existing hulls.",
    included: [
      { Icon: Zap, title: "Electric drive", body: "Motor and controller sized to your hull and speed." },
      { Icon: BatteryCharging, title: BKOOL.name, body: "Marine LFP packs with integrated BMS." },
      { Icon: Gauge, title: "M-CONTROL", body: "Real-time monitoring of energy, range and system health." },
    ],
    stats: [],
    process: MARINE_PROCESS,
    applications: [
      { Icon: Ship, title: "Ferries & passenger boats", body: "Scheduled passenger services." },
      { Icon: Sailboat, title: "Tourism & leisure boats", body: "Tour, party and leisure vessels." },
      { Icon: Waves, title: "Houseboats", body: "Electric drive for floating stays." },
      { Icon: Wrench, title: "Boatbuilders", body: "A ready electric package for new builds." },
    ],
    faqs: [
      { q: "Which vessels is the kit offered for?", a: "Passenger ferries, tourism and leisure boats, houseboats and workboats — share your vessel details and we will confirm fit." },
      { q: "Do you install the kit?", a: "Yes, we install and commission it, or support your boatbuilder through integration." },
    ],
  },
  "vessel-retrofit": {
    index: "04",
    title: "Vessel Retrofit",
    titleLines: ["Vessel", "Retrofit"],
    tagline: "Electric propulsion retrofit for existing vessels",
    Icon: Recycle,
    image: retrofitImg.url,
    imageAlt: "Vessel retrofitted with electric propulsion and solar",
    benefits: [
      { title: "Lower local emissions", body: "No engine exhaust on the water during electric operation. Emissions over the full life cycle depend on how the charging electricity is generated." },
      { title: "Quieter, smoother operation", body: "Less noise and vibration for passengers, crew and the waterway around you." },
      { title: "No onboard fuel handling for propulsion", body: "Less fuel storage, refuelling and spill risk to manage." },
      { title: "Simpler propulsion machinery", body: "An electric motor replaces the engine and its fuel and exhaust systems. Routine care is still needed for the motor, drive, battery and cooling." },
      { title: "Keep the hull you have", body: "Retrofit lets you upgrade a proven vessel instead of replacing it." },
      { title: "Running costs depend on your operation", body: "Fuel, electricity price, route and duty cycle all matter, so we estimate them from your own data rather than quoting a standard saving." },
    ],
    scalability: "Not every vessel has the same energy demand, so the system is designed from your vessel’s data, not from a fixed package. Small boats, fishing vessels, tourism and leisure craft can use compact systems. Passenger boats, ferries, barges and workboats call for larger battery capacity, modular packs or hybrid arrangements. Our feasibility assessment shows what is practical for your vessel before you commit.",
    whyChoose: [
      { title: "System-level engineering", body: "We design the whole propulsion system, not just supply a motor." },
      { title: "Honest assessment", body: "We tell you what is feasible, including when a vessel or route is not suited to battery-only operation." },
      { title: "Motor, battery and charging from one team", body: "Fewer interfaces and clearer responsibility." },
      { title: "Retrofit and engineering experience", body: "Across vessel sizes, from small boats to larger passenger and work vessels." },
    ],
    features: ["Lower local emissions", "Quieter, smoother operation", "No onboard fuel handling for propulsion", "Simpler propulsion machinery", "Keep the hull you have"],
    intro:
      "Replace diesel or petrol propulsion with clean, quiet electric power, engineered for your vessel. Many working and passenger vessels have years of service left in the hull while the engine, noise and fuel handling hold them back. We look at how your vessel actually operates, then design the motor, battery, electrical system and charging to match — and we tell you plainly if a vessel or route is not a good fit. Running costs depend on your fuel, electricity price, route and duty cycle, so we estimate them from your own data rather than quoting a standard saving.",
    included: [
      { Icon: Zap, title: "Electric propulsion systems", body: "Motor selection and sizing for your vessel's speed, load and duty cycle, using electric outboards, inboard motors or pod drives as the vessel requires." },
      { Icon: BatteryCharging, title: "Battery and energy storage", body: "Marine battery and BESS selection and sizing, with Battery Management System integration, matched to your route and operating hours." },
      { Icon: Sun, title: "Hybrid and multi-energy integration", body: "Battery-electric, solar-assisted or hybrid arrangements, with a generator or engine as backup where a route demands it." },
      { Icon: Cable, title: "Electrical and control integration", body: "Cabling, protection, power distribution, throttle and monitoring interfaces designed as one safe, coordinated system." },
      { Icon: PlugZap, title: "Charging system engineering", body: "Shore or jetty charging designed around your berth, your schedule and the charging power your site can supply." },
      { Icon: Wrench, title: "System design and engineering", body: "Electrical and mechanical design, including layout, weight and stability review, for a clean installation." },
      { Icon: Gauge, title: "Testing, commissioning and support", body: "Harbour and water trials, handover and support after the vessel returns to service." },
    ],
    stats: [],
    process: [
      { n: "01", title: "Feasibility assessment", body: "Hull and dimensions, current propulsion, route, speed, daily hours and berth facilities." },
      { n: "02", title: "Propulsion and energy sizing", body: "We calculate the power and battery capacity your operation needs and agree the configuration with you." },
      { n: "03", title: "System design", body: "Single-line diagram, equipment layout, weight and stability review, and a plan for required approvals." },
      { n: "04", title: "Equipment selection and supply", body: "Motor, battery, controls and charging equipment selected to the design." },
      { n: "05", title: "Installation", body: "Removal of the old propulsion and installation of the new system in a coordinated sequence." },
      { n: "06", title: "Testing and commissioning", body: "System checks, then harbour and water trials, to confirm the vessel performs as designed." },
      { n: "07", title: "Handover and support", body: "Operator briefing and support after the vessel returns to service." },
    ],
    applications: [
      { Icon: Ship, title: "Passenger boats and inland-waterway ferries", body: "Larger battery capacity, modular packs or hybrid arrangements, sized from your vessel's data." },
      { Icon: Sailboat, title: "Tourism and leisure boats", body: "Compact systems for quiet, exhaust-free operation on the water." },
      { Icon: Anchor, title: "Fishing boats", body: "Compact systems sized to your route and daily operating hours." },
      { Icon: Factory, title: "Workboats, utility craft and barges", body: "Larger battery capacity, modular packs or hybrid arrangements where duty demands it." },
      { Icon: Waves, title: "Small commercial vessels", body: "A system designed from your vessel's data, not a fixed package." },
    ],
    faqs: [
      { q: "Can my vessel be converted to electric propulsion?", a: "Often, but it depends on the hull, how you operate, and the space and weight available for batteries. A feasibility assessment answers this before you commit to anything." },
      { q: "What information do you need to start?", a: "Vessel type and dimensions, current engine and propulsion details, route and typical daily operation, required speed, passenger or load capacity, and the power available where the vessel berths." },
      { q: "Will an electric vessel match my current speed and range?", a: "Speed and range depend on the motor, battery capacity and how the vessel is used. We size the system to your required operation and tell you honestly where the limits are, rather than quoting figures without your data." },
      { q: "Do I need to replace the whole propulsion system?", a: "It depends on the vessel. The retrofit may replace the engine and keep the existing shaft and propeller, replace an outboard with an electric outboard, or use a new drive. We recommend the approach after the assessment." },
      { q: "How is the vessel charged?", a: "Typically from shore or jetty charging, with charging power and timing matched to your schedule. Solar can supplement charging where it suits the vessel and route." },
      { q: "What if my route is too long for batteries alone?", a: "A hybrid arrangement, with batteries plus a generator or engine as backup, can extend range. We compare the options with you." },
      { q: "Are approvals needed?", a: "Vessels often need approval from the relevant class society, registry or authority after a propulsion change. We plan for this in the design stage, and the requirements depend on your vessel and operation." },
      { q: "How long does a retrofit take?", a: "It depends on the vessel and system size. Your proposal includes a programme." },
      { q: "How much will it cost and save?", a: "Cost depends on motor power, battery capacity and installation work. Savings depend on your fuel and electricity costs and how much the vessel runs. We estimate both from your own operating data." },
    ],
  },
};

/** Overview link shown first (highlighted) in a parent's dropdown. */
export const NAV_OVERVIEW: Record<string, { label: string; to: string }> = {
  "/land-based": { label: "Solar Installation (overview)", to: "/land-based" },
};
