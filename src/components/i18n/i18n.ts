import i18n from "i18next";

import { resources } from "./resources";

const defaultNS = "translation";

const i18NInstance = i18n.createInstance();
i18NInstance.init({
  lng: "en",
  fallbackLng: "en",
  defaultNS,
  resources,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  console.log('i18n instance initialised');
});

export default i18NInstance;