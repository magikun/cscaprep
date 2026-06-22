"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    name: "Amara O.",
    role: "CSC Scholarship Recipient",
    company: "Nigeria → Tsinghua University",
    quote: "I passed the CSCA on my first attempt after 3 weeks with PrepCSCA. The practice tests matched the real exam format closely, and the explanations helped me finally understand the Chinese language sections I'd been stuck on for months.",
    rating: 5,
    featured: true,
  },
  {
    name: "Rizky H.",
    role: "Undergraduate Applicant",
    company: "Indonesia → Fudan University",
    quote: "The subject breakdown analytics showed me exactly where to focus. My math score jumped from 68% to 91% in two weeks by drilling my weak areas every day.",
    rating: 5,
    featured: false,
  },
  {
    name: "Fatima A.",
    role: "CSC Scholarship Applicant",
    company: "Egypt → Peking University",
    quote: "Worth every penny. The study materials are structured and thorough — the practice questions are challenging but fair. Scored 89% and got my first-choice university.",
    rating: 5,
    featured: false,
  },
  {
    name: "Daniel K.",
    role: "International Student",
    company: "Kenya → Wuhan University",
    quote: "The test interface feels exactly like the real CSCA. No surprises on exam day. The explanations taught me grammar rules my textbooks never covered. I highly recommend this to anyone applying for a CSC scholarship.",
    rating: 5,
    featured: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-zinc-200"}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section ref={ref} className="py-20" style={{ background: "#060f1a" }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block"
            style={{ color: "rgba(255,255,255,0.35)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Student Success
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Poppins', sans-serif" }}>
            {isInView && (
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                containerClassName="justify-center"
                transition={{ type: "spring", stiffness: 260, damping: 38, delay: 0.1 }}
              >
                Loved by CSCA Students
              </VerticalCutReveal>
            )}
          </h2>
          <motion.p
            className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            Join thousands of international students who passed the CSCA and secured their place at a Chinese university.
          </motion.p>
        </div>

        {/* Featured */}
        <motion.div
          className="rounded-2xl border bg-white p-8 mb-6 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StarRating rating={featured.rating} />
          <blockquote className="mt-4 text-lg font-medium leading-relaxed text-zinc-800 max-w-[72ch]">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(featured.name)}&background=9B99FE&color=fff&size=48`}
              alt={featured.name}
              width={48}
              height={48}
              className="size-12 rounded-full"
            />
            <div>
              <div className="font-semibold">{featured.name}</div>
              <div className="text-sm text-muted-foreground">
                {featured.role} · {featured.company}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary: asymmetric — left stacks 2, right shows 1 taller */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
          {/* Left: 2 stacked */}
          <div className="flex flex-col gap-4">
            {rest.slice(0, 2).map((t, i) => (
              <motion.div
                key={t.name}
                className="rounded-2xl border bg-white p-6 shadow-sm flex-1"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <StarRating rating={t.rating} />
                <blockquote className="mt-3 text-sm leading-relaxed text-zinc-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=2BC8B7&color=fff&size=40`}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full"
                  />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: 1 taller card with score detail */}
          <motion.div
            className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StarRating rating={rest[2].rating} />
            <blockquote className="mt-3 text-sm leading-relaxed text-zinc-700 flex-1">
              &ldquo;{rest[2].quote}&rdquo;
            </blockquote>
            {/* Domain score snapshot */}
            <div className="my-5 rounded-xl bg-zinc-50 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">
                Exam Score Breakdown
              </div>
              {[
                { domain: "Mathematics", score: 95 },
                { domain: "Physics", score: 91 },
                { domain: "Chemistry", score: 88 },
              ].map((d) => (
                <div key={d.domain} className="flex items-center gap-3 mb-2 last:mb-0">
                  <div className="text-[11px] text-zinc-500 flex-1">{d.domain}</div>
                  <div className="text-[11px] font-semibold tabular-nums w-8 text-right text-zinc-700">
                    {d.score}%
                  </div>
                  <div className="h-1 w-14 rounded-full bg-zinc-200 flex-shrink-0 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${d.score}%`, background: "oklch(0.62 0.18 275)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(rest[2].name)}&background=9B99FE&color=fff&size=40`}
                alt={rest[2].name}
                width={40}
                height={40}
                className="size-10 rounded-full"
              />
              <div>
                <div className="text-sm font-semibold">{rest[2].name}</div>
                <div className="text-xs text-muted-foreground">{rest[2].role} · {rest[2].company}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
