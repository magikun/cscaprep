"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { CscaBentoCard } from "@/components/ui/csca-bento-card";
import { MagnifiedBento } from "@/components/ui/magnified-bento";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { Rocket, PiggyBank, Wind, Brain } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    title: "Faast",
    icon: Rocket,
    description: "Learn 10× and prep to CSCA faster than anyone.",
  },
  {
    title: "Cheap",
    icon: PiggyBank,
    description: "Better to prep with Prepify and save money for further purchases.",
  },
  {
    title: "Freedom",
    icon: Wind,
    description: "Solve whatever you want, wherever and whenever you want.",
  },
  {
    title: "Built-in AI",
    icon: Brain,
    description: "It can analyze and help you everywhere in any question.",
  },
] as const;

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
            Why prepify
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4"
            style={{ color: "rgba(255,255,255,0.95)", fontFamily: "var(--font-display, 'Instrument Serif', serif)" }}
          >
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 260, damping: 38 }}
              autoStart={isInView}
            >
              Built differently, for one test.
            </VerticalCutReveal>
          </h2>
          <p className="text-lg max-w-[48ch]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Not a generic quiz app. Every feature exists to get you through the CSCA.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.section
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 auto-rows-[minmax(160px,auto)]"
        >
          {/* 4 Feature Cards — col 1, all 3 rows */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } } }}
            className="md:col-span-1 md:row-span-3"
          >
            <div className="h-full rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
              <div className="flex flex-col divide-y divide-gray-100 h-full">
                {FEATURES.map((f, i) => (
                  <FeatureCard key={i} feature={f} className="flex-1" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* CscaBentoCard — cols 2-3, rows 1-2 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } } }}
            className="md:col-span-2 md:row-span-2 min-h-[320px]"
          >
            <CscaBentoCard />
          </motion.div>

          {/* MagnifiedBento — cols 2-3, row 3 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } } }}
            className="md:col-span-2 md:row-span-1"
          >
            <MagnifiedBento />
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
