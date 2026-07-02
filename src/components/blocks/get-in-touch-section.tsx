"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "support@prepify.com",
    href: "mailto:support@prepify.com",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Remote — Global",
    href: null,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    href: null,
  },
];

export function GetInTouchSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24"
      style={{ background: "#060f1a" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest mb-4 block"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Contact
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4"
            style={{
              color: "rgba(255,255,255,0.95)",
              fontFamily: "'Instrument Serif', serif",
            }}
          >
            Get in touch
          </h2>
          <p
            className="text-lg max-w-[44ch]"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Have a question about the CSCA, a partnership idea, or need help
            with your account? We&apos;re here.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 lg:gap-12 items-start">
          {/* Left — contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.1 }}
          >
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
            >
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div
                    className="size-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <Icon className="size-4" style={{ color: "rgba(255,255,255,0.5)" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm transition-colors duration-150"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="text-xs leading-relaxed px-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Prepify is a CSCA prep platform built for international students
              applying to Chinese universities. We&apos;re a small team and we
              read every message.
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.15 }}
          >
            {status === "success" ? (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[320px]"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="size-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <CheckCircle className="size-7" style={{ color: "oklch(0.62 0.18 275)" }} />
                </div>
                <h3
                  className="text-2xl font-normal"
                  style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Instrument Serif', serif" }}
                >
                  Message sent
                </h3>
                <p className="text-sm max-w-[30ch]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs underline underline-offset-4 transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 sm:p-8 space-y-5"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs" style={{ color: "rgba(239,68,68,0.8)" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 rounded-full px-7 py-3 text-sm text-white transition-all duration-200 disabled:opacity-60"
                  style={{
                    background: "oklch(0.52 0.22 275)",
                    fontFamily: "var(--font-poppins, 'Poppins', sans-serif)",
                  }}
                  onMouseEnter={e => !status.startsWith("load") && (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <Send className="size-3.5" />
                  {status === "loading" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
