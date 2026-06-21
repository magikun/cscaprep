"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const companies = [
  "Nigeria", "Indonesia", "Pakistan", "Bangladesh", "Vietnam",
  "Thailand", "Kazakhstan", "Ethiopia", "Kenya", "Egypt",
  "Malaysia", "Philippines", "Nepal", "Cameroon", "Tanzania",
  "Uganda", "Zimbabwe", "Ghana", "Russia", "Mongolia",
];

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-background relative z-10 py-12 border-b border-dashed">
      <motion.p
        className="text-center text-sm text-muted-foreground mb-8 mx-auto max-w-5xl px-6"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Students from these countries prepare with PrepCSCA
      </motion.p>

      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="flex animate-scroll-logos items-center">
          {[...companies, ...companies].map((name, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-7 text-sm font-medium text-foreground/25 tracking-wide whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
