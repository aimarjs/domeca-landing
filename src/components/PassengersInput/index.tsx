import React from "react";

interface PassengersInputProps {
  passengers: number;
  handlePassengersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const PassengersInput: React.FC<PassengersInputProps> = ({
  passengers,
  handlePassengersChange,
  label,
}) => {
  return (
    <div className="relative w-full">
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="number"
        value={passengers}
        onChange={handlePassengersChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-inset focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
        min={0}
      />
    </div>
  );
};

export default PassengersInput;
