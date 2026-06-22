"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface VerticalTabItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface VerticalTabsProps {
  items: VerticalTabItem[];
  heading?: React.ReactNode;
  label?: string;
  autoPlayDuration?: number;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
}

export function VerticalTabs({
  items,
  heading,
  label,
  autoPlayDuration = 5000,
  activeIndex: controlledIndex,
  onTabChange,
}: VerticalTabsProps) {
  const isControlled = controlledIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const prevIndexRef = useRef(isControlled ? controlledIndex : 0);

  const activeIndex = isControlled ? controlledIndex : internalIndex;

  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      setDirection(activeIndex > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const next = (activeIndex + 1) % items.length;
    setDirection(1);
    if (isControlled) {
      onTabChange?.(next);
    } else {
      setInternalIndex(next);
    }
  }, [activeIndex, items.length, isControlled, onTabChange]);

  const handlePrev = useCallback(() => {
    const prev = (activeIndex - 1 + items.length) % items.length;
    setDirection(-1);
    if (isControlled) {
      onTabChange?.(prev);
    } else {
      setInternalIndex(prev);
    }
  }, [activeIndex, items.length, isControlled, onTabChange]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    if (isControlled) {
      onTabChange?.(index);
    } else {
      setInternalIndex(index);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (isControlled || isPaused) return;
    const interval = setInterval(handleNext, autoPlayDuration);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext, autoPlayDuration, isControlled]);

  const variants = {
    enter: (d: number) => ({ y: d > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (d: number) => ({ zIndex: 0, y: d > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left — tabs */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
          {heading && (
            <div className="space-y-1 mb-12">
              <h2
                className="font-normal text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
                style={{ color: "rgba(255,255,255,0.95)", fontFamily: "var(--font-display, 'Instrument Serif', serif)" }}
              >
                {heading}
              </h2>
              {label && (
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest block"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {label}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "group relative flex items-start gap-4 py-7 text-left transition-all duration-500",
                    "border-t first:border-t-0"
                  )}
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  {/* Progress bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    {isActive && !isControlled && (
                      <motion.div
                        key={`prog-${index}-${isPaused}`}
                        className="absolute top-0 left-0 w-full origin-top"
                        style={{ background: "oklch(0.62 0.18 275)" }}
                        initial={{ height: "0%" }}
                        animate={isPaused ? { height: "0%" } : { height: "100%" }}
                        transition={{ duration: autoPlayDuration / 1000, ease: "linear" }}
                      />
                    )}
                    {isActive && isControlled && (
                      <div
                        className="absolute top-0 left-0 w-full"
                        style={{ height: "100%", background: "oklch(0.62 0.18 275)" }}
                      />
                    )}
                  </div>

                  <span
                    className="text-[10px] font-medium mt-1.5 tabular-nums flex-shrink-0"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    /{item.id}
                  </span>

                  <div className="flex flex-col gap-2 flex-1 pl-2">
                    <span
                      className="text-2xl md:text-3xl font-normal tracking-tight transition-colors duration-500"
                      style={{
                        fontFamily: "var(--font-display, 'Instrument Serif', serif)",
                        color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {item.title}
                    </span>

                    {/* Always in DOM — opacity only, no height animation → no layout shift */}
                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="text-sm md:text-base font-normal leading-relaxed max-w-sm pb-2"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — image */}
        <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
          <div
            className="relative"
            onMouseEnter={() => !isControlled && setIsPaused(true)}
            onMouseLeave={() => !isControlled && setIsPaused(false)}
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "2rem", aspectRatio: "16/11", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 260, damping: 32 },
                    opacity: { duration: 0.4 },
                  }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={handleNext}
                >
                  <Image
                    src={items[activeIndex].image}
                    alt={items[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                {[{ fn: handlePrev, label: "Previous", Icon: ArrowLeft }, { fn: handleNext, label: "Next", Icon: ArrowRight }].map(({ fn, label: btnLabel, Icon }) => (
                  <button
                    key={btnLabel}
                    onClick={(e) => { e.stopPropagation(); fn(); }}
                    aria-label={btnLabel}
                    className="flex items-center justify-center transition-all active:scale-90"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "rgba(6,15,26,0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default VerticalTabs;
