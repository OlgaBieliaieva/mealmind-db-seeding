import { readSheet } from "@/lib/sheets.read";

function isTrue(value?: string) {
  return value?.toLowerCase() === "true";
}

export async function GET() {
  const rows = await readSheet("cuisines!A2:F");

  const items = rows
    .filter((row) => isTrue(row[5])) // is_active
    .map((row) => ({
      cuisine_id: Number(row[0]),
      code: row[1],
      name: {
        en: row[2],
        ua: row[3],
      },
      region: row[4],
    }));

  return Response.json({ items });
}
