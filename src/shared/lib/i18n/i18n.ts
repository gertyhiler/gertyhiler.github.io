import en from "./locales/en.json";
import ru from "./locales/ru.json";
export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const dictionaries = { en, ru };
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
