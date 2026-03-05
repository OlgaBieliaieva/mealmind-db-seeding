-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('generic', 'branded');

-- CreateEnum
CREATE TYPE "ProductState" AS ENUM ('raw', 'cooked');

-- CreateEnum
CREATE TYPE "ProductUnit" AS ENUM ('g', 'ml', 'pcs');

-- CreateEnum
CREATE TYPE "NutrientGroup" AS ENUM ('macro', 'vitamin', 'mineral', 'other');

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

-- CreateEnum
CREATE TYPE "DietaryRestrictionType" AS ENUM ('vegetarian', 'vegan', 'gluten_free', 'lactose_free');

-- CreateEnum
CREATE TYPE "CuisineType" AS ENUM ('italian', 'asian', 'ukrainian');

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameUa" TEXT,
    "type" "ProductType" NOT NULL,
    "brandId" UUID,
    "categoryId" UUID,
    "parentProductId" UUID,
    "barcode" TEXT,
    "unit" "ProductUnit" NOT NULL,
    "ediblePartPct" DOUBLE PRECISION,
    "yieldFactor" DOUBLE PRECISION,
    "cookingLossPct" DOUBLE PRECISION,
    "rawOrCookedDefault" "ProductState" NOT NULL,
    "notes" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" UUID NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameUa" TEXT,
    "country" TEXT,
    "website" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameUa" TEXT,
    "parentId" UUID,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPhoto" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "photoType" "ProductPhotoType" NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE TABLE "NutrientReference" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameUa" TEXT,
    "defaultUnit" TEXT NOT NULL,
    "nutrientGroup" "NutrientGroup" NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "rdaValue" DOUBLE PRECISION,
    "rdaUnit" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutrientReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductNutrient" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "nutrientId" UUID NOT NULL,
    "valuePer100g" DOUBLE PRECISION NOT NULL,
    "valuePerServing" DOUBLE PRECISION,
    "unit" TEXT,
    "source" TEXT,
    "isEstimated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductNutrient_pkey" PRIMARY KEY ("id")
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
    "restrictionType" "DietaryRestrictionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "cuisine" "CuisineType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCuisinePreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateIndex
CREATE INDEX "Product_type_idx" ON "Product"("type");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFavorite_productId_userId_familyId_key" ON "ProductFavorite"("productId", "userId", "familyId");

-- CreateIndex
CREATE UNIQUE INDEX "NutrientReference_code_key" ON "NutrientReference"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductNutrient_productId_nutrientId_key" ON "ProductNutrient"("productId", "nutrientId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyMember_familyId_userId_key" ON "FamilyMember"("familyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserNutrientTarget_userId_nutrientId_key" ON "UserNutrientTarget"("userId", "nutrientId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDislikedProduct_userId_productId_key" ON "UserDislikedProduct"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCuisinePreference_userId_cuisine_key" ON "UserCuisinePreference"("userId", "cuisine");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_parentProductId_fkey" FOREIGN KEY ("parentProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPhoto" ADD CONSTRAINT "ProductPhoto_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFavorite" ADD CONSTRAINT "ProductFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductNutrient" ADD CONSTRAINT "ProductNutrient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductNutrient" ADD CONSTRAINT "ProductNutrient_nutrientId_fkey" FOREIGN KEY ("nutrientId") REFERENCES "NutrientReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBodyMetric" ADD CONSTRAINT "UserBodyMetric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNutrientTarget" ADD CONSTRAINT "UserNutrientTarget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNutrientTarget" ADD CONSTRAINT "UserNutrientTarget_nutrientId_fkey" FOREIGN KEY ("nutrientId") REFERENCES "NutrientReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMealSetting" ADD CONSTRAINT "UserMealSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietaryRestriction" ADD CONSTRAINT "UserDietaryRestriction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDislikedProduct" ADD CONSTRAINT "UserDislikedProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDislikedProduct" ADD CONSTRAINT "UserDislikedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
