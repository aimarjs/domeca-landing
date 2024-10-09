import { useState } from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

// Replace this with your Mapbox access token
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

if (!mapboxToken) {
  throw new Error("Mapbox API token is missing");
}

// Create an instance of the Mapbox geocoding client
const geocodingClient = mbxGeocoding({ accessToken: mapboxToken });

interface LocationAutocompleteProps {
  label: string;
  isRemovable?: boolean;
  onPlaceSelected: (place: string, latitude: number, longitude: number) => void; // Pass both place and coordinates
  addLocation?: () => void;
  removeLocation?: () => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  isRemovable = false, // Determine whether to show the remove button
  onPlaceSelected,
  addLocation, // Function to add a new location
  removeLocation, // Function to remove a location
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch location suggestions from Mapbox API
  const fetchSuggestions = async (query: string) => {
    if (query.length > 2) {
      setIsLoading(true);
      try {
        const response = await geocodingClient
          .forwardGeocode({
            query: query,
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
    } else {
      setSuggestions([]);
    }
  };

  // Handle input changes and trigger suggestion fetching
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  // Handle suggestion click and pass place name and coordinates to parent component
  const handleSuggestionClick = (suggestion: any) => {
    const placeName = suggestion.place_name;
    const [longitude, latitude] = suggestion.center; // Coordinates from Mapbox

    // Update the input field with the selected place name
    setQuery(placeName);
    setSuggestions([]);

    // Pass the place name and coordinates back to the parent component
    onPlaceSelected(placeName, latitude, longitude);
  };

  return (
    <div className="relative w-full">
      {/* Label on top of both input and button */}
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>

      {/* Input and Button together */}
      <div className="flex w-full">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-inset focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter a location"
        />
        {/* Show Add or Remove Button */}
        {isRemovable ? (
          <button
            type="button"
            onClick={removeLocation}
            className="bg-red-500 text-white px-4 py-2 flex items-center justify-center rounded-r-lg hover:bg-red-600"
            style={{ height: "calc(100%)" }}
          >
            <span className="text-xl">−</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={addLocation}
            className="bg-teal-500 text-white px-4 py-2 flex items-center justify-center rounded-r-lg hover:bg-teal-600"
            style={{ height: "calc(100%)" }}
          >
            <span className="text-xl">+</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationAutocomplete;
