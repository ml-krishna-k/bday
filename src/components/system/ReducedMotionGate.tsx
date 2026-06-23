"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Globally honors reduced-motion for all Framer Motion descendants. */
export function ReducedMotionGate({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion={reduced ? "always" : "user"}>{children}</MotionConfig>
  );
}
