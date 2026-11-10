"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type RevealVariant = "slide" | "focus" | "zoom";

/**
 * Apparition cinématique au défilement optimisée Core Web Vitals (zéro dépendance externe).
 * Utilise IntersectionObserver natif et des transitions CSS GPU-accélérées.
 * Respecte strictement prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "slide",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect strict de la préférence de réduction de mouvement
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { rootMargin: "80px 0px", threshold: 0.05 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getStyle = (): CSSProperties => {
    const baseTransition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;

    if (isVisible) {
      return {
        opacity: 1,
        transform: "none",
        filter: "none",
        transition: baseTransition,
      };
    }

    switch (variant) {
      case "focus":
        return {
          opacity: 0,
          filter: "blur(6px)",
          transform: "scale(0.985)",
          transition: baseTransition,
          willChange: "opacity, filter, transform",
        };
      case "zoom":
        return {
          opacity: 0,
          transform: "scale(0.95)",
          transition: baseTransition,
          willChange: "opacity, transform",
        };
      case "slide":
      default:
        return {
          opacity: 0,
          transform: "translateY(14px)",
          transition: baseTransition,
          willChange: "opacity, transform",
        };
    }
  };

  return (
    <div ref={ref} className={className} style={getStyle()}>
      {children}
    </div>
  );
}
