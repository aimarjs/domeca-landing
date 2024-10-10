"use client";

import TripBookingForm from "../components/TripBookForm";

const Home = () => {
  const TAX_RATE = 0.22;

  const [hqLatitude, hqLongitude] = (
    process.env.NEXT_PUBLIC_HQ_COORDS || "59.43696,24.75353"
  )
    .split(",")
    .map(Number);
  const HQ_COORDS = { latitude: hqLatitude, longitude: hqLongitude };

  return (
    <div className="container mx-auto p-4 mb-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100 pt-8">
        Plan Your Bus Trip
      </h1>
      <TripBookingForm hqCoords={HQ_COORDS} TAX_RATE={TAX_RATE} />
    </div>
  );
};

export default Home;
