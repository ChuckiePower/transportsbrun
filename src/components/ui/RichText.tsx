import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Mini-balisage pour les contenus : **gras** et [libellé](lien).
 * Les liens internes passent par next/link, les autres par <a>.
 */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

export function renderRich(text: string): ReactNode {
  const parts = text.split(TOKEN).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href!.startsWith("/")) {
        return (
          <Link key={i} href={href!}>
            {label}
          </Link>
        );
      }
      const external = href!.startsWith("http");
      return (
        <a
          key={i}
          href={href}
          {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
        >
          {label}
          {external ? <span className="sr-only"> (nouvel onglet)</span> : null}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichText({ children, className }: { children: string; className?: string }) {
  return <p className={className}>{renderRich(children)}</p>;
}
