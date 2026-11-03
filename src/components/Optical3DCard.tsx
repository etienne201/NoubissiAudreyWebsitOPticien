"use client";

import { useState, useRef, type ReactNode, type MouseEvent, type TouchEvent } from "react";

interface Optical3DCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  specular?: boolean;
}

/**
 * Carte interactive à perspective 3D physique avec reflet spéculaire dynamique.
 * Simule le biseau d'un verre minéral taillé et le reflet antireflet en fonction de l'angle du regard.
 */
export function Optical3DCard({
  children,
  className = "",
  maxTilt = 7,
  specular = true,
}: Optical3DCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });

    if (specular) {
      setShine({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.18,
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      className={`relative group ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-[inherit] overflow-hidden"
      >
        {children}

        {/* Reflet spéculaire haute précision (simule le flash de lumière sur la courbure du verre) */}
        {specular && (
          <div
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle 240px at ${shine.x}% ${shine.y}%, rgba(201, 169, 110, 0.22), rgba(255, 255, 255, 0.1) 30%, transparent 70%)`,
              opacity: shine.opacity,
              transition: "opacity 0.3s ease",
            }}
            className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
          />
        )}
      </div>
    </div>
  );
}

