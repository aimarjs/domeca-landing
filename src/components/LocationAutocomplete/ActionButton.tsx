import React from "react";

const ActionButton: React.FC<{
  onClick?: () => void;
  label: string;
  color?: string;
}> = ({ onClick = () => {}, label, color = "bg-blue-600" }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid="action-button"
    className={`${color} text-white px-4 py-2 flex items-center justify-center rounded-r-lg`}
    style={{ height: "calc(100%)" }}
  >
    <span data-testid="button-label" className="text-xl">
      {label}
    </span>
  </button>
);

export default ActionButton;
