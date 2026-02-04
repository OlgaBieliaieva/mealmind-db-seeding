import { readSheet } from "@/lib/sheets.read";

export async function GET() {
  const rows = await readSheet("recipe_types!A2:D");

  const items = rows.map((row) => ({
    recipe_type_id: Number(row[0]),
    code: row[1],
    name: {
      en: row[2],
      ua: row[3],
    },
  }));

  return Response.json({ items });
}
