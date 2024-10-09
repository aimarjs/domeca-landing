"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import LocationAutocomplete from "../components/LocationAutocomplete";
import { getRouteData } from "../pages/api/mapbox";

interface FormData {
  tripDate: string;
}

interface Location {
  name: string;
  latitude: number | null;
  longitude: number | null;
}

interface Step {
  mode: string;
  maneuver: {
    type: string;
  };
}

interface Leg {
  steps: Step[];
}

interface RouteData {
  distanceInKm: number;
  durationInMinutes: number;
  legs: Leg[];
}

const formatTravelTime = (totalMinutes: number) => {
  const totalHours = Math.ceil(totalMinutes / 60); // Round up to the next full hour

  // Return formatted string (rounding up, so no need for minutes)
  return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`;
};

const Home = () => {
  const [locations, setLocations] = useState<Location[]>([
    { name: "", latitude: 0, longitude: 0 },
  ]);
  const [realDistance, setRealDistance] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);
  const [containsFerry, setContainsFerry] = useState<boolean>(false);

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

  const handleLocationChange = (
    place: string,
    latitude: number,
    longitude: number,
    index: number
  ) => {
    // Create a new copy of the locations array
    const updatedLocations = [...locations];

    // Update the specific location with name, latitude, and longitude
    updatedLocations[index] = {
      name: place,
      latitude: latitude,
      longitude: longitude,
    };

    console.log(
      "Updated Locations State after location change:",
      updatedLocations
    );

    // Update the state with the new locations array (fetchTripData will be called automatically after state update)
    setLocations(updatedLocations);
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
    const newLocations = [
      ...locations,
      { name: "", latitude: null, longitude: null },
    ];
    console.log("New Location Added", newLocations); // Debugging: Ensure location is added correctly
    setLocations(newLocations);
  };

  const removeLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1); // Remove the location at the given index
    setLocations(newLocations);

    if (newLocations.length > 1) {
      calculateEstimatedCost(passengers); // Recalculate the cost after removing a location
    }
  };

  const fetchTripData = async () => {
    const validLocationCoords = locations
      .filter(
        (location) => location.latitude !== null && location.longitude !== null
      )
      .map((location) => `${location.longitude},${location.latitude}`);

    if (validLocationCoords.length < 2) {
      console.error(
        "At least two locations are required to calculate the route."
      );
      return;
    }

    try {
      const routeData: RouteData = await getRouteData(validLocationCoords);

      if (routeData) {
        setRealDistance(routeData.distanceInKm);
        setTravelTime(routeData.durationInMinutes);

        // Log the full route data to see how the ferry trip is represented
        console.log("Full Route Data:", routeData);

        // Check if any steps in the route involve a ferry
        const containsFerry = routeData.legs.some((leg: Leg) =>
          leg.steps.some(
            (step: Step) =>
              step.maneuver.type === "ferry" || step.mode === "ferry"
          )
        );

        // Log or update the state to inform the user that a ferry is involved
        if (containsFerry) {
          console.log("This trip contains a ferry route.");
          setContainsFerry(true);
        } else {
          console.log("No ferry route in this trip.");
        }
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  useEffect(() => {
    if (locations.length > 1) {
      const allLocationsHaveCoordinates = locations.every(
        (location) => location.latitude !== null && location.longitude !== null
      );

      // Only fetch trip data if all locations have valid coordinates
      if (allLocationsHaveCoordinates) {
        fetchTripData();
      }
    }
  }, [locations]);

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
              onPlaceSelected={(
                place: string,
                latitude: number,
                longitude: number
              ) => handleLocationChange(place, latitude, longitude, index)}
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

        {realDistance > 0 && travelTime > 0 && (
          <div className="mt-4">
            <p className="text-xl font-semibold text-gray-800">
              Estimated Distance: {realDistance.toFixed(2)} km
            </p>
            <p className="text-xl font-semibold text-gray-800">
              Estimated Travel Time: {formatTravelTime(travelTime)}
            </p>
          </div>
        )}

        {containsFerry && (
          <p className="text-red-500 text-lg">
            This trip involves a ferry crossing. Additional cost may apply
          </p>
        )}

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
