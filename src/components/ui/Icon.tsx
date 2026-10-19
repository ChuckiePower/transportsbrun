import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrickWall,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  Clock,
  Container,
  Flame,
  Globe,
  HardHat,
  HeartHandshake,
  Layers,
  Leaf,
  LoaderCircle,
  LocateFixed,
  Mail,
  Map,
  MapPin,
  Maximize2,
  Menu,
  Mountain,
  Package,
  Phone,
  PhoneCall,
  Plus,
  Route,
  Ruler,
  ShieldCheck,
  Truck,
  Users,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import type { SVGProps } from "react";

/* Icônes maison dans le style Lucide (24 px, trait arrondi) pour les métiers absents de Lucide */
function CraneTruck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 17v-5h4.5l2 3H21v2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M10 12.5 19 4" />
      <path d="M19 4v5" />
      <path d="M17.5 9.5h3" />
    </svg>
  );
}

function FlatbedTruck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 15h14" />
      <path d="M16 15V9h3l3 3v3h-2" />
      <circle cx="6" cy="17.5" r="2" />
      <circle cx="18" cy="17.5" r="2" />
      <rect x="4" y="9" width="9" height="4" rx="1" />
    </svg>
  );
}

const lucide = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  badge: BadgeCheck,
  bricks: BrickWall,
  calendar: Calendar,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  alert: CircleAlert,
  clipboard: ClipboardList,
  clock: Clock,
  container: Container,
  flame: Flame,
  globe: Globe,
  hardHat: HardHat,
  family: HeartHandshake,
  layers: Layers,
  leaf: Leaf,
  loader: LoaderCircle,
  locate: LocateFixed,
  mail: Mail,
  map: Map,
  pin: MapPin,
  expand: Maximize2,
  menu: Menu,
  mountain: Mountain,
  package: Package,
  phone: Phone,
  phoneCall: PhoneCall,
  plus: Plus,
  route: Route,
  ruler: Ruler,
  shield: ShieldCheck,
  truck: Truck,
  users: Users,
  warehouse: Warehouse,
  close: X,
} satisfies Record<string, LucideIcon>;

const custom = { crane: CraneTruck, flatbed: FlatbedTruck };

export type IconName = keyof typeof lucide | keyof typeof custom;

/** Icône décorative (aria-hidden) ; passer `title` pour une icône porteuse de sens */
export function Icon({
  name,
  title,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  title?: string;
  className?: string;
  strokeWidth?: number;
}) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const };
  if (name in custom) {
    const C = custom[name as keyof typeof custom];
    return <C className={className} strokeWidth={strokeWidth} width="1em" height="1em" focusable="false" {...a11y} />;
  }
  const L = lucide[name as keyof typeof lucide];
  return <L className={className} strokeWidth={strokeWidth} width="1em" height="1em" focusable="false" {...a11y} />;
}

/** Logo Facebook (marque), plein */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"
      />
    </svg>
  );
}
