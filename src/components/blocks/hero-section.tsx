"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const progressBars = [
  { name: "Mathematics", score: 92, color: "oklch(0.62 0.18 275)" },
  { name: "Physics", score: 78, color: "oklch(0.72 0.13 190)" },
  { name: "Chemistry", score: 85, color: "#E57373" },
];

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.25 }}
      className="relative hidden lg:block"
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-8 -z-10 rounded-3xl opacity-25"
        style={{
          background: "radial-gradient(ellipse at center, oklch(0.62 0.18 275) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Perpetual float */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <div
          className="rounded-2xl border bg-white overflow-hidden"
          style={{ boxShadow: "0 24px 64px -16px rgba(0,0,0,0.14), 0 0 0 1px oklch(0.91 0.01 275)" }}
        >
          {/* Window chrome */}
          <div className="h-9 bg-zinc-50 border-b flex items-center px-4 gap-2 flex-shrink-0">
            <div className="size-2.5 rounded-full bg-rose-400/80" />
            <div className="size-2.5 rounded-full bg-amber-400/80" />
            <div className="size-2.5 rounded-full bg-emerald-400/80" />
            <div className="ml-4 h-4 w-36 rounded-full bg-zinc-200/70" />
          </div>

          {/* App shell */}
          <div className="flex" style={{ height: 400 }}>
            {/* Sidebar */}
            <div className="w-44 border-r bg-zinc-50/60 p-3 space-y-0.5 flex-shrink-0">
              {["Dashboard", "Tests", "Materials", "Progress", "Profile"].map((item, i) => (
                <div
                  key={item}
                  className={`h-8 rounded-lg flex items-center px-3 text-xs font-medium ${
                    i === 1 ? "text-white" : "text-zinc-400"
                  }`}
                  style={i === 1 ? { background: "oklch(0.62 0.18 275)" } : {}}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-5 space-y-3 overflow-hidden">
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Tests Done", val: "8", color: "oklch(0.62 0.18 275)" },
                  { label: "Avg Score", val: "87%", color: "oklch(0.72 0.13 190)" },
                  { label: "Streak", val: "5d", color: "#E57373" },
                  { label: "Pass Prob.", val: "94%", color: "#F5C344" },
                ].map((s, idx) => (
                  <motion.div
                    key={s.label}
                    className="rounded-xl border p-3 bg-white"
                    animate={{ opacity: [1, 0.75, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: idx * 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-[10px] text-zinc-400 mb-1">{s.label}</div>
                    <div className="text-xl font-semibold tabular-nums" style={{ color: s.color }}>
                      {s.val}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-xl border p-3.5">
                <div className="text-[10px] font-semibold text-zinc-400 mb-2.5 uppercase tracking-wider">
                  Domain Progress
                </div>
                {progressBars.map((t, idx) => (
                  <div key={t.name} className="flex items-center gap-2.5 py-1.5">
                    <div className="text-[11px] text-zinc-600 flex-1 truncate">{t.name}</div>
                    <div className="text-[11px] font-semibold tabular-nums w-8 text-right">{t.score}%</div>
                    <div className="h-1.5 w-16 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: t.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${t.score}%` }}
                        transition={{
                          duration: 0.9,
                          ease: EASE_OUT_EXPO,
                          delay: 1.0 + idx * 0.18,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl border p-3.5"
                style={{
                  borderColor: "oklch(0.62 0.18 275 / 0.2)",
                  background: "oklch(0.62 0.18 275 / 0.03)",
                }}
              >
                <div className="text-[10px] text-zinc-500 mb-0.5 font-medium">Next recommended</div>
                <div className="text-xs font-semibold text-zinc-900">
                  Next: Chemistry — Organic Compounds
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">40 questions · 90 min</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-white min-h-[100dvh] flex items-center relative">
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, oklch(0.62 0.18 275 / 0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.13 190 / 0.12) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 lg:py-24">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 xl:gap-20 items-center">

          {/* Left column: content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-7">
                <span className="size-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-primary">#1 CSCA Exam Prep Platform</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-semibold leading-[1.08] tracking-tight text-balance mb-6"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.08 }}
            >
              Ace the CSCA and Study in China
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-[52ch] mb-9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.16 }}
            >
              The only prep platform built specifically for the China Scholastic Competency Assessment — real-format practice tests, structured materials, and subject analytics trusted by 12,000+ international students.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.22 }}
            >
              <Button
                asChild
                size="lg"
                className="active:scale-[0.97] active:-translate-y-px transition-transform duration-100"
              >
                <Link href="/register">
                  Start Free <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="active:scale-[0.97] transition-transform duration-100"
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </motion.div>

            {/* Social proof stats */}
            <motion.div
              className="flex flex-wrap gap-8 pt-4 border-t border-dashed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.38 }}
            >
              {[
                { val: "12,847+", label: "Students prepared" },
                { val: "94%", label: "First-attempt pass rate" },
                { val: "2,400+", label: "Practice questions" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-primary tabular-nums">{stat.val}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="mt-5 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Free plan available — no credit card required
            </motion.p>
          </div>

          {/* Right column: dashboard mockup */}
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
