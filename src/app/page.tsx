"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import LocationAutocomplete from "../components/LocationAutocomplete";
import TripDetails from "../components/TripDetails";
import PassengersInput from "../components/PassengersInput";
import DateTimeInput from "../components/DateTimeInput";
import { usePricing } from "../hooks/usePricing";
import { useTripData } from "../hooks/useTripData";
import { formatTravelTime } from "../utils/timeUtils";
import { Location } from "../types/interfaces";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface FormData {
  startDateTime: string;
  endDateTime: string;
}

const Home = () => {
  const [locations, setLocations] = useState<Location[]>([
    { name: "", latitude: null, longitude: null },
  ]);
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);

  const TAX_RATE = 0.22;

  const [hqLatitude, hqLongitude] = (
    process.env.NEXT_PUBLIC_HQ_COORDS || "59.43696,24.75353"
  )
    .split(",")
    .map(Number);
  const HQ_COORDS = { latitude: hqLatitude, longitude: hqLongitude };

  const { realDistance, travelTime, containsFerry, loading } = useTripData(
    locations,
    HQ_COORDS
  );
  const { estimatedCost } = usePricing(
    realDistance,
    passengers,
    travelTime,
    waitingTime,
    TAX_RATE
  );

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

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

  const addLocation = () => {
    setLocations([...locations, { name: "", latitude: null, longitude: null }]);
  };

  const onSubmit = (data: FormData) => {
    handleEndDateTimeChange(data.endDateTime);
    alert(
      `Trip booked starting at ${data.startDateTime} and ending at ${data.endDateTime}`
    );
  };

  return (
    <div className="container mx-auto p-4 mb-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100 pt-8">
        Plan Your Bus Trip
      </h1>
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
              isRemovable={index > 0} // Only the second or later locations are removable
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

        <PassengersInput
          passengers={passengers}
          handlePassengersChange={(e) =>
            setPassengers(parseInt(e.target.value, 10))
          }
        />

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
    </div>
  );
};

export default Home;
