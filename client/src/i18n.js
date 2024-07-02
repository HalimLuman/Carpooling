import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./languages/en.json";
import trTranslations from "./languages/tr.json";
import alTranslations from "./languages/al.json";
import mkTranslations from "./languages/mk.json";

const resources = {
  en: enTranslations,
  tr: trTranslations,
  al: alTranslations,
  mk: mkTranslations
};

const language = localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
