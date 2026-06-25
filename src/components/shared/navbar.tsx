"use client";

import * as React from "react";
import Link from "next/link";
import { openWaitlist } from "@/lib/waitlist";

const menuItems = [
  { name: "Home", href: "/", anchor: null },
  { name: "Features", href: "#features", anchor: "features" },
  { name: "Pricing", href: "#pricing", anchor: "pricing" },
  { name: "FAQ", href: "#faq", anchor: "faq" },
  { name: "Get In Touch", href: "#contact", anchor: "contact" },
];

function smoothScrollTo(anchor: string | null) {
  if (!anchor) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  return (
    <header className="relative z-10">
      <nav className="flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-display, 'Instrument Serif', serif)" }}
        >
          prepify<sup className="text-xs">®</sup>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {menuItems.map((item, i) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm transition-colors duration-150 cursor-pointer"
                style={{ color: i === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,1)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = i === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)")
                }
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(item.anchor);
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={openWaitlist}
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform duration-200"
          style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}
        >
          Begin Journey
        </button>
      </nav>
    </header>
  );
}
