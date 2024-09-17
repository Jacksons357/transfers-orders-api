/*
  Warnings:

  - You are about to drop the column `updadteAt` on the `transfers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transfers" DROP COLUMN "updadteAt",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
