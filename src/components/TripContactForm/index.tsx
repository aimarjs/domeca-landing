import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "components/InputField";
import { ContactFormProps } from "types/interfaces";

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
            registration={field}
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
