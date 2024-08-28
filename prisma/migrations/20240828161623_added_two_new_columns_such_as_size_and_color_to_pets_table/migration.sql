/*
  Warnings:

  - Added the required column `color` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "size" "Size" NOT NULL;
