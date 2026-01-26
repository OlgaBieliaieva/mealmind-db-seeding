import { BrandSchema } from "@/types/brand.schema";
import { appendRow } from "@/lib/sheets.helpers";
import { mapBrandToRow } from "@/lib/mappers/brand.mapper";
import { getSheetsClient } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const brand = BrandSchema.parse(body);

    const { brandId, row } = mapBrandToRow(brand);
    await appendRow("brands", row);

    return Response.json({
      success: true,
      brand_id: brandId,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }

    return Response.json(
      { success: false, error: "Unknown error" },
      { status: 400 },
    );
  }
}

export async function GET() {
  const { sheets, spreadsheetId } = getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "brands!A2:I",
  });

  const rows = res.data.values ?? [];

  const brands = rows.map((row) => ({
    brand_id: row[0],
    name: {
      en: row[1],
      ua: row[2],
    },
    country: row[3],
    website: row[4],
    is_verified: row[5] === "TRUE" || row[5] === true,
    notes: row[6],
  }));

  return Response.json({ brands });
}
