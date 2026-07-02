"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const faqs = [
  {
    q: "What is the CSCA?",
    a: "The China Scholastic Competency Assessment (CSCA) is a standardized test organized by the China Scholarship Council (CSC) and developed with Chinese university experts. It assesses international students' language proficiency and academic readiness for undergraduate studies in China.",
  },
  {
    q: "How many practice tests are included?",
    a: "The Free plan includes 2 complete practice tests (40 questions each). Pro members get access to 40+ tests organized by subject, difficulty, and exam year, plus unlimited retakes.",
  },
  {
    q: "Is the content up to date with the current exam?",
    a: "Yes. Our question bank and study materials are reviewed quarterly to reflect the latest CSCA exam format and subject weight distribution. We monitor official CSC announcements closely.",
  },
  {
    q: "Can I cancel my Pro subscription?",
    a: "Absolutely. You can cancel anytime from your profile page. You keep Pro access until the end of your billing period. No cancellation fees, no questions asked.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes, we offer a 7-day money-back guarantee on Pro subscriptions. If you're not satisfied for any reason, contact us within 7 days of your purchase for a full refund.",
  },
  {
    q: "Does Prepify work on mobile?",
    a: "Yes. Prepify is fully responsive and works on smartphones, tablets, and desktops. Many students study on mobile between classes and switch to desktop for timed practice tests.",
  },
  {
    q: "What if I don't pass?",
    a: "Don't worry — some students need more than one attempt. Pro members retain full access after their exam so they can review weak subjects and retake practice tests as many times as needed.",
  },
  {
    q: "What's the difference between Free and Pro?",
    a: "Free gives you 2 practice tests and access to 2 study materials — a great way to experience the platform. Pro unlocks 40+ tests, the full material library, subject analytics, PDF score reports, and priority support for just $9/month.",
  },
];

export function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="py-20" style={{ background: "#060f1a" }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <motion.span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block"
            style={{ color: "rgba(255,255,255,0.35)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            FAQ
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Poppins', sans-serif" }}>
            {isInView && (
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.12}
                staggerFrom="first"
                containerClassName="justify-center"
                transition={{ type: "spring", stiffness: 250, damping: 40 }}
              >
                Common Questions
              </VerticalCutReveal>
            )}
          </h2>
          <motion.p
            className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to know about the CSCA and how Prepify helps you pass.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Accordion className="space-y-1">
            {faqs.slice(0, 4).map((faq, i) => (
              <AccordionItem key={i} value={`faq-left-${i}`} className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <AccordionTrigger className="text-sm font-medium text-left py-4" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed pb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion className="space-y-1">
            {faqs.slice(4).map((faq, i) => (
              <AccordionItem key={i} value={`faq-right-${i}`} className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <AccordionTrigger className="text-sm font-medium text-left py-4" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed pb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.p
          className="text-center text-sm mt-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          Still have questions?{" "}
          <a
            href="#contact"
            className="underline underline-offset-4 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.6)" }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get in touch
          </a>{" "}
          — we reply within 24 hours.
        </motion.p>
      </div>
    </section>
  );
}
