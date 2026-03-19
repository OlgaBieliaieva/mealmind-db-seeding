import { NextResponse } from "next/server";
import { productRepository } from "@/domains/product/repositories/product.repository";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const product = await productRepository.getProductDetails(id);

  if (!product) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  await productRepository.deleteProduct(id);

  return NextResponse.json({ success: true });
}
