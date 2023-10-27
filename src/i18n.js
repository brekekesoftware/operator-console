import { I18n } from "i18n-js";

const i18n = new I18n();

export async function loadTranslations(locale) {
  const res = await fetch(`locales/${locale}.json`);
  const data = await res.json();
  i18n.store(data);
}

export function isValidLocale(locale) {
  return ['en', 'ja'].includes(locale);
}

export const DEFAULT_LOCALE = 'en';

export default i18n;
