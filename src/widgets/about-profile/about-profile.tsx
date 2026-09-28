import { dictionaries, type Locale } from "@/shared/lib/i18n";
import styles from "./about-profile.module.css";
export function AboutProfile({
  locale,
  source,
}: {
  locale: Locale;
  source: { aboutText: string };
}) {
  const t = { ...dictionaries[locale], ...source };
  return (
    <section className={styles["about"] + " " + styles["section"]} id="about">
      <h2>{t.about}</h2>
      <p>{t.aboutText}</p>
      <p className={styles["contact"]}>
        {t.contact} <a href="https://github.com/gertyhiler">GitHub ↗</a>
      </p>
    </section>
  );
}
