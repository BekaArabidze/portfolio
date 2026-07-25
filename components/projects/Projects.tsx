import { projects } from "@/lib/projects";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.scss";

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{"// projects"}</p>
          <h2>Selected work</h2>
        </header>

        <ul className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal as="li" key={project.title} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
