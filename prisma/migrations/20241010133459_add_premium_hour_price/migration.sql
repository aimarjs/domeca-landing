/*
  Warnings:

  - You are about to drop the column `PremiumHourPrice` on the `Pricing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "PremiumHourPrice",
ADD COLUMN     "premiumHourPrice" DOUBLE PRECISION NOT NULL DEFAULT 20.0;
