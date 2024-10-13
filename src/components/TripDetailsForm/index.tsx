import { Controller, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { FormData, Location, hqCoords } from "types/interfaces";
import LocationFields from "components/LocationFields";
import InputField from "components/InputField";
import TripDetails from "components/TripDetails";

interface TripDetailsFormProps {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  waitingTime: number;
  setWaitingTime: React.Dispatch<React.SetStateAction<number>>;
  passengers: number;
  setPassengers: React.Dispatch<React.SetStateAction<number>>;
  handleEndDateTimeChange: (endDateTime: string) => void;
  isPremium: boolean;
  setIsPremium: React.Dispatch<React.SetStateAction<boolean>>;
  hqCoords: hqCoords;
  estimatedCost: number;
  loading: boolean;
  clientDistance: number;
  clientTravelTime: number;
  containsFerry: boolean;
}

const TripDetailsForm = ({
  locations,
  setLocations,
  control,
  errors,
  handleEndDateTimeChange,
  waitingTime,
  isPremium,
  setIsPremium,
  estimatedCost,
  loading,
  clientDistance,
  clientTravelTime,
  containsFerry,
}: TripDetailsFormProps) => {
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
          defaultValue=""
          render={({ field }) => (
            <InputField
              name="startDateTime"
              label={t("bookingPage.startDateAndTime")}
              type="datetime-local"
              registration={field}
              error={errors.startDateTime}
            />
          )}
        />

        {locations.length > 2 && (
          <Controller
            name="endDateTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputField
                name="endDateTime"
                label={t("bookingPage.endDateAndTime")}
                type="datetime-local"
                registration={field}
                error={errors.endDateTime}
                onBlur={() => handleEndDateTimeChange(field.value)}
              />
            )}
          />
        )}
      </div>

      <Controller
        name="passengers"
        control={control}
        defaultValue={0}
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
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
            />
          )}
        />
        <label className="text-gray-700 dark:text-gray-300">
          {t("bookingPage.premiumBus")}
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mr-4">{t("loading")}</p>
        </div>
      ) : (
        <TripDetails
          clientDistance={clientDistance}
          clientTravelTime={clientTravelTime}
          waitingTime={waitingTime}
          estimatedCost={estimatedCost}
          containsFerry={containsFerry}
        />
      )}
    </>
  );
};

export default TripDetailsForm;
