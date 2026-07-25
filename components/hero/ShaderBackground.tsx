"use client";

import { useEffect, useRef } from "react";
import { screenVert } from "./shaders/screen.vert";
import { fbmFrag } from "./shaders/fbm.frag";
import styles from "./ShaderBackground.module.scss";

export default function ShaderBackground({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return; // keep CSS fallback
      }
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        });
      } catch {
        return; // WebGL unsupported → CSS fallback stays visible
      }

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const canHover = window.matchMedia("(hover: hover)").matches;
      const dprCap = isMobile ? 1.5 : 2;

      const scene = new THREE.Scene();
      const camera = new THREE.Camera(); // vertex writes clip space directly
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        vertexShader: screenVert,
        fragmentShader: fbmFrag,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uColorA: { value: new THREE.Color(0x6f3dfe) },
          uColorB: { value: new THREE.Color(0x37b991) },
          uColorC: { value: new THREE.Color(0xf67254) },
          uBase: { value: new THREE.Color(0x0a0a0f) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseStrength: { value: 0 },
        },
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const render = () => renderer.render(scene, camera);

      const resize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
        renderer.setSize(w, h, false);
        material.uniforms.uResolution.value.set(w, h);
      };

      let raf = 0;
      let elapsed = 0;
      let lastTs = 0;
      let running = false;
      let visible = document.visibilityState === "visible";
      let onScreen = true;

      const mouseTarget = new THREE.Vector2(0.5, 0.5);
      let strengthTarget = 0;
      const onPointerMove = (e: PointerEvent) => {
        const r = container.getBoundingClientRect();
        const x = (e.clientX - r.left) / (r.width || 1);
        const y = (e.clientY - r.top) / (r.height || 1);
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
          mouseTarget.set(x, 1 - y); // flip y → UV space
          strengthTarget = 1;
        } else {
          strengthTarget = 0;
        }
      };

      const loop = (ts: number) => {
        if (!running) return;
        if (!lastTs) lastTs = ts;
        elapsed += (ts - lastTs) / 1000;
        lastTs = ts;
        material.uniforms.uTime.value = elapsed;
        material.uniforms.uMouse.value.lerp(mouseTarget, 0.08);
        material.uniforms.uMouseStrength.value +=
          (strengthTarget - material.uniforms.uMouseStrength.value) * 0.06;
        render();
        raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running || reduce) return;
        running = true;
        lastTs = 0; // avoid a time jump after a pause
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      const evaluate = () => (visible && onScreen ? start() : stop());

      resize();
      render();
      canvas.style.opacity = "1"; // reveal over the CSS fallback

      const ro = new ResizeObserver(() => {
        resize();
        if (!running) render();
      });
      ro.observe(container);

      let io: IntersectionObserver | null = null;
      const onVis = () => {
        visible = document.visibilityState === "visible";
        evaluate();
      };

      if (!reduce) {
        io = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            evaluate();
          },
          { threshold: 0 },
        );
        io.observe(container);
        document.addEventListener("visibilitychange", onVis);
        evaluate();
      }

      if (!reduce && canHover)
        window.addEventListener("pointermove", onPointerMove, { passive: true });

      cleanup = () => {
        stop();
        ro.disconnect();
        io?.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("pointermove", onPointerMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className={`${styles.wrap} ${className}`.trim()}>
      <div aria-hidden className={styles.fallback} />
      <canvas ref={canvasRef} aria-hidden className={styles.canvas} />
    </div>
  );
}
