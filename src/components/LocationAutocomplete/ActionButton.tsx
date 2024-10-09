import React from "react";

const ActionButton: React.FC<{
  onClick?: () => void;
  label: string;
  color: string;
}> = ({ onClick, label, color }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${color} text-white px-4 py-2 flex items-center justify-center rounded-r-lg`}
    style={{ height: "calc(100%)" }}
  >
    <span className="text-xl">{label}</span>
  </button>
);

export default ActionButton;
