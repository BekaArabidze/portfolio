import { site } from "@/lib/site";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{"// what's next"}</p>
        <h2 className={styles.title}>Get in touch</h2>
        <p className={styles.copy}>
          I&apos;m always open to new opportunities and good conversations.
          Whether you have a question or just want to say hi, my inbox is open —
          I&apos;ll get back to you.
        </p>
        <a className={styles.cta} href={`mailto:${site.email}`}>
          Say hello
        </a>
        <p className={styles.email}>{site.email}</p>
      </div>
    </section>
  );
}
