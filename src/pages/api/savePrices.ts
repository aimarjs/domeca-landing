import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      baseFarePerKm,
      oneTimeStartingFee, // Updated field name
      hourPrice,
      waitingHourPrice,
      discount, // New field for discount
      discountStartKm, // New field for discount start kilometers
    } = req.body;

    try {
      const pricing = await prisma.pricing.upsert({
        where: { id: 1 }, // Assuming a single pricing record
        update: {
          baseFarePerKm,
          oneTimeStartingFee,
          hourPrice,
          waitingHourPrice,
          discount,
          discountStartKm,
        },
        create: {
          baseFarePerKm,
          oneTimeStartingFee,
          hourPrice,
          waitingHourPrice,
          discount,
          discountStartKm,
        },
      });

      res.status(200).json({ message: "Prices saved successfully", pricing });
    } catch (error) {
      console.error("Error saving prices:", error);
      res.status(500).json({ message: "Error saving prices", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
