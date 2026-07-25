"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.scss";

export default function CursorGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        if (!window.matchMedia("(hover: hover)").matches) return;

        let raf = 0;
        let running = false;
        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;
        let tx = cx;
        let ty = cy;
        let opacity = 0;
        let opacityTarget = 0;

        const tick = () => {
            cx += (tx - cx) * 0.12;
            cy += (ty - cy) * 0.12;
            opacity += (opacityTarget - opacity) * 0.08;
            el.style.setProperty("--mx", `${cx}px`);
            el.style.setProperty("--my", `${cy}px`);
            el.style.opacity = String(opacity);

            const settled =
                Math.abs(tx - cx) < 0.5 &&
                Math.abs(ty - cy) < 0.5 &&
                Math.abs(opacityTarget - opacity) < 0.01;
            if (settled) {
                running = false;
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        const kick = () => {
            if (running) return;
            running = true;
            raf = requestAnimationFrame(tick);
        };

        const onMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            opacityTarget = 1;
            kick();
        };
        const onLeave = () => {
            opacityTarget = 0;
            kick();
        };
        const onVis = () => {
            if (document.visibilityState !== "visible") {
                cancelAnimationFrame(raf);
                running = false;
            }
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", onVis);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, []);

    return (
        <div ref={ref} aria-hidden className={styles.glow}>
            <div className={styles.orb} />
        </div>
    );
}
