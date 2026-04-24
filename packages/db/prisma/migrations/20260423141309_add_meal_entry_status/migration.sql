-- CreateEnum
CREATE TYPE "MealEntryStatus" AS ENUM ('planned', 'prepared');

-- AlterTable
ALTER TABLE "MealEntry" ADD COLUMN     "status" "MealEntryStatus" NOT NULL DEFAULT 'planned';
