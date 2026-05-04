"use client";

import { useState, useRef, useCallback } from "react";

interface UseMarqueeOptions {
  duration?: number;
}

interface UseMarqueeReturn<T> {
  paused: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  duplicatedItems: T[];
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  animationStyle: React.CSSProperties;
  animationTransition: object;
}

export function useMarquee<T>(items: T[], options: UseMarqueeOptions = {}): UseMarqueeReturn<T> {
  const { duration = 30 } = options;
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items];

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);

  const animationStyle: React.CSSProperties = {
    animationPlayState: paused ? "paused" : "running",
  };

  const animationTransition = {
    x: {
      repeat: Infinity,
      repeatType: "loop" as const,
      duration: paused ? 999999 : duration,
      ease: "linear",
    },
  };

  return {
    paused,
    containerRef,
    duplicatedItems,
    handleMouseEnter,
    handleMouseLeave,
    animationStyle,
    animationTransition,
  };
}

