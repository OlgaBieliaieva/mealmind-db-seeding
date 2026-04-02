// SECTION ███ UPDATE PAYLOAD BUILDER ███
// WHY: формує PATCH payload з урахуванням прав і змін

import { ProductInput } from "../schemas/product.schema";
import { ProductFormInput } from "../schemas/product-form.schema";
import { mapProductFormToProductInput } from "./productFormToProductInput.mapper";

type UpdatePayload = Partial<
  Omit<ProductInput, "type" | "product_id" | "photos">
> & {
  brand_id?: string;
  barcode?: string;
  parent_product_id?: string;
};

/* ---------- utils ---------- */

function isChanged<T>(a: T, b: T): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/* ---------- main ---------- */

export function buildUpdatePayload(
  values: ProductInput,
  existing?: Partial<ProductFormInput>,
): UpdatePayload {
  if (!existing) return {} as UpdatePayload;

  const payload: UpdatePayload = {};

  /* ---------- NAME ---------- */

  if (
    isChanged(values.name, {
      en: existing.name_en,
      ua: existing.name_ua,
    })
  ) {
    payload.name = values.name;
  }

  /* ---------- CATEGORY ---------- */

  if (existing.raw_or_cooked_default !== values.raw_or_cooked_default) {
    payload.raw_or_cooked_default = values.raw_or_cooked_default;
  }

  if (
    existing.category_id !== values.category_id &&
    !existing.parent_product_id
  ) {
    payload.category_id = values.category_id;
  }

  /* ---------- NUTRIENTS ---------- */

  if (nutrientsChanged(values.nutrients, existing?.nutrients)) {
    payload.nutrients = values.nutrients;
  }

  //   if (values.nutrients) {
  //     payload.nutrients = values.nutrients;
  //   }

  /* ---------- COOKING ---------- */

  if (values.cooking_loss_pct !== Number(existing.cooking_loss_pct)) {
    payload.cooking_loss_pct = values.cooking_loss_pct;
  }

  if (values.edible_part_pct !== Number(existing.edible_part_pct)) {
    payload.edible_part_pct = values.edible_part_pct;
  }

  if (values.yield_factor !== Number(existing.yield_factor)) {
    payload.yield_factor = values.yield_factor;
  }

  /* ---------- SIMPLE FIELDS ---------- */

  if (values.notes !== existing.notes) {
    payload.notes = values.notes;
  }

  if (values.source !== existing.source) {
    payload.source = values.source;
  }

  if (values.is_verified !== existing.is_verified) {
    payload.is_verified = values.is_verified;
  }

  /* ---------- BRANDED ONLY ---------- */

  if (values.type === "branded") {
    if (values.brand_id !== existing.brand_id) {
      payload.brand_id = values.brand_id;
    }

    if (values.barcode !== existing.barcode) {
      payload.barcode = values.barcode;
    }

    if (values.parent_product_id !== existing.parent_product_id) {
      payload.parent_product_id = values.parent_product_id;
    }
  }

  return payload;
}

function nutrientsChanged(
  a?: Record<string, { value: number; unit: string }>,
  b?: Record<string, { value: string; unit: string }>,
) {
  if (!a && !b) return false;
  if (!a || !b) return true;

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const key of keys) {
    const av = a[key];
    const bv = b[key];

    if (!av || !bv) return true;

    if (av.value !== Number(bv.value)) return true;
    if (av.unit !== bv.unit) return true;
  }

  return false;
}
