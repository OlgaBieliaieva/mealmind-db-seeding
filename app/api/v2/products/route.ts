// SECTION ███ PRODUCTS API V2 ███
// CONTRACT: POST /api/v2/products

import { ProductSchema } from "@/domains/product/schemas/product.schema";
import {
  createProduct,
  listProducts,
} from "@/domains/product/services/product.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query") ?? undefined;
  const type = searchParams.get("type") as "generic" | "branded" | null;
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const brandId = searchParams.get("brandId") ?? undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);

  const result = await listProducts({
    query,
    type: type ?? undefined,
    categoryId,
    brandId,
    page,
    limit,
  });

  return Response.json(result);
}

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

// import { ProductSchema } from "@/domains/product/schemas/product.schema";

// import { createProduct } from "@/domains/product/services/product.service";
// import { searchGenericProducts } from "@/domains/product/services/product.service";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const product = ProductSchema.parse(body);

//     const result = await createProduct(product);

//     return Response.json(result);
//   } catch (error) {
//     console.error(error);

//     return Response.json({ success: false }, { status: 400 });
//   }
// }
