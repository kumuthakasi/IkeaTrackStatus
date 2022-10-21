import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./static/english.json";
import Arabic from "./static/arabic.json";
import French from "./static/french.json";

const resources = {
  en: {
    translation: English,
  },
  ar: {
    translation: Arabic,
  },
  fr: {
    translation: French,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
