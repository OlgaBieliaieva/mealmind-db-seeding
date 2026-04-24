/*
  Warnings:

  - Made the column `amountInGrams` on table `MealEntry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unit` on table `MealEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MealEntry" ALTER COLUMN "amountInGrams" SET NOT NULL,
ALTER COLUMN "unit" SET NOT NULL;
