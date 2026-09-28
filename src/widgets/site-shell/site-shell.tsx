import { SwitchLanguage } from "@/features/switch-language";
import styles from "./site-shell.module.css";
import { SiteLink as Link } from "@/shared/ui/site-link";
import { dictionaries, type Locale } from "@/shared/lib/i18n";
export function SiteShell({
  locale,
  path = "",
  children,
}: {
  locale: Locale;
  path?: string;
  children: React.ReactNode;
}) {
  const t = dictionaries[locale];
  return (
    <div className={styles["shell"]}>
      <header className={styles["header"]}>
        <Link className={styles["wordmark"]} href={`/${locale}/`}>
          {t.name}
          <span className={styles["dot"]}>.</span>
        </Link>
        <div className={styles["header-right"]}>
          <nav className={styles.navigation} aria-label={t.home}>
            <Link href={`/${locale}/#work`}>{t.work}</Link>
            <Link href={`/${locale}/#writing`}>{t.writing}</Link>
            <Link href={`/${locale}/#about`}>{t.about}</Link>
          </nav>
          <SwitchLanguage locale={locale} path={path} />
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className={styles.footer}>
        <span>{t.footer}</span>
        <a href="https://github.com/gertyhiler">GitHub ↗</a>
      </footer>
    </div>
  );
}
