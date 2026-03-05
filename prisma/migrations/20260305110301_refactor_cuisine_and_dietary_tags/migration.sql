/*
  Warnings:

  - You are about to drop the column `cuisine` on the `UserCuisinePreference` table. All the data in the column will be lost.
  - You are about to drop the column `restrictionType` on the `UserDietaryRestriction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,cuisineId]` on the table `UserCuisinePreference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,dietaryTagId]` on the table `UserDietaryRestriction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cuisineId` to the `UserCuisinePreference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietaryTagId` to the `UserDietaryRestriction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserCuisinePreference_userId_cuisine_key";

-- AlterTable
ALTER TABLE "UserCuisinePreference" DROP COLUMN "cuisine",
ADD COLUMN     "cuisineId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserDietaryRestriction" DROP COLUMN "restrictionType",
ADD COLUMN     "dietaryTagId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "CuisineType";

-- DropEnum
DROP TYPE "DietaryRestrictionType";

-- CreateTable
CREATE TABLE "cuisines" (
    "cuisine_id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "region" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cuisines_pkey" PRIMARY KEY ("cuisine_id")
);

-- CreateTable
CREATE TABLE "dietary_tags" (
    "dietary_tag_id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ua" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "dietary_tags_pkey" PRIMARY KEY ("dietary_tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cuisines_code_key" ON "cuisines"("code");

-- CreateIndex
CREATE UNIQUE INDEX "dietary_tags_code_key" ON "dietary_tags"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserCuisinePreference_userId_cuisineId_key" ON "UserCuisinePreference"("userId", "cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDietaryRestriction_userId_dietaryTagId_key" ON "UserDietaryRestriction"("userId", "dietaryTagId");

-- AddForeignKey
ALTER TABLE "UserDietaryRestriction" ADD CONSTRAINT "UserDietaryRestriction_dietaryTagId_fkey" FOREIGN KEY ("dietaryTagId") REFERENCES "dietary_tags"("dietary_tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisinePreference" ADD CONSTRAINT "UserCuisinePreference_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "cuisines"("cuisine_id") ON DELETE RESTRICT ON UPDATE CASCADE;
