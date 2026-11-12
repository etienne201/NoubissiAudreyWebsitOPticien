"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  offset?: number; // pixels de déplacement max (ex: 30, -40)
  className?: string;
  clamp?: boolean;
}

export function ParallaxContainer({
  children,
  offset = 35,
  className = "",
  clamp = true,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const smoothY = useSpring(rawY, { damping: 25, stiffness: 100 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

