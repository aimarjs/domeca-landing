import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { startLocation, endLocation, passengers, tripDate } = req.body;

  // Simulate distance calculation and pricing logic
  const distanceKM = 150; // Replace this with actual API distance fetching
  const baseFare = 10; // Base fare in Euros
  const ratePerKM = 0.2; // Price per km in Euros

  // Simple price calculation
  const price = baseFare + distanceKM * ratePerKM * passengers;

  res.status(200).json({ price });
}
