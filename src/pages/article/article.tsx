import "server-only";
import { SiteShell } from "@/widgets/site-shell";
import {
  ArticleReader,
  getArticleHeader,
  type ArticleSlug,
} from "@/widgets/article-reader/index.server";
import type { Locale } from "@/shared/lib/i18n";
export function Article({
  locale,
  slug,
}: {
  locale: Locale;
  slug: ArticleSlug;
}) {
  const header = getArticleHeader(locale, slug);
  return (
    <SiteShell locale={locale} path={`${header.kind}/${slug}/`}>
      <ArticleReader locale={locale} slug={slug} />
    </SiteShell>
  );
}
