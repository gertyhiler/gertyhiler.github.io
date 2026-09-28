import { HomeIntro } from "@/widgets/home-intro";
import { SelectedWork } from "@/widgets/selected-work";
import { PersonalProjects } from "@/widgets/personal-projects";
import { WritingSummary } from "@/widgets/writing-summary";
import { AboutProfile } from "@/widgets/about-profile";
import { SiteShell } from "@/widgets/site-shell";
import type { Locale } from "@/shared/lib/i18n";
import { homeContent } from "./model/data";
import styles from "./home.module.css";
export function Home({ locale }: { locale: Locale }) {
  const source = homeContent[locale];
  return (
    <SiteShell locale={locale}>
      <HomeIntro locale={locale} source={source} />
      <SelectedWork locale={locale} source={source} />
      <div className={styles.columns}>
        <PersonalProjects locale={locale} source={source} />
        <WritingSummary locale={locale} source={source} />
      </div>
      <AboutProfile locale={locale} source={source} />
    </SiteShell>
  );
}
