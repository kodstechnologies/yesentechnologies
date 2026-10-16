import { pageHead, SHARE_IMAGE } from "@/content/seo";
import { createFileRoute } from "@tanstack/react-router";
import { BatteryCharging, Gauge, Ship, Sun, Sailboat, Waves, Anchor, Shield } from "lucide-react";

import shotSolar from "@/assets/sol-solar.jpg";
import { SolutionDetailPage, type SolutionDetail } from "@/components/SolutionDetailPage";

export const Route = createFileRoute("/solutions_/solar-integration")({
  head: () => pageHead("/solutions/solar-integration", "Solar Integration | Land & Marine — YESEN Technologies", "Solar PV and storage integration for land-based sites and vessels, designed around location, available space and actual energy demand.", SHARE_IMAGE),
  component: () => <SolutionDetailPage data={DATA} />,
});

const DATA: SolutionDetail = {
  index: "02",
  title: "Solar Integration",
  titleLines: ["Solar", "Integration"],
  tagline: "Solar for land-based sites and vessels",
  Icon: Sun,
  image: shotSolar,
  imageAlt: "Marine-grade solar panels installed on a vessel roof",
  features: [
    "Solar PV integration",
    "Hybrid energy solutions",
    "Smart energy management",
    "Site-specific engineering",
    "Sustainable operations",
  ],
  intro:
    "Solar integration spans rooftops, ground-mounted arrays, off-grid sites and vessels. We assess available space, electrical loads and operating conditions before designing the PV, storage and control system.",
  included: [
    {
      Icon: Sun,
      title: "Site and marine solar PV",
      body: "Array layout, structure and mounting assessed for the roof, ground or vessel installation.",
    },
    {
      Icon: BatteryCharging,
      title: "Hybrid power management",
      body: "Solar, storage, grid or generator sources integrated around the application’s energy requirements.",
    },
    {
      Icon: Gauge,
      title: "Performance monitoring",
      body: "Generation and consumption monitoring supports system operation and maintenance.",
    },
  ],
  stats: [],
  process: [
    {
      n: "01",
      title: "Assess",
      body: "Solar potential is assessed against site location or vessel route, shading, available space and electrical loads.",
    },
    {
      n: "02",
      title: "Design",
      body: "Array layout and electrical architecture designed for the roof, land area or vessel.",
    },
    {
      n: "03",
      title: "Install",
      body: "Panels, cabling and control equipment installed to the project-specific design.",
    },
    {
      n: "04",
      title: "Monitor & handover",
      body: "Monitoring configured, site operators or vessel crew trained, and system handed over.",
    },
  ],
  applications: [
    {
      Icon: Ship,
      title: "Solar-electric ferries",
      body: "Daytime routes where solar meaningfully extends range between charges.",
    },
    {
      Icon: Sailboat,
      title: "Houseboats & floating stays",
      body: "Continuous hotel-load power for lighting, AC and appliances without running a generator.",
    },
    {
      Icon: Anchor,
      title: "Off-grid jetties",
      body: "Shore points where grid power isn't practical or reliable.",
    },
    {
      Icon: Shield,
      title: "Land-based solar and storage",
      body: "Rooftop, ground-mounted and off-grid solar systems sized around site demand.",
    },
  ],
  faqs: [
    {
      q: "Does solar fully power the vessel?",
      a: "On most routes solar works as a meaningful top-up alongside battery or hybrid power rather than a sole source — we size the system to your actual route and loads.",
    },
    {
      q: "How much deck space do panels need?",
      a: "It depends on the vessel and target output; we lay out the array during design to fit your roofline without compromising deck use.",
    },
    {
      q: "What happens on cloudy days?",
      a: "The hybrid system automatically draws from battery or generator sources, so operation isn't dependent on sunlight.",
    },
    {
      q: "Can this pair with an existing diesel engine?",
      a: "Yes, solar and battery systems can be integrated alongside an existing diesel engine as a hybrid setup.",
    },
  ],
};
