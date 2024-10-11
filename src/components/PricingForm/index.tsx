import React from "react";
import PricingInput from "../PricingInput";

interface PricingFormProps {
  baseFarePerKm: number;
  setBaseFarePerKm: (value: number) => void;
  oneTimeStartingFee: number;
  setOneTimeStartingFee: (value: number) => void;
  hourPrice: number;
  setHourPrice: (value: number) => void;
  premiumHourPrice: number;
  setPremiumHourPrice: (value: number) => void;
  waitingHourPrice: number;
  setWaitingHourPrice: (value: number) => void;
  discount: number;
  setDiscount: (value: number) => void;
  discountStartKm: number;
  setDiscountStartKm: (value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PricingForm: React.FC<PricingFormProps> = ({
  baseFarePerKm,
  setBaseFarePerKm,
  oneTimeStartingFee,
  setOneTimeStartingFee,
  hourPrice,
  setHourPrice,
  premiumHourPrice,
  setPremiumHourPrice,
  waitingHourPrice,
  setWaitingHourPrice,
  discount,
  setDiscount,
  discountStartKm,
  setDiscountStartKm,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <PricingInput
        label="Base Fare per Kilometer (€):"
        value={baseFarePerKm}
        onChange={(e) => setBaseFarePerKm(parseFloat(e.target.value))}
      />
      <PricingInput
        label="Starting Fee (€):"
        value={oneTimeStartingFee}
        onChange={(e) => setOneTimeStartingFee(parseFloat(e.target.value))}
      />
      <PricingInput
        label="Hourly Price (€):"
        value={hourPrice}
        onChange={(e) => setHourPrice(parseFloat(e.target.value))}
      />
      <PricingInput
        label="Premium Hour Price (€):"
        value={premiumHourPrice}
        onChange={(e) => setPremiumHourPrice(parseFloat(e.target.value))}
      />
      <PricingInput
        label="Waiting Hour Price (€):"
        value={waitingHourPrice}
        onChange={(e) => setWaitingHourPrice(parseFloat(e.target.value))}
      />
      <PricingInput
        label="Discount (%):"
        value={discount}
        onChange={(e) => setDiscount(parseFloat(e.target.value))}
      />
      <PricingInput
        label="Discount Start (Km):"
        value={discountStartKm}
        onChange={(e) => setDiscountStartKm(parseFloat(e.target.value))}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
      >
        Save Prices
      </button>
    </form>
  );
};

export default PricingForm;
