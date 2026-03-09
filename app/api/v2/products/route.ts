// SECTION ███ PRODUCTS API V2 ███
// CONTRACT: POST /api/v2/products

import { ProductSchema } from "@/domains/product/schemas/product.schema";

import { createProduct } from "@/domains/product/services/product.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = ProductSchema.parse(body);

    const result = await createProduct(product);

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json({ success: false }, { status: 400 });
  }
}
