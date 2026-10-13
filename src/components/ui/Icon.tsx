import {
  Building2,
  Cloud,
  Code,
  Eye,
  Factory,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  KeyRound,
  Landmark,
  Layers,
  PenTool,
  Plane,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

// Icons are stored by name in the database; unknown names fall back to Code.
const icons: Record<string, LucideIcon> = {
  building: Building2,
  cloud: Cloud,
  code: Code,
  eye: Eye,
  factory: Factory,
  gauge: Gauge,
  globe: Globe,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  "heart-pulse": HeartPulse,
  "key-round": KeyRound,
  landmark: Landmark,
  layers: Layers,
  "pen-tool": PenTool,
  plane: Plane,
  "refresh-cw": RefreshCw,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  smartphone: Smartphone,
  sparkles: Sparkles,
  target: Target,
  truck: Truck,
  users: Users,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name] ?? Code;
  return <Component className={className} aria-hidden="true" strokeWidth={1.75} />;
}
