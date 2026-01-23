import { BrandSchema } from "@/types/brand.schema";
import { appendRow } from "@/lib/sheets.helpers";
import { mapBrandToRow } from "@/lib/mappers/brand.mapper";

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
