import { describe, expect, test } from "bun:test";
import { PRODUCTS, initialProduct, initialElcoModel } from "./product-enquiry.ts";

describe("quote product choices", () => {
  test("Products offers B-Kool and ELCO", () => {
    expect([...PRODUCTS]).toEqual(["B-Kool", "ELCO"]);
  });

  test("prefilled text selects the matching product", () => {
    expect(initialProduct("B-Kool")).toBe("B-Kool");
    expect(initialProduct("b kool battery")).toBe("B-Kool");
    expect(initialProduct("ELCO")).toBe("ELCO");
    expect(initialProduct("ELCO EP-30")).toBe("ELCO");
    expect(initialProduct("EP-50")).toBe("ELCO");
  });

  test("unrelated text selects no product", () => {
    expect(initialProduct()).toBeNull();
    expect(initialProduct("")).toBeNull();
    expect(initialProduct("Marine retrofit")).toBeNull();
  });

  test("ELCO model is read from prefilled text", () => {
    expect(initialElcoModel("ELCO EP-30")).toBe("EP-30");
    expect(initialElcoModel("B-Kool")).toBe("");
  });
});
