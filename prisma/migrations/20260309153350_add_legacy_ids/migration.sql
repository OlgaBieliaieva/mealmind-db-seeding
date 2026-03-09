/*
  Warnings:

  - A unique constraint covering the columns `[legacyId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[legacyId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[legacyId]` on the table `NutrientReference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[legacyId]` on the table `cuisines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[legacyId]` on the table `dietary_tags` will be added. If there are existing duplicate values, this will fail.
  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "legacyId" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "legacyId" INTEGER;

-- AlterTable
ALTER TABLE "NutrientReference" ADD COLUMN     "legacyId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "cuisines" ADD COLUMN     "legacyId" INTEGER;

-- AlterTable
ALTER TABLE "dietary_tags" ADD COLUMN     "legacyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_legacyId_key" ON "Brand"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_legacyId_key" ON "Category"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "NutrientReference_legacyId_key" ON "NutrientReference"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "cuisines_legacyId_key" ON "cuisines"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "dietary_tags_legacyId_key" ON "dietary_tags"("legacyId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
