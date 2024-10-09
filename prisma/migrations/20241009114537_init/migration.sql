-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "baseFarePerKm" DOUBLE PRECISION NOT NULL,
    "additionalCosts" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);
