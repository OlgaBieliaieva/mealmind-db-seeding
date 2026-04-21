import { PrismaClient, ProductPhotoType } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { ProductPhotoRow } from "../types";

export async function seedProductPhotos(prisma: PrismaClient) {
  // Section STEP 1 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // product photos
  const rows = readCSV<ProductPhotoRow>(
    "./prisma/seeds/data/product_photos.csv",
  );
  // Section STEP 2 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // отримуємо products з БД

  const products = await prisma.product.findMany();
  const productMap = new Map(
    products.filter((p) => p.legacyId).map((p) => [p.legacyId as string, p.id]),
  );

  // Section STEP 3 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // створюємо записи product photos

  await prisma.productPhoto.createMany({
    data: rows.map((row) => {
      const productId = productMap.get(row.product_id);

      if (!productId) {
        throw new Error(`Product not found legacyId=${row.product_id}`);
      }

      return {
        legacyId: row.photo_id,
        productId,
        photoType: row.photo_type as ProductPhotoType,
        url: row.url,
        uploadedAt: new Date(row.uploaded_at),
      };
    }),
    skipDuplicates: true,
  });
}
