import { notFound } from "next/navigation";
import { isLocale } from "@/shared/lib/i18n";
import { Home } from "@/pages/home";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Home locale={locale} />;
}
