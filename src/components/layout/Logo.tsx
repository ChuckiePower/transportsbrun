import Image from "next/image";
import Link from "next/link";
import logo from "@brand/logo-transports-brun.png";
import { cn } from "@/lib/cn";

/**
 * Logo actuel (PNG 250×130) affiché au plus à 125 px de large pour rester net
 * sur écran haute densité. À remplacer par un SVG dès que le vectoriel est fourni.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Transports Brun — accueil"
    >
      <Image
        src={logo}
        alt=""
        width={125}
        height={65}
        sizes="125px"
        className="h-auto w-[96px] sm:w-[112px] lg:w-[125px]"
        preload={priority}
      />
    </Link>
  );
}

/** Logo posé sur une plaque blanche (pour les fonds sombres) */
export function LogoPlate({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex rounded-sm bg-white px-4 py-3 shadow-card", className)}
      aria-label="Transports Brun — accueil"
    >
      <Image src={logo} alt="" width={125} height={65} sizes="125px" className="h-auto w-[125px]" />
    </Link>
  );
}
