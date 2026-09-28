import { dictionaries, type Locale } from "@/shared/lib/i18n";
import styles from "./personal-projects.module.css";
export function PersonalProjects({
  locale,
  source,
}: {
  locale: Locale;
  source: { projects: string; lan: string; dotfiles: string };
}) {
  const t = { ...dictionaries[locale], ...source };
  return (
    <section
      className={styles["section"] + " " + styles["content"]}
      id="projects"
    >
      <h2>{t.projects}</h2>
      <div className={styles["project"]}>
        <a href="https://github.com/gertyhiler/lan-share">
          lan-share <span aria-hidden="true">↗</span>
        </a>
        <p>{t.lan}</p>
      </div>
      <div className={styles["project"]}>
        <a href="https://github.com/gertyhiler/dotfiles">
          dotfiles <span aria-hidden="true">↗</span>
        </a>
        <p>{t.dotfiles}</p>
      </div>
    </section>
  );
}
