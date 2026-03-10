/*
  Warnings:

  - The primary key for the `cuisines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cuisine_id` on the `cuisines` table. All the data in the column will be lost.
  - The primary key for the `dietary_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dietary_tag_id` on the `dietary_tags` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NutrientReference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `cuisineId` on the `UserCuisinePreference` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dietaryTagId` on the `UserDietaryRestriction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `cuisines` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `dietary_tags` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
ALTER TYPE "NutrientGroup" ADD VALUE 'micro';

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductNutrient" DROP CONSTRAINT "ProductNutrient_nutrientId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "UserCuisinePreference" DROP CONSTRAINT "UserCuisinePreference_cuisineId_fkey";

-- DropForeignKey
ALTER TABLE "UserDietaryRestriction" DROP CONSTRAINT "UserDietaryRestriction_dietaryTagId_fkey";

-- DropForeignKey
ALTER TABLE "UserNutrientTarget" DROP CONSTRAINT "UserNutrientTarget_nutrientId_fkey";

-- AlterTable
ALTER TABLE "UserCuisinePreference" DROP COLUMN "cuisineId",
ADD COLUMN     "cuisineId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "UserDietaryRestriction" DROP COLUMN "dietaryTagId",
ADD COLUMN     "dietaryTagId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "cuisines" DROP CONSTRAINT "cuisines_pkey",
DROP COLUMN "cuisine_id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "cuisines_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "dietary_tags" DROP CONSTRAINT "dietary_tags_pkey",
DROP COLUMN "dietary_tag_id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "dietary_tags_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "NutrientReference";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "legacyId" INTEGER,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "parent_id" UUID,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL,
    "legacyId" TEXT,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "country" TEXT,
    "website" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrients" (
    "id" UUID NOT NULL,
    "legacyId" INTEGER,
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "default_unit" TEXT NOT NULL,
    "nutrient_group" "NutrientGroup" NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "rda_value" DOUBLE PRECISION,
    "rda_unit" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_types" (
    "id" UUID NOT NULL,
    "legacyId" INTEGER,
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,

    CONSTRAINT "recipe_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_types" (
    "id" UUID NOT NULL,
    "legacyId" INTEGER,
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "meal_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_legacyId_key" ON "categories"("legacyId");

-- CreateIndex
CREATE INDEX "categories_legacyId_idx" ON "categories"("legacyId");

-- CreateIndex
CREATE INDEX "categories_parent_id_idx" ON "categories"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "brands_legacyId_key" ON "brands"("legacyId");

-- CreateIndex
CREATE INDEX "brands_legacyId_idx" ON "brands"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "nutrients_legacyId_key" ON "nutrients"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "nutrients_code_key" ON "nutrients"("code");

-- CreateIndex
CREATE INDEX "nutrients_legacyId_idx" ON "nutrients"("legacyId");

-- CreateIndex
CREATE INDEX "nutrients_nutrient_group_idx" ON "nutrients"("nutrient_group");

-- CreateIndex
CREATE INDEX "nutrients_sort_order_idx" ON "nutrients"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_types_legacyId_key" ON "recipe_types"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_types_code_key" ON "recipe_types"("code");

-- CreateIndex
CREATE INDEX "recipe_types_legacyId_idx" ON "recipe_types"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_types_legacyId_key" ON "meal_types"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_types_code_key" ON "meal_types"("code");

-- CreateIndex
CREATE INDEX "meal_types_legacyId_idx" ON "meal_types"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_code_key" ON "tags"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserCuisinePreference_userId_cuisineId_key" ON "UserCuisinePreference"("userId", "cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDietaryRestriction_userId_dietaryTagId_key" ON "UserDietaryRestriction"("userId", "dietaryTagId");

-- CreateIndex
CREATE INDEX "cuisines_legacyId_idx" ON "cuisines"("legacyId");

-- CreateIndex
CREATE INDEX "dietary_tags_legacyId_idx" ON "dietary_tags"("legacyId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductNutrient" ADD CONSTRAINT "ProductNutrient_nutrientId_fkey" FOREIGN KEY ("nutrientId") REFERENCES "nutrients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNutrientTarget" ADD CONSTRAINT "UserNutrientTarget_nutrientId_fkey" FOREIGN KEY ("nutrientId") REFERENCES "nutrients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietaryRestriction" ADD CONSTRAINT "UserDietaryRestriction_dietaryTagId_fkey" FOREIGN KEY ("dietaryTagId") REFERENCES "dietary_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "cuisines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
