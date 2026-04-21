-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('generic', 'branded');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('draft', 'active', 'archived');

-- CreateEnum
CREATE TYPE "ProductState" AS ENUM ('raw', 'cooked');

-- CreateEnum
CREATE TYPE "ProductUnit" AS ENUM ('g', 'ml', 'pcs');

-- CreateEnum
CREATE TYPE "NutrientGroup" AS ENUM ('macro', 'vitamin', 'mineral', 'other', 'micro');

-- CreateEnum
CREATE TYPE "ProductPhotoType" AS ENUM ('packaging', 'ingredients', 'other');

-- CreateEnum
CREATE TYPE "UserSex" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "FamilyRole" AS ENUM ('owner', 'participant');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('sedentary', 'light', 'moderate', 'active', 'very_active');

-- CreateEnum
CREATE TYPE "WeightGoal" AS ENUM ('maintain', 'lose', 'gain');

-- CreateEnum
CREATE TYPE "AllergySeverity" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "type" "ProductType" NOT NULL,
    "barcode" TEXT,
    "unit" "ProductUnit" NOT NULL,
    "notes" TEXT,
    "source" TEXT,
    "brand_id" UUID,
    "category_id" UUID NOT NULL,
    "cooking_loss_pct" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edible_part_pct" DOUBLE PRECISION,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "legacyId" TEXT,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "parent_product_id" UUID,
    "raw_or_cooked_default" "ProductState" NOT NULL DEFAULT 'raw',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "yield_factor" DOUBLE PRECISION,
    "archived_at" TIMESTAMP(3),
    "status" "ProductStatus" NOT NULL DEFAULT 'draft',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductNutrient" (
    "id" UUID NOT NULL,
    "unit" TEXT,
    "source" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_estimated" BOOLEAN NOT NULL DEFAULT false,
    "legacyId" TEXT,
    "nutrient_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value_per_100g" DOUBLE PRECISION NOT NULL,
    "value_per_serving" DOUBLE PRECISION,

    CONSTRAINT "ProductNutrient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTag" (
    "productId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("productId","tagId")
);

-- CreateTable
CREATE TABLE "ProductPhoto" (
    "id" UUID NOT NULL,
    "photoType" "ProductPhotoType" NOT NULL,
    "url" TEXT NOT NULL,
    "legacyId" TEXT,
    "product_id" UUID NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFavorite" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "familyId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "sex" "UserSex" NOT NULL,
    "birthDate" DATE NOT NULL,
    "heightCm" INTEGER,
    "avatarUrl" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBodyMetric" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "activityLevel" "ActivityLevel" NOT NULL,
    "goal" "WeightGoal" NOT NULL,
    "goalRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBodyMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNutrientTarget" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "nutrientId" UUID NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "calculated" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNutrientTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMealSetting" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "mealsPerDay" INTEGER NOT NULL,
    "snacksEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMealSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDietaryRestriction" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dietaryTagId" UUID NOT NULL,

    CONSTRAINT "UserDietaryRestriction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAllergy" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "productId" UUID,
    "allergenName" TEXT,
    "severity" "AllergySeverity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAllergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDislikedProduct" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDislikedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCuisinePreference" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cuisineId" UUID NOT NULL,

    CONSTRAINT "UserCuisinePreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" UUID NOT NULL,
    "familyId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "FamilyRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

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
    "notes" TEXT,

    CONSTRAINT "recipe_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuisines" (
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "region" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "legacyId" INTEGER,
    "id" UUID NOT NULL,

    CONSTRAINT "cuisines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dietary_tags" (
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "legacyId" INTEGER,
    "id" UUID NOT NULL,

    CONSTRAINT "dietary_tags_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Product_legacyId_key" ON "Product"("legacyId");

-- CreateIndex
CREATE INDEX "Product_type_idx" ON "Product"("type");

-- CreateIndex
CREATE INDEX "Product_category_id_idx" ON "Product"("category_id");

-- CreateIndex
CREATE INDEX "Product_brand_id_idx" ON "Product"("brand_id");

-- CreateIndex
CREATE INDEX "Product_name_en_idx" ON "Product"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "ProductNutrient_legacyId_key" ON "ProductNutrient"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductNutrient_product_id_nutrient_id_key" ON "ProductNutrient"("product_id", "nutrient_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPhoto_legacyId_key" ON "ProductPhoto"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFavorite_productId_userId_familyId_key" ON "ProductFavorite"("productId", "userId", "familyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserNutrientTarget_userId_nutrientId_key" ON "UserNutrientTarget"("userId", "nutrientId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDietaryRestriction_userId_dietaryTagId_key" ON "UserDietaryRestriction"("userId", "dietaryTagId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDislikedProduct_userId_productId_key" ON "UserDislikedProduct"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCuisinePreference_userId_cuisineId_key" ON "UserCuisinePreference"("userId", "cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyMember_familyId_userId_key" ON "FamilyMember"("familyId", "userId");

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
CREATE UNIQUE INDEX "cuisines_code_key" ON "cuisines"("code");

-- CreateIndex
CREATE UNIQUE INDEX "cuisines_legacyId_key" ON "cuisines"("legacyId");

-- CreateIndex
CREATE INDEX "cuisines_legacyId_idx" ON "cuisines"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "dietary_tags_code_key" ON "dietary_tags"("code");

-- CreateIndex
CREATE UNIQUE INDEX "dietary_tags_legacyId_key" ON "dietary_tags"("legacyId");

-- CreateIndex
CREATE INDEX "dietary_tags_legacyId_idx" ON "dietary_tags"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_types_legacyId_key" ON "meal_types"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_types_code_key" ON "meal_types"("code");

-- CreateIndex
CREATE INDEX "meal_types_legacyId_idx" ON "meal_types"("legacyId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_code_key" ON "tags"("code");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_parent_product_id_fkey" FOREIGN KEY ("parent_product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductNutrient" ADD CONSTRAINT "ProductNutrient_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "nutrients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductNutrient" ADD CONSTRAINT "ProductNutrient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPhoto" ADD CONSTRAINT "ProductPhoto_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBodyMetric" ADD CONSTRAINT "UserBodyMetric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNutrientTarget" ADD CONSTRAINT "UserNutrientTarget_nutrientId_fkey" FOREIGN KEY ("nutrientId") REFERENCES "nutrients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNutrientTarget" ADD CONSTRAINT "UserNutrientTarget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMealSetting" ADD CONSTRAINT "UserMealSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietaryRestriction" ADD CONSTRAINT "UserDietaryRestriction_dietaryTagId_fkey" FOREIGN KEY ("dietaryTagId") REFERENCES "dietary_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietaryRestriction" ADD CONSTRAINT "UserDietaryRestriction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDislikedProduct" ADD CONSTRAINT "UserDislikedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDislikedProduct" ADD CONSTRAINT "UserDislikedProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "cuisines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

