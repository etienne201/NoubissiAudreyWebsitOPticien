import { Eye, Glasses, Layers, MessageCircleHeart, Package, ScanFace, SlidersHorizontal, Sun, Wrench, type LucideIcon } from "lucide-react";
import type { IconName } from "@/config/site";

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

export function ServiceIcon({ name, size = 24 }: { name: IconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
