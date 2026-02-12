import { readSheet } from "@/lib/sheets.read";

export type MealType = {
  meal_type_id: number;
  code: string;
  name_ua: string;
  name_en: string;
  order_index: number;
};

export async function getMealTypes(): Promise<MealType[]> {
  const rows = await readSheet("meal_types!A2:E");

  return rows
    .map((row) => ({
      meal_type_id: Number(row[0]),
      code: row[1],
      name_ua: row[2],
      name_en: row[3],
      order_index: Number(row[4]),
    }))
    .sort((a, b) => a.order_index - b.order_index);
}
