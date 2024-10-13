import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import et from "./locales/et/translation.json";

// Function to get stored language from localStorage
const getStoredLanguage = () => {
  if (typeof window !== "undefined") {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      return storedLang;
    }
  }
  return "et"; // Default to Estonian if no language is stored
};

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      et: { translation: et },
    },
    lng: getStoredLanguage(),
    fallbackLng: "et", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    pluralSeparator: "_",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
