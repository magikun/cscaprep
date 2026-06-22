"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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

const inputClass = [
  "w-full py-3 rounded-2xl text-sm transition-colors",
  "focus:outline-none focus:ring-1",
].join(" ");

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
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
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-normal mb-2"
            style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Poppins', sans-serif" }}
          >
            Welcome back
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Sign in to your Genzy account
          </p>
        </div>

        {/* Google SSO */}
        <button
          type="button"
          onClick={() => {}}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium transition-colors active:scale-[0.97]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="relative flex items-center gap-3 my-5">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or</span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium mb-2 block" htmlFor="email"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
                style={{ color: "rgba(255,255,255,0.25)" }} />
              <input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className={inputClass + " pl-10 pr-4"}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.9)",
                  caretColor: "white",
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium" htmlFor="password"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                Password
              </label>
              <Link href="#" className="text-xs transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
                style={{ color: "rgba(255,255,255,0.25)" }} />
              <input
                id="password" type={showPw ? "text" : "password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className={inputClass + " pl-10 pr-11"}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.9)",
                  caretColor: "white",
                }}
              />
              <button
                type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className="w-full h-12 flex items-center justify-center rounded-2xl text-sm font-semibold text-white mt-2 disabled:opacity-60 disabled:pointer-events-none transition-opacity"
            style={{ background: "oklch(0.62 0.18 275)" }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <motion.span
                  className="size-4 border-2 rounded-full block"
                  style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register"
            className="font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.75)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
            Sign up free
          </Link>
        </div>
      </div>
    </div>
  );
}
