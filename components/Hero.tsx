"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import { track } from "@/lib/track";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const mouse = { x: -9999, y: -9999 };
    const REPEL = 120;
    const REPEL_FORCE = 6;
    const DAMPEN = 0.99;
    const MAX_SPEED = 2.5;

    type Dot = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    let dots: Dot[] = [];

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      // re-seed dots to fill new size
      const sizes = [0.3, 0.4, 0.5, 0.6, 0.8, 1.0, 1.5, 2.0, 2.8, 3.5, 4.5, 5.5];
      dots = Array.from({ length: 300 }, () => {
        const r = sizes[Math.floor(Math.random() * sizes.length)];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r,
          alpha: r > 2 ? Math.random() * 0.25 + 0.1 : Math.random() * 0.45 + 0.3,
        };
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < REPEL && dist > 0) {
          const force = ((REPEL - dist) / REPEL) * REPEL_FORCE;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }

        d.vx *= DAMPEN;
        d.vy *= DAMPEN;

        // organic drift — always wandering
        d.vx += (Math.random() - 0.5) * 0.15;
        d.vy += (Math.random() - 0.5) * 0.15;

        const speed = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (speed > MAX_SPEED) {
          d.vx = (d.vx / speed) * MAX_SPEED;
          d.vy = (d.vy / speed) * MAX_SPEED;
        }

        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) { d.x = 0; d.vx = Math.abs(d.vx); }
        if (d.x > w) { d.x = w; d.vx = -Math.abs(d.vx); }
        if (d.y < 0) { d.y = 0; d.vy = Math.abs(d.vy); }
        if (d.y > h) { d.y = h; d.vy = -Math.abs(d.vy); }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(187,12,104,${d.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <h1 className={styles.title}>Know Where Your Customers Come From</h1>
      <p className={styles.subtitle}>
        Track the journey from the first website visit to signup, purchase intent, and beyond.
        Understand which marketing channels bring visitors, which ones generate leads, and which ones actually drive revenue.
      </p>
      <Link href="/signup" className={styles.trialButton} onClick={() => track("click_start_free_trial", { location: "hero" })}>Start Free Trial</Link>
    </section>
  );
}
