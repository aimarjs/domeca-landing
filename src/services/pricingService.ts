import { Pricing } from "../types/interfaces";

export const fetchPricingData = async (): Promise<Pricing> => {
  const response = await fetch("/api/getPrices");
  if (!response.ok) {
    throw new Error("Failed to fetch pricing data");
  }
  return response.json();
};

export const calculateEstimatedCost = (
  pricing: Pricing,
  distance: number,
  passengers: number,
  travelTime: number,
  waitingTime: number,
  TAX_RATE: number
): number => {
  const {
    baseFarePerKm,
    oneTimeStartingFee,
    hourPrice,
    waitingHourPrice,
    discount,
    discountStartKm,
  } = pricing;

  // Base cost for the total distance traveled
  let distanceCost = distance * baseFarePerKm * passengers;

  // Apply discount if the distance exceeds discountStartKm
  if (distance > discountStartKm) {
    distanceCost = distanceCost * (1 - discount / 100);
  }

  const timeInHours = travelTime / 60;
  const timeCost = timeInHours * hourPrice;

  const waitingTimeInHours = waitingTime / 60;
  const waitingCost = waitingTimeInHours * waitingHourPrice;

  // Total cost with one-time starting fee, travel time, and waiting time
  const totalCostBeforeTax =
    distanceCost + timeCost + waitingCost + oneTimeStartingFee;

  // Apply tax
  return totalCostBeforeTax * (1 + TAX_RATE);
};
