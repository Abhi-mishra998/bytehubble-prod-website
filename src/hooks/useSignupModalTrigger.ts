"use client";

import { useEffect, useRef, useState } from "react";
import { storage } from "@/utils/storage";

export function useSignupModalTrigger() {
  const [show, setShow] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (storage.hasSeenSignupModal()) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      storage.markSignupModalSeen();
      setShow(true);
    };

    // ⏱ 30 seconds
    const timer = setTimeout(trigger, 30_000);

    // 📜 60% scroll
    const onScroll = () => {
      const pct =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;
      if (pct >= 0.6) trigger();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    storage.markSignupModalSeen();
    setShow(false);
  };

  // expose for manual testing
  const forceShow = () => setShow(true);

  return { show, dismiss, forceShow };
}
