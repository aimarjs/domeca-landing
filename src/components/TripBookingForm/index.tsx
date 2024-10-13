import { useState } from "react";
import { useForm } from "react-hook-form";
import TripDetailsForm from "../TripDetailsForm";
import ContactForm from "../TripContactForm";
import StepNavigation from "../StepNavigation";
import { FormData, hqCoords, Location } from "../../types/interfaces";
import { useTripAndPricingData } from "hooks/useTripAndPricingData";

interface TripBookingFormProps {
  hqCoords: hqCoords;
  taxRate: number;
}

const TripBookingForm = ({ hqCoords, taxRate }: TripBookingFormProps) => {
  const [step, setStep] = useState<number>(1);
  const [locations, setLocations] = useState<Location[]>([
    { name: "", latitude: null, longitude: null },
  ]);
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [passengers, setPassengers] = useState<number>(1);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  // const coords = process.env.NEXT_PUBLIC_HQ_COORDS || "59.43696,24.75353";
  // const [latitude, longitude] = coords.split(",").map(Number);
  // const hqLocation = { latitude, longitude };

  // const taxRate = 0.22;

  // const { estimatedCost } = usePricing(
  //   realDistance,
  //   passengers,
  //   travelTime,
  //   waitingTime,
  //   TAX_RATE,
  //   isPremium
  // );

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
  } = useTripAndPricingData(
    locations,
    hqCoords,
    taxRate,
    passengers,
    isPremium
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6"
    >
      {/* <StepIndicator currentStep={step} steps={steps} /> */}
      console.log(pricing);
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
          taxRate={taxRate}
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
