// import all namespaces English
import translation_en from "@/static/locales/en/translation.json";
import modals_en from "@/static/locales/en/modals.json";

//type all translations
export type LuccidTranslations = {
  translation: typeof translation_en;
  modals: typeof modals_en;
};

enum SupportedLanguages {
  en = "en"
}

export const defaultNS = "translation";
export const resources: Record<SupportedLanguages, LuccidTranslations> = {
  en: {
    translation: translation_en,
    modals: modals_en
  }
} as const;
