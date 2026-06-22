"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Calculator,
  Zap,
  FlaskConical,
  ClipboardList,
  FileText,
  GraduationCap,
  Globe,
  Building2,
  MapPin,
  FileCheck,
  Plane,
  Briefcase,
  Heart,
  MessageSquare,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TAG_ROWS = [
  [
    { id: "csca-exam", icon: FileText, label: "CSCA Exam Prep" },
    { id: "mock-tests", icon: ClipboardList, label: "Mock Tests" },
    { id: "math", icon: Calculator, label: "Math Mastery" },
    { id: "physics", icon: Zap, label: "Physics Notes" },
    { id: "chemistry", icon: FlaskConical, label: "Chemistry Guide" },
  ],
  [
    { id: "scholarship", icon: GraduationCap, label: "CSC Scholarship" },
    { id: "study-china", icon: Globe, label: "Study in China" },
    { id: "university", icon: Building2, label: "University Ranking" },
    { id: "campus", icon: MapPin, label: "Beijing Campus" },
    { id: "visa", icon: FileCheck, label: "Visa Process" },
  ],
  [
    { id: "travel", icon: Plane, label: "Travel to China" },
    { id: "work", icon: Briefcase, label: "Work in China" },
    { id: "culture", icon: Heart, label: "Cultural Adapt" },
    { id: "language", icon: MessageSquare, label: "Language Skills" },
    { id: "student-life", icon: Users, label: "Student Life" },
  ],
];

const CONFIG = {
  title: "Everything you need for China",
  description:
    "From CSCA exam prep to scholarship applications, visa guides, campus life and beyond.",
  containerHeight: "h-[140px]",
  lensSize: 86,
};

export function MagnifiedBento() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);

  const clipPath = useMotionTemplate`circle(30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px))`;
  const inverseMask = useMotionTemplate`radial-gradient(circle 30px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px), transparent 100%, black 100%)`;

  return (
    <div className="flex h-full w-full">
      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex flex-col">
        {/* Scrolling tag area */}
        <div
          ref={containerRef}
          className={cn("relative w-full overflow-hidden bg-gray-50/60 flex-1", CONFIG.containerHeight)}
        >
          <div className="relative h-full w-full flex flex-col items-center justify-center">
            {/* Base layer */}
            <motion.div
              style={{ WebkitMaskImage: inverseMask, maskImage: inverseMask }}
              className="flex flex-col gap-3 w-full h-full justify-center"
            >
              {TAG_ROWS.map((row, rowIndex) => (
                <motion.div
                  key={`row-${rowIndex}`}
                  className="flex gap-3 w-max"
                  animate={{
                    x: rowIndex % 2 === 0 ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
                  }}
                  transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                >
                  {[...row, ...row, ...row].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={`${item.id}-${idx}`}
                        className="flex gap-2 bg-white/70 backdrop-blur-sm whitespace-nowrap w-fit text-gray-400 p-1.5 px-3 items-center border border-gray-200/60 rounded-full text-[11px]"
                      >
                        <Icon size={12} />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>

            {/* Reveal layer */}
            <motion.div
              className="absolute inset-0 flex flex-col gap-3 justify-center pointer-events-none select-none z-10"
              style={{ clipPath }}
            >
              {TAG_ROWS.map((row, rowIndex) => (
                <motion.div
                  key={`row-reveal-${rowIndex}`}
                  className="flex gap-3 w-max"
                  animate={{
                    x: rowIndex % 2 === 0 ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
                  }}
                  transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                >
                  {[...row, ...row, ...row].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={`${item.id}-${idx}-reveal`}
                        className="flex gap-2 bg-white whitespace-nowrap w-fit p-1.5 px-3 items-center rounded-full text-[11px] scale-125 ml-5 shadow-sm"
                        style={{ border: "1px solid oklch(0.62 0.18 275 / 0.25)", color: "oklch(0.42 0.18 275)" }}
                      >
                        <Icon size={12} style={{ color: "oklch(0.52 0.22 275)" }} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>

            {/* Draggable lens */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 cursor-grab active:cursor-grabbing drop-shadow-xl"
              drag
              dragMomentum={false}
              dragConstraints={containerRef}
              style={{ x: lensX, y: lensY }}
            >
              <div className="relative">
                <MagnifyingLens size={CONFIG.lensSize} />
                <div className="absolute top-[5px] left-[5px] w-[56px] h-[56px] rounded-full bg-white/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Side fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-gray-50 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-gray-50 to-transparent z-20" />
        </div>

        {/* Text */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{CONFIG.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{CONFIG.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagnifiedBento;

const MagnifyingLens = ({ size = 86 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M365.424 335.392L342.24 312.192L311.68 342.736L334.88 365.936L365.424 335.392Z" fill="#B0BDC6" />
    <path d="M358.08 342.736L334.88 319.552L319.04 335.392L342.24 358.584L358.08 342.736Z" fill="#DFE9EF" />
    <path d="M352.368 321.808L342.752 312.192L312.208 342.752L321.824 352.36L352.368 321.808Z" fill="#B0BDC6" />
    <path d="M332 332C260 404 142.4 404 69.6001 332C-2.3999 260 -2.3999 142.4 69.6001 69.6C141.6 -3.20003 259.2 -2.40002 332 69.6C404.8 142.4 404.8 260 332 332ZM315.2 87.2C252 24 150.4 24 88.0001 87.2C24.8001 150.4 24.8001 252 88.0001 314.4C151.2 377.6 252.8 377.6 315.2 314.4C377.6 252 377.6 150.4 315.2 87.2Z" fill="#DFE9EF" />
    <path d="M319.2 319.2C254.4 384 148.8 384 83.2001 319.2C18.4001 254.4 18.4001 148.8 83.2001 83.2C148 18.4 253.6 18.4 319.2 83.2C384 148.8 384 254.4 319.2 319.2ZM310.4 92C250.4 32 152 32 92.0001 92C32.0001 152 32.0001 250.4 92.0001 310.4C152 370.4 250.4 370.4 310.4 310.4C370.4 250.4 370.4 152 310.4 92Z" fill="#7A858C" />
    <path d="M484.104 428.784L373.8 318.472L318.36 373.912L428.672 484.216L484.104 428.784Z" fill="#333333" />
    <path d="M471.664 441.224L361.344 330.928L330.8 361.48L441.12 471.76L471.664 441.224Z" fill="#575B5E" />
    <path d="M495.2 423.2C504 432 432.8 504 423.2 495.2L417.6 489.6C408.8 480.8 480 408.8 489.6 417.6L495.2 423.2Z" fill="#B0BDC6" />
    <path d="M483.2 435.2C492 444 444.8 492 435.2 483.2L429.6 477.6C420.8 468.8 468 420.8 477.6 429.6L483.2 435.2Z" fill="#DFE9EF" />
  </svg>
);
