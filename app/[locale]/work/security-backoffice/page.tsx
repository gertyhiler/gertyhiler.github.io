import { notFound } from "next/navigation";
import { isLocale } from "@/shared/lib/i18n";
import { Article, getArticleHeader } from "@/pages/article/index.server";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { title: getArticleHeader(locale, "security-backoffice").title };
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Article locale={locale} slug="security-backoffice" />;
}
