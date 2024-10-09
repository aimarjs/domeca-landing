import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

if (!mapboxToken) {
  throw new Error("Mapbox API token is missing");
}

const geocodingClient = mbxGeocoding({ accessToken: mapboxToken });

export const fetchSuggestions = async (
  query: string,
  setSuggestions: React.Dispatch<React.SetStateAction<any[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (query.length <= 2) return setSuggestions([]);

  setIsLoading(true);

  try {
    const response = await geocodingClient
      .forwardGeocode({
        query,
        limit: 5,
        bbox: [-31.3, 34.5, 40.2, 71.2], // Bounding box for Europe
      })
      .send();
    setSuggestions(response.body.features);
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
  } finally {
    setIsLoading(false);
  }
};
