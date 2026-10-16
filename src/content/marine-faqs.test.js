import { describe, expect, test } from "bun:test";
import { MARINE_FAQS } from "./marine-faqs";

describe("client-supplied electric propulsion FAQs", () => {
  test("all nine supplied questions are present", () => {
    expect(MARINE_FAQS).toHaveLength(9);
    expect(MARINE_FAQS.map(f => f.q)).toContain("Can my vessel be converted to electric propulsion?");
    expect(MARINE_FAQS.map(f => f.q)).toContain("How much will it cost and save?");
  });
  test("answers stay conditional on assessment, no invented figures", () => {
    expect(MARINE_FAQS[0].a).toContain("feasibility assessment");
    expect(MARINE_FAQS[8].a).toContain("your own operating data");
  });
});
