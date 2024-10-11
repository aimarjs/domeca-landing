import { useState, useEffect } from "react";
import {
  fetchPricingData,
  calculateEstimatedCost,
} from "../services/pricingService";

export const usePricing = (
  realDistance: number,
  passengers: number,
  travelTime: number,
  waitingTime: number,
  TAX_RATE: number,
  isPremium: boolean
) => {
  const [pricing, setPricing] = useState({
    baseFarePerKm: 0.5,
    oneTimeStartingFee: 0,
    hourPrice: 0,
    premiumHourPrice: 0,
    waitingHourPrice: 0,
    discount: 0,
    discountStartKm: 0,
  });
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const data = await fetchPricingData();
        setPricing(data);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };
    loadPricing();
  }, []);

  useEffect(() => {
    if (realDistance > 0 && passengers > 0) {
      const hourRate = isPremium ? pricing.premiumHourPrice : pricing.hourPrice;
      const cost = calculateEstimatedCost(
        { ...pricing, hourPrice: hourRate },
        realDistance,
        passengers,
        travelTime,
        waitingTime,
        TAX_RATE
      );
      setEstimatedCost(cost);
    }
  }, [realDistance, passengers, travelTime, waitingTime, pricing, isPremium]);

  return { pricing, estimatedCost };
};
