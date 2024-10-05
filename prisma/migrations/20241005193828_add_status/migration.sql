/*
  Warnings:

  - You are about to drop the column `updateAt` on the `transfers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transfers" DROP COLUMN "updateAt",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
