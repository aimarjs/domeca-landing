import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const pricing = await prisma.pricing.findFirst();
    if (pricing) {
      return NextResponse.json(pricing, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No pricing data found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { message: "Error fetching prices", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      baseFarePerKm,
      oneTimeStartingFee,
      hourPrice,
      waitingHourPrice,
      discount,
      discountStartKm,
      premiumHourPrice,
    } = body;

    const pricing = await prisma.pricing.upsert({
      where: { id: 1 }, // Assuming a single pricing record
      update: {
        baseFarePerKm,
        oneTimeStartingFee,
        hourPrice,
        waitingHourPrice,
        discount,
        discountStartKm,
        premiumHourPrice,
      },
      create: {
        baseFarePerKm,
        oneTimeStartingFee,
        hourPrice,
        waitingHourPrice,
        discount,
        discountStartKm,
        premiumHourPrice,
      },
    });

    return NextResponse.json(
      { message: "Prices saved successfully", pricing },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving prices:", error);
    return NextResponse.json(
      { message: "Error saving prices", error },
      { status: 500 }
    );
  }
}
