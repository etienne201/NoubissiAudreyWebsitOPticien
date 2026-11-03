"use client";

import { useEffect, useRef } from "react";

export type CosmosScene = "hero" | "diagnostic" | "laboratory" | "showroom";

interface OpticalCosmosBackgroundProps {
  scene?: CosmosScene;
  tone?: "dark" | "light";
  className?: string;
  interactive?: boolean;
}

/**
 * Arrière-plan cinématique interactif simulant la propagation de la lumière,
 * la réfraction d'ondes optiques et les reflets spéculaires à travers un ménisque de verre.
 *
 * Performance de pointe :
 * - Rendu Canvas natif 60 FPS
 * - Mise en pause automatique via IntersectionObserver lorsque hors champ
 * - Respect strict de prefers-reduced-motion (rendu statique instantané)
 * - Gestion automatique de la résolution Retina / 4K (DPR adapté)
 */
export function OpticalCosmosBackground({
  scene = "hero",
  tone = "dark",
  className = "",
  interactive = true,
}: OpticalCosmosBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Respect strict de la préférence utilisateur pour la réduction des mouvements
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let time = 0;

    // Position de la souris normalisée (-1 à 1)
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.targetX = Math.max(0, Math.min(1, x));
      mouse.targetY = Math.max(0, Math.min(1, y));
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Plafonné à 2 pour préserver le GPU
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(width * dpr, 1);
      canvas.height = Math.max(height * dpr, 1);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);
    resize();

    // IntersectionObserver pour stopper le rendu quand la section n'est pas affichée
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Initialisation des particules lumineuses prismatiques
    const particleCount = scene === "hero" ? 28 : scene === "showroom" ? 36 : 20;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.0004,
      speedY: (Math.random() - 0.5) * 0.0003,
      alpha: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    // Couleurs basées sur le design system
    const goldColor = tone === "dark" ? "201, 169, 110" : "163, 126, 68";
    const sageColor = tone === "dark" ? "132, 160, 144" : "62, 98, 82";

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Lissage du déplacement de la souris (interpolation inertielle)
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      time += prefersReducedMotion ? 0 : 0.012;

      // 1. Onde de réfraction principale
      const centerX = width * (0.3 + mouse.x * 0.4);
      const centerY = height * (0.2 + mouse.y * 0.3);

      if (scene === "hero" || scene === "laboratory") {
        // Courbes caustiques d'ondes lumineuses traversant un dioptre sphérique
        ctx.save();
        ctx.lineWidth = 1;
        const waves = 4;
        for (let i = 0; i < waves; i++) {
          const wavePhase = time * 0.8 + i * 1.2;
          const radius = Math.min(width, height) * (0.25 + i * 0.12);

          ctx.beginPath();
          ctx.strokeStyle =
            i % 2 === 0
              ? `rgba(${goldColor}, ${0.08 + Math.sin(wavePhase) * 0.03})`
              : `rgba(${sageColor}, ${0.07 + Math.cos(wavePhase) * 0.03})`;

          // Arc avec modulation ondulatoire
          for (let a = 0; a <= Math.PI * 2; a += 0.08) {
            const distortion = Math.sin(a * 4 + wavePhase) * 12 + Math.cos(a * 2 - wavePhase) * 8;
            const r = radius + distortion;
            const px = centerX + Math.cos(a) * r;
            const py = centerY + Math.sin(a) * r;
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      }

      if (scene === "diagnostic") {
        // Réticule micrométrique de collimation optique avec micro-graduations
        ctx.save();
        ctx.strokeStyle = `rgba(${goldColor}, 0.12)`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 6]);

        const diagX = width * 0.75;
        const diagY = height * 0.45;
        const diagR = Math.min(width, height) * 0.28;

        ctx.beginPath();
        ctx.arc(diagX, diagY, diagR, 0, Math.PI * 2);
        ctx.arc(diagX, diagY, diagR * 0.65, 0, Math.PI * 2);
        ctx.arc(diagX, diagY, diagR * 0.35, 0, Math.PI * 2);
        ctx.stroke();

        // Axes de visée
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(diagX - diagR * 1.2, diagY);
        ctx.lineTo(diagX + diagR * 1.2, diagY);
        ctx.moveTo(diagX, diagY - diagR * 1.2);
        ctx.lineTo(diagX, diagY + diagR * 1.2);
        ctx.stroke();
        ctx.restore();
      }

      // 2. Particules de dispersion chromatique (spécularité optique)
      ctx.save();
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1;
          if (p.y > 1) p.y = 0;
        }

        const px = p.x * width;
        const py = p.y * height;
        const pulse = Math.sin(time * 2 + p.phase) * 0.3 + 0.7;
        const currentAlpha = p.alpha * pulse * (tone === "dark" ? 0.85 : 0.6);

        // Petit halo spéculaire
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 3.5);
        grad.addColorStop(0, `rgba(${goldColor}, ${currentAlpha})`);
        grad.addColorStop(0.5, `rgba(${sageColor}, ${currentAlpha * 0.4})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [scene, tone, interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
    </div>
  );
}

