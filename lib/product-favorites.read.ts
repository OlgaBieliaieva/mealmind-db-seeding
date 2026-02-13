import { readSheet } from "@/lib/sheets.read";
import { ProductFavorite } from "@/types/product-favorite.dto";

export async function getProductFavorites(
  familyId: string,
  userId: string,
): Promise<ProductFavorite[]> {
  const rows = await readSheet("product_favorites!A2:E");

  return rows
    .map((row) => ({
      product_favorite_id: row[0],
      product_id: row[1],
      user_id: row[2],
      family_id: row[3],
      created_at: row[4],
    }))
    .filter((f) => f.family_id === familyId && f.user_id === userId);
}
