import React from "react";

interface SuccessMessageProps {
  visible: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <p className="mt-4 text-green-400 text-center font-semibold">
      Prices saved successfully!
    </p>
  );
};

export default SuccessMessage;
