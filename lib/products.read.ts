import { readSheet } from "@/lib/sheets.read";

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
