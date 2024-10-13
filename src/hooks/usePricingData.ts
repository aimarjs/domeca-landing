import { useState, useEffect } from "react";
import { Pricing } from "../types/interfaces";

export const usePricingData = (
  realDistance: number,
  passengers: number,
  travelTime: number,
  waitingTime: number,
  TAX_RATE: number
) => {
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricingData = async (): Promise<void> => {
      try {
        const response = await fetch("/api/prices");
        if (!response.ok) throw new Error("Failed to fetch pricing data");
        const data = await response.json();
        setPricing(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          console.error("Error fetching pricing data:", error);
        } else {
          setError("An unknown error occurred");
          console.error("Error fetching pricing data:", error);
        }
      }
    };
    fetchPricingData();
  }, []);

  useEffect(() => {
    if (pricing && realDistance > 0 && passengers > 0) {
      const cost = calculateEstimatedCost(
        pricing,
        realDistance,
        passengers,
        travelTime,
        waitingTime,
        TAX_RATE
      );
      setEstimatedCost(cost);
    }
  }, [pricing, realDistance, passengers, travelTime, waitingTime, TAX_RATE]);

  const calculateEstimatedCost = (
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

    let distanceCost = distance * baseFarePerKm * passengers;

    if (distance > discountStartKm) {
      distanceCost = distanceCost * (1 - discount / 100);
    }

    const timeInHours = travelTime / 60;
    const timeCost = timeInHours * hourPrice;

    const waitingTimeInHours = waitingTime / 60;
    const waitingCost = waitingTimeInHours * waitingHourPrice;

    const totalCostBeforeTax =
      distanceCost + timeCost + waitingCost + oneTimeStartingFee;

    return totalCostBeforeTax * (1 + TAX_RATE);
  };

  return { pricing, estimatedCost, error };
};
