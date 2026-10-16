import { describe, expect, test } from "bun:test";
import { ELCO_MODELS, ELCO_COMPARISON } from "./elco";

describe("client-supplied ELCO specifications", () => {
  test("EP-20 uses the supplied 48 V ratings", () => {
    expect(ELCO_MODELS[0]).toMatchObject({ voltage: 48, voltageRange: "40–59 V", current: 175, inputKw: 8.4, weightKg: 38.6, rpm: 5000, replacement: "17–24 hp" });
  });
  test("EP-30 uses the supplied 96 V ratings", () => {
    expect(ELCO_MODELS[1]).toMatchObject({ voltage: 96, voltageRange: "90–115 V", current: 165, inputKw: 15.8, weightKg: 40.8, rpm: 5750, replacement: "25–34 hp" });
  });
  test("EP-50 uses the supplied high-current ratings", () => {
    expect(ELCO_MODELS[2]).toMatchObject({ voltage: 96, voltageRange: "80–120 V", current: 400, inputKw: 38.4, weightKg: 86.2, rpm: 6000, replacement: "35–55 hp" });
  });
  test("unconfirmed shaft output stays TBC for every motor", () => {
    expect(ELCO_COMPARISON.find(row => row[0] === "Shaft output power")).toEqual(["Shaft output power", "TBC", "TBC", "TBC"]);
  });
});