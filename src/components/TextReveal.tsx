"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export function TextReveal({
  text,
  as: Component = "span",
  className = "",
  delay = 0.1,
  stagger = 0.035,
  highlightWords = [],
  highlightClass = "text-gold-gradient font-semibold",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <Component ref={ref as any} className={`inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline flex-wrap">
        {words.map((word, index) => {
          const isHighlighted = highlightWords.some(
            (hw) => word.toLowerCase().includes(hw.toLowerCase())
          );

          return (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden pb-1 pt-0.5 align-top mr-[0.25em]"
            >
              <motion.span
                initial={{ y: "115%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                transition={{
                  duration: 0.65,
                  delay: delay + index * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block ${isHighlighted ? highlightClass : ""}`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}

