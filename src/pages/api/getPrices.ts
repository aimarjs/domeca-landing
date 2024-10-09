// pages/api/getPrices.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const prices = await prisma.pricing.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 1, // Get the most recent pricing data
      });

      if (prices.length > 0) {
        res.status(200).json(prices[0]);
      } else {
        res.status(404).json({ message: "No pricing data found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching prices", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
