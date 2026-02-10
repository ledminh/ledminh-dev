"use client";

import { useEffect } from "react";

export default function HomeScrollLock() {
  useEffect(() => {
    const isMobileOrTouch =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (!isMobileOrTouch) {
      return;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehaviorY;
    const previousHtmlOverscroll = documentElement.style.overscrollBehaviorY;

    body.style.overflow = "hidden";
    body.style.overscrollBehaviorY = "none";
    documentElement.style.overscrollBehaviorY = "none";

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehaviorY = previousBodyOverscroll;
      documentElement.style.overscrollBehaviorY = previousHtmlOverscroll;
    };
  }, []);

  return null;
}
