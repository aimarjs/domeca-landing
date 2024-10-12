"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MapPinIcon } from "@heroicons/react/24/solid";
import TripDetails from "../TripDetails";
import PassengersInput from "../PassengersInput";
import DateTimeInput from "../DateTimeInput";
import { usePricing } from "../../hooks/usePricing";
import { useTripData } from "../../hooks/useTripData";
import { formatTravelTime } from "../../utils/timeUtils";
import { Location } from "../../types/interfaces";
import LocationFields from "../LocationFields";

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
  const { t } = useTranslation();

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

  const addLocation = () => {
    setLocations((prevLocations) => [
      ...prevLocations,
      { name: "", latitude: null, longitude: null },
    ]);
  };

  const onSubmit = (data: FormData) => {
    handleEndDateTimeChange(data.endDateTime);
    alert(
      t("tripBookedAlert", {
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6"
    >
      <LocationFields locations={locations} setLocations={setLocations} />
      <div
        className="w-full border-dashed border-2 border-gray-400 rounded-lg text-center p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={addLocation}
      >
        {/* Illustration of a bus and bus stop */}
        <div className="flex justify-center mb-2">
          <MapPinIcon className="h-8 w-8 text-gray-600 dark:text-gray-200" />
        </div>
        <p className="text-gray-500 dark:text-gray-300">
          {t("bookingPage.addNewLocation")}
        </p>
      </div>

      <div className="flex space-x-4">
        <DateTimeInput
          name="startDateTime"
          label={t("bookingPage.startDateAndTime")}
          control={control}
          errors={errors}
        />

        <DateTimeInput
          name="endDateTime"
          label={t("bookingPage.endDateAndTime")}
          control={control}
          errors={errors}
          onBlur={() => handleEndDateTimeChange(getValues("endDateTime"))}
        />
      </div>

      <PassengersInput
        label={t("bookingPage.passengers")}
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
        <label className="text-gray-700 dark:text-gray-300">
          {t("bookingPage.premiumBus")}
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mr-4">{t("loading")}</p>
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
        {t("bookingPage.submitBooking")}
      </button>
    </form>
  );
};

export default TripBookingForm;
