// SECTION ███ PRODUCTS API V2 ███
// CONTRACT: POST /api/v2/products

import { NextRequest } from "next/server";

import { productRepository } from "@/domains/product/repositories/product.repository";
import { ProductSchema } from "@/domains/product/schemas/product.schema";
import {
  createProduct,
} from "@/domains/product/services/product.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query") ?? undefined;
    const type =
      (searchParams.get("type") as "generic" | "branded") ?? undefined;

    const categoryId = searchParams.get("categoryId") ?? undefined;

    const brandId = searchParams.get("brandId") ?? undefined;

    const page = Number(searchParams.get("page") ?? "1");

    const result = await productRepository.searchProducts({
      query,
      type,
      categoryId,
      brandId,
      page,
      limit: 20,
    });

    return Response.json(result);
  } catch (e) {
    console.error(e);

    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
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
