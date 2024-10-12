import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import InputField from "../InputField";
import { FormData } from "../../types/interfaces";

interface ContactFormProps {
  control: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const ContactForm: React.FC<ContactFormProps> = ({ control, errors }) => {
  return (
    <>
      <InputField
        label="Name"
        type="text"
        registration={control("name", { required: true })}
        error={errors.name}
      />
      <InputField
        label="Email"
        type="email"
        registration={control("email", { required: true })}
        error={errors.email}
      />
      <InputField
        label="Phone Number"
        type="tel"
        registration={control("phoneNumber", { required: true })}
        error={errors.phoneNumber}
      />
    </>
  );
};

export default ContactForm;
