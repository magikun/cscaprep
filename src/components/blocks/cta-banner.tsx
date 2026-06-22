"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function CtaBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32"
      style={{ background: "#060f1a" }}
    >
      {/* SVG grain noise */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <filter id="noise-cta-tw">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-cta-tw)" opacity="0.13" fill="white" />
      </svg>

      {/* Purple center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "oklch(0.62 0.18 275)",
          filter: "blur(160px)",
          opacity: 0.14,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Start your CSCA journey
          </span>
        </motion.div>

        {/* Main typewriter text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
        >
          <p
            className="font-normal leading-[1.1] tracking-tight mb-10"
            style={{
              fontFamily: "var(--font-display, 'Instrument Serif', serif)",
              fontSize: "clamp(2.6rem, 9vw, 5.5rem)",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {"you're born to "}
            {isInView && (
              <span style={{ color: "oklch(0.72 0.18 275)" }}>
                <Typewriter
                  text={[
                    "study with genzy",
                    "pass the CSCA",
                    "reach China",
                    "succeed",
                    "make history",
                  ]}
                  speed={60}
                  deleteSpeed={35}
                  waitTime={1800}
                  cursorChar="_"
                  cursorClassName=""
                  className="font-normal"
                />
              </span>
            )}
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg mb-10 leading-relaxed mx-auto max-w-[40ch]"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.25 }}
        >
          Join 12,000+ international students who prepared smarter and secured their place at a top Chinese university.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.35 }}
        >
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "oklch(0.62 0.18 275)" }}
          >
            Start Free <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#pricing"
            className="liquid-glass inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            See Pricing
          </Link>
        </motion.div>

        {/* Fine print */}
        <motion.p
          className="mt-6 text-xs"
          style={{ color: "rgba(255,255,255,0.2)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          No credit card required · Cancel anytime · 7-day money-back guarantee
        </motion.p>

      </div>
    </section>
  );
}
