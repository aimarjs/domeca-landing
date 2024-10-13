import { Controller, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../InputField"; // Assuming you have an InputField component for inputs
import { FormData } from "../../types/interfaces"; // Assuming this is where you defined your form's data structure

interface ContactFormProps {
  control: Control<FormData>; // Use Control instead of UseFormRegister for controlled inputs
  errors: FieldErrors<FormData>;
}

const ContactForm: React.FC<ContactFormProps> = ({ control, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputField
            name="name"
            label={t("bookingPage.name")}
            type="text"
            registration={field} // This passes down all necessary field props from react-hook-form
            error={errors.name}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputField
            name="email"
            label={t("bookingPage.email")}
            type="email"
            registration={field}
            error={errors.email}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <InputField
            name="phoneNumber"
            label={t("bookingPage.phoneNumber")}
            type="tel"
            registration={field}
            error={errors.phoneNumber}
          />
        )}
      />
    </>
  );
};

export default ContactForm;
