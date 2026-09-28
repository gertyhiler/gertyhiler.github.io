import { dictionaries, type Locale } from "@/shared/lib/i18n";
import { SiteLink as Link } from "@/shared/ui/site-link";
import { articleCatalog } from "@/entity/article";
import styles from "./writing-summary.module.css";
export function WritingSummary({
  locale,
  source,
}: {
  locale: Locale;
  source: { noteDesc: string; noteMeta: string };
}) {
  const t = { ...dictionaries[locale], ...source };
  const cases = articleCatalog[locale];
  return (
    <section
      className={styles["section"] + " " + styles["content"]}
      id="writing"
    >
      <h2>{t.writing}</h2>
      <Link
        className={styles["note-link"]}
        href={`/${locale}/writing/agent-context/`}
      >
        {cases["agent-context"].title}
        <span aria-hidden="true"> ↗</span>
      </Link>
      <p>{t.noteDesc}</p>
      <p className={"meta"}>{t.noteMeta}</p>
    </section>
  );
}
