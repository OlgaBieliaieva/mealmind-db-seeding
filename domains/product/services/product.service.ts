import { prisma } from "@/lib/db/prisma";
import { productRepository } from "../repositories/product.repository";
import { ProductInput } from "../schemas/product.schema";

export async function createProduct(data: ProductInput) {
  const categoryExists = await prisma.category.findUnique({
    where: { id: data.category_id },
    select: { id: true },
  });

  if (!categoryExists) {
    throw new Error("Category not found");
  }

  if (data.type === "branded") {
    const brandExists = await prisma.brand.findUnique({
      where: { id: data.brand_id },
      select: { id: true },
    });

    if (!brandExists) {
      throw new Error("Brand not found");
    }
  }

  return productRepository.create(data);
}

export async function searchGenericProducts(query: string) {
  return productRepository.searchGeneric(query);
}
