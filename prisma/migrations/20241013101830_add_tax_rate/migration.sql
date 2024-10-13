-- AlterTable
ALTER TABLE "Pricing" ADD COLUMN     "taxRate" DOUBLE PRECISION NOT NULL DEFAULT 0.22,
ALTER COLUMN "baseFarePerKm" SET DEFAULT 0.7,
ALTER COLUMN "hourPrice" SET DEFAULT 7.0,
ALTER COLUMN "waitingHourPrice" SET DEFAULT 7.0,
ALTER COLUMN "discountStartKm" SET DEFAULT 0.0,
ALTER COLUMN "premiumHourPrice" SET DEFAULT 9.0;
