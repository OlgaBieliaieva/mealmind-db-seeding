import { readSheet } from "@/lib/sheets.read";

type CategoryRow = {
  id: number;
  name_en: string;
  name_ua: string;
  parent_id: number | null;
};

export async function readCategories(): Promise<CategoryRow[]> {
  const rows = await readSheet("categories!A2:D");

  return rows.map((row) => ({
    id: Number(row[0]),
    name_en: row[1],
    name_ua: row[2],
    parent_id: row[3] ? Number(row[3]) : null,
  }));
}
