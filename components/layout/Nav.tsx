"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import styles from "./Nav.module.scss";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.inner} aria-label="Primary">
        <a href="#top" className={styles.brand} onClick={close}>
          beka<span className={styles.dot}>.</span>dev
        </a>

        <button
          className={styles.burger}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span data-open={open} />
        </button>

        <div className={`${styles.links} ${open ? styles.linksOpen : ""}`}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <a
            className={styles.cta}
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            onClick={close}
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
