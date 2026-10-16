import { describe, expect, test } from "bun:test";
import { quoteStart } from "./quote-start.ts";

describe("quote opening step", () => {
  test("an unprefilled enquiry starts at Step 1", () => {
    expect(quoteStart({})).toEqual({ step: 0, service: null });
  });
  for (const service of ["land", "marine", "advisory", "products"]) {
    test(`${service} preselection starts at Step 1 and is preserved`, () => {
      expect(quoteStart({ service })).toEqual({ step: 0, service });
    });
  }
});