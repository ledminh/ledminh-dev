"use client";

import Link from "next/link";

export default function LandingNav() {
  return (
    <>
      <nav className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-(--ink-soft) sm:justify-start">
        <Link
          className="rounded-lg border border-white/10 bg-white/10 px-5 py-2 hover:text-white"
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className="rounded-lg border border-white/10 bg-white/10 px-5 py-2 hover:text-white"
          href="/learning-journal"
        >
          Learning Journal
        </Link>
        <Link
          className="rounded-lg border border-white/10 bg-white/10 px-5 py-2 hover:text-white"
          href="/about"
        >
          About Me
        </Link>
      </nav>
    </>
  );
}
