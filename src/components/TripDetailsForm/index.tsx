// TripDetailsForm.tsx
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import LocationFields from "../LocationFields";
import PassengersInput from "../PassengersInput";
import DateTimeInput from "../DateTimeInput";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { FormData, Location } from "../../types/interfaces";

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
  passengers,
  setPassengers,
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
        <DateTimeInput
          name="startDateTime"
          label={t("bookingPage.startDateAndTime")}
          control={control}
          errors={errors}
        />

        <DateTimeInput
          name="endDateTime"
          label={t("bookingPage.endDateAndTime")}
          control={control}
          errors={errors}
          onBlur={() => handleEndDateTimeChange("endDateTime")}
        />
      </div>

      <PassengersInput
        label={t("bookingPage.passengers")}
        passengers={passengers}
        handlePassengersChange={(e) =>
          setPassengers(parseInt(e.target.value, 10))
        }
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
