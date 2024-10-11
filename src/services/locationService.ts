import { getRouteData } from "../lib/services/mapboxService";
import { Location } from "../types/interfaces";

export const fetchTripData = async (
  locations: Location[],
  HQ_COORDS: { latitude: number; longitude: number }
) => {
  const validLocationCoords = [
    `${HQ_COORDS.longitude},${HQ_COORDS.latitude}`,
    ...locations
      .filter((loc) => loc.latitude !== null && loc.longitude !== null)
      .map((loc) => `${loc.longitude},${loc.latitude}`),
    `${HQ_COORDS.longitude},${HQ_COORDS.latitude}`,
  ];

  if (validLocationCoords.length < 3) {
    throw new Error(
      "At least one customer location is required to calculate the route."
    );
  }

  return await getRouteData(validLocationCoords);
};
