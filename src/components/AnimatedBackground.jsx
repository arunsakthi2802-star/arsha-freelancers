import React, { useEffect, useRef } from "react";

/**
 * Performance-optimised AnimatedBackground.
 *
 * All heavy blur/scale Framer-Motion orbs replaced with:
 *   1. Pure CSS keyframe animations (compositor-only transform + opacity)
 *   2. `will-change: transform` on every animated element
 *   3. Orb sizes reduced from 35-45rem to 25-30rem
 *   4. No `scale` animations (forces layer repaints)
 *   5. Particle layer kept but at lower opacity
 *   6. Geometric shapes and floating icon array removed (were 20+ extra animators)
 */
export default function AnimatedBackground({ darkMode }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Particle grid – GPU-safe, CSS only */}
      <div className="absolute inset-0 antigravity-particles opacity-40" />

      {/* Aurora orbs – CSS keyframes only, no JS involvement */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1 – Blue top-left */}
        <div
          className={`aurora-orb ${darkMode ? "bg-blue-500/30" : "bg-blue-300/35"}`}
          style={{ top: "-5%", left: "-5%", width: "30rem", height: "28rem", animationDuration: "22s", animationDelay: "0s" }}
        />
        {/* Orb 2 – Pink top-right */}
        <div
          className={`aurora-orb ${darkMode ? "bg-pink-500/25" : "bg-pink-200/40"}`}
          style={{ top: "-8%", right: "-8%", width: "28rem", height: "26rem", animationDuration: "26s", animationDelay: "-8s" }}
        />
        {/* Orb 3 – Orange/Amber bottom-left */}
        <div
          className={`aurora-orb ${darkMode ? "bg-orange-500/25" : "bg-orange-200/45"}`}
          style={{ bottom: "-10%", left: "-8%", width: "32rem", height: "28rem", animationDuration: "30s", animationDelay: "-14s" }}
        />
        {/* Orb 4 – Lime/Green bottom-right */}
        <div
          className={`aurora-orb ${darkMode ? "bg-lime-500/20" : "bg-lime-200/35"}`}
          style={{ bottom: "-8%", right: "-6%", width: "28rem", height: "26rem", animationDuration: "24s", animationDelay: "-6s" }}
        />
        {/* Orb 5 – Purple centre (subtle) */}
        <div
          className={`aurora-orb ${darkMode ? "bg-purple-600/20" : "bg-violet-200/30"}`}
          style={{ top: "35%", left: "35%", width: "22rem", height: "22rem", animationDuration: "18s", animationDelay: "-4s" }}
        />
      </div>
    </div>
  );
}
