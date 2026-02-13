import { appendRow } from "@/lib/sheets.helpers";
import { readSheet } from "@/lib/sheets.read";
import { generateUUID } from "./uuid";

export async function toggleProductFavorite(
  productId: string,
  userId: string,
  familyId: string,
) {
  const rows = await readSheet("product_favorites!A2:E");

  const existing = rows.find(
    (row) => row[1] === productId && row[2] === userId && row[3] === familyId,
  );

  if (existing) {
    // ⚠ У Google Sheets немає deleteRow helper
    // Для MVP поки НЕ видаляємо, а просто не додаємо повторно
    return;
  }

  await appendRow("product_favorites", [
    generateUUID(),
    productId,
    userId,
    familyId,
    new Date().toISOString(),
  ]);
}
