import { ControllerRenderProps, FieldError } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "datetime-local";
  registration: ControllerRenderProps<any, any>; // Updated type
  error?: FieldError;
  onBlur?: () => void;
  step?: string;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  registration,
  error,
  onBlur,
  step,
  min,
}) => {
  return (
    <div className="mb-6 relative w-full">
      <label
        htmlFor={name}
        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...registration} // Works for Controller
        onBlur={onBlur}
        step={step}
        min={min}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-inset focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default InputField;
