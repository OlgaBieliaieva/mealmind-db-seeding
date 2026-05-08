-- CreateEnum
CREATE TYPE "RecipeSourceType" AS ENUM ('external', 'original');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "original_recipe_id" UUID;

-- CreateTable
CREATE TABLE "RecipeSource" (
    "id" UUID NOT NULL,
    "recipe_id" UUID NOT NULL,
    "type" "RecipeSourceType" NOT NULL,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "platform" "RecipeVideoPlatform",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecipeSource_recipe_id_idx" ON "RecipeSource"("recipe_id");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_original_recipe_id_fkey" FOREIGN KEY ("original_recipe_id") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeSource" ADD CONSTRAINT "RecipeSource_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
