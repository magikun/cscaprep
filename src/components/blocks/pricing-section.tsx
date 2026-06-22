"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ShieldCheck } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Sparkles } from "@/components/ui/sparkles";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { openWaitlist } from "@/lib/waitlist";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: "Free",
    description: "Start preparing with essential tools and sample tests.",
    price: 0,
    yearlyPrice: 0,
    buttonText: "Start Free",
    popular: false,
    includes: [
      "What's included:",
      "2 full practice tests",
      "Basic study guide (2 materials)",
      "Community forum access",
      "Score tracking",
    ],
  },
  {
    name: "Pro",
    description: "Unlimited access to every test, material, and feature.",
    price: 9,
    yearlyPrice: 89,
    buttonText: "Get Pro Access",
    popular: true,
    includes: [
      "Everything in Free, plus:",
      "All 40+ practice tests",
      "Full material library",
      "Advanced analytics dashboard",
      "PDF exam certificates",
      "Priority support",
      "Offline study mode",
    ],
  },
];

function PricingSwitch({ onSwitch }: { onSwitch: (v: string) => void }) {
  const [selected, setSelected] = useState("0");
  const handle = (v: string) => {
    setSelected(v);
    onSwitch(v);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-white/10 p-1">
        {["Monthly", "Yearly"].map((label, idx) => (
          <button
            key={label}
            onClick={() => handle(String(idx))}
            className={cn(
              "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors text-sm",
              selected === String(idx) ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {selected === String(idx) && (
              <motion.span
                layoutId="pricing-switch"
                className="absolute top-0 left-0 h-10 w-full rounded-full border border-blue-500/60 bg-gradient-to-t from-blue-600 to-blue-500"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {label}
              {idx === 1 && (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold tracking-wide">
                  SAVE 17%
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="pricing"
      ref={pricingRef}
      className="min-h-screen mx-auto relative bg-black overflow-x-hidden"
    >
      {/* Sparkles + grid overlay */}
      <div className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]" />
        <Sparkles
          density={1800}
          speed={1}
          color="#FFFFFF"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>

      {/* Blue ellipse glow */}
      <div className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start overflow-hidden pointer-events-none">
        <div
          className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
          style={{ border: "200px solid #3131f5", filter: "blur(92px)", opacity: 0.3 }}
        />
      </div>

      {/* Header */}
      <article className="text-center mb-8 pt-32 max-w-3xl mx-auto space-y-5 relative z-50 px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/80 block">
          Pricing
        </span>
        <h2 className="text-4xl md:text-5xl font-normal text-white leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            containerClassName="justify-center"
            transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0 }}
          >
            Simple Pricing for Serious Students
          </VerticalCutReveal>
        </h2>
        <p className="text-zinc-400 text-base max-w-[40ch] mx-auto leading-relaxed">
          Start free. Upgrade when you&apos;re ready. Cancel anytime — no questions asked.
        </p>
        <PricingSwitch onSwitch={(v) => setIsYearly(parseInt(v) === 1)} />
      </article>

      {/* Cards */}
      <div className="grid md:grid-cols-2 max-w-3xl gap-5 py-6 mx-auto px-6 relative z-10">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: index * 0.12 }}
            whileHover={{ y: -4 }}
          >
            <div
              className={cn(
                "relative text-white overflow-hidden flex flex-col h-full",
                plan.popular
                  ? "rounded-2xl bg-gradient-to-br from-neutral-900 via-[#111118] to-neutral-900 shadow-[0px_0px_55px_-10px_rgba(49,49,245,0.45)] border border-blue-900/30 z-20"
                  : "rounded-2xl bg-neutral-950 border border-white/[0.07] z-10"
              )}
            >
              {/* Pro accent stripe */}
              {plan.popular && (
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              )}

              {/* Most Popular badge */}
              {plan.popular && (
                <div className="absolute top-5 right-5 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                  Most Popular
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan name + price */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-zinc-400 mb-3">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-3">
                    {plan.price === 0 ? (
                      <span
                        className="font-bold text-white leading-none"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}
                      >
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-zinc-500 text-lg self-start mt-2">$</span>
                        <span
                          className="font-bold text-white leading-none tabular-nums"
                          style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}
                        >
                          <NumberFlow value={isYearly ? plan.yearlyPrice : plan.price} />
                        </span>
                        <span className="text-zinc-500 text-sm mb-1.5">
                          /{isYearly ? "year" : "mo"}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{plan.description}</p>
                </div>

                {/* CTA */}
                <button
                  onClick={openWaitlist}
                  className={cn(
                    "w-full mb-6 py-3.5 text-sm rounded-xl block text-center font-semibold transition-all duration-200",
                    plan.popular
                      ? "bg-gradient-to-t from-blue-600 to-blue-500 shadow-lg shadow-blue-900/50 border border-blue-400/30 text-white hover:opacity-90 active:scale-[0.98]"
                      : "bg-white/[0.07] border border-white/[0.12] text-white hover:bg-white/[0.12] active:scale-[0.98]"
                  )}
                >
                  {plan.buttonText}
                </button>

                {/* Feature list */}
                <div className="space-y-3 pt-5 border-t border-white/[0.08] flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                    {plan.includes[0]}
                  </p>
                  <ul className="space-y-3">
                    {plan.includes.slice(1).map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={cn(
                            "size-4 mt-0.5 flex-shrink-0",
                            plan.popular ? "text-emerald-400" : "text-white/40"
                          )}
                        />
                        <span className={plan.popular ? "text-zinc-300" : "text-zinc-500"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust footer */}
      <div className="flex items-center justify-center gap-2 pb-16 relative z-10">
        <ShieldCheck className="size-4 text-zinc-600" />
        <p className="text-xs text-zinc-600">
          7-day money-back guarantee · Instant access · No hidden fees
        </p>
      </div>
    </section>
  );
}
