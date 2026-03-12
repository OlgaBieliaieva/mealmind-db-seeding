import { getBrands } from "@/domains/product/services/brand.service";
import { BrandCreateSchema } from "@/domains/product/schemas/brand.schema";
import { createBrand } from "@/domains/product/services/brand.service";

export async function GET() {
  const brands = await getBrands();

  return Response.json(brands);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = BrandCreateSchema.parse(body);

    const brand = await createBrand(parsed);

    return Response.json(brand);
  } catch (e) {
    console.error(e);

    return Response.json(
      { message: "Failed to create brand" },
      { status: 400 },
    );
  }
}
