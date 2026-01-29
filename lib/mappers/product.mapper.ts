import { ProductInput } from "@/types/product.schema";
import { generateUUID } from "@/lib/uuid";

function normalizeRow(
  row: (string | number | boolean | null | undefined)[],
): (string | number | boolean | null)[] {
  return row.map((v) => (v === undefined ? null : v));
}

export function mapProductToRow(product: ProductInput) {
  const productId = product.product_id ?? generateUUID();
  const now = new Date().toISOString();

  const rawRow = [
    productId, // product_id
    product.name.en, // name_en
    product.name.ua, // name_ua
    product.type, // type
    product.type === "branded" ? product.brand.id : null, // brand
    product.type === "branded" ? (product.parent_product_id ?? null) : null, // parent_product_id
    product.type === "branded" ? product.barcode : null, // barcode
    product.category_id, // category
    product.subcategory_id ?? null, // subcategory
    product.unit, // unit
    product.type === "generic" ? (product.edible_part_pct ?? null) : null, // edible_part_pct
    product.type === "generic" ? (product.yield_factor ?? null) : null, // yield_factor
    product.type === "generic" ? (product.cooking_loss_pct ?? null) : null, // cooking_loss_pct
    product.type === "generic" ? (product.raw_or_cooked_default ?? null) : null, // raw_or_cooked_default
    product.notes ?? null, // notes
    null, // image_url (поки не використовуємо)
    product.is_verified ?? false, // is_verified
    product.source ?? null, // source
    now, // created_at
    now, // updated_at
  ];

  return {
    productId,
    row: normalizeRow(rawRow),
  };
}
