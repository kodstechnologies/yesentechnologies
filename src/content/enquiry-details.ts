export const SOLAR_SERVICES = ["Residential Solar", "Commercial Solar", "Industrial Solar", "Solar Farm"] as const;
export const SOLAR_SYSTEMS = ["Grid Tie", "Off Grid", "Hybrid", "Microgrid", "Not sure"] as const;

export function initialSolarService(type?: string): string {
  return SOLAR_SERVICES.find((service) => service === type) ?? "";
}

export function needsSolarConsent(service: string | null, consent: string | undefined): boolean {
  return service === "land" && consent !== "accepted";
}