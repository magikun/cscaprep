"use client";

import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";

export function HeroSection() {
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

        <Link
          href="/register"
          className="animate-fade-rise-delay-2 liquid-glass mt-12 rounded-full px-14 py-5 text-base text-white hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
          style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
        >
          Start Preparing
        </Link>
      </div>
    </section>
  );
}
