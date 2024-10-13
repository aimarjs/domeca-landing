import React from "react";

interface Step {
  label: string;
  status: "completed" | "in-progress";
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex justify-between items-center w-full px-4 py-6 shadow-md rounded-lg">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="relative flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                step.status === "completed"
                  ? "bg-green-500"
                  : step.status === "in-progress"
                  ? "border-4 border-blue-500"
                  : "bg-blue-200"
              }`}
            >
              {step.status === "completed" ? (
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                ""
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="absolute w-full h-1 bg-gray-300 -z-10 left-8 top-1/2 transform -translate-y-1/2"></div>
            )}
          </div>
          <div className="text-sm mt-2 text-center">
            <p className="text-gray-500">{step.label}</p>
            <p
              className={`${
                step.status === "completed"
                  ? "text-green-500"
                  : step.status === "in-progress"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {step.status === "completed"
                ? "Completed"
                : step.status === "in-progress"
                ? "In Progress"
                : "Pending"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
