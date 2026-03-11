/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductPhoto` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `ProductPhoto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legacyId]` on the table `ProductPhoto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `ProductPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductPhoto" DROP CONSTRAINT "ProductPhoto_productId_fkey";

-- AlterTable
ALTER TABLE "ProductPhoto" DROP COLUMN "productId",
DROP COLUMN "uploadedAt",
ADD COLUMN     "legacyId" TEXT,
ADD COLUMN     "product_id" UUID NOT NULL,
ADD COLUMN     "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "ProductPhoto_legacyId_key" ON "ProductPhoto"("legacyId");

-- AddForeignKey
ALTER TABLE "ProductPhoto" ADD CONSTRAINT "ProductPhoto_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
