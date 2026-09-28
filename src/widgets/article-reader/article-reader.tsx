import "server-only";
import { SiteLink as Link } from "@/shared/ui/site-link";
import ReactMarkdown from "react-markdown";
import { dictionaries, type Locale } from "@/shared/lib/i18n";
import { readArticle } from "@/entity/article/index.server";
import { articleCatalog, type ArticleSlug } from "@/entity/article";
import styles from "./article-reader.module.css";
// Documented widget/entity exception: this widget owns static content prefetch.
export async function ArticleReader({
  locale,
  slug,
}: {
  locale: Locale;
  slug: ArticleSlug;
}) {
  const t = dictionaries[locale];
  const article = await readArticle(locale, slug);
  const work = article.kind === "work";
  return (
    <article className={styles["article"]}>
      <Link className={styles["back"]} href={`/${locale}/`}>
        ← {t.back}
      </Link>
      <header className={styles["article-header"]}>
        <p className="eyebrow">
          {work
            ? `${article.company ? article.company + " · " : ""}${t.caseType}`
            : t.articleType}
        </p>
        <h1>{article.title}</h1>
        <p className={styles["summary"]}>{article.summary}</p>
        {article.draft && <p className={styles["draft"]}>{t.draft}</p>}
      </header>
      <div className={styles["prose"]}>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
      <aside className={styles["read-next"]}>
        <p className="meta">{t.next}</p>
        <Link
          href={`/${locale}/${work ? "writing/agent-context/" : "work/nextjs-performance/"}`}
        >
          {work
            ? articleCatalog[locale]["agent-context"].title
            : articleCatalog[locale]["nextjs-performance"].title}{" "}
          →
        </Link>
      </aside>
    </article>
  );
}
