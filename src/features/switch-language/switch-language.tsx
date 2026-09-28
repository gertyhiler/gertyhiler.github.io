import { SiteLink } from "@/shared/ui/site-link";
import { locales, dictionaries, type Locale } from "@/shared/lib/i18n";
import styles from "./switch-language.module.css";
export function SwitchLanguage({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}) {
  return (
    <nav
      className={styles.languages}
      aria-label={dictionaries[locale].language}
    >
      {locales.map((language) => (
        <SiteLink
          key={language}
          href={`/${language}/${path}`}
          hrefLang={language}
          lang={language}
          aria-current={locale === language ? "page" : undefined}
        >
          {language.toUpperCase()}
        </SiteLink>
      ))}
    </nav>
  );
}
