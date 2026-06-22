"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import {
  BookOpen,
  FlaskConical,
  Calculator,
  ArrowRight,
  Zap,
  Trophy,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Card 1: CSCA Curriculum (tall) ─────────────────────── */
function CurriculumCard() {
  const subjects = [
    { icon: <Calculator className="size-4" />, label: "Mathematics", enabled: true },
    { icon: <FlaskConical className="size-4" />, label: "Chemistry", enabled: true },
    { icon: <Zap className="size-4" />, label: "Physics", enabled: true },
  ];

  return (
    <div className="flex h-full flex-col bg-white rounded-2xl p-6 shadow-sm ring-1 ring-black/5">
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: "oklch(0.62 0.18 275)" }}
      >
        <BookOpen className="size-5 text-white" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2">
        Fully CSCA-Aligned Curriculum
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        Every question, concept, and mock exam is built exactly around the official CSCA syllabus — no guesswork, no filler.
      </p>

      <div className="mt-auto space-y-3">
        {subjects.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between rounded-xl px-3 py-2.5"
            style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-2.5 text-sm font-medium text-gray-800">
              <span className="text-gray-500">{s.icon}</span>
              {s.label}
            </div>
            <Switch
              defaultChecked={s.enabled}
              className="data-[state=checked]:bg-[oklch(0.62_0.18_275)] pointer-events-none"
              tabIndex={-1}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <Link
          href="/register"
          className="inline-flex items-center gap-1 text-xs font-semibold"
          style={{ color: "oklch(0.52 0.22 275)" }}
        >
          Browse the full syllabus
          <ChevronRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

/* ── Card 2: Subjects covered ────────────────────────────── */
function SubjectsCard() {
  const items = [
    { icon: <Calculator className="size-4 text-blue-500" />, label: "Mathematics", bg: "bg-blue-50" },
    { icon: <Zap className="size-4 text-amber-500" />, label: "Physics", bg: "bg-amber-50" },
    { icon: <FlaskConical className="size-4 text-emerald-500" />, label: "Chemistry", bg: "bg-emerald-50" },
  ];

  return (
    <div className="flex h-full flex-col justify-between bg-white rounded-2xl p-5 shadow-sm ring-1 ring-black/5">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Coverage</p>
        <p className="text-sm font-semibold text-gray-800">All 3 CSCA Subjects</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {items.map((s) => (
          <div
            key={s.label}
            className={`flex flex-col items-center gap-1.5 flex-1 rounded-xl py-3 ${s.bg}`}
          >
            {s.icon}
            <span className="text-[10px] font-medium text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Card 3: 94% stat ────────────────────────────────────── */
function PassRateCard() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-white rounded-2xl shadow-sm ring-1 ring-black/5">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative z-10 text-center">
        <span
          className="font-bold leading-none"
          style={{ fontSize: "clamp(3.5rem, 10vw, 5rem)", color: "#111" }}
        >
          94%
        </span>
        <p className="mt-1 text-xs font-semibold text-gray-400 uppercase tracking-widest">Pass Rate</p>
      </div>
    </div>
  );
}

/* ── Card 4: Exam Readiness ──────────────────────────────── */
function ReadinessCard() {
  return (
    <div className="flex h-full flex-col justify-between bg-white rounded-2xl p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">Exam Readiness</p>
          <p className="text-xs text-gray-400 mt-0.5">Adaptive scoring</p>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ background: "rgba(34,197,94,0.12)", color: "rgb(21,128,61)" }}
        >
          <TrendingUp className="size-3" />
          Live
        </span>
      </div>
      <div>
        <span className="text-5xl font-bold text-gray-900">87%</span>
        <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: "87%", background: "oklch(0.62 0.18 275)" }}
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-400">Based on your last 5 sessions</p>
      </div>
    </div>
  );
}

/* ── Card 5: Students milestone ──────────────────────────── */
function StudentsCard() {
  return (
    <div className="flex h-full flex-col justify-end bg-white rounded-2xl p-5 shadow-sm ring-1 ring-black/5">
      <div
        className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold w-fit"
        style={{ background: "oklch(0.62 0.18 275 / 0.1)", color: "oklch(0.42 0.18 275)" }}
      >
        <Trophy className="size-3" />
        Milestone
      </div>
      <p className="text-2xl font-bold text-gray-900 leading-tight">
        12,847+
        <br />
        <span className="text-sm font-normal text-gray-400">students in China</span>
      </p>
    </div>
  );
}

/* ── Card 6: Quick Start ─────────────────────────────────── */
function QuickStartCard() {
  const actions = [
    { label: "Math Practice", subject: "Mathematics", color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
    { label: "Physics Drill", subject: "Physics", color: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
    { label: "Chemistry Test", subject: "Chemistry", color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
  ];

  return (
    <div className="flex h-full flex-col justify-between bg-white rounded-2xl p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-800">Quick Start</p>
          <p className="text-xs text-gray-400 mt-0.5">Jump straight into practice</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {actions.map((a) => (
            <Link
              key={a.label}
              href="/register"
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${a.color}`}
            >
              {a.label}
              <ArrowRight className="size-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */
export function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "#060f1a" }}>
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Why genzy
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4"
            style={{ color: "rgba(255,255,255,0.95)", fontFamily: "var(--font-display, 'Instrument Serif', serif)" }}
          >
            {isInView && (
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                transition={{ type: "spring", stiffness: 260, damping: 38 }}
              >
                Built differently, for one test.
              </VerticalCutReveal>
            )}
          </h2>
          <p className="text-lg max-w-[48ch]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Not a generic quiz app. Every feature exists to get you through the CSCA.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGridShowcase
          animate={isInView}
          integration={<CurriculumCard />}
          trackers={<SubjectsCard />}
          statistic={<PassRateCard />}
          focus={<ReadinessCard />}
          productivity={<StudentsCard />}
          shortcuts={<QuickStartCard />}
        />
      </div>
    </section>
  );
}
