"use client";

import { useEffect, useRef, useState } from "react";
import { paletteAt, cssRgb } from "@/lib/palette";
import styles from "./Preloader.module.scss";

// viewBox — wide enough that "100" never overflows the glyph box.
const VB_W = 1200;
const VB_H = 700;

// Build a filled sine-wave shape whose top edge is the water surface (local
// y≈0) and which floods downward to yBottom. Rendered once, then only ever
// translated — the digits themselves (via clipPath) do the framing.
function wavePath(amp: number, wavelength: number): string {
  const xStart = -VB_W;
  const xEnd = VB_W * 2;
  const yBottom = VB_H * 2;
  const step = 14;
  let d = `M ${xStart} ${yBottom} L ${xStart} 0`;
  for (let x = xStart; x <= xEnd; x += step) {
    const y = (amp * Math.sin((x / wavelength) * Math.PI * 2)).toFixed(2);
    d += ` L ${x} ${y}`;
  }
  d += ` L ${xEnd} ${yBottom} Z`;
  return d;
}

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "gone">("loading");

  const rootRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<SVGTextElement>(null);
  const clipRef = useRef<SVGTextElement>(null);
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const gradTopRef = useRef<SVGStopElement>(null);
  const gradBotRef = useRef<SVGStopElement>(null);
  const srRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // amplitude → 0 under reduced motion: still floods bottom→top, but flat.
    const amp1 = reduce ? 0 : 34;
    const amp2 = reduce ? 0 : 22;
    const L1 = 620;
    const L2 = 430;
    wave1Ref.current?.setAttribute("d", wavePath(amp1, L1));
    wave2Ref.current?.setAttribute("d", wavePath(amp2, L2));

    // Lock scroll while the curtain is up.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);
    // Fonts settling shouldn't finish the bar, but a hung asset shouldn't
    // trap the visitor either — hard-release after 7s no matter what.
    const failsafe = window.setTimeout(onLoad, 7000);

    let raf = 0;
    let last = performance.now();
    let p = 0; // eased progress, 0..1
    let creep = 0; // asymptotic crawl toward 0.9 while still loading
    let shownInt = -1;
    let done = false;

    const setText = (n: number) => {
      const s = String(n);
      if (ghostRef.current) ghostRef.current.textContent = s;
      if (clipRef.current) clipRef.current.textContent = s;
      if (srRef.current) srRef.current.textContent = `Loading ${n}%`;
    };
    setText(0);

    const beginExit = () => {
      done = true;
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      setPhase("exiting");
      window.setTimeout(() => setPhase("gone"), 750);
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      creep += (0.9 - creep) * (1 - Math.exp(-dt * 0.6));
      const target = loaded ? 1 : creep;
      p += (target - p) * (1 - Math.exp(-dt * (loaded ? 6 : 3)));

      const int = Math.round(p * 100);
      if (int !== shownInt) {
        shownInt = int;
        setText(int);
      }

      // Water level: local surface (y≈0) travels from viewBox bottom (empty)
      // to top (full). Overshoot by amplitude so 0% and 100% read as truly
      // empty / full despite the crests.
      const level = VB_H + amp1 - p * (VB_H + amp1 * 2);
      // Two crests drift in opposite directions at different rates → organic.
      const t = now / 1000;
      const x1 = reduce ? 0 : -(((t * 46) % L1) + L1) % L1;
      const x2 = reduce ? 0 : (((t * 34) % L2) + L2) % L2;
      wave1Ref.current?.setAttribute("transform", `translate(${x1} ${level})`);
      wave2Ref.current?.setAttribute("transform", `translate(${x2} ${level})`);

      // Match the flood to the shader/cursor palette (shared time clock).
      if (!reduce) {
        const pal = paletteAt(t);
        gradTopRef.current?.setAttribute("stop-color", cssRgb(pal.a));
        gradBotRef.current?.setAttribute("stop-color", cssRgb(pal.b));
        wave2Ref.current?.setAttribute("fill", cssRgb(pal.c));
      }

      if (loaded && p > 0.999 && !done) {
        setText(100);
        beginExit();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(failsafe);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${phase === "exiting" ? styles.exiting : ""}`}
      role="status"
    >
      <div className={styles.center}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          aria-hidden
        >
          <defs>
            <linearGradient id="preloadLiquid" x1="0" y1="0" x2="0" y2="1">
              <stop ref={gradTopRef} offset="0" stopColor="var(--accent-purple)" />
              <stop ref={gradBotRef} offset="1" stopColor="var(--accent-green)" />
            </linearGradient>
            <clipPath id="preloadDigits">
              <text
                ref={clipRef}
                x={VB_W / 2}
                y={VB_H / 2}
                textAnchor="middle"
                dominantBaseline="central"
              >
                0
              </text>
            </clipPath>
          </defs>

          <text
            ref={ghostRef}
            className={styles.ghost}
            x={VB_W / 2}
            y={VB_H / 2}
            textAnchor="middle"
            dominantBaseline="central"
          >
            0
          </text>

          <g clipPath="url(#preloadDigits)">
            <path
              ref={wave2Ref}
              className={styles.wave2}
              fill="var(--accent-orange)"
            />
            <path
              ref={wave1Ref}
              className={styles.wave1}
              fill="url(#preloadLiquid)"
            />
          </g>
        </svg>

        <p className={styles.caption}>{"// loading"}</p>
      </div>

      <span ref={srRef} className={styles.sr} aria-live="polite">
        Loading 0%
      </span>
    </div>
  );
}
