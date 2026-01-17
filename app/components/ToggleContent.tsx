"use client";

import { useState } from "react";

export default function ToggleContent({
  children,
  buttonTextExpanded = "Read less",
  buttonTextCollapsed = "Read more",
}: {
  children: React.ReactNode;
  buttonTextExpanded?: string;
  buttonTextCollapsed?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-6 text-(--ink-soft)">
      <div className={`space-y-4 ${expanded ? "" : "about-clamp"}`}>
        {children}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <button
          className="font-semibold text-(--accent) underline underline-offset-4 transition hover:text-(--accent-2)"
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? buttonTextExpanded : buttonTextCollapsed}
        </button>
      </div>
    </div>
  );
}
