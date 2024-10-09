// pages/api/savePrices.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { baseFarePerKm, additionalCosts } = req.body;

    try {
      await prisma.pricing.create({
        data: {
          baseFarePerKm,
          additionalCosts,
        },
      });
      res.status(200).json({ message: "Prices saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error saving prices", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
