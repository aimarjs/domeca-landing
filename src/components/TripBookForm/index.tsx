"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePricing } from "../../hooks/usePricing";
import { useTripData } from "../../hooks/useTripData";
import { formatTravelTime } from "../../utils/timeUtils";
import { FormData, Location } from "../../types/interfaces";
import TripDetailsForm from "../TripDetailsForm";
import ContactForm from "../ContactForm";
import StepNavigation from "../StepNavigation";
import TripDetails from "../TripDetails";

interface TripBookingFormProps {
  hqCoords: {
    latitude: number;
    longitude: number;
  };
  TAX_RATE: number;
}

const TripBookingForm = ({ hqCoords, TAX_RATE }: TripBookingFormProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [locations, setLocations] = useState<Location[]>([
    { name: "", latitude: null, longitude: null },
  ]);
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);

  const {
    control,
    register,
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

  const onSubmit = (data: FormData) => {
    console.log(data);

    // alert(
    //   t("tripBookedAlert", {
    //     startDateTime: data.startDateTime,
    //     endDateTime: data.endDateTime,
    //     name: data.name,
    //     email: data.email,
    //     phoneNumber: data.phoneNumber,
    //   })
    // );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6"
    >
      {step === 1 && (
        <TripDetailsForm
          locations={locations}
          setLocations={setLocations}
          control={control}
          register={register}
          errors={errors}
          waitingTime={waitingTime}
          setWaitingTime={setWaitingTime}
          passengers={passengers}
          setPassengers={setPassengers}
          handleEndDateTimeChange={handleEndDateTimeChange}
          isPremium={isPremium}
        />
      )}

      {step === 1 && !loading && (
        <TripDetails
          realDistance={realDistance}
          travelTime={travelTime}
          waitingTime={waitingTime}
          estimatedCost={estimatedCost}
          containsFerry={containsFerry}
          formatTravelTime={formatTravelTime}
        />
      )}

      {step === 2 && <ContactForm control={control} errors={errors} />}

      <StepNavigation step={step} setStep={setStep} />
    </form>
  );
};

export default TripBookingForm;
