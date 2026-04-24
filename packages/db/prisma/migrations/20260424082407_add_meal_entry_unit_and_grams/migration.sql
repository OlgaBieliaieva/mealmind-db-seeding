-- CreateEnum
CREATE TYPE "MealEntryUnit" AS ENUM ('g', 'ml', 'portion');

-- AlterTable
ALTER TABLE "MealEntry" ADD COLUMN     "amountInGrams" DOUBLE PRECISION,
ADD COLUMN     "unit" "MealEntryUnit";
