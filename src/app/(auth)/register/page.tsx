"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Mail, Lock, User, CircleCheck,
  BookOpen, BarChart3, Shield, Trophy, ArrowRight,
} from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const PURPLE = "oklch(0.62 0.18 275)";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

/* ── Step progress ─────────────────────────────────────── */
function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-6 relative">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="w-2 h-2 rounded-full relative z-10 transition-colors duration-300"
          style={{ background: dot <= step ? PURPLE : "rgba(255,255,255,0.15)" }}
        />
      ))}
      <motion.div
        className="absolute -left-[8px] top-1/2 -translate-y-1/2 h-3 rounded-full"
        style={{ background: PURPLE }}
        animate={{ width: step === 1 ? 24 : step === 2 ? 60 : 96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      />
    </div>
  );
}

const darkInput = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.9)",
  caretColor: "white",
} as const;

const inputClass =
  "w-full py-3 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors";

/* ── Step 1 — Account details ──────────────────────────── */
function Step1({
  name, setName, email, setEmail,
  password, setPassword, showPw, setShowPw, onGoogle,
}: {
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  showPw: boolean; setShowPw: (v: boolean) => void;
  onGoogle: () => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium mb-2 block" htmlFor="name"
          style={{ color: "rgba(255,255,255,0.5)" }}>Full Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
            style={{ color: "rgba(255,255,255,0.25)" }} />
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith" required
            className={inputClass + " pl-10 pr-4"} style={darkInput} />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium mb-2 block" htmlFor="email"
          style={{ color: "rgba(255,255,255,0.5)" }}>Email</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
            style={{ color: "rgba(255,255,255,0.25)" }} />
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" required
            className={inputClass + " pl-10 pr-4"} style={darkInput} />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium mb-2 block" htmlFor="password"
          style={{ color: "rgba(255,255,255,0.5)" }}>Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
            style={{ color: "rgba(255,255,255,0.25)" }} />
          <input id="password" type={showPw ? "text" : "password"} value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters" minLength={8} required
            className={inputClass + " pl-10 pr-11"} style={darkInput} />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div className="relative flex items-center gap-3 py-1">
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or</span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
      </div>

      <button type="button" onClick={onGoogle}
        className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium transition-colors active:scale-[0.97]"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
        By signing up you agree to our{" "}
        <Link href="#" className="underline underline-offset-2" style={{ color: "rgba(255,255,255,0.5)" }}>Terms</Link>
        {" "}and{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2" style={{ color: "rgba(255,255,255,0.5)" }}>Privacy Policy</Link>.
      </p>
    </div>
  );
}

/* ── Step 2 — CSCA level ───────────────────────────────── */
const levels = [
  { id: "beginner",     Icon: BookOpen,  label: "Complete Beginner",  desc: "No prior Chinese or CSCA exam experience" },
  { id: "intermediate", Icon: BarChart3, label: "Some Background",    desc: "Studied physics, chemistry or math at high school" },
  { id: "advanced",     Icon: Shield,    label: "Actively Preparing", desc: "Studying for a Chinese university application now" },
  { id: "professional", Icon: Trophy,    label: "Retaking the Exam",  desc: "Sat the CSCA before and want to improve my score" },
];

function Step2({ level, setLevel }: { level: string | null; setLevel: (v: string) => void }) {
  return (
    <div className="space-y-2.5">
      {levels.map(({ id, Icon, label, desc }) => {
        const selected = level === id;
        return (
          <button key={id} type="button" onClick={() => setLevel(id)}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all duration-150"
            style={{
              background: selected ? "rgba(100,60,200,0.15)" : "rgba(255,255,255,0.04)",
              border: selected ? `1px solid rgba(100,60,200,0.5)` : "1px solid rgba(255,255,255,0.08)",
            }}>
            <div className="size-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                background: selected ? PURPLE : "rgba(255,255,255,0.08)",
                color: selected ? "white" : "rgba(255,255,255,0.4)",
              }}>
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>{label}</div>
              <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{desc}</div>
            </div>
            {selected && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="flex-shrink-0">
                <CircleCheck className="size-5" style={{ color: PURPLE }} />
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Step 3 — Plan selection ───────────────────────────── */
const plans = [
  {
    id: "free", name: "Free", price: "$0", period: "forever",
    features: ["2 full practice tests", "2 study materials", "Basic score tracking"],
  },
  {
    id: "pro", name: "Pro", price: "$9", period: "/month",
    features: ["40+ practice tests", "Full material library", "Advanced analytics", "PDF certificates"],
    popular: true,
  },
];

function Step3({ plan, setPlan }: { plan: string; setPlan: (v: string) => void }) {
  return (
    <div className="space-y-3">
      {plans.map(({ id, name, price, period, features, popular }) => {
        const selected = plan === id;
        return (
          <button key={id} type="button" onClick={() => setPlan(id)}
            className="w-full text-left rounded-2xl p-4 transition-all duration-150 relative"
            style={{
              background: selected ? "rgba(100,60,200,0.15)" : "rgba(255,255,255,0.04)",
              border: selected ? "1px solid rgba(100,60,200,0.5)" : "1px solid rgba(255,255,255,0.08)",
            }}>
            {popular && (
              <div className="absolute -top-2.5 left-4 text-[10px] font-bold uppercase tracking-wider text-white rounded-full px-2.5 py-0.5"
                style={{ background: PURPLE }}>
                Recommended
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{name}</span>
                </div>
                <div className="flex items-baseline gap-0.5 mb-2.5">
                  <span className="text-2xl font-bold tabular-nums" style={{ color: "rgba(255,255,255,0.95)" }}>{price}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{period}</span>
                </div>
                <ul className="space-y-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <div className="size-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: selected ? PURPLE : "rgba(255,255,255,0.2)" }}>
                        <CircleCheck className="size-2.5 text-white" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {selected && (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="flex-shrink-0 mt-0.5">
                  <CircleCheck className="size-5" style={{ color: PURPLE }} />
                </motion.div>
              )}
            </div>
          </button>
        );
      })}
      <p className="text-xs text-center pt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
        Cancel anytime · 7-day money-back guarantee
      </p>
    </div>
  );
}

/* ── Main register page ────────────────────────────────── */
const stepMeta = [
  { title: "Create free account", sub: "No credit card required" },
  { title: "Your CSCA level",     sub: "Help us personalise your experience" },
  { title: "Choose your plan",    sub: "Start free — upgrade anytime" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  const [direction, setDirection] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(false);

  const canProceed =
    step === 1 ? name.trim() !== "" && email.trim() !== "" && password.length >= 8
    : step === 2 ? level !== null
    : true;

  const goNext = () => {
    if (!canProceed) return;
    if (step < 3) {
      setDirection(1);
      setStep((s) => s + 1);
      if (step === 1) setIsExpanded(false);
    } else {
      handleFinish();
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection(-1);
      if (step === 2) setIsExpanded(true);
      setStep((s) => s - 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24 }),
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-3xl p-8"
        style={{
          background: "rgba(6,15,26,0.75)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl font-normal mb-1"
            style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Poppins', sans-serif" }}
          >
            {stepMeta[step - 1].title}
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            {stepMeta[step - 1].sub}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center mb-8">
          <StepProgress step={step} />
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
          >
            {step === 1 && (
              <Step1
                name={name} setName={setName}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                showPw={showPw} setShowPw={setShowPw}
                onGoogle={() => {}}
              />
            )}
            {step === 2 && <Step2 level={level} setLevel={setLevel} />}
            {step === 3 && <Step3 plan={plan} setPlan={setPlan} />}
          </motion.div>
        </AnimatePresence>

        {/* Action buttons */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {!isExpanded && (
                <motion.button
                  initial={{ opacity: 0, width: 0, scale: 0.85 }}
                  animate={{ opacity: 1, width: 64, scale: 1 }}
                  exit={{ opacity: 0, width: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, mass: 0.8 }}
                  onClick={goBack}
                  className="flex-shrink-0 h-12 flex items-center justify-center rounded-2xl text-sm font-medium overflow-hidden whitespace-nowrap transition-colors"
                  style={{
                    minWidth: 64,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Back
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              onClick={goNext}
              disabled={!canProceed || loading}
              animate={{ flex: isExpanded ? 1 : "1 1 auto" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="h-12 flex-1 flex items-center justify-center gap-2 px-5 rounded-2xl text-sm font-semibold text-white transition-opacity"
              style={{
                background: PURPLE,
                opacity: canProceed && !loading ? 1 : 0.4,
                cursor: canProceed && !loading ? "pointer" : "not-allowed",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    className="size-4 border-2 rounded-full block"
                    style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Creating account…
                </span>
              ) : (
                <>
                  {step === 3 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <CircleCheck className="size-4" />
                    </motion.div>
                  )}
                  {step === 3 ? "Finish" : "Continue"}
                  {step < 3 && <ArrowRight className="size-4" />}
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          Already have an account?{" "}
          <Link href="/login"
            className="font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.75)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
