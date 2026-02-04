import { readSheet } from "@/lib/sheets.read";

function isTrue(value?: string) {
  return value?.toLowerCase() === "true";
}

export async function GET() {
  const rows = await readSheet("dietary_tags!A2:E");

  const items = rows
    .filter((row) => isTrue(row[4])) // is_active
    .map((row) => ({
      dietary_tag_id: Number(row[0]),
      code: row[1],
      name: {
        en: row[2],
        ua: row[3],
      },
    }));

  return Response.json({ items });
}
