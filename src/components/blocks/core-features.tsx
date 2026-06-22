"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function CoreFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      style={{
        background: "#060f1a",
        padding: "80px 20px",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: 16,
              display: "block",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Core Features
          </span>
        </motion.div>

        <motion.h2
          style={{
            fontSize: "2.75rem",
            fontWeight: 400,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.02em",
            marginBottom: 12,
            fontFamily: "'Poppins', sans-serif",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Built for Speed &amp; Quality
        </motion.h2>

        <motion.p
          style={{
            fontSize: "1.125rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.5,
            marginBottom: 50,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Everything you need to go
          <br />
          from study to acceptance letter
        </motion.p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="c1-grid"
        >
          {/* Card 1 — Smart Study System */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              style={{
                borderRadius: 20,
                height: 340,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                textAlign: "left",
                background: "radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 30%, #F4F8F9 60%, #F4F8F9 100%)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              }}
            >
              {/* Prompt box */}
              <div
                style={{
                  position: "absolute",
                  top: 30,
                  left: 24,
                  right: 24,
                  background: "white",
                  borderRadius: 12,
                  padding: 16,
                  fontSize: "0.8rem",
                  color: "#475569",
                  lineHeight: 1.6,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                }}
              >
                AI-powered hints:{" "}
                <span style={{ fontWeight: 600, color: "#c77f3a" }}>
                  physics concepts
                </span>{" "}
                explained with{" "}
                <span style={{ fontWeight: 600, color: "#9b66c2" }}>
                  real examples
                </span>
              </div>

              {/* Pill button */}
              <div
                style={{
                  position: "absolute",
                  top: 180,
                  left: 40,
                  background: "white",
                  border: "1px solid black",
                  padding: "5px 14px",
                  borderRadius: 20,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: "#a855f7", fontSize: "1rem" }}>✦</span> Explain this
              </div>

              {/* Cursor */}
              <svg
                style={{ position: "absolute", top: 205, left: 116, width: 24, height: 24, zIndex: 10, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}
                viewBox="0 0 24 24"
                fill="#0f172a"
              >
                <path d="M4 2L20 11L11 13L9 22L4 2Z" stroke="white" strokeWidth="1" />
              </svg>

              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  padding: 24,
                  zIndex: 2,
                }}
              >
                Smart Study System
              </h3>
            </div>
          </motion.div>

          {/* Card 2 — Realistic Practice Tests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              style={{
                borderRadius: 20,
                height: 340,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                textAlign: "left",
                background: "radial-gradient(circle at 50% 0%, #E5A1F5 0%, #F8ACA0 30%, #F4F8F9 60%, #F4F8F9 100%)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              }}
            >
              {/* Mini question card */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 24,
                  right: 24,
                  background: "white",
                  borderRadius: 12,
                  padding: 14,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#64748b", marginBottom: 8 }}>Question 12 of 40</div>
                <div style={{ fontSize: "0.75rem", color: "#1e293b", fontWeight: 500, marginBottom: 10 }}>
                  If f(x) = 3x² − 2x + 1, what is the value of f(2)?
                </div>
                {["9", "7", "11", "5"].map((opt, i) => (
                  <div
                    key={opt}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 6,
                      fontSize: "0.7rem",
                      marginBottom: 4,
                      background: i === 0 ? "linear-gradient(90deg, #9B99FE22, #2BC8B722)" : "#f8fafc",
                      border: i === 0 ? "1px solid #9B99FE" : "1px solid #e2e8f0",
                      color: i === 0 ? "#6366f1" : "#475569",
                      fontWeight: i === 0 ? 600 : 400,
                      textAlign: "left",
                    }}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </div>
                ))}
              </div>

              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  padding: 24,
                  zIndex: 2,
                }}
              >
                Realistic Practice Tests
              </h3>
            </div>
          </motion.div>

          {/* Card 3 — Progress Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div
              style={{
                borderRadius: 20,
                height: 340,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                textAlign: "left",
                background: "radial-gradient(circle at 50% 0%, #F9ED96 0%, #E5A1F5 30%, #F4F8F9 60%, #F4F8F9 100%)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              }}
            >
              {/* Mesh overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  WebkitMaskImage: "radial-gradient(circle at center top, black 0%, transparent 80%)",
                  maskImage: "radial-gradient(circle at center top, black 0%, transparent 80%)",
                }}
              />

              {/* Mini analytics chart */}
              <div
                style={{
                  position: "absolute",
                  top: 30,
                  left: 24,
                  right: 24,
                  background: "white",
                  borderRadius: 12,
                  padding: 14,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#64748b", marginBottom: 10 }}>Subject Performance</div>
                {[
                  { domain: "Mathematics", pct: 92, color: "#9B99FE" },
                  { domain: "Physics", pct: 78, color: "#2BC8B7" },
                  { domain: "Chemistry", pct: 85, color: "#F28482" },
                ].map((d) => (
                  <div key={d.domain} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#475569", marginBottom: 3 }}>
                      <span>{d.domain}</span>
                      <span style={{ fontWeight: 600 }}>{d.pct}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 4, background: "#f1f5f9", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${d.pct}%`, borderRadius: 4, background: d.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Search pill */}
              <div
                style={{
                  position: "absolute",
                  top: 220,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "white",
                  border: "1px solid black",
                  padding: "6px 18px",
                  borderRadius: 20,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#1e293b",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Track progress
              </div>

              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  padding: 24,
                  zIndex: 2,
                }}
              >
                Progress Analytics
              </h3>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .c1-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .c1-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
