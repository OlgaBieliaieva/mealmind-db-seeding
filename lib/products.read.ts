import { readSheet } from "@/lib/sheets.read";
import { ProductInput } from "@/types/product.schema";

export type ProductListItem = {
  product_id: string;
  name_ua: string;
  brand_id: string | null;
  unit: string;
};

export async function getAllProducts(): Promise<ProductListItem[]> {
  const rows = await readSheet("products!A2:L");

  return rows.map((row) => ({
    product_id: row[0],
    name_ua: row[2],
    brand_id: row[4] || null,
    unit: row[9],
  }));
}

export async function getProductById(
  productId: string,
): Promise<ProductInput | null> {
  // ---- 1️⃣ PRODUCTS ----
  const productRows = await readSheet("products!A2:Z");

  const row = productRows.find((r) => r[0] === productId);

  if (!row) return null;

  /**
   * Приклад структури (підлаштуй під свою):
   * A product_id
   * B type
   * C name_ua
   * D name_en
   * E category_id
   * F subcategory_id
   * G unit
   * H brand_id
   * I brand_name_ua
   * J brand_name_en
   */

  const type = row[3] as "generic" | "branded";

  // ---- 2️⃣ NUTRIENTS ----
  const nutrientRows = await readSheet("product_nutrients!A2:F");

  const nutrients = nutrientRows
    .filter((r) => r[1] === productId)
    .reduce<Record<string, { value: number; unit: string }>>((acc, r) => {
      acc[r[2]] = {
        value: Number(r[3]), // value_per_100g
        unit: r[5],
      };
      return acc;
    }, {});

  // ---- 3️⃣ BUILD PRODUCT ----

  const base = {
    product_id: row[0],
    type,
    name: {
      ua: row[2],
      en: row[1],
    },
    category_id: Number(row[7]),
    subcategory_id: row[8] ? Number(row[8]) : undefined,
    unit: row[9] as "g" | "ml" | "pcs",
    nutrients,
    is_verified: row[16] === "true",
  };

  if (type === "branded") {
    const brandRows = await readSheet("brands!A2:F");
    const brand = brandRows.find((r) => r[0] === row[4]);
    if (!brand) return null;
    return {
      ...base,
      type: "branded",
      brand: {
        id: row[4],
        name: {
          ua: brand[2],
          en: brand[1],
        },
      },
    };
  }

  return {
    ...base,
    type: "generic",
  };
}
