import { useState, useEffect } from "react";
import { fetchTripData } from "../services/locationService";
import { Location } from "../types/interfaces";

export const useTripData = (
  locations: Location[],
  HQ_COORDS: { latitude: number; longitude: number }
) => {
  const [realDistance, setRealDistance] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);
  const [containsFerry, setContainsFerry] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
          const hasFerry = routeData.legs.some((leg) =>
            leg.steps.some(
              (step) => step.maneuver.type === "ferry" || step.mode === "ferry"
            )
          );
          setContainsFerry(hasFerry);
        } catch (error) {
          console.error("Error fetching route data:", error);
        } finally {
          setLoading(false);
        }
      };
      handleTripDataFetch();
    }
  }, [locations]);

  return { realDistance, travelTime, containsFerry, loading };
};
