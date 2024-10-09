import React from "react";

interface TripDetailsProps {
  realDistance: number;
  travelTime: number;
  estimatedCost: number;
  containsFerry: boolean;
  formatTravelTime: (totalMinutes: number) => string;
}

const TripDetails: React.FC<TripDetailsProps> = ({
  realDistance,
  travelTime,
  estimatedCost,
  containsFerry,
  formatTravelTime,
}) => {
  return (
    <div>
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
      {estimatedCost !== null && (
        <div className="mt-4">
          <p className="text-xl font-semibold text-gray-800">
            Estimated Cost: €{estimatedCost.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
