// components/PassengersInput.tsx
import React from "react";

interface PassengersInputProps {
  passengers: number;
  handlePassengersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PassengersInput: React.FC<PassengersInputProps> = ({
  passengers,
  handlePassengersChange,
}) => {
  return (
    <div className="relative w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Passengers
      </label>
      <input
        type="number"
        value={passengers}
        onChange={handlePassengersChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        min={0}
      />
    </div>
  );
};

export default PassengersInput;
