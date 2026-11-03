import {
  Eye,
  Glasses,
  Layers,
  MessageCircleHeart,
  Package,
  ScanFace,
  SlidersHorizontal,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/config/site";
import type { InteractiveSvgState } from "./OpticalIllustrations";

const icons: Record<IconName, LucideIcon> = {
  glasses: Glasses,
  sun: Sun,
  eye: Eye,
  package: Package,
  message: MessageCircleHeart,
  face: ScanFace,
  layers: Layers,
  adjust: SlidersHorizontal,
  wrench: Wrench,
};

export function ServiceIcon({
  name,
  size = 22,
  state = "normal",
  className = "",
}: {
  name: IconName;
  size?: number;
  state?: InteractiveSvgState;
  className?: string;
}) {
  const Icon = icons[name];
  const stateClasses =
    state === "selected"
      ? "scale-110 text-champagne"
      : state === "disabled"
      ? "opacity-40 pointer-events-none"
      : state === "hover"
      ? "scale-110"
      : "transition-transform duration-300 group-hover:scale-110";

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <Icon
        size={size}
        strokeWidth={1.75}
        aria-hidden="true"
        className={stateClasses}
      />
    </span>
  );
}
