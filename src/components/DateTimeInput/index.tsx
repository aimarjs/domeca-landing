import { Controller } from "react-hook-form";

interface DateTimeInputProps {
  name: string;
  label: string;
  control: any;
  errors: any;
  onBlur?: () => void; // Optional blur handler for waiting time calculation
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  name,
  label,
  control,
  errors,
  onBlur,
}) => {
  return (
    <div className="relative w-full">
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <input
            type="datetime-local"
            {...field}
            onBlur={onBlur}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-inset focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DateTimeInput;
