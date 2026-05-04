"use client";

import { useEffect, useRef, useState } from "react";
import { quickPopupStorage } from "@/utils/storage";

/**
 * Triggers the bottom-right QuickLeadPopup.
 *
 * Fires when EITHER:
 *   - User has scrolled ≥ 70% of the page (staggered above SignupModal's 60%)
 *   - 45 seconds have elapsed on the page
 *
 * Stores a permanent flag in localStorage so it only ever shows once.
 * Clear with clearAllPopupFlags() in browser console to reset.
 */
export function useSignupTrigger() {
  const [show, setShow] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    // Already dismissed permanently — never show again
    if (quickPopupStorage.hasSeen()) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      quickPopupStorage.markSeen();
      setShow(true);
    };

    // ⏱ Time trigger — 45 seconds (staggered after SignupModal's 30s)
    const timer = setTimeout(trigger, 45_000);

    // 📜 Scroll trigger — 70% (staggered after SignupModal's 60%)
    const onScroll = () => {
      const pct =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;
      if (pct >= 0.7) trigger();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    quickPopupStorage.markSeen();
    setShow(false);
  };

  return { show, setShow, dismiss };
}
