"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { ChartNoAxesCombined, TrendingUp, Users, ArrowRight } from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    color: "bg-blue-600",
    Icon: ChartNoAxesCombined,
    value: 94,
    suffix: "%",
    title: "First-Attempt Pass Rate",
    desc: "Our students consistently pass the CSCA on their first attempt, vs. 68% industry average.",
    cta: "See student outcomes",
    href: "#testimonials",
  },
  {
    color: "bg-emerald-600",
    Icon: Users,
    value: 12847,
    suffix: "+",
    title: "Students Prepared",
    desc: "From 40+ countries now studying at Chinese universities on CSC scholarships.",
    cta: "Read student stories",
    href: "#testimonials",
  },
  {
    color: "bg-fuchsia-700",
    Icon: TrendingUp,
    value: 2400,
    suffix: "+",
    title: "Practice Questions",
    desc: "Across Mathematics, Physics, and Chemistry — every CSCA subject fully covered.",
    cta: "Browse question bank",
    href: "/register",
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest mb-4 block text-primary">
            By the Numbers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
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
          <p className="text-lg text-muted-foreground max-w-[48ch]">
            Numbers that reflect real student outcomes — not marketing projections.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`group relative rounded-2xl overflow-hidden shadow-lg ${card.color} flex flex-col min-h-[320px]`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.12 + i * 0.14 }}
              whileHover={{ y: -5 }}
              // @ts-ignore
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              {/* Ghost ordinal */}
              <span
                className="absolute top-0 right-2 leading-none font-bold select-none pointer-events-none tabular-nums"
                style={{
                  fontSize: "clamp(6rem, 16vw, 9rem)",
                  color: "rgba(255,255,255,0.07)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Card content */}
              <div className="relative z-10 flex flex-col flex-1 pt-6 px-0 pb-0">
                {/* Icon */}
                <div className="px-6 mb-5">
                  <card.Icon className="size-7 text-white/50" />
                </div>

                {/* Thin rule */}
                <div className="mx-6 mb-5 h-px bg-white/15" />

                {/* Stat value */}
                <div className="px-6 flex-1">
                  <div
                    className="text-white font-bold tabular-nums leading-none mb-5"
                    style={{ fontSize: "clamp(2.75rem, 7vw, 3.75rem)" }}
                  >
                    {isInView ? <NumberFlow value={card.value} /> : "0"}
                    <span>{card.suffix}</span>
                  </div>
                  <div className="text-white text-base font-semibold mb-1.5 leading-snug">
                    {card.title}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* CTA bar */}
                <Link
                  href={card.href}
                  className="mt-6 w-full bg-black/80 group-hover:bg-black/90 transition-colors duration-200 px-6 py-4 flex items-center justify-between"
                >
                  <span className="text-white text-sm font-medium">{card.cta}</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 size-4 text-white/70" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
