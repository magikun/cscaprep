"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VerticalTabs } from "@/components/ui/vertical-tabs";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    id: "01",
    title: "Ace your CSCA score",
    description:
      "The CSCA is now mandatory for all Chinese university admissions and CSC scholarships. We cover every topic, every question type — so you walk in prepared.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200",
  },
  {
    id: "02",
    title: "Learn 10× faster with AI",
    description:
      "Our AI analyzes your weak spots after every session and rebuilds your study plan around them — so every minute you spend studying actually counts.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200",
  },
  {
    id: "03",
    title: "Boost admission competitiveness",
    description:
      "A high CSCA score signals academic readiness to top Chinese universities. Students who prepare with genzy consistently outperform the average applicant.",
    image: "/images/boost-admission.png",
  },
];

const heading = (
  <>
    How{" "}
    <em className="not-italic" style={{ color: "rgba(255,255,255,0.5)" }}>
      genzy
    </em>
    {" "}can help you
  </>
);

export function GenzySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ background: "#060f1a" }}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <VerticalTabs
            items={ITEMS}
            heading={heading}
            label="what we do"
            autoPlayDuration={5000}
          />
        </motion.div>
      </div>
    </section>
  );
}
