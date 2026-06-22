"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("csca_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("csca_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("csca_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div
        className="mx-auto max-w-2xl rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: "rgba(6, 15, 26, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px -12px rgba(0,0,0,0.6)",
        }}
      >
        {/* Icon */}
        <div
          className="flex-shrink-0 size-9 rounded-xl flex items-center justify-center text-base"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          🍪
        </div>

        {/* Text */}
        <p className="text-sm flex-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          We use cookies to improve your experience and analyze usage. By continuing, you agree to our{" "}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-2 transition-colors"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Privacy Policy
          </Link>{" "}
          and use of cookies.
        </p>

        {/* Buttons */}
        <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none rounded-full px-5 py-2 text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none liquid-glass rounded-full px-5 py-2 text-sm text-white font-medium"
            style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
