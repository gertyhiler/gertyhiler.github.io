import { dictionaries, type Locale } from "@/shared/lib/i18n";
import styles from "./home-intro.module.css";
export function HomeIntro({
  locale,
  source,
}: {
  locale: Locale;
  source: { intro: string; lead: string; bio: string; now: string };
}) {
  const t = { ...dictionaries[locale], ...source };
  return (
    <section className={styles["intro"]}>
      <p className={"eyebrow"}>{t.intro}</p>
      <h1>{t.lead}</h1>
      <p className={styles["bio"]}>{t.bio}</p>
      <p className={styles["now"]}>{t.now}</p>
    </section>
  );
}
