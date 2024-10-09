/*
  Warnings:

  - You are about to drop the column `additionalCosts` on the `Pricing` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Pricing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountStartKm` to the `Pricing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oneTimeStartingFee` to the `Pricing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "additionalCosts",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountStartKm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "oneTimeStartingFee" DOUBLE PRECISION NOT NULL;
