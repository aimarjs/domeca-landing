"use client";

import { useState, useEffect } from "react";
import PricingForm from "../PricingForm";
import SuccessMessage from "../SuccessMessage";

const PricingAdmin = () => {
  const [baseFarePerKm, setBaseFarePerKm] = useState<number>(0);
  const [oneTimeStartingFee, setOneTimeStartingFee] = useState<number>(0);
  const [hourPrice, setHourPrice] = useState<number>(0);
  const [waitingHourPrice, setWaitingHourPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountStartKm, setDiscountStartKm] = useState<number>(0);
  const [saved, setSaved] = useState<boolean>(false);
  const [premiumHourPrice, setPremiumHourPrice] = useState<number>(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/prices");
        const data = await response.json();
        if (response.ok) {
          setBaseFarePerKm(data.baseFarePerKm);
          setOneTimeStartingFee(data.oneTimeStartingFee);
          setHourPrice(data.hourPrice);
          setWaitingHourPrice(data.waitingHourPrice);
          setDiscount(data.discount);
          setDiscountStartKm(data.discountStartKm);
          setPremiumHourPrice(data.premiumHourPrice);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  const handleSavePrices = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseFarePerKm,
          oneTimeStartingFee,
          hourPrice,
          waitingHourPrice,
          discount,
          discountStartKm,
          premiumHourPrice,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        console.error("Failed to save prices");
      }
    } catch (error) {
      console.error("Error saving prices:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin: Set Pricing Data
        </h1>
        <PricingForm
          baseFarePerKm={baseFarePerKm}
          setBaseFarePerKm={setBaseFarePerKm}
          oneTimeStartingFee={oneTimeStartingFee}
          setOneTimeStartingFee={setOneTimeStartingFee}
          hourPrice={hourPrice}
          setHourPrice={setHourPrice}
          premiumHourPrice={premiumHourPrice}
          setPremiumHourPrice={setPremiumHourPrice}
          waitingHourPrice={waitingHourPrice}
          setWaitingHourPrice={setWaitingHourPrice}
          discount={discount}
          setDiscount={setDiscount}
          discountStartKm={discountStartKm}
          setDiscountStartKm={setDiscountStartKm}
          onSubmit={handleSavePrices}
        />
        <SuccessMessage visible={saved} />
      </div>
    </div>
  );
};

export default PricingAdmin;
