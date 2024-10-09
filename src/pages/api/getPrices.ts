// pages/api/getPrices.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const pricing = await prisma.pricing.findFirst();
      if (pricing) {
        res.status(200).json(pricing);
      } else {
        res.status(404).json({ message: "No pricing data found" });
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
      res.status(500).json({ message: "Error fetching prices", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
