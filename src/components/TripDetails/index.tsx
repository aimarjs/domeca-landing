import React from "react";

interface TripDetailsProps {
  realDistance: number;
  travelTime: number;
  estimatedCost: number;
  containsFerry: boolean;
  formatTravelTime: (totalMinutes: number) => string;
  waitingTime: number; // New prop for waiting time
}

const TripDetails: React.FC<TripDetailsProps> = ({
  realDistance,
  travelTime,
  estimatedCost,
  containsFerry,
  formatTravelTime,
  waitingTime,
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 dark:text-gray-100">
        Trip Details
      </h2>
      <p className="dark:text-gray-200">
        <strong>Distance:</strong> {realDistance.toFixed(2)} km
      </p>
      <p className="dark:text-gray-200">
        <strong>Travel Time:</strong> {formatTravelTime(travelTime)}
      </p>
      {waitingTime > 0 && (
        <p className="dark:text-gray-200">
          <strong>Waiting Time:</strong> {formatTravelTime(waitingTime)}
        </p>
      )}
      <p className="dark:text-gray-200">
        <strong className="text-lg text-emerald-600 dark:text-emerald-400">
          Estimated Cost:
        </strong>{" "}
        €{estimatedCost.toFixed(2)}
      </p>
      {containsFerry && (
        <p className="text-red-500 dark:text-red-400">
          This trip involves a ferry crossing. Additional fees may apply.
        </p>
      )}
    </div>
  );
};

export default TripDetails;
