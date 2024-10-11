import React from "react";

interface PricingInputProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PricingInput: React.FC<PricingInputProps> = ({
  label,
  value,
  onChange,
}) => (
  <div className="mb-6">
    <label className="block text-lg font-medium mb-2">{label}</label>
    <input
      type="number"
      step="0.01"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default PricingInput;
