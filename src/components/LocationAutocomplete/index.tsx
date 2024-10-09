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
  isRemovable?: boolean;
  removeLocation?: () => void;
  addLocation?: () => void;
  index: number;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  onPlaceSelected,
  isRemovable = false,
  removeLocation,
  addLocation,
  index,
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
    const [longitude, latitude] = suggestion.center;

    setQuery(placeName);
    setSuggestions([]); // Clear the suggestion list after selection

    onPlaceSelected(placeName, latitude, longitude);

    (document.activeElement as HTMLElement)?.blur();
  };

  const locationNames = ["first", "second", "third", "fourth", "fifth"];

  return (
    <div className="relative w-full">
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex w-full">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
          value={query}
          onChange={handleInputChange}
          placeholder={`Enter a ${
            locationNames[index] || `${index + 1}th`
          } location`} // Dynamic placeholder
        />
        {isRemovable ? (
          <button
            type="button"
            onClick={removeLocation}
            className="bg-red-600 text-white px-4 py-2 flex items-center justify-center rounded-r-lg dark:bg-red-500"
            style={{ height: "calc(100%)" }}
          >
            <span className="text-xl">−</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={addLocation}
            className="bg-green-600 text-white px-4 py-2 flex items-center justify-center rounded-r-lg dark:bg-green-500"
            style={{ height: "calc(100%)" }}
          >
            <span className="text-xl">+</span>
          </button>
        )}
      </div>
      {isLoading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 dark:text-gray-300">
          Loading...
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="suggestion-list absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion: any) => (
            <li
              key={suggestion.id}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-200"
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
