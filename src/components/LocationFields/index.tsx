import React from "react";
import { useTranslation } from "react-i18next";
import LocationAutocomplete from "../LocationAutocomplete";
import { Location } from "../../types/interfaces";

interface LocationFieldsProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
}

const LocationFields: React.FC<LocationFieldsProps> = ({
  locations,
  setLocations,
}) => {
  const { t } = useTranslation();

  const removeLocation = (index: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const lastIndex = locations.length - 1;

  return (
    <div>
      {locations.map((loc, index) => (
        <div
          key={index}
          className={`relative w-full ${index !== lastIndex ? "pb-4" : ""}`}
        >
          <LocationAutocomplete
            label={
              index === 0
                ? t("bookingPage.startLocation")
                : `${t("bookingPage.startLocation")} ${index + 1}`
            }
            onPlaceSelected={(place, latitude, longitude) =>
              setLocations((prevLocations) => {
                const newLocations = [...prevLocations];
                newLocations[index] = { name: place, latitude, longitude };
                return newLocations;
              })
            }
            isRemovable={index > 0}
            removeLocation={() => removeLocation(index)}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

export default LocationFields;
