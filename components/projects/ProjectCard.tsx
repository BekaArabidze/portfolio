import Image from "next/image";
import type { Project } from "@/lib/projects";
import styles from "./Projects.module.scss";

function hostname(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className={styles.card}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      style={{ ["--card-accent" as string]: project.accent }}
    >
      <div className={styles.thumb}>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.img}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.arrow} aria-hidden>
            ↗
          </span>
        </div>
        <p className={styles.desc}>{project.description}</p>
        <span className={styles.host}>{hostname(project.href)}</span>
      </div>
    </a>
  );
}
