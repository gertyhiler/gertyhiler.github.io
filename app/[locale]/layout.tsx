import { homeContent } from "@/pages/home";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, dictionaries } from "@/shared/lib/i18n";
import "../globals.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: {
      default: `${dictionaries[locale].name} — Software engineer`,
      template: `%s — ${dictionaries[locale].name}`,
    },
    description: homeContent[locale].bio,
  };
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <a className="skip" href="#main">
          {dictionaries[locale].skip}
        </a>
        {children}
      </body>
    </html>
  );
}
