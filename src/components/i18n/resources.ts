// import all namespaces English
import translation_en from "@/static/locales/en/translation.json";
import modals_en from "@/static/locales/en/modals.json";

// import all namespaces Spanish
import translation_es from "@/static/locales/es/translation.json";
import modals_es from "@/static/locales/es/modals.json";

// import all namespaces French
import translation_fr from "@/static/locales/fr/translation.json";
import modals_fr from "@/static/locales/fr/modals.json";

// import all namespaces German
import translation_de from "@/static/locales/de/translation.json";
import modals_de from "@/static/locales/de/modals.json";

// import all namespaces Russian
import translation_ru from "@/static/locales/ru/translation.json";
import modals_ru from "@/static/locales/ru/modals.json";

// import all namespaces Chinese
import translation_zh from "@/static/locales/zh/translation.json";
import modals_zh from "@/static/locales/zh/modals.json";

// import all namespaces Japanese
import translation_ja from "@/static/locales/ja/translation.json";
import modals_ja from "@/static/locales/ja/modals.json";

//type all translations
export type LuccidTranslations = {
  translation: typeof translation_en;
  modals: typeof modals_en;
};

enum SupportedLanguages {
  en = "en",
  es = "es",
  fr = "fr",
  de = "de",
  ru = "ru",
  zh = "zh",
  ja = "ja"
}

export const defaultNS = "translation";
export const resources: Record<SupportedLanguages, LuccidTranslations> = {
  en: {
    translation: translation_en,
    modals: modals_en
  },
  es: {
    translation: translation_es,
    modals: modals_es
  }, 
  fr: {
    translation: translation_fr,
    modals: modals_fr
  }, 
  de: {
    translation: translation_de,
    modals: modals_de
  },
  ru: {
    translation: translation_ru,
    modals: modals_ru
  },
  zh: {
    translation: translation_zh,
    modals: modals_zh
  },
  ja: {
    translation: translation_ja,
    modals: modals_ja
  }
} as const;


