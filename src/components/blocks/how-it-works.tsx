"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Sign up free in 30 seconds. No credit card required. Get instant access to 2 full practice tests and core study materials — covering Chinese language, math, science, and humanities.",
    detail: "30-second signup",
  },
  {
    number: "02",
    title: "Study & Practice",
    description:
      "Work through structured materials organized by CSCA subject. Take timed tests, review detailed explanations, and track your weak areas with subject-by-subject analytics.",
    detail: "Avg. 3-week prep time",
  },
  {
    number: "03",
    title: "Pass & Study in China",
    description:
      "Walk into your CSCA exam with confidence. Our students consistently score above the required threshold on their first attempt and secure CSC scholarship placements.",
    detail: "94% first-attempt pass rate",
  },
];

function SignupCard() {
  return (
    <div
      className="w-full rounded-2xl border bg-white p-5"
      style={{ boxShadow: "0 20px 48px -12px rgba(0,0,0,0.12)" }}
    >
      <div className="text-sm font-semibold text-zinc-900 mb-4">Create your account</div>

      <div className="space-y-2.5 mb-4">
        <div className="rounded-lg border bg-zinc-50 px-3 py-2.5 text-xs text-zinc-400">
          your@email.com
        </div>
        <div className="rounded-lg border bg-zinc-50 px-3 py-2.5 text-xs text-zinc-300">
          ••••••••
        </div>
      </div>

      <div
        className="w-full rounded-lg py-2.5 text-xs font-semibold text-white text-center"
        style={{ background: "oklch(0.62 0.18 275)" }}
      >
        Get Started Free
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className="h-px flex-1 bg-zinc-100" />
        <span className="text-[10px] text-zinc-400">or continue with</span>
        <div className="h-px flex-1 bg-zinc-100" />
      </div>

      <div className="mt-3 rounded-lg border py-2 text-xs text-zinc-500 text-center font-medium">
        Google
      </div>

      <div className="text-[10px] text-zinc-400 text-center mt-3">
        No credit card required
      </div>
    </div>
  );
}

function StudyCard({ isInView }: { isInView: boolean }) {
  const domains = [
    { name: "Mathematics", pct: 89, color: "oklch(0.62 0.18 275)" },
    { name: "Physics", pct: 62, color: "oklch(0.72 0.13 190)" },
    { name: "Chemistry", pct: 74, color: "#E57373" },
  ];

  return (
    <div
      className="w-full rounded-2xl border bg-white p-5"
      style={{ boxShadow: "0 20px 48px -12px rgba(0,0,0,0.12)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Study Session
        </span>
        <span className="text-[10px] font-medium text-zinc-400">Day 12</span>
      </div>

      <div className="text-sm font-semibold text-zinc-900 mb-0.5">Physics</div>
      <div className="text-[11px] text-zinc-500 mb-4">Chapter 3: Mechanics & Motion</div>

      <div className="space-y-2.5">
        {domains.map((d, idx) => (
          <div key={d.name}>
            <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
              <span className="truncate">{d.name}</span>
              <span className="font-semibold tabular-nums ml-2">{d.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: d.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${d.pct}%` } : {}}
                transition={{
                  duration: 0.9,
                  ease: EASE_OUT_EXPO,
                  delay: 0.5 + idx * 0.12,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-dashed p-3 flex items-center gap-2.5">
        <div
          className="size-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: "oklch(0.62 0.18 275 / 0.1)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v5.5l3 1.5"
              stroke="oklch(0.62 0.18 275)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="6" cy="6" r="5" stroke="oklch(0.62 0.18 275)" strokeWidth="1.5" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-zinc-800">Resume Practice</div>
          <div className="text-[10px] text-zinc-400">40 questions · 2h</div>
        </div>
      </div>
    </div>
  );
}

function ResultsCard() {
  return (
    <div
      className="w-full rounded-2xl border bg-white p-5"
      style={{ boxShadow: "0 20px 48px -12px rgba(0,0,0,0.12)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="size-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path
              d="M1.5 5.5L5 9L12.5 1.5"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-600 tracking-wide">PASSED</div>
          <div className="text-[10px] text-zinc-400">CSCA Certification Exam</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[2.8rem] font-bold leading-none text-zinc-900 tabular-nums">
          91
          <span className="text-xl font-medium text-zinc-400">/100</span>
        </div>
        <div className="text-xs text-zinc-500 mt-1">Top 12% of candidates</div>
      </div>

      <div className="space-y-0 border rounded-xl overflow-hidden">
        {[
          { domain: "Mathematics", score: 95 },
          { domain: "Physics", score: 89 },
          { domain: "Chemistry", score: 92 },
        ].map((d) => (
          <div
            key={d.domain}
            className="flex items-center justify-between px-3 py-2 text-[11px] border-b last:border-0"
          >
            <span className="text-zinc-500">{d.domain}</span>
            <span className="font-semibold text-zinc-700 tabular-nums">{d.score}%</span>
          </div>
        ))}
      </div>

      <div
        className="mt-4 rounded-lg py-2 text-[11px] font-semibold text-white text-center"
        style={{ background: "oklch(0.62 0.18 275)" }}
      >
        Download Certificate
      </div>
    </div>
  );
}

const stepVisuals: Array<(props: { isInView: boolean }) => React.ReactElement> = [
  () => <SignupCard />,
  ({ isInView }) => <StudyCard isInView={isInView} />,
  () => <ResultsCard />,
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" ref={ref} className="py-24" style={{ background: "#060f1a" }}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block" style={{ color: "rgba(255,255,255,0.35)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            Simple Process
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Poppins', sans-serif" }}>
            {isInView && (
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                transition={{ type: "spring", stiffness: 260, damping: 38 }}
              >
                How It Works
              </VerticalCutReveal>
            )}
          </h2>
          <motion.p
            className="text-lg max-w-[48ch]" style={{ color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.18 }}
          >
            Three steps to exam success. Most students are ready in three weeks.
          </motion.p>
        </div>

        {/* Zig-zag steps */}
        <div className="space-y-20 md:space-y-24">
          {steps.map((step, i) => {
            const StepVisual = stepVisuals[i];
            return (
              <motion.div
                key={step.number}
                className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.14 }}
              >
                {/* Visual side */}
                <div className="w-full md:flex-1 flex items-center justify-center min-h-[260px] relative">
                  {/* Ghost number */}
                  <span
                    className="absolute select-none font-bold leading-none pointer-events-none"
                    style={{
                      fontSize: "clamp(7rem, 16vw, 11rem)",
                      color: "rgba(255,255,255,0.04)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {step.number}
                  </span>
                  {/* Contextual UI card */}
                  <div className="relative z-10 w-full">
                    <StepVisual isInView={isInView} />
                  </div>
                </div>

                {/* Text side */}
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Step {step.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-normal mb-4 tracking-tight" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Poppins', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed mb-5 max-w-[44ch]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3.5 py-1.5" style={{ color: "rgba(255,255,255,0.35)", border: "1px dashed rgba(255,255,255,0.15)" }}>
                    <span
                      className="size-1.5 rounded-full flex-shrink-0"
                      style={{ background: "oklch(0.62 0.18 275)" }}
                    />
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
