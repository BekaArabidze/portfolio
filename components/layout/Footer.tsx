import { site } from "@/lib/site";
import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>
          beka<span className={styles.dot}>.</span>dev
        </span>

        <nav className={styles.links} aria-label="Footer">
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={site.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </nav>

        <span className={styles.copy}>© {year} {site.name}</span>
      </div>
    </footer>
  );
}
