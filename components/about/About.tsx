import Image from "next/image";
import profile from "@/public/pics/new_profile.jpg";
import styles from "./About.module.scss";

const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "JavaScript",
    "Express",
    "Nest",
    "Three.js",
    "Zustand",
    "TanStack",
    "TipTap",
    "MongoDB",
    "PostgreSQL",
];

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.inner}>
                <div className={styles.copy}>
                    <p className={styles.eyebrow}>{"// about"}</p>
                    <h2>About me</h2>

                    <p className={styles.lead}>
                        Hello! My name is Beka, and I build things for the web.
                        I&apos;m a full stack developer with 5+ years of
                        experience in software engineering.
                    </p>
                    <p>
                        Right now I&apos;m at{" "}
                        <a
                            className={styles.link}
                            href="https://skrib.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Skrib
                        </a>
                        , building a writing platform. Before that, at{" "}
                        <a
                            className={styles.link}
                            href="https://www.theneo.io/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Theneo
                        </a>{" "}
                        I worked on developer tools — building a VS Code
                        extension and improving API documentation workflows.
                        Earlier I co-founded{" "}
                        <a
                            className={styles.link}
                            href="https://oxeni.dev/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Oxeni
                        </a>
                        , where I led full-cycle development, optimized
                        performance, and integrated 3D experiences with
                        Three.js.
                    </p>

                    <p className={styles.skillsLabel}>Tech I reach for:</p>
                    <ul className={styles.skills}>
                        {skills.map((s) => (
                            <li key={s}>{s}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.portrait}>
                    <div className={styles.frame}>
                        <Image
                            src={profile}
                            alt="Beka Arabidze"
                            placeholder="blur"
                            sizes="(max-width: 1024px) 80vw, 34vw"
                            className={styles.photo}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
