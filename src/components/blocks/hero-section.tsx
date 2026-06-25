"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, CheckCircle, Clock } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";

type State = "idle" | "expanded" | "loading" | "success" | "duplicate";

const CONFETTI_COLORS = ["#9B99FE", "#2BC8B7", "#fff", "#c4b5fd", "#6ee7b7"];

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      x: (Math.random() - 0.5) * 320,
      y: -(80 + Math.random() * 160),
      rotate: Math.random() * 720 - 360,
      size: 6 + Math.random() * 6,
      delay: Math.random() * 0.25,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size * 0.5, background: p.color, top: "50%", left: "50%" }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 1.1, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => {
      setState("expanded");
      setTimeout(() => inputRef.current?.focus(), 320);
    };
    window.addEventListener("prepify:open-waitlist", handler);
    return () => window.removeEventListener("prepify:open-waitlist", handler);
  }, []);

  const handleExpand = () => {
    setState("expanded");
    setTimeout(() => inputRef.current?.focus(), 320);
  };

  const handleSubmit = async () => {
    // Guard against double submission while a request is already in flight
    // or after the user has successfully joined.
    if (state === "loading" || state === "success" || state === "duplicate") return;
    if (!email.trim() || !email.includes("@")) return;
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.alreadyJoined) {
        setState("duplicate");
        setEmail("");
      } else if (data.success) {
        setState("success");
        setEmail("");
      } else {
        setState("expanded");
      }
    } catch {
      setState("expanded");
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") { setState("idle"); setEmail(""); }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navbar overlaid on video */}
      <Navbar />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center flex-1 px-6 pb-40">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-normal leading-[0.95] max-w-7xl text-white animate-fade-rise"
          style={{
            fontFamily: "var(--font-display, 'Instrument Serif', serif)",
            letterSpacing: "-2.46px",
          }}
        >
          Where{" "}
          <em className="not-italic" style={{ color: "rgba(255,255,255,0.45)" }}>
            ambition
          </em>{" "}
          meets the exam that opens{" "}
          <em className="not-italic" style={{ color: "rgba(255,255,255,0.45)" }}>
            China.
          </em>
        </h1>

        <p
          className="animate-fade-rise-delay mt-8 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
        >
          Real-format CSCA practice tests, structured study materials, and subject analytics — built for international students who pass on the first attempt.
        </p>

        {/* Expandable waitlist CTA */}
        <div className="animate-fade-rise-delay-2 mt-12 relative flex items-center justify-center">
          {state === "success" && <Confetti />}


          <motion.div
            layout
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="liquid-glass relative flex items-center overflow-hidden rounded-full"
            style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
          >
            <AnimatePresence mode="wait" initial={false}>

              {/* Idle state */}
              {state === "idle" && (
                <motion.button
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={handleExpand}
                  className="flex items-center gap-2 px-14 py-5 text-base text-white"
                >
                  Join Waitlist
                  <ArrowRight className="size-4" />
                </motion.button>
              )}

              {/* Expanded — email input */}
              {(state === "expanded" || state === "loading") && (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-0"
                >
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="your@email.com"
                    className="bg-transparent py-5 pl-7 pr-3 text-sm text-white outline-none placeholder:text-white/40 w-56 sm:w-72"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={state === "loading"}
                    className="mr-2 flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                    style={{ background: "oklch(0.62 0.18 275)" }}
                  >
                    {state === "loading" ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </button>
                </motion.div>
              )}

              {/* Success state */}
              {state === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2.5 px-10 py-5 text-sm font-medium text-white"
                >
                  <CheckCircle className="size-4 text-emerald-400" />
                  You&apos;re on the list — we&apos;ll be in touch!
                </motion.div>
              )}

              {/* Already joined state */}
              {state === "duplicate" && (
                <motion.div
                  key="duplicate"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2.5 px-10 py-5 text-sm font-medium text-white"
                >
                  <Clock className="size-4 text-amber-400" />
                  You&apos;re already on the list!
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
