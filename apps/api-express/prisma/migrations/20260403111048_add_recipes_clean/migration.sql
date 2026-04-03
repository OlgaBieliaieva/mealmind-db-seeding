/*
  Warnings:

  - Made the column `object_name` on table `ProductPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "RecipeStatus" AS ENUM ('draft', 'ready', 'published', 'archived');

-- CreateEnum
CREATE TYPE "RecipeVisibility" AS ENUM ('private', 'public');

-- CreateEnum
CREATE TYPE "RecipeDifficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateEnum
CREATE TYPE "RecipeAuthorType" AS ENUM ('user', 'blogger', 'system');

-- CreateEnum
CREATE TYPE "RecipeVideoPlatform" AS ENUM ('youtube', 'instagram', 'tiktok', 'other');

-- FIX NULL VALUES BEFORE MAKING COLUMN REQUIRED

UPDATE "ProductPhoto"
SET object_name = CONCAT('photo_', id)
WHERE object_name IS NULL;

-- AlterTable
ALTER TABLE "ProductPhoto" ALTER COLUMN "object_name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Recipe" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "RecipeStatus" NOT NULL DEFAULT 'draft',
    "visibility" "RecipeVisibility" NOT NULL DEFAULT 'private',
    "difficulty" "RecipeDifficulty",
    "recipe_type_id" UUID,
    "recipe_author_id" UUID,
    "family_id" UUID,
    "base_servings" INTEGER NOT NULL,
    "base_output_weight_g" INTEGER NOT NULL,
    "container_weight_g" INTEGER,
    "prep_time_min" INTEGER,
    "cook_time_min" INTEGER,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" UUID NOT NULL,
    "recipe_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity_g" DOUBLE PRECISION NOT NULL,
    "is_optional" BOOLEAN NOT NULL DEFAULT false,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "id" UUID NOT NULL,
    "recipe_id" UUID NOT NULL,
    "step_number" INTEGER NOT NULL,
    "instruction" TEXT NOT NULL,
    "timer_sec" INTEGER,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCuisine" (
    "recipeId" UUID NOT NULL,
    "cuisineId" UUID NOT NULL,

    CONSTRAINT "RecipeCuisine_pkey" PRIMARY KEY ("recipeId","cuisineId")
);

-- CreateTable
CREATE TABLE "RecipeDietaryTag" (
    "recipeId" UUID NOT NULL,
    "dietaryTagId" UUID NOT NULL,

    CONSTRAINT "RecipeDietaryTag_pkey" PRIMARY KEY ("recipeId","dietaryTagId")
);

-- CreateTable
CREATE TABLE "RecipeAuthor" (
    "id" UUID NOT NULL,
    "type" "RecipeAuthorType" NOT NULL,
    "display_name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "profile_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeVideo" (
    "id" UUID NOT NULL,
    "recipe_id" UUID NOT NULL,
    "recipe_author_id" UUID,
    "platform" "RecipeVideoPlatform" NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeNutrient" (
    "id" UUID NOT NULL,
    "recipe_id" UUID NOT NULL,
    "nutrient_id" UUID NOT NULL,
    "value_total" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipeNutrient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Recipe_status_idx" ON "Recipe"("status");

-- CreateIndex
CREATE INDEX "Recipe_recipe_type_id_idx" ON "Recipe"("recipe_type_id");

-- CreateIndex
CREATE INDEX "RecipeIngredient_recipe_id_idx" ON "RecipeIngredient"("recipe_id");

-- CreateIndex
CREATE INDEX "RecipeStep_recipe_id_idx" ON "RecipeStep"("recipe_id");

-- CreateIndex
CREATE INDEX "RecipeVideo_recipe_id_idx" ON "RecipeVideo"("recipe_id");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeNutrient_recipe_id_nutrient_id_key" ON "RecipeNutrient"("recipe_id", "nutrient_id");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipe_type_id_fkey" FOREIGN KEY ("recipe_type_id") REFERENCES "recipe_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipe_author_id_fkey" FOREIGN KEY ("recipe_author_id") REFERENCES "RecipeAuthor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCuisine" ADD CONSTRAINT "RecipeCuisine_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCuisine" ADD CONSTRAINT "RecipeCuisine_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "cuisines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeDietaryTag" ADD CONSTRAINT "RecipeDietaryTag_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeDietaryTag" ADD CONSTRAINT "RecipeDietaryTag_dietaryTagId_fkey" FOREIGN KEY ("dietaryTagId") REFERENCES "dietary_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeVideo" ADD CONSTRAINT "RecipeVideo_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeVideo" ADD CONSTRAINT "RecipeVideo_recipe_author_id_fkey" FOREIGN KEY ("recipe_author_id") REFERENCES "RecipeAuthor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeNutrient" ADD CONSTRAINT "RecipeNutrient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeNutrient" ADD CONSTRAINT "RecipeNutrient_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "nutrients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
