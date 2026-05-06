-- CreateEnum
CREATE TYPE "AuthorType" AS ENUM ('user', 'blogger', 'expert', 'brand', 'system');

-- CreateEnum
CREATE TYPE "AuthorLinkType" AS ENUM ('instagram', 'youtube', 'tiktok', 'website');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "authorId" UUID,
ADD COLUMN     "full_description" TEXT;

-- AlterTable
ALTER TABLE "RecipeVideo" ADD COLUMN     "authorId" UUID,
ADD COLUMN     "durationSec" INTEGER,
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL,
    "type" "AuthorType" NOT NULL,
    "displayName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorLink" (
    "id" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "type" "AuthorLinkType" NOT NULL,
    "url" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AuthorLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuthorLink_authorId_idx" ON "AuthorLink"("authorId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeVideo" ADD CONSTRAINT "RecipeVideo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorLink" ADD CONSTRAINT "AuthorLink_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
