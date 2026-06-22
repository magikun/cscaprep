"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { openWaitlist } from "@/lib/waitlist";
import NumberFlow from "@number-flow/react";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import DisplayCards from "@/components/ui/display-cards";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Progress Metric Card ────────────────────────────────── */
function ProgressMetricCard({ isInView }: { isInView: boolean }) {
  const pts = [58, 60, 56, 63, 68, 66, 72, 76, 79, 83, 86, 90, 88, 93, 97, 100];
  const W = 200, H = 56;
  const coords: [number, number][] = pts.map((v, i) => [
    (i / (pts.length - 1)) * W,
    H - (v / 100) * H,
  ]);
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;

  return (
    <div
      className="flex flex-col h-full rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Students Prepared
        </span>
        <span
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(34,197,94,0.15)", color: "rgb(74,222,128)" }}
        >
          <TrendingUp className="size-3" />
          +32%
        </span>
      </div>

      {/* Big number */}
      <div
        className="font-bold tabular-nums leading-none mb-1 text-white"
        style={{ fontSize: "clamp(2.4rem, 6vw, 3.4rem)" }}
      >
        {isInView ? <NumberFlow value={12847} /> : "0"}
        <span className="text-3xl">+</span>
      </div>
      <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
        From 40+ countries, now studying in China
      </p>

      {/* Sparkline */}
      <div className="flex-1 flex flex-col justify-end">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full mb-1"
          style={{ height: 64 }}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.18 275)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.62 0.18 275)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#spark-grad)" />
          <path
            d={line}
            fill="none"
            stroke="oklch(0.62 0.18 275)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex justify-between text-xs mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>
          <span>2022</span><span>2023</span><span>2024</span><span>2025</span>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="#testimonials"
        className="flex items-center gap-1.5 text-sm font-medium group w-fit"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        Read student stories
        <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

/* ── Noise CTA Card ──────────────────────────────────────── */
function NoiseCTACard({ isInView }: { isInView: boolean }) {
  return (
    <div
      className="relative flex flex-col justify-between p-6 rounded-2xl h-full overflow-hidden"
      style={{ background: "#060f1a", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* SVG grain noise */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <filter id="noise-stats">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-stats)" opacity="0.18" fill="white" />
      </svg>

      {/* Purple glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-60px",
          right: "-60px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "oklch(0.62 0.18 275)",
          filter: "blur(90px)",
          opacity: 0.28,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-1.5 mb-6 text-xs uppercase tracking-widest font-semibold"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <Zap className="size-3" />
          Question Bank
        </div>

        <div
          className="font-bold tabular-nums leading-none mb-2 text-white"
          style={{ fontSize: "clamp(2.4rem, 6vw, 3.4rem)" }}
        >
          {isInView ? <NumberFlow value={2400} /> : "0"}
          <span className="text-3xl">+</span>
        </div>
        <div className="text-base font-semibold text-white mb-1.5">
          Practice Questions
        </div>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
          Across Mathematics, Physics, and Chemistry — every CSCA subject fully covered.
        </p>
      </div>

      {/* CTA button */}
      <div className="relative z-10">
        <button
          onClick={openWaitlist}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
          style={{ background: "oklch(0.62 0.18 275)" }}
        >
          Browse question bank
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────── */
export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20" style={{ background: "#060f1a" }}>
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            By the Numbers
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            {isInView && (
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                transition={{ type: "spring", stiffness: 260, damping: 38 }}
              >
                Proven Results
              </VerticalCutReveal>
            )}
          </h2>
          <p className="text-lg max-w-[48ch]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Numbers that reflect real student outcomes — not marketing projections.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* Card 1 — Display Cards (achievement stack) */}
          <motion.div
            className="flex flex-col items-center justify-center rounded-2xl overflow-hidden min-h-[380px] py-10"
            style={{ background: "#060f1a", border: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.12 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-8"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Student Achievements
            </p>
            <DisplayCards />
          </motion.div>

          {/* Card 2 — Progress Metric */}
          <motion.div
            className="min-h-[380px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.26 }}
          >
            <ProgressMetricCard isInView={isInView} />
          </motion.div>

          {/* Card 3 — Noise CTA */}
          <motion.div
            className="min-h-[380px]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.4 }}
          >
            <NoiseCTACard isInView={isInView} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
