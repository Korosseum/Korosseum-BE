/*
  Warnings:

  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `index` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "index" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category",
DROP COLUMN "title",
ADD COLUMN     "topic" TEXT NOT NULL DEFAULT 'custom';

-- CreateIndex
CREATE INDEX "File_ownerId_ownerType_index_idx" ON "File"("ownerId", "ownerType", "index");
