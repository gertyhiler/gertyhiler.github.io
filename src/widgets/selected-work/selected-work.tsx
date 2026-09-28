import { dictionaries, type Locale } from "@/shared/lib/i18n";
import { SiteLink as Link } from "@/shared/ui/site-link";
import { articleCatalog, featuredArticleSlugs } from "@/entity/article";
import styles from "./selected-work.module.css";
export function SelectedWork({
  locale,
  source,
}: {
  locale: Locale;
  source: { selected: string };
}) {
  const t = { ...dictionaries[locale], ...source };
  const cases = articleCatalog[locale];
  return (
    <section className={styles["work"] + " " + styles["section"]} id="work">
      <h2>{t.selected}</h2>
      {featuredArticleSlugs.map((slug) => (
        <Link
          key={slug}
          className={styles["work-link"]}
          href={`/${locale}/work/${slug}/`}
        >
          <div>
            <p className={"meta"}>{cases[slug].company}</p>
            <h3>{cases[slug].title}</h3>
            <p>{cases[slug].summary}</p>
          </div>
          <span className={styles["arrow"]} aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </section>
  );
}
