import { readSheet } from "@/lib/sheets.read";
import { GenericProductListItem } from "@/types/generic-product.dto";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const limit = Number(searchParams.get("limit") ?? 20);

  // читаємо products sheet (без header)
  const rows = await readSheet("products!A2:Z");

  const items: GenericProductListItem[] = rows
    .filter((row) => row[3] === "generic") // type
    .filter((row) => {
      if (!query) return true;

      const nameEn = row[1]?.toLowerCase() ?? "";
      const nameUa = row[2]?.toLowerCase() ?? "";

      return nameEn.includes(query) || nameUa.includes(query);
    })
    .slice(0, limit)
    .map((row) => ({
      product_id: row[0],
      name: {
        en: row[1],
        ua: row[2],
      },
      category_id: Number(row[7]),
      unit: row[9],
    }));

  return Response.json({ items });
}
