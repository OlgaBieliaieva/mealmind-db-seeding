import { readSheet } from "@/lib/sheets.read";
import { z } from "zod";
import { NutrientsMap } from "@/types/nutrients";
import { parseSheetNumber } from "@/lib/utils/sheetNumber";

const Schema = z.object({
  product_ids: z.array(z.string().min(1)),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { product_ids } = Schema.parse(body);

  const rows = await readSheet("product_nutrients!A2:Z");

  const result: Record<string, NutrientsMap> = {};

  for (const row of rows) {
    const productId = row[1];
    const nutrientId = row[2];
    const value = parseSheetNumber(row[3]);
    const unit = row[5] || undefined;

    if (!product_ids.includes(productId)) continue;
    if (value === null) continue;

    if (!result[productId]) {
      result[productId] = {};
    }

    result[productId][nutrientId] = {
      value,
      unit,
    };
  }

  return Response.json({ items: result });
}
