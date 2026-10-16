import { expect, test } from "bun:test";
import { SOLAR_SERVICES, SOLAR_SYSTEMS, initialSolarService, needsSolarConsent } from "./enquiry-details.ts";

test("solar services include the four supplied project categories", () => {
  expect([...SOLAR_SERVICES]).toEqual(["Residential Solar", "Commercial Solar", "Industrial Solar", "Solar Farm"]);
});
test("visitors can be unsure of their solar system", () => {
  expect(SOLAR_SYSTEMS.includes("Not sure")).toBe(true);
});
test("solar enquiries require acceptance of terms", () => {
  expect(needsSolarConsent("land", undefined)).toBe(true);
  expect(needsSolarConsent("land", "accepted")).toBe(false);
});
test("service-specific solar buttons preserve the supplied service", () => {
  expect(initialSolarService("Commercial Solar")).toBe("Commercial Solar");
  expect(initialSolarService("Grid Tie")).toBe("");
});