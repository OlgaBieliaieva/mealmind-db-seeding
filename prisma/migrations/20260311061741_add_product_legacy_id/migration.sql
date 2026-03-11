/*
  Warnings:

  - You are about to drop the column `brandId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cookingLossPct` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ediblePartPct` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nameEn` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nameUa` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `parentProductId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rawOrCookedDefault` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `yieldFactor` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legacyId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_ua` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_parentProductId_fkey";

-- DropIndex
DROP INDEX "Product_brandId_idx";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brandId",
DROP COLUMN "categoryId",
DROP COLUMN "cookingLossPct",
DROP COLUMN "createdAt",
DROP COLUMN "ediblePartPct",
DROP COLUMN "isVerified",
DROP COLUMN "nameEn",
DROP COLUMN "nameUa",
DROP COLUMN "parentProductId",
DROP COLUMN "rawOrCookedDefault",
DROP COLUMN "updatedAt",
DROP COLUMN "yieldFactor",
ADD COLUMN     "brand_id" UUID,
ADD COLUMN     "category_id" UUID NOT NULL,
ADD COLUMN     "cooking_loss_pct" DOUBLE PRECISION,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "edible_part_pct" DOUBLE PRECISION,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "legacyId" TEXT,
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_ua" TEXT NOT NULL,
ADD COLUMN     "parent_product_id" UUID,
ADD COLUMN     "raw_or_cooked_default" "ProductState" NOT NULL DEFAULT 'raw',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "yield_factor" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Product_legacyId_key" ON "Product"("legacyId");

-- CreateIndex
CREATE INDEX "Product_category_id_idx" ON "Product"("category_id");

-- CreateIndex
CREATE INDEX "Product_brand_id_idx" ON "Product"("brand_id");

-- CreateIndex
CREATE INDEX "Product_name_en_idx" ON "Product"("name_en");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_parent_product_id_fkey" FOREIGN KEY ("parent_product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
