/*
  Warnings:

  - You are about to drop the column `destination` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `encoding` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fieldname` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `originalname` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - Added the required column `originalName` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "destination",
DROP COLUMN "encoding",
DROP COLUMN "fieldname",
DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "originalname",
DROP COLUMN "path",
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
