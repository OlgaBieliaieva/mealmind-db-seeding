/*
  Warnings:

  - You are about to drop the column `userId` on the `ProductFavorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,familyId]` on the table `ProductFavorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `ProductFavorite` table without a default value. This is not possible if the table is not empty.
  - Made the column `familyId` on table `ProductFavorite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "ProductFavorite_productId_userId_familyId_key";

-- AlterTable
ALTER TABLE "ProductFavorite" DROP COLUMN "userId",
ADD COLUMN     "createdBy" UUID NOT NULL,
ALTER COLUMN "familyId" SET NOT NULL;

-- CreateTable
CREATE TABLE "RecipeFavorite" (
    "id" UUID NOT NULL,
    "recipeId" UUID NOT NULL,
    "familyId" UUID NOT NULL,
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeFavorite_recipeId_familyId_key" ON "RecipeFavorite"("recipeId", "familyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFavorite_productId_familyId_key" ON "ProductFavorite"("productId", "familyId");

-- AddForeignKey
ALTER TABLE "RecipeFavorite" ADD CONSTRAINT "RecipeFavorite_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
