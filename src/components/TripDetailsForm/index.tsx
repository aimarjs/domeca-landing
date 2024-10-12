import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import LocationFields from "../LocationFields";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { FormData, Location } from "../../types/interfaces";
import InputField from "components/InputField";

interface TripDetailsFormProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  waitingTime: number;
  setWaitingTime: React.Dispatch<React.SetStateAction<number>>;
  passengers: number;
  setPassengers: React.Dispatch<React.SetStateAction<number>>;
  handleEndDateTimeChange: (endDateTime: string) => void;
  isPremium: boolean;
}

const TripDetailsForm: React.FC<TripDetailsFormProps> = ({
  locations,
  setLocations,
  control,
  errors,
  handleEndDateTimeChange,
}) => {
  const { t } = useTranslation();

  const addLocation = () => {
    setLocations((prevLocations) => [
      ...prevLocations,
      { name: "", latitude: null, longitude: null },
    ]);
  };

  return (
    <>
      <LocationFields locations={locations} setLocations={setLocations} />
      <div
        className="w-full border-dashed border-2 border-gray-400 rounded-lg text-center p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={addLocation}
      >
        <div className="flex justify-center mb-2">
          <MapPinIcon className="h-8 w-8 text-gray-600 dark:text-gray-200" />
        </div>
        <p className="text-gray-500 dark:text-gray-300">
          {t("bookingPage.addNewLocation")}
        </p>
      </div>

      <div className="flex space-x-4">
        <Controller
          name="startDateTime"
          control={control}
          render={({ field }) => (
            <InputField
              name="startDateTime"
              label={t("bookingPage.startDateAndTime")}
              type="datetime-local"
              registration={field}
              error={errors.endDateTime}
            />
          )}
        />

        <Controller
          name="endDateTime"
          control={control}
          render={({ field }) => (
            <InputField
              name="endDateTime"
              label={t("bookingPage.endDateAndTime")}
              type="datetime-local"
              registration={field}
              error={errors.endDateTime}
            />
          )}
        />
      </div>

      <Controller
        name="passengers"
        control={control}
        render={({ field }) => (
          <InputField
            name="passengers"
            label={t("bookingPage.passengers")}
            type="number"
            registration={field}
            error={errors.passengers}
          />
        )}
      />

      <div className="flex items-center">
        <Controller
          name="isPremium"
          control={control}
          render={({ field: { value, ...restField } }) => (
            <input
              type="checkbox"
              {...restField}
              className="mr-2"
              checked={value}
            />
          )}
        />
        <label className="text-gray-700 dark:text-gray-300">
          {t("bookingPage.premiumBus")}
        </label>
      </div>
    </>
  );
};

export default TripDetailsForm;
