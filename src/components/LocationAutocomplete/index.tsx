"use client";

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
  onPlaceSelected: (place: string, latitude: number, longitude: number) => void; // Pass both place and coordinates
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  onPlaceSelected,
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
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter a location"
      />
      {isLoading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          Loading...
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion: any) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSuggestionClick(suggestion)} // Pass full suggestion object
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
