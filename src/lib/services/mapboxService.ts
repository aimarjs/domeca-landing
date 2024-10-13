import axios from "axios";

import { RouteData } from "../../types/interfaces";

// Mapbox API access token (replace with your actual token)
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

if (!mapboxAccessToken) {
  throw new Error("Mapbox API token is missing");
}

// Function to fetch coordinates using Mapbox Geocoding API
export const getCoordinates = async (locationName: string) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    locationName
  )}.json?access_token=${mapboxAccessToken}`;

  try {
    const response = await axios.get(url);

    console.log("Geocoding API Response:", response.data); // Log full response for debugging

    if (response.data.features.length) {
      const { center } = response.data.features[0];
      const longitude = center[0];
      const latitude = center[1];

      return { latitude, longitude };
    } else {
      throw new Error("No coordinates found for this location");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return { latitude: null, longitude: null }; // Return null in case of error
  }
};

// Function to fetch route data (distance and duration) from Mapbox Directions API
export const getRouteData = async (locations: string[]): Promise<RouteData> => {
  const coordinates = locations.join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?access_token=${mapboxAccessToken}&geometries=geojson&steps=true`;

  try {
    const response = await axios.get(url);

    if (response.data.routes.length) {
      const route = response.data.routes[0];

      // Distance in kilometers (client + return to HQ)
      const totalDistanceInKm = route.distance / 1000;

      // Client distance excluding the last leg to HQ
      const legs = route.legs;
      const clientDistanceInKm =
        legs
          .slice(0, -1)
          .reduce(
            (acc: number, leg: { distance: number }) => acc + leg.distance,
            0
          ) / 1000;

      const roundedClientDistance = Math.round(clientDistanceInKm * 100) / 100;

      const clientDurationInMinutes =
        legs
          .slice(0, -1)
          .reduce(
            (acc: number, leg: { duration: number }) => acc + leg.duration,
            0
          ) / 60;
      // Duration in minutes
      const durationInMinutes = route.duration / 60;

      // Return the full route including legs
      return {
        clientDistance: roundedClientDistance, // Distance client is riding
        distanceInKm: totalDistanceInKm, // Total distance including return to HQ
        clientDurationInMinutes,
        durationInMinutes,
        legs, // Include the legs of the route
      };
    } else {
      throw new Error("No routes found");
    }
  } catch (error) {
    console.error("Error fetching route data:", error);
    throw error;
  }
};
