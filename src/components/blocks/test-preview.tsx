"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Flag, ChevronRight } from "lucide-react";

const sampleQuestion = {
  text: "A car starts from rest and accelerates uniformly at 4 m/s². What distance does it cover in the first 5 seconds?",
  options: [
    "50 m",
    "20 m",
    "100 m",
    "25 m",
  ],
  correctIndex: 0,
  explanation:
    "Using the kinematic equation s = ½at², where a = 4 m/s² and t = 5 s: s = ½ × 4 × 5² = ½ × 4 × 25 = 50 m. Option B (20 m) results from omitting the ½ factor (s = at). Option C doubles the correct answer. Option D uses t instead of t² (s = ½ × 4 × 5).",
};

export function TestPreview() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  };

  const getOptionStyle = (i: number) => {
    if (!revealed)
      return selected === i
        ? "border-primary bg-primary/5"
        : "border-zinc-700 bg-zinc-800 hover:border-zinc-500 hover:bg-zinc-700 cursor-pointer";
    if (i === sampleQuestion.correctIndex) return "border-emerald-500 bg-emerald-500/10";
    if (i === selected) return "border-red-500 bg-red-500/10";
    return "border-zinc-700 bg-zinc-800 opacity-50";
  };

  return (
    <section ref={ref} className="py-20 bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block text-[oklch(0.78_0.14_275)]"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Try It Now
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Real Exam Question
          </motion.h2>
          <motion.p
            className="text-zinc-400 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Click an answer to reveal the explanation — just like the real test.
          </motion.p>
        </div>

        <motion.div
          className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Test header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-zinc-400">Section: Physics — Mechanics</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500 text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                <span>1:23:45 remaining</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flag className="size-4" />
                <span>Question 1 of 1</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <p className="text-white text-lg font-medium leading-relaxed mb-8">
              {sampleQuestion.text}
            </p>

            <div className="space-y-3">
              {sampleQuestion.options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl border text-sm text-zinc-200 transition-all duration-200 ${getOptionStyle(i)}`}
                  whileHover={!revealed ? { scale: 1.01 } : {}}
                  whileTap={!revealed ? { scale: 0.99 } : {}}
                >
                  <span className="font-semibold mr-3 text-zinc-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                  {revealed && i === sampleQuestion.correctIndex && (
                    <span className="ml-2 text-emerald-400 font-semibold">✓ Correct</span>
                  )}
                  {revealed && i === selected && i !== sampleQuestion.correctIndex && (
                    <span className="ml-2 text-red-400 font-semibold">✗ Incorrect</span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            {revealed && (
              <motion.div
                className="mt-6 rounded-xl bg-zinc-800 border border-zinc-700 p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                  Explanation
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {sampleQuestion.explanation}
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 border-t border-zinc-800 bg-zinc-900/50">
            <p className="text-sm text-zinc-400">
              40 questions · 4 subjects · Timed · Detailed explanations
            </p>
            <Button asChild>
              <Link href="/register">
                Try Full Test Free <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
