import { readSheet } from "@/lib/sheets.read";

export async function readBrandsMap(): Promise<Record<string, string>> {
  const rows = await readSheet("brands!A2:I");

  /**
   * brand_id -> brand_name_ua
   */
  return Object.fromEntries(
    rows.map((row) => [row[0], row[2]]), // id -> name_ua
  );
}
