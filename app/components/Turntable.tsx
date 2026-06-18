"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * The signature moment: a soul 45 on the platter.
 * The record's rotation is coupled to scroll position (with spring momentum),
 * so the disc spins as you move through the page. Degrades to a still record
 * under prefers-reduced-motion.
 */
export default function Turntable() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, (v) => v * 0.32);
  const spin = useSpring(raw, { stiffness: 55, damping: 18, mass: 0.7 });
  const rotate = reduce ? 0 : spin;

  // grooves: concentric rings on the black vinyl
  const grooves = Array.from({ length: 13 }, (_, i) => 188 - i * 10);

  return (
    <div
      className="turntable-host"
      style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-12%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,45,126,0.18), transparent 62%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {/* spinning disc */}
        <motion.svg
          viewBox="0 0 440 440"
          width="100%"
          height="100%"
          style={{ rotate, transformOrigin: "50% 50%", display: "block" }}
          aria-label="A spinning soul 45 record"
          role="img"
        >
          <defs>
            <radialGradient id="vinyl" cx="50%" cy="42%" r="62%">
              <stop offset="0%" stopColor="#2c2230" />
              <stop offset="55%" stopColor="#15090f" />
              <stop offset="100%" stopColor="#080406" />
            </radialGradient>
            <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
              <stop offset="42%" stopColor="rgba(255,255,255,0)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,45,126,0.12)" />
            </linearGradient>
          </defs>

          {/* vinyl body */}
          <circle cx="220" cy="220" r="210" fill="url(#vinyl)" />
          {/* grooves */}
          {grooves.map((r) => (
            <circle
              key={r}
              cx="220"
              cy="220"
              r={r}
              fill="none"
              stroke="rgba(247,236,216,0.05)"
              strokeWidth="1"
            />
          ))}
          {/* light sheen */}
          <circle cx="220" cy="220" r="210" fill="url(#sheen)" />

          {/* center label */}
          <circle cx="220" cy="220" r="86" fill="#ff2d7e" />
          <circle
            cx="220"
            cy="220"
            r="86"
            fill="none"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="2"
          />
          <text
            x="220"
            y="180"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="13"
            letterSpacing="3"
            fill="#2a0413"
          >
            45 RPM
          </text>
          <text
            x="220"
            y="214"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight="900"
            fontSize="30"
            fill="#2a0413"
          >
            SoKo
          </text>
          <text
            x="220"
            y="244"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="2.5"
            fill="#2a0413"
          >
            SOUL · ORANGE NJ
          </text>
          <text
            x="220"
            y="266"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            letterSpacing="2"
            fill="rgba(42,4,19,0.7)"
          >
            SIDE A · TURN IT UP
          </text>
          {/* spindle hole */}
          <circle cx="220" cy="220" r="6" fill="#15090f" />
        </motion.svg>

        {/* tonearm (static) */}
        <svg
          viewBox="0 0 440 440"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          aria-hidden
        >
          <g stroke="#d9c9ae" strokeWidth="5" strokeLinecap="round" fill="none">
            <line x1="402" y1="58" x2="262" y2="196" />
          </g>
          <circle cx="402" cy="58" r="15" fill="#2f1a40" stroke="#d9c9ae" strokeWidth="3" />
          <rect
            x="250"
            y="186"
            width="26"
            height="20"
            rx="4"
            transform="rotate(45 263 196)"
            fill="#2f1a40"
            stroke="#d9c9ae"
            strokeWidth="3"
          />
        </svg>
      </motion.div>
    </div>
  );
}
