import { articleCatalog, type ArticleSlug } from "@/entity/article";
import type { Locale } from "@/shared/lib/i18n";
// Same content adapter boundary as ArticleReader; metadata never exposes filesystem IO.
export function getArticleHeader(locale: Locale, slug: ArticleSlug) {
  return articleCatalog[locale][slug];
}
