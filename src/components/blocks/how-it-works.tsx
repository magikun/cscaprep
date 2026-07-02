"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
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

/* Shared card shell: white surface + gentle hover lift. Cards stay white per CLAUDE.md. */
const CARD_SHADOW = "0 20px 48px -12px rgba(0,0,0,0.12)";
const cardHover = { y: -4, transition: { duration: 0.25, ease: "easeOut" as const } };

// Subject accents — keep in sync with the Features section + analytics chart.
const SUBJECT_COLORS = {
  Mathematics: "#9B99FE",
  Physics: "#2BC8B7",
  Chemistry: "#F5A623",
} as const;

const DEMO_EMAIL = "amara@student.com";
const PASSWORD_LENGTH = 8;

function SignupCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [typed, setTyped] = useState(0); // characters of DEMO_EMAIL shown
  const [dots, setDots] = useState(0); // password dots filled
  const [submitted, setSubmitted] = useState(false);

  // Scripted signup: type email → fill password → button submits.
  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= DEMO_EMAIL.length; i++) {
      timers.push(setTimeout(() => setTyped(i), 400 + i * 55));
    }
    const emailDone = 400 + DEMO_EMAIL.length * 55;
    for (let i = 1; i <= PASSWORD_LENGTH; i++) {
      timers.push(setTimeout(() => setDots(i), emailDone + 250 + i * 70));
    }
    timers.push(setTimeout(() => setSubmitted(true), emailDone + 250 + PASSWORD_LENGTH * 70 + 500));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const typingEmail = typed > 0 && typed < DEMO_EMAIL.length;
  const typingPassword = typed >= DEMO_EMAIL.length && dots < PASSWORD_LENGTH && !submitted;

  return (
    <motion.div
      ref={ref}
      whileHover={cardHover}
      className="w-full rounded-2xl border bg-white p-5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <div className="text-sm font-semibold text-zinc-900 mb-4">Create your account</div>

      <div className="space-y-2.5 mb-4">
        {/* Email field — border glows while "typing" */}
        <div
          className="rounded-lg border bg-zinc-50 px-3 py-2.5 text-xs transition-all duration-300"
          style={{
            borderColor: typingEmail ? "oklch(0.62 0.18 275 / 0.5)" : undefined,
            boxShadow: typingEmail ? "0 0 0 3px oklch(0.62 0.18 275 / 0.1)" : undefined,
          }}
        >
          {typed === 0 ? (
            <span className="text-zinc-400">your@email.com</span>
          ) : (
            <span className="text-zinc-700">{DEMO_EMAIL.slice(0, typed)}</span>
          )}
          {typingEmail && (
            <motion.span
              className="inline-block w-px h-3 align-middle ml-px"
              style={{ background: "oklch(0.62 0.18 275)" }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>
        {/* Password field — dots darken one by one */}
        <div
          className="rounded-lg border bg-zinc-50 px-3 py-2.5 text-xs transition-all duration-300"
          style={{
            borderColor: typingPassword ? "oklch(0.62 0.18 275 / 0.5)" : undefined,
            boxShadow: typingPassword ? "0 0 0 3px oklch(0.62 0.18 275 / 0.1)" : undefined,
          }}
        >
          <span className="text-zinc-700 tracking-wider">{"•".repeat(dots)}</span>
          <span className="text-zinc-300 tracking-wider">{"•".repeat(PASSWORD_LENGTH - dots)}</span>
        </div>
      </div>

      {/* CTA — presses and confirms once the form is "filled" */}
      <motion.div
        className="w-full rounded-lg py-2.5 text-xs font-semibold text-white text-center overflow-hidden"
        style={{ background: submitted ? "#10b981" : "oklch(0.62 0.18 275)", transition: "background 0.4s ease" }}
        animate={submitted ? { scale: [1, 0.96, 1] } : {}}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.span
              key="done"
              className="inline-flex items-center gap-1.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <svg width="10" height="8" viewBox="0 0 14 11" fill="none">
                <motion.path
                  d="M1.5 5.5L5 9L12.5 1.5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                />
              </svg>
              Account created
            </motion.span>
          ) : (
            <motion.span key="cta" exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
              Get Started Free
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center gap-2 mt-4">
        <div className="h-px flex-1 bg-zinc-100" />
        <span className="text-[10px] text-zinc-400">or continue with</span>
        <div className="h-px flex-1 bg-zinc-100" />
      </div>

      <div className="mt-3 rounded-lg border py-2 text-xs text-zinc-500 text-center font-medium inline-flex w-full items-center justify-center gap-2">
        <svg width="12" height="12" viewBox="0 0 48 48" aria-hidden>
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
        </svg>
        Google
      </div>

      <div className="text-[10px] text-zinc-400 text-center mt-3">
        No credit card required
      </div>
    </motion.div>
  );
}

function StudyCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const domains = [
    { name: "Mathematics", pct: 89, color: SUBJECT_COLORS.Mathematics },
    { name: "Physics", pct: 62, color: SUBJECT_COLORS.Physics },
    { name: "Chemistry", pct: 74, color: SUBJECT_COLORS.Chemistry },
  ];

  return (
    <motion.div
      ref={ref}
      whileHover={cardHover}
      className="w-full rounded-2xl border bg-white p-5"
      style={{ boxShadow: CARD_SHADOW }}
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
              <span className="truncate flex items-center gap-1.5">
                <span className="size-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                {d.name}
              </span>
              <span className="font-semibold tabular-nums ml-2">
                {inView ? <NumberFlow value={d.pct} /> : "0"}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: d.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${d.pct}%` } : {}}
                transition={{
                  duration: 0.9,
                  ease: EASE_OUT_EXPO,
                  delay: 0.35 + idx * 0.15,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-dashed p-3 flex items-center gap-2.5">
        <motion.div
          className="size-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: "oklch(0.62 0.18 275 / 0.1)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
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
        </motion.div>
        <div>
          <div className="text-[11px] font-semibold text-zinc-800">Resume Practice</div>
          <div className="text-[10px] text-zinc-400">40 questions · 2h</div>
        </div>
      </div>
    </motion.div>
  );
}

function ResultsCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scores = [
    { domain: "Mathematics", score: 95, color: SUBJECT_COLORS.Mathematics },
    { domain: "Physics", score: 89, color: SUBJECT_COLORS.Physics },
    { domain: "Chemistry", score: 92, color: SUBJECT_COLORS.Chemistry },
  ];

  return (
    <motion.div
      ref={ref}
      whileHover={cardHover}
      className="w-full rounded-2xl border bg-white p-5"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        {/* Badge pops in, then the check draws itself */}
        <motion.div
          className="size-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.15 }}
        >
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <motion.path
              d="M1.5 5.5L5 9L12.5 1.5"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.4 }}
            />
          </svg>
        </motion.div>
        <div>
          <div className="text-xs font-bold text-emerald-600 tracking-wide">PASSED</div>
          <div className="text-[10px] text-zinc-400">CSCA Certification Exam</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[2.8rem] font-bold leading-none text-zinc-900 tabular-nums">
          {inView ? <NumberFlow value={91} /> : "0"}
          <span className="text-xl font-medium text-zinc-400">/100</span>
        </div>
        <div className="text-xs text-zinc-500 mt-1">Top 12% of candidates</div>
      </div>

      <div className="space-y-0 border rounded-xl overflow-hidden">
        {scores.map((d, i) => (
          <motion.div
            key={d.domain}
            className="flex items-center justify-between px-3 py-2 text-[11px] border-b last:border-0"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.5 + i * 0.12 }}
          >
            <span className="text-zinc-500 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              {d.domain}
            </span>
            <span className="font-semibold text-zinc-700 tabular-nums">
              {inView ? <NumberFlow value={d.score} /> : "0"}%
            </span>
          </motion.div>
        ))}
      </div>

      <div
        className="mt-4 rounded-lg py-2 text-[11px] font-semibold text-white text-center"
        style={{ background: "oklch(0.62 0.18 275)" }}
      >
        Download Certificate
      </div>
    </motion.div>
  );
}

const stepVisuals: Array<() => React.ReactElement> = [
  () => <SignupCard />,
  () => <StudyCard />,
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
                    <StepVisual />
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
