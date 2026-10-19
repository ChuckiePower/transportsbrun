import Image from "next/image";
import Link from "next/link";
import logo from "@brand/logo-transports-brun.png";
import { cn } from "@/lib/cn";

/**
 * Logo actuel (PNG 250×130) affiché au plus à 125 px de large pour rester net.
 * À remplacer par un SVG dès que le vectoriel est fourni.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center rounded-md", className)}
      aria-label="Transports Brun — accueil"
    >
      <Image
        src={logo}
        alt=""
        width={125}
        height={65}
        sizes="125px"
        // Toujours visible en haut de page : chargé tout de suite (souvent l'élément LCP sur mobile)
        preload
        className="h-auto w-[92px] sm:w-[104px]"
      />
    </Link>
  );
}

/** Logo dans une tuile blanche arrondie (pour les fonds nuit) */
export function LogoTile({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex rounded-lg bg-white px-5 py-4 shadow-sm", className)}
      aria-label="Transports Brun — accueil"
    >
      <Image src={logo} alt="" width={125} height={65} sizes="125px" className="h-auto w-[120px]" />
    </Link>
  );
}
