"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function CtaBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24"
      style={{ background: "oklch(0.52 0.22 275)" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Top-right decorative arc */}
      <svg
        className="absolute top-0 right-0 opacity-10 pointer-events-none"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="400" cy="0" r="300" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="400" cy="0" r="200" stroke="white" strokeWidth="1" fill="none" />
      </svg>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-center">

          {/* Left: anchor stat */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <div
              className="text-[5rem] md:text-[6rem] font-bold leading-none tracking-tight text-white/90 tabular-nums"
            >
              94%
            </div>
            <div className="text-white/60 text-sm mt-2 font-medium">
              first-attempt pass rate
            </div>
            <div className="mt-5 h-px w-16 bg-white/25" />
            <div className="text-white/50 text-xs mt-4 leading-relaxed">
              Industry average: 68%
            </div>
          </motion.div>

          {/* Right: CTA */}
          <div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-5 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
            >
              {isInView && (
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.09}
                  staggerFrom="first"
                  transition={{ type: "spring", stiffness: 260, damping: 38, delay: 0.15 }}
                >
                  Ready to Pass the CSCA and Study in China?
                </VerticalCutReveal>
              )}
            </motion.h2>

            <motion.p
              className="text-white/75 text-lg mb-8 leading-relaxed max-w-[44ch]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
            >
              Join 12,000+ international students who prepared smarter and secured their place at a top Chinese university. Start free — upgrade anytime.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.28 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-[oklch(0.52_0.22_275)] font-semibold hover:bg-zinc-50 active:scale-[0.97] transition-transform duration-100"
              >
                <Link href="/register">
                  Start Free <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-white/40 text-white bg-white/10 hover:bg-white/20 active:scale-[0.97] transition-transform duration-100"
              >
                <Link href="#pricing">See Pricing</Link>
              </Button>
            </motion.div>

            <motion.p
              className="mt-5 text-xs text-white/40"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              No credit card required · Cancel anytime · 7-day money-back guarantee
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
