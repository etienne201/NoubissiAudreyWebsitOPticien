"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type RevealVariant = "slide" | "focus" | "zoom";

/**
 * Apparition cinématique au défilement inspirée de la mise au point optique
 * (respecte strictement prefers-reduced-motion).
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
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    slide: {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
    },
    focus: {
      initial: { opacity: 0, filter: "blur(6px)", scale: 0.985 },
      animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    },
    zoom: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const selected = variants[variant] || variants.slide;

  return (
    <motion.div
      className={className}
      initial={selected.initial}
      whileInView={selected.animate}
      viewport={{ once: true, amount: 0.08 }}
      transition={selected.transition}
    >
      {children}
    </motion.div>
  );
}
