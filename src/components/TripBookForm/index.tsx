"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import LocationAutocomplete from "../LocationAutocomplete";
import TripDetails from "../TripDetails";
import PassengersInput from "../PassengersInput";
import DateTimeInput from "../DateTimeInput";
import { usePricing } from "../../hooks/usePricing";
import { useTripData } from "../../hooks/useTripData";
import { formatTravelTime } from "../../utils/timeUtils";
import { Location } from "../../types/interfaces";

interface FormData {
  startDateTime: string;
  endDateTime: string;
  isPremium: boolean;
}

interface TripBookingFormProps {
  hqCoords: { latitude: number; longitude: number };
  TAX_RATE: number;
}

const TripBookingForm: React.FC<TripBookingFormProps> = ({
  hqCoords,
  TAX_RATE,
}) => {
  const [locations, setLocations] = useState<Location[]>([
    { name: "", latitude: null, longitude: null },
  ]);
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const isPremium = watch("isPremium", false);

  const { realDistance, travelTime, containsFerry, loading } = useTripData(
    locations,
    hqCoords
  );

  const { estimatedCost } = usePricing(
    realDistance,
    passengers,
    travelTime,
    waitingTime,
    TAX_RATE,
    isPremium
  );

  const handleEndDateTimeChange = (endDateTime: string) => {
    const startDateTime = getValues("startDateTime");
    if (startDateTime && travelTime > 0) {
      const start = new Date(startDateTime).getTime();
      const end = new Date(endDateTime).getTime();
      const customerDefinedTimeInMinutes = (end - start) / (1000 * 60);
      const waitingMinutes = customerDefinedTimeInMinutes - travelTime;
      setWaitingTime(waitingMinutes > 0 ? waitingMinutes : 0);
    }
  };

  const removeLocation = (index: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: FormData) => {
    handleEndDateTimeChange(data.endDateTime);
    alert(
      `Trip booked starting at ${data.startDateTime} and ending at ${data.endDateTime}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6"
    >
      {locations.map((loc, index) => (
        <div key={index} className="relative w-full">
          <LocationAutocomplete
            label={index === 0 ? "Start Location" : `Location ${index + 1}`}
            onPlaceSelected={(place, latitude, longitude) =>
              setLocations((prevLocations) => {
                const newLocations = [...prevLocations];
                newLocations[index] = { name: place, latitude, longitude };
                return newLocations;
              })
            }
            isRemovable={index > 0}
            addLocation={() =>
              setLocations((prevLocations) => [
                ...prevLocations,
                { name: "", latitude: null, longitude: null },
              ])
            }
            removeLocation={() => removeLocation(index)}
            index={index}
          />
        </div>
      ))}

      {/* Start Date and Time */}
      <div className="flex space-x-4">
        <DateTimeInput
          name="startDateTime"
          label="Start Date and Time"
          control={control}
          errors={errors}
        />

        {/* End Date and Time */}
        <DateTimeInput
          name="endDateTime"
          label="End Date and Time"
          control={control}
          errors={errors}
          onBlur={() => handleEndDateTimeChange(getValues("endDateTime"))}
        />
      </div>

      <PassengersInput
        passengers={passengers}
        handlePassengersChange={(e) =>
          setPassengers(parseInt(e.target.value, 10))
        }
      />

      <div className="flex items-center">
        <Controller
          name="isPremium"
          control={control}
          render={({ field: { value, ...restField } }) => (
            <input
              type="checkbox"
              {...restField}
              className="mr-2"
              checked={value}
            />
          )}
        />
        <label className="text-gray-700 dark:text-gray-300">Premium Bus</label>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mr-4">Loading...</p>
        </div>
      ) : (
        <TripDetails
          realDistance={realDistance}
          travelTime={travelTime}
          waitingTime={waitingTime}
          estimatedCost={estimatedCost}
          containsFerry={containsFerry}
          formatTravelTime={formatTravelTime}
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default TripBookingForm;
