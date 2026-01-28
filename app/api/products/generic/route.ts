import { NextRequest } from "next/server";
import { readSheet } from "@/lib/sheets.read";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase().trim();

  if (!query || query.length < 2) {
    return Response.json({ items: [] });
  }

  /**
   * products sheet columns:
   * A product_id
   * B name_en
   * C name_ua
   * D type
   * H category_id
   */
  const rows = await readSheet("products!A2:I");

  const items = rows
    .filter((row) => row[3] === "generic")
    .filter((row) => {
      const nameEn = row[1]?.toLowerCase() ?? "";
      const nameUa = row[2]?.toLowerCase() ?? "";

      return nameEn.includes(query) || nameUa.includes(query);
    })
    .slice(0, 20)
    .map((row) => ({
      product_id: row[0],
      name: {
        en: row[1],
        ua: row[2],
      },
      category_id: Number(row[7]),
      subcategory_id: Number(row[8]),
    }));

  return Response.json({ items });
}
