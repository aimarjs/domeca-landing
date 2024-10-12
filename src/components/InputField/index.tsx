import React from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "tel";
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  registration,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        {...registration}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-inset focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
      />
      {error && (
        <span className="text-red-500">
          {t(`bookingPage.${label.toLowerCase()}Required`)}
        </span>
      )}
    </div>
  );
};

export default InputField;
