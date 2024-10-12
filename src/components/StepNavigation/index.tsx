import React from "react";
import { useTranslation } from "react-i18next";

interface StepNavigationProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ step, setStep }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between">
      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg"
        >
          {t("bookingPage.previousStep")}{" "}
        </button>
      )}

      {step === 1 && (
        <button
          type="button"
          onClick={() => setStep(step + 1)}
          className="bg-blue-600 text-white py-2 px-4 w-full rounded-lg"
        >
          {t("bookingPage.nextStep")}
        </button>
      )}

      {step === 2 && (
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {t("bookingPage.submitBooking")}{" "}
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
