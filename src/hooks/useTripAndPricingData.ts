import { useState, useEffect } from "react";
import { fetchTripData } from "../services/locationService";
import { Pricing } from "../types/interfaces";
import { Location } from "../types/interfaces";

// Custom hook to handle trip data and pricing estimation
export const useTripAndPricingData = (
  locations: Location[],
  HQ_COORDS: { latitude: number; longitude: number },
  TAX_RATE: number,
  passengers: number,
  isPremium: boolean
) => {
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [realDistance, setRealDistance] = useState<number>(0);
  const [clientDistance, setClientDistance] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);
  const [clientTravelTime, setClientTravelTime] = useState<number>(0);
  const [containsFerry, setContainsFerry] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch pricing data
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

  // Calculate estimated cost
  const calculateEstimatedCost = (
    pricing: Pricing,
    distance: number,
    passengers: number,
    travelTime: number,
    waitingTime: number
  ): number => {
    const {
      baseFarePerKm,
      oneTimeStartingFee,
      hourPrice,
      waitingHourPrice,
      discount,
      discountStartKm,
      taxRate,
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

    return totalCostBeforeTax * (1 + taxRate);
  };

  // Fetch trip data and calculate pricing based on distance
  useEffect(() => {
    if (
      locations.length > 1 &&
      locations.every((loc) => loc.latitude !== null && loc.longitude !== null)
    ) {
      const handleTripDataFetch = async () => {
        try {
          setLoading(true);
          const routeData = await fetchTripData(locations, HQ_COORDS);
          setRealDistance(routeData.distanceInKm);
          setTravelTime(routeData.durationInMinutes);
          setClientDistance(routeData.clientDistance);
          setClientTravelTime(routeData.clientDurationInMinutes);
          setTaxRate(routeData.taxRate);
          const hasFerry = routeData.legs.some((leg) =>
            leg.steps.some(
              (step) => step.maneuver.type === "ferry" || step.mode === "ferry"
            )
          );
          setContainsFerry(hasFerry);

          // Once trip data is fetched, fetch pricing and calculate the estimated cost
          if (pricing && realDistance > 0 && passengers > 0) {
            const waitingTime =
              routeData.clientDurationInMinutes - routeData.durationInMinutes;
            const cost = calculateEstimatedCost(
              pricing,
              realDistance,
              passengers,
              travelTime,
              waitingTime
            );
            setEstimatedCost(cost);
          }
        } catch (error) {
          console.error("Error fetching route data:", error);
        } finally {
          setLoading(false);
        }
      };
      handleTripDataFetch();
    }
  }, [locations, pricing, realDistance, passengers, travelTime]);

  useEffect(() => {
    fetchPricingData(); // Fetch pricing data when the hook is mounted
  }, []);

  console.log(pricing);

  return {
    pricing,
    realDistance,
    clientDistance,
    travelTime,
    clientTravelTime,
    containsFerry,
    loading,
    estimatedCost,
    error,
  };
};
