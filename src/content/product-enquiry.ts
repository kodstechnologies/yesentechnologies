import { ELCO_MODELS } from "./elco";

/** Products a visitor can ask a quote for. */
export const PRODUCTS = ["B-Kool", "ELCO"] as const;
export type ProductName = (typeof PRODUCTS)[number];

export const ELCO_MODEL_NAMES: readonly string[] = ELCO_MODELS.map((model) => model.name);

/** Map prefilled enquiry text onto a product, or null when it names neither. */
export function initialProduct(type?: string): ProductName | null {
  const text = (type ?? "").trim().toLowerCase();
  if (!text) return null;
  if (/b[-\s]?kool/.test(text)) return "B-Kool";
  if (/elco|ep-\d/.test(text)) return "ELCO";
  return null;
}

/** Read an ELCO model name out of prefilled text such as "ELCO EP-30". */
export function initialElcoModel(type?: string): string {
  const text = (type ?? "").toLowerCase();
  return ELCO_MODEL_NAMES.find((name) => text.includes(name.toLowerCase())) ?? "";
}
