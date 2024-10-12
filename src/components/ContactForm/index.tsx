import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../InputField";
import { FormData } from "../../types/interfaces";

interface ContactFormProps {
  control: Control<FormData>;
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
            label={t("name")}
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
            label={t("email")}
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
            label={t("phoneNumber")}
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
