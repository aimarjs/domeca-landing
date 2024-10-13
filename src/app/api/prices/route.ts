import { NextResponse } from "next/server";
import prisma from "lib/prisma";
import {
  Pricing,
  PricingRequestBody,
  PricingNoDataResponse,
  PricingErrorResponse,
} from "types/interfaces";

export async function GET(): Promise<NextResponse> {
  try {
    const pricing = await prisma.pricing.findFirst();
    if (pricing) {
      return NextResponse.json<PricingRequestBody>(pricing, { status: 200 });
    } else {
      return NextResponse.json<PricingNoDataResponse>(
        { message: "No pricing data found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json<PricingErrorResponse>(
      { message: "Error fetching prices", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: PricingRequestBody = await request.json();
    const {
      baseFarePerKm,
      oneTimeStartingFee,
      hourPrice,
      waitingHourPrice,
      discount,
      discountStartKm,
      premiumHourPrice,
      taxRate,
    } = body;

    const pricing: Pricing = await prisma.pricing.upsert({
      where: { id: 1 },
      update: {
        baseFarePerKm,
        oneTimeStartingFee,
        hourPrice,
        waitingHourPrice,
        discount,
        discountStartKm,
        premiumHourPrice,
        taxRate,
      },
      create: {
        baseFarePerKm,
        oneTimeStartingFee,
        hourPrice,
        waitingHourPrice,
        discount,
        discountStartKm,
        premiumHourPrice,
        taxRate,
      },
    });

    return NextResponse.json<PricingRequestBody>(pricing, { status: 200 });
  } catch (error) {
    console.error("Error saving prices:", error);
    return NextResponse.json<PricingErrorResponse>(
      { message: "Error saving prices", error: (error as Error).message },
      { status: 500 }
    );
  }
}
