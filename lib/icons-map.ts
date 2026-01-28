// lib/iconMaps.ts
import {
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Chrome,
  Compass,
  Flame,
} from "lucide-react";

export const deviceIconMap: Record<string, React.ElementType> = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet,
};

export const browserIconMap: Record<string, React.ElementType> = {
  chrome: Chrome,
  safari: Compass,
  firefox: Flame,
};

// Generic fallback
export const DefaultIcon = Globe;
