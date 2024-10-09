/*
  Warnings:

  - Added the required column `hourPrice` to the `Pricing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waitingHourPrice` to the `Pricing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pricing" ADD COLUMN     "hourPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "waitingHourPrice" DOUBLE PRECISION NOT NULL;
