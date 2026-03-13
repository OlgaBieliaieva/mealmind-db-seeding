import { prisma } from "@/lib/db/prisma";
import { productRepository } from "../repositories/product.repository";
import { ProductInput } from "../schemas/product.schema";
import { TempProductPhoto } from "../types/product-photo.types";
import { finalizeProductPhotos } from "./product-media.service";
import { generateProductPhotoVariants } from "../../media/workers/photo-thumbnail.worker";

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

  // ⭐ CREATE WITHOUT PHOTOS
  const { photos, ...rest } = data;

  const result = await productRepository.create({
    ...rest,
    photos: [],
  });

  // ⭐ finalize + attach AFTER
  if (photos?.length) {
    const validPhotos: TempProductPhoto[] = photos.filter(
      (p): p is TempProductPhoto => !!p.objectName,
    );

    if (validPhotos.length) {
      const finalized = await finalizeProductPhotos(
        result.product_id,
        validPhotos,
      );

      await attachProductPhotos(result.product_id, finalized);

      // ⭐ THUMB WORKER TRIGGER
      Promise.all(
        finalized.map((p) =>
          generateProductPhotoVariants(result.product_id, p.objectName),
        ),
      );
    }
  }

  return result;
}

export async function searchGenericProducts(query: string) {
  return productRepository.searchGeneric(query);
}

export async function attachProductPhotos(
  productId: string,
  photos: TempProductPhoto[],
) {
  await prisma.productPhoto.createMany({
    data: photos.map((p) => ({
      productId,
      url: p.url,
      objectName: p.objectName,
      photoType: p.type,
    })),
  });
}
