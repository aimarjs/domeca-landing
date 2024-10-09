import axios from "axios";

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
export const getRouteData = async (locations: string[]) => {
  console.log("Locations being sent to Mapbox:", locations);

  // Join all valid coordinates with a semicolon to form the correct API URL format
  const coordinates = locations.join(";");

  // Log the final coordinates being sent to the Mapbox API
  console.log("Coordinates being sent to Mapbox:", coordinates);

  // Mapbox Directions API URL
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?access_token=${mapboxAccessToken}&geometries=geojson`;

  console.log("Mapbox API URL:", url); // Log the URL for debugging

  try {
    const response = await axios.get(url);

    if (response.data.routes.length) {
      const route = response.data.routes[0];

      // Distance in kilometers
      const distanceInKm = route.distance / 1000;

      // Duration in minutes
      const durationInMinutes = route.duration / 60;

      return { distanceInKm, durationInMinutes };
    } else {
      throw new Error("No routes found");
    }
  } catch (error) {
    console.error("Error fetching route data:", error);
    throw error;
  }
};
