import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/shared/lib/i18n";
import { articleCatalog } from "../../model/data";
import type { ArticleSlug } from "../../model/types";
export async function readArticle(locale: Locale, slug: ArticleSlug) {
  const metadata = articleCatalog[locale][slug];
  const body = await readFile(
    path.join(process.cwd(), "content", locale, `${slug}.md`),
    "utf8",
  );
  return { ...metadata, slug, body };
}
