import React from "react";
import { useTranslation } from "react-i18next";
import { formatTravelTime } from "../../utils/timeUtils";

interface TripDetailsProps {
  clientDistance: number;
  clientTravelTime: number;
  estimatedCost: number;
  containsFerry: boolean;
  waitingTime: number;
}

const TripDetails = ({
  clientDistance,
  clientTravelTime,
  estimatedCost,
  containsFerry,
  waitingTime,
}: TripDetailsProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 dark:text-gray-100">
        {t("bookingPage.tripDetails.title")}
      </h2>
      <p className="dark:text-gray-200">
        <strong>
          {t("bookingPage.tripDetails.distance", {
            value: clientDistance.toFixed(2),
          })}
        </strong>
      </p>
      {clientTravelTime > 0 && (
        <p className="dark:text-gray-200">
          <strong>
            {t("bookingPage.tripDetails.travelTime")}
            {formatTravelTime(clientTravelTime, t)}
          </strong>
        </p>
      )}
      {waitingTime > 0 && (
        <p className="dark:text-gray-200">
          <strong>
            {t("bookingPage.tripDetails.waitingTime")}
            {formatTravelTime(waitingTime, t)}
          </strong>
        </p>
      )}
      <p className="dark:text-gray-200">
        <strong className="text-lg text-emerald-600 dark:text-emerald-400">
          {t("bookingPage.tripDetails.estimatedCost", {
            value: estimatedCost.toFixed(2),
          })}
        </strong>
      </p>
      {containsFerry && (
        <p className="text-red-500 dark:text-red-400">
          {t("bookingPage.tripDetails.ferryNotice")}
        </p>
      )}
    </div>
  );
};

export default TripDetails;
