/*
  Warnings:

  - Added the required column `object_name` to the `ProductPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "ProductPhoto" ADD COLUMN     "object_name" TEXT NOT NULL;

-- STEP 1 — add nullable column

ALTER TABLE "ProductPhoto"
ADD COLUMN "object_name" TEXT;

-- STEP 2 — backfill from url

UPDATE "ProductPhoto"
SET "object_name" =
  split_part(url, '/product-photos/', 2)
WHERE url LIKE '%product-photos%'
AND "object_name" IS NULL;

