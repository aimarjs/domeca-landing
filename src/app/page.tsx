"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import LocationAutocomplete from "../components/LocationAutocomplete";

interface FormData {
  tripDate: string;
}

const Home = () => {
  const [locations, setLocations] = useState<string[]>([""]); // Multiple locations (no separate start/end)
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1); // Passengers in state

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Calculate the estimated cost based on passengers and fixed distance for demo purposes
  const calculateEstimatedCost = (passengers: number) => {
    const baseFarePerKm = 0.5; // Example rate: €0.5 per km
    const distancePerLeg = 100; // Simulated distance per leg of the trip

    // Only calculate if there are at least two locations
    if (locations.length > 1) {
      const numberOfLegs = locations.length - 1; // Each pair of locations is a leg
      const totalDistance = numberOfLegs * distancePerLeg;
      const cost = totalDistance * baseFarePerKm * passengers;
      setEstimatedCost(cost);
    }
  };

  const handleLocationChange = (place: string, index: number) => {
    const newLocations = [...locations];
    newLocations[index] = place;
    setLocations(newLocations);

    if (locations.length > 1) {
      calculateEstimatedCost(passengers); // Calculate cost after adding or changing location
    }
  };

  const handlePassengersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value) || value < 0) {
      setPassengers(0); // Default to 0 if the value is invalid
      calculateEstimatedCost(0); // Recalculate the cost with 0 passengers
    } else {
      setPassengers(value); // Set valid number of passengers
      calculateEstimatedCost(value); // Recalculate the cost with valid number of passengers
    }
  };

  const addLocation = () => {
    setLocations([...locations, ""]); // Add a new empty location field
  };

  const removeLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1); // Remove the location at the given index
    setLocations(newLocations);

    if (newLocations.length > 1) {
      calculateEstimatedCost(passengers); // Recalculate the cost after removing a location
    }
  };

  const onSubmit = (data: FormData) => {
    alert(
      `Trip booked for ${locations.length} locations, Date: ${data.tripDate}, Passengers: ${passengers}`
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Plan Your Bus Trip
        </h1>
        <p className="text-xl text-gray-600">
          Enter your trip details to get started
        </p>
      </div>

      {/* Trip Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto space-y-6"
      >
        {/* Dynamic Locations */}
        {locations.map((location, index) => (
          <div key={index} className="relative w-full">
            <LocationAutocomplete
              label={index === 0 ? "Start Location" : `Location ${index + 1}`}
              onPlaceSelected={(place: string) =>
                handleLocationChange(place, index)
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

        {/* Trip Date Field */}
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

        {/* Passengers Field */}
        <div className="relative w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Passengers
          </label>
          <input
            type="number"
            value={passengers}
            onChange={handlePassengersChange} // Handle passenger change
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            min={0} // Allow 0 passengers
          />
        </div>

        {/* Show Estimated Cost */}
        {estimatedCost !== null && (
          <div className="mt-4">
            <p className="text-xl font-semibold text-gray-800">
              Estimated Cost: €{estimatedCost.toFixed(2)}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={locations.length < 2} // Disable if not enough locations
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default Home;
