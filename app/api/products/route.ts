import { ProductSchema } from "@/types/product.schema";
import { appendRow } from "@/lib/sheets.helpers";
import { mapProductToRow } from "@/lib/mappers/product.mapper";
import { mapNutrientsToRows } from "@/lib/mappers/nutrients.mapper";
import { mapPhotosToRows } from "@/lib/mappers/photos.mapper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = ProductSchema.parse(body);

    const { productId, row } = mapProductToRow(product);
    await appendRow("products", row);

    const nutrientRows = mapNutrientsToRows(productId, product.nutrients);
    for (const nutrientRow of nutrientRows) {
      await appendRow("product_nutrients", nutrientRow);
    }

    const photoRows = mapPhotosToRows(productId, product.photos);
    for (const photoRow of photoRows) {
      await appendRow("product_photos", photoRow);
    }

    return Response.json({ success: true, product_id: productId });
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
