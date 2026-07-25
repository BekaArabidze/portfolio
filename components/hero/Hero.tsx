import { site } from "@/lib/site";
import ShaderBackground from "./ShaderBackground";
import styles from "./Hero.module.scss";

export default function Hero() {
    return (
        <section id="top" className={styles.hero}>
            <ShaderBackground className={styles.bg} />
            <div className={styles.scrim} aria-hidden />

            <div className={styles.inner}>
                <p className={styles.eyebrow}>{"// hi, my name is"}</p>
                <h1 className={styles.name}>
                    Beka
                    <br />
                    Arabidze
                </h1>
                <p className={styles.role}>{site.role}</p>
                <p className={styles.bio}>
                    Software engineer with 5+ years building modern web
                    applications — currently at{" "}
                    <span className={styles.mark}>
                        <a href="https://skrib.com/">Skrib</a>
                    </span>
                    , working on a writing platform
                </p>

                <div className={styles.actions}>
                    <a
                        className={styles.primary}
                        href={site.resume}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View résumé
                    </a>
                    <a className={styles.ghost} href="#contact">
                        Get in touch
                    </a>
                </div>
            </div>

            <a
                href="#about"
                className={styles.scroll}
                aria-label="Scroll to about"
            >
                <span>scroll</span>
                <span className={styles.arrow} aria-hidden>
                    ↓
                </span>
            </a>
        </section>
    );
}
