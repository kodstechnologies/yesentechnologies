/** Shared existing company content; provisional figures and contacts await client confirmation. */
export const COMPANY = {
  name: "YESEN Technologies Pvt Ltd",
  email: "info@yesentechnologies.com",
  mission: "To develop green technologies that make economic sense, so they can be used by people anywhere — from smart cities to the remotest parts of the earth.",
  vision: "To design, develop and patent greener products, intelligently adapting global technologies into solutions communities can maintain with local resources and local talent.",
  values: "A more equal world where everyone has access to affordable, reliable and sustainable energy — reducing economic disparity while tackling climate change.",
};
export const OFFICES = [
  { code: "in" as const, country: "India", city: "Kerala", phone: "+91 77080 07554", email: COMPANY.email, address: ["YESEN Technologies Pvt Ltd, 5th Floor", "YESEN Enclave, Vallamattam Estate", "Ravipuram, Kochi, Kerala 682015"], query: "9.9707,76.2836", lat: 9.9707, lon: 76.2836, x: 71.2, y: 52.6 },
  { code: "us" as const, country: "USA", city: "Delaware", phone: "+1 917 609 8082", email: COMPANY.email, address: ["YESEN Technologies Inc.", "8 The Green, Ste A", "Dover, DE 19901, USA"], query: "39.1582,-75.5244", lat: 39.1582, lon: -75.5244, x: 25.4, y: 39.4 },
  { code: "ae" as const, country: "UAE", city: "Dubai", phone: "+971 58 670 6900", email: COMPANY.email, address: ["YESEN Technologies — MENA", "206, Bin Sougat Building", "PO Box 6727, Dubai, UAE"], query: "25.2404,55.3703", lat: 25.2404, lon: 55.3703, x: 65.1, y: 44.6 },
  { code: "au" as const, country: "Australia", city: "Western Australia", phone: "+61 490 928 496", email: COMPANY.email, address: ["YESEN Technologies Pvt Ltd", "Unit 19, Level 2, 100 Railway Road", "Subiaco WA 6008, Australia"], query: "-31.9469,115.8244", lat: -31.9469, lon: 115.8244, x: 84.4, y: 76.5 },
];
export type Office = (typeof OFFICES)[number];
export const PARTNERS: { name: string; note?: string; logo?: string }[] = [
  { name: "Elco" }, { name: "ECE" }, { name: "TL" },
];
export const HEADLINE_STATS = [
  { value: 80, prefix: "", suffix: "+", label: "Vessels electrified through Marine Solutions" },
  { value: 48, prefix: "", suffix: " MW", label: "Solar & renewable energy installed" },
  { value: 200, prefix: "", suffix: "+", label: "Solar installations" },
  { value: 12, prefix: "", suffix: "+", label: "Countries served across marine & land projects" },
];
export const ADVISORY_STATS = { countries: "5", projects: "485+", capacity: "473 MWp", regions: [["Australia", "400+", "29"], ["United States", "45+", "18"], ["South Africa", "10+", "24"], ["Vietnam", "05", "2"], ["India", "25+", "400"]] };
export const BKOOL = {
  name: "B-Kool Marine Battery System",
  certification: "IRS Certified",
  certifications: ["IEC 62619", "IEC 62620", "IRS Certified"],
  iec62619Held: true,
  iec62620Held: true,
  specifications: [] as Array<[string, string]>,
  datasheet: undefined as string | undefined,
  features: ["IRS approved LFP", "Tier-1 cells", "Integrated BMS", "Liquid thermal management", "CAN & Modbus", "WiFi/Bluetooth monitoring", "M-CONTROL monitoring feature"],
};
export const VESSEL_TYPES = ["House Boat", "Shikara", "Ferry", "RORO", "Party Boat", "Barge", "Jankar Ferry", "Eco-Reserve Boat"];
/** Only complete, approved video testimonials with verified verbatim transcripts belong here. */
export const VIDEO_TESTIMONIALS: { video: string; quote: string; name: string; role: string; organisation: string }[] = [];
