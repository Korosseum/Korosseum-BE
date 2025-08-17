/*
  Warnings:

  - Changed the type of `ownerId` on the `File` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "ownerId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "File_ownerId_ownerType_index_idx" ON "File"("ownerId", "ownerType", "index");
