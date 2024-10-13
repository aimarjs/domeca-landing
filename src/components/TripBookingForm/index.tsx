import { useState } from "react";
import { useForm } from "react-hook-form";
import TripDetailsForm from "components/TripDetailsForm";
import ContactForm from "components/TripContactForm";
import StepNavigation from "components/StepNavigation";
import { FormData, TripBookingFormProps, Location } from "types/interfaces";
import { useTripAndPricingData } from "hooks/useTripAndPricingData";

const TripBookingForm = ({ hqCoords }: TripBookingFormProps) => {
  const [step, setStep] = useState<number>(1);
  const [locations, setLocations] = useState<Location[]>([
    { name: "", latitude: null, longitude: null },
  ]);
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const handleEndDateTimeChange = (endDateTime: string) => {
    const startDateTime = getValues("startDateTime");
    if (startDateTime) {
      const start = new Date(startDateTime).getTime();
      const end = new Date(endDateTime).getTime();
      const customerDefinedTimeInMinutes = (end - start) / (1000 * 60);
      const actualWaitingTime = customerDefinedTimeInMinutes - travelTime;
      setWaitingTime(actualWaitingTime);
    }
  };

  const onSubmit = (data: FormData) => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Final submission:", data);
    }
  };

  const {
    clientDistance,
    clientTravelTime,
    containsFerry,
    loading,
    estimatedCost,
    travelTime,
  } = useTripAndPricingData(locations, hqCoords, passengers, isPremium);

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
          errors={errors}
          waitingTime={waitingTime}
          setWaitingTime={setWaitingTime}
          passengers={passengers}
          setPassengers={setPassengers}
          handleEndDateTimeChange={handleEndDateTimeChange}
          isPremium={isPremium}
          setIsPremium={setIsPremium}
          hqCoords={hqCoords}
          estimatedCost={estimatedCost}
          loading={loading}
          clientDistance={clientDistance}
          clientTravelTime={clientTravelTime}
          containsFerry={containsFerry}
        />
      )}
      {step === 2 && <ContactForm control={control} errors={errors} />}
      <StepNavigation step={step} setStep={setStep} />
    </form>
  );
};
export default TripBookingForm;
