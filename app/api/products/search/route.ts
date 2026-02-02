import { readSheet } from "@/lib/sheets.read";
import { readBrandsMap } from "@/lib/brands.read";
import { ProductSearchItem } from "@/types/product-search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase() ?? "";
  const limit = Number(searchParams.get("limit") ?? 20);

  if (query.length < 2) {
    return Response.json({ items: [] });
  }

  // 1️⃣ читаємо бренди
  const brandsMap = await readBrandsMap();

  // 2️⃣ читаємо продукти
  const rows = await readSheet("products!A2:Z");

  const items: ProductSearchItem[] = rows
    .filter((row) => {
      const nameEn = row[1]?.toLowerCase() ?? "";
      const nameUa = row[2]?.toLowerCase() ?? "";
      return nameEn.includes(query) || nameUa.includes(query);
    })
    .slice(0, limit)
    .map((row) => {
      const type = row[3] as "generic" | "branded";
      const brandId = row[4];

      return {
        product_id: row[0],
        name_ua: row[2],
        product_type: type,
        ...(type === "branded" && brandId
          ? { brand_name_ua: brandsMap[brandId] }
          : {}),
      };
    });

  return Response.json({ items });
}
