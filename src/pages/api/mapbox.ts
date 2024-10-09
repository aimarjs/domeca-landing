import axios from "axios";

interface Step {
  mode: string;
  maneuver: {
    type: string;
  };
}

interface Leg {
  steps: Step[];
}

interface RouteData {
  distanceInKm: number;
  durationInMinutes: number;
  legs: Leg[];
}

// Mapbox API access token (replace with your actual token)
const mapboxAccessToken =
  "pk.eyJ1IjoiYWltYXJhYSIsImEiOiJjbDF0ODFtNWwyNzJtM2lxcm5hcjR4YXNiIn0.WWojtyoaOWf06cILR1ES5A";

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

  console.log(url);

  try {
    const response = await axios.get(url);

    if (response.data.routes.length) {
      const route = response.data.routes[0];

      // Distance in kilometers
      const distanceInKm = route.distance / 1000;

      // Duration in minutes
      const durationInMinutes = route.duration / 60;

      // Return the full route including legs
      return {
        distanceInKm,
        durationInMinutes,
        legs: route.legs, // Include the legs of the route
      };
    } else {
      throw new Error("No routes found");
    }
  } catch (error) {
    console.error("Error fetching route data:", error);
    throw error;
  }
};
