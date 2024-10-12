import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ActionButton from "./ActionButton";
import LoadingIndicator from "./LoadingIndicator";
import SuggestionList from "./SuggestionList";
import { fetchSuggestions } from "../../utils/geocodingClient";

interface LocationAutocompleteProps {
  label: string;
  onPlaceSelected: (place: string, latitude: number, longitude: number) => void;
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
  const { t } = useTranslation(); // Import translation hook
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value, setSuggestions, setIsLoading);
  };

  const handleSuggestionClick = (suggestion: any) => {
    const placeName = suggestion.place_name;
    const [longitude, latitude] = suggestion.center;

    setQuery(placeName);
    setSuggestions([]); // Clear suggestions
    onPlaceSelected(placeName, latitude, longitude);
    (document.activeElement as HTMLElement)?.blur();
  };

  const getPlaceholder = () => {
    if (index === 0) {
      return t("bookingPage.startingAddress");
    } else {
      return t("bookingPage.waypoint", { index });
    }
  };

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
          placeholder={getPlaceholder()} // Use the dynamic placeholder
        />
        {isRemovable && (
          <ActionButton
            onClick={removeLocation}
            label="−"
            color="bg-red-600 dark:bg-red-500"
          />
        )}
      </div>
      {isLoading && <LoadingIndicator />}
      {suggestions.length > 0 && (
        <SuggestionList
          suggestions={suggestions}
          onClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default LocationAutocomplete;
