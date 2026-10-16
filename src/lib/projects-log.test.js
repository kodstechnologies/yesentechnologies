import { describe, expect, test } from "bun:test";
import { findProject, selectProjects, PROJECT_LOG } from "./projects-log";

const specs = id => Object.fromEntries(findProject(id)?.specs ?? []);

describe("supplied marine presentation specifications", () => {
  test("Shikara has 12 adults and a 30 kWh pack", () => {
    expect(specs("015")).toMatchObject({ "Passenger capacity": "12 adults", "Length × breadth": "12 m × 3 m", "Electric motor": "8.4 kW outboard motor", "Battery capacity": "30 kWh (YSPL)", "Vessel speed": "7–8 knots" });
  });
  test("CIAL ferry uses twin 15 kW motors and class-approved batteries", () => {
    expect(specs("001")).toMatchObject({ "Passenger capacity": "25 adults", "Length × breadth": "15 m × 3 m", "Electric motor": "Twin 15 kW electric outboards", "Battery capacity": "80 kWh (YSPL)", "Battery type": "Lithium, liquid-cooled, class approved" });
  });
  test("Hydel retrofit has 70 kWh and 10 knot speed", () => {
    expect(specs("016")).toMatchObject({ "Passenger capacity": "25 adults", "Length × breadth": "12 m × 4.5 m", "Electric motor": "Twin 8 kW outboard motors", "Battery capacity": "70 kWh (YSPL)", "Vessel speed": "10 knots" });
  });
  test("electric leisure boat seats 10 adults", () => {
    expect(specs("017")).toMatchObject({ "Passenger capacity": "10 adults", "Length × breadth": "8 m × 3.5 m", "Electric motor": "Twin 8 kW electric outboards", "Battery capacity": "20 kWh (YSPL)", "Vessel speed": "6–7 knots" });
  });
  test("solar electric boat seats 20 adults with 45 kWh", () => {
    expect(specs("018")).toMatchObject({ "Passenger capacity": "20 adults", "Electric motor": "15 kW electric outboard motor", "Battery capacity": "45 kWh (YSPL)", "Vessel speed": "7–8 knots" });
  });
  test("houseboat retrofit retains 400 V and 55 kW", () => {
    expect(specs("019")).toMatchObject({ "Accommodation": "3 bedrooms × 4 adults", "Length × breadth": "27 m × 6 m", "Electric motor": "1 × 400 V / 55 kW inboard", "Battery capacity": "400 V / 60 kWh (YSPL)", "Vessel speed": "4–5 knots" });
  });
  test("two-bedroom new build remains under construction", () => {
    expect(findProject("020")?.status).toBe("progress");
    expect(specs("020")).toMatchObject({ "Accommodation": "2 bedrooms × 4 adults", "Electric motor": "2 × 96 V / 35 kW inboard motors", "Battery capacity": "96 V / 80 kWh", "Status": "Under construction" });
  });
  test("four-bedroom new build remains under construction", () => {
    expect(findProject("021")?.status).toBe("progress");
    expect(specs("021")).toMatchObject({ "Accommodation": "4 bedrooms × 4 adults", "Electric motor": "2 × 96 V / 35 kW inboard motors", "Battery capacity": "96 V / 80 kWh", "Status": "Under construction" });
  });
  test("homepage category selection retains all five supplied land projects", () => {
    expect(selectProjects("Land-Based").map(p => p.id)).toEqual(expect.arrayContaining(["010", "011", "012", "013", "014"]));
    expect(selectProjects("Marine").map(p => p.id)).toEqual(expect.arrayContaining(["001", "015", "016", "017", "018", "019", "020", "021"]));
    expect(new Set(PROJECT_LOG.map(p => p.id)).size).toBe(PROJECT_LOG.length);
    expect(selectProjects("Marine", "progress").map(p => p.id)).toEqual(["002", "020", "021"]);
  });
});