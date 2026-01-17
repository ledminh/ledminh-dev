"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbProps = {
  className?: string;
};

const hiddenSegments = new Set(["entries"]);

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Breadcrumb({ className = "" }: BreadcrumbProps) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  const visibleSegments = segments
    .map((segment, index) => {
      if (hiddenSegments.has(segment)) {
        return null;
      }
      return {
        label: formatSegment(segment),
        href: `/${segments.slice(0, index + 1).join("/")}`,
      };
    })
    .filter(
      (segment): segment is { label: string; href: string } => Boolean(segment),
    );

  const crumbs = [{ label: "Home", href: "/" }, ...visibleSegments];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`absolute left-6 top-6 text-xs uppercase tracking-[0.18em] text-(--ink-soft) sm:left-10 sm:top-8 ${className}`.trim()}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li className="flex items-center gap-2" key={crumb.href}>
              {isLast ? (
                <span className="text-(--ink)">{crumb.label}</span>
              ) : (
                <Link
                  className="transition hover:text-(--accent)"
                  href={crumb.href}
                >
                  {crumb.label}
                </Link>
              )}
              {isLast ? null : <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
