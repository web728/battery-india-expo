import {
  Battery,
  Layers,
  Cpu,
  Warehouse,
  Recycle,
  PlugZap,
  FlaskConical,
  Microscope,
  Brain,
  Landmark,
  Newspaper,
  Briefcase,
  ShieldCheck,
  type LucideProps,
} from "lucide-react";
import type { Sector } from "@/lib/content/sectors";

const iconMap: Record<Sector["icon"], typeof Battery> = {
  battery: Battery,
  layers: Layers,
  cpu: Cpu,
  warehouse: Warehouse,
  recycle: Recycle,
  "plug-zap": PlugZap,
  flask: FlaskConical,
  microscope: Microscope,
  brain: Brain,
  landmark: Landmark,
  newspaper: Newspaper,
  briefcase: Briefcase,
  "shield-check": ShieldCheck,
};

export function SectorIcon({ icon, ...props }: { icon: Sector["icon"] } & LucideProps) {
  const Icon = iconMap[icon];
  return <Icon {...props} />;
}
