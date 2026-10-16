import { expect, test } from "bun:test";
import { BKOOL } from "./company.ts";

test("B-Kool carries the three client-supplied certifications", () => {
  expect(BKOOL.certifications).toEqual(["IEC 62619", "IEC 62620", "IRS Certified"]);
  expect(BKOOL.iec62619Held).toBe(true);
  expect(BKOOL.iec62620Held).toBe(true);
});