/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ProductNutrient` table. All the data in the column will be lost.
  - You are about to drop the column `isEstimated` on the `ProductNutrient` table. All the data in the column will be lost.
  - You are about to drop the column `nutrientId` on the `ProductNutrient` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductNutrient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductNutrient` table. All the data in the column will be lost.
  - You are about to drop the column `valuePer100g` on the `ProductNutrient` table. All the data in the column will be lost.
  - You are about to drop the column `valuePerServing` on the `ProductNutrient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[legacyId]` on the table `ProductNutrient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,nutrient_id]` on the table `ProductNutrient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutrient_id` to the `ProductNutrient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ProductNutrient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ProductNutrient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_per_100g` to the `ProductNutrient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductNutrient" DROP CONSTRAINT "ProductNutrient_nutrientId_fkey";

-- DropForeignKey
ALTER TABLE "ProductNutrient" DROP CONSTRAINT "ProductNutrient_productId_fkey";

-- DropIndex
DROP INDEX "ProductNutrient_productId_nutrientId_key";

-- AlterTable
ALTER TABLE "ProductNutrient" DROP COLUMN "createdAt",
DROP COLUMN "isEstimated",
DROP COLUMN "nutrientId",
DROP COLUMN "productId",
DROP COLUMN "updatedAt",
DROP COLUMN "valuePer100g",
DROP COLUMN "valuePerServing",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_estimated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "legacyId" TEXT,
ADD COLUMN     "nutrient_id" UUID NOT NULL,
ADD COLUMN     "product_id" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "value_per_100g" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "value_per_serving" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "ProductNutrient_legacyId_key" ON "ProductNutrient"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductNutrient_product_id_nutrient_id_key" ON "ProductNutrient"("product_id", "nutrient_id");

-- AddForeignKey
ALTER TABLE "ProductNutrient" ADD CONSTRAINT "ProductNutrient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductNutrient" ADD CONSTRAINT "ProductNutrient_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "nutrients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
