"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import LocationAutocomplete from "../components/LocationAutocomplete";
import TripDetails from "../components/TripDetails";
import PassengersInput from "../components/PassengersInput";
import { getRouteData } from "../pages/api/mapbox";

import { Location } from "../types/interfaces";

interface FormData {
  tripDate: string;
}

const Home = () => {
  const [locations, setLocations] = useState<Location[]>([
    { name: "", latitude: null, longitude: null },
  ]);
  const [realDistance, setRealDistance] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);
  const [containsFerry, setContainsFerry] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const calculateEstimatedCost = (distance: number, passengers: number) => {
    const baseFarePerKm = 0.5; // Example rate: €0.5 per km
    const cost = distance * baseFarePerKm * passengers;
    setEstimatedCost(cost);
  };

  useEffect(() => {
    if (realDistance > 0 && passengers > 0) {
      calculateEstimatedCost(realDistance, passengers);
    }
  }, [realDistance, passengers]);

  // Helper function to format travel time
  const formatTravelTime = (totalMinutes: number) => {
    const totalHours = Math.ceil(totalMinutes / 60);
    return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`;
  };

  const addLocation = () =>
    setLocations([...locations, { name: "", latitude: null, longitude: null }]);

  const removeLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const fetchTripData = async () => {
    const validLocationCoords = locations
      .filter((loc) => loc.latitude !== null && loc.longitude !== null)
      .map((loc) => `${loc.longitude},${loc.latitude}`);

    if (validLocationCoords.length < 2) {
      console.error(
        "At least two locations are required to calculate the route."
      );
      return;
    }

    try {
      setLoading(true);
      const routeData = await getRouteData(validLocationCoords);
      setRealDistance(routeData.distanceInKm);
      setTravelTime(routeData.durationInMinutes);
      const hasFerry = routeData.legs.some((leg) =>
        leg.steps.some(
          (step) => step.maneuver.type === "ferry" || step.mode === "ferry"
        )
      );
      setContainsFerry(hasFerry);
    } catch (error) {
      console.error("Error fetching route data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      locations.length > 1 &&
      locations.every((loc) => loc.latitude !== null && loc.longitude !== null)
    ) {
      fetchTripData();
    }
  }, [locations]);

  const onSubmit = (data: FormData) =>
    alert(
      `Trip booked with ${locations.length} locations for ${data.tripDate}`
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-4">
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
                setLocations((locations) => {
                  const newLocations = [...locations];
                  newLocations[index] = { name: place, latitude, longitude };
                  return newLocations;
                })
              }
            />
            {index > 0 && (
              <button
                type="button"
                className="absolute right-0 top-0 text-red-500"
                onClick={() => removeLocation(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
          onClick={addLocation}
        >
          Add Location
        </button>

        <div className="relative w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Trip Date
          </label>
          <Controller
            name="tripDate"
            control={control}
            defaultValue=""
            rules={{ required: "Trip date is required" }}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
          />
          {errors.tripDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tripDate.message}
            </p>
          )}
        </div>

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
