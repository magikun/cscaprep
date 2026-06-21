"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, BookOpen, Shield, BarChart3, FileText, ClipboardCheck, Calculator } from "lucide-react";

const materials = [
  {
    title: "CSCA Subject Guide",
    description: "Full coverage of all 4 tested subjects with examples",
    icon: BookOpen,
    readTime: "45 min read",
    isPro: false,
    color: "#9B99FE",
  },
  {
    title: "Exam Strategy",
    description: "How to approach each section and manage your time",
    icon: Shield,
    readTime: "20 min read",
    isPro: false,
    color: "#2BC8B7",
  },
  {
    title: "Practice Question Bank",
    description: "2,400+ questions across all subjects and difficulty levels",
    icon: ClipboardCheck,
    readTime: "Practice",
    isPro: true,
    color: "#F28482",
  },
  {
    title: "Physics & Chemistry Guide",
    description: "Core concepts, formulas, and worked examples",
    icon: FileText,
    readTime: "60 min read",
    isPro: true,
    color: "#F5C344",
  },
  {
    title: "Mock Exams",
    description: "Full 40-question timed simulations with scoring",
    icon: BarChart3,
    readTime: "3 hr each",
    isPro: true,
    color: "#B567C2",
  },
  {
    title: "Math Formula Sheet",
    description: "Quick-reference for all tested formulas and methods",
    icon: Calculator,
    readTime: "Reference",
    isPro: true,
    color: "#FFB347",
  },
];

export function MaterialsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Study Materials
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything to Pass the CSCA
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Structured resources covering all three CSCA subjects — mathematics, physics, and chemistry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((mat, i) => (
            <motion.div
              key={mat.title}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            >
              <div className={`rounded-2xl border p-6 h-full transition-all duration-200 ${mat.isPro ? "bg-zinc-50/50" : "bg-white hover:shadow-md"}`}>
                {/* Icon */}
                <div
                  className="size-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: mat.isPro ? "#f1f5f9" : `${mat.color}22`, color: mat.isPro ? "#94a3b8" : mat.color }}
                >
                  <mat.icon className="size-5" />
                </div>

                <h3 className={`font-semibold mb-1 ${mat.isPro ? "text-zinc-400" : ""}`}>{mat.title}</h3>
                <p className={`text-sm mb-3 ${mat.isPro ? "text-zinc-300" : "text-muted-foreground"}`}>{mat.description}</p>
                <span className="text-xs text-muted-foreground">{mat.readTime}</span>
              </div>

              {/* Pro overlay */}
              {mat.isPro && (
                <div className="absolute inset-0 rounded-2xl backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
                  <div className="size-10 rounded-full bg-zinc-900/80 flex items-center justify-center">
                    <Lock className="size-4 text-white" />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white"
                    style={{ background: "linear-gradient(90deg, #9B99FE, #2BC8B7)" }}
                  >
                    Pro Only
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button asChild>
            <Link href="/register">Unlock All Materials — $9/mo</Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">First 2 materials free, forever</p>
        </motion.div>
      </div>
    </section>
  );
}
