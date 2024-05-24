// import all namespaces English
import translation_en from "@/static/locales/en/translation.json";

//type all translations
export type LuccidTranslations = {
  translation: typeof translation_en;
};

enum SupportedLanguages {
  en = "en"
}

export const defaultNS = "translation";
export const resources: Record<SupportedLanguages, LuccidTranslations> = {
  en: {
    translation: translation_en
  }
} as const;
