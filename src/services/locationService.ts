// src/services/locationService.ts

import { getRouteData } from "../pages/api/mapbox";
import { Location } from "../types/interfaces";

export const fetchTripData = async (
  locations: Location[],
  HQ_COORDS: { latitude: number; longitude: number }
) => {
  const validLocationCoords = [
    `${HQ_COORDS.longitude},${HQ_COORDS.latitude}`, // Start from HQ (Tallinn)
    ...locations
      .filter((loc) => loc.latitude !== null && loc.longitude !== null)
      .map((loc) => `${loc.longitude},${loc.latitude}`),
    `${HQ_COORDS.longitude},${HQ_COORDS.latitude}`, // End in HQ (Tallinn)
  ];

  if (validLocationCoords.length < 3) {
    throw new Error(
      "At least one customer location is required to calculate the route."
    );
  }

  return await getRouteData(validLocationCoords);
};
