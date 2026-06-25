# Prepify — Design System

## Product Context

**Platform name: Prepify** — written "Prepify" in prose, but styled **lowercase** `prepify®` in Instrument Serif wherever the brand wordmark renders (navbar logo, footer, in-heading mentions)

**CSCA = China Scholastic Competency Assessment** — a standardized test organized by the China Scholarship Council (CSC). It assesses international students' **language proficiency and academic readiness** for undergraduate studies in China.

**Target audience**: International students (Africa, South/Southeast Asia, Middle East, Central Asia) aged 16–25, preparing for Chinese university applications or CSC scholarships. NOT IT auditors or enterprise professionals.

**CSCA subjects tested** (always use these):
1. Mathematics
2. Physics
3. Chemistry

**Testimonial personas**: International students by nationality — e.g. "Amara O., Nigeria → Tsinghua University"
**Social proof ticker**: Country names of student origins (Nigeria, Indonesia, Pakistan…) — NOT company logos

---

## Tech Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (scroll reveals, float, number flow)
- Supabase (auth + database)
- Stripe (subscriptions)
- `@number-flow/react` for animated number counters
- Fonts: **Poppins** + **Instrument Serif** via `next/font/google`
- Resend for waitlist + contact emails (`/api/waitlist`, `/api/contact`)

---

## Page Composition

Actual marketing home order (`src/app/(marketing)/page.tsx`), top → bottom:

1. `HeroSection` — fullscreen video + expandable waitlist CTA
2. `Features` (`features-9.tsx`) — "what prepify gives you" bento grid
3. `CoreFeatures` — 3 gradient cards
4. `HowItWorks` — 3 numbered steps
5. `WhyUsSection` — "Why prepify" 4-card grid
6. `MaterialsPreview` — material cards w/ Pro lock
7. `StatsSection` — Proven Results stat cards
8. `PricingSection` — Free vs Pro
9. `Testimonials` — student success cards
10. `FaqSection` — accordion
11. `CtaBanner` — purple final CTA
12. `GetInTouchSection` — contact form

**Built but NOT currently mounted** in the home page: `SocialProof` (`social-proof.tsx`), `TestPreview`, and `PrepifySection` (`prepify-section.tsx`, the VerticalTabs "How prepify can help you"). Their specs below are kept for when they're re-added; don't assume they render today.

---

## Fonts

Loaded in `src/app/layout.tsx` via `next/font/google`. Only two families are loaded.

| Variable | Font | Weights | Usage |
|---|---|---|---|
| `--font-poppins` | **Poppins** | 300/400/500/600/700 | Primary UI + body font. Set globally on `<html>`. CTAs, subtext, and most section headings |
| `--font-display` | **Instrument Serif** | 400 | Serif display headings — hero H1, navbar logo, editorial section headings |

**Rules:**
- Base/body/UI text is **Poppins** — the `<html>` element already sets `fontFamily: "var(--font-poppins, 'Poppins', sans-serif)"` globally, so you rarely need to repeat it. When a component does set it explicitly, use that exact string.
- **Serif display headings** (hero H1, "what prepify gives you", How-It-Works step titles, Core Features heading): `font-normal` + `fontFamily: "'Instrument Serif', serif"` — weight 400 only, **never** `font-semibold`/`font-bold`.
- Some section headings (FAQ, Testimonials, Privacy Policy, Pricing) intentionally use **Poppins** `font-normal` rather than serif. When adding a section, match the heading font of its neighbours.
- `var(--font-body, …)`, Inter, Bricolage Grotesque, and Figtree are **legacy**. `--font-body` is no longer defined and silently falls back to Inter — do not add new usages; prefer `--font-poppins`. Older components still referencing `var(--font-body, Inter, sans-serif)` are being phased out.

---

## Color System (Dark Cinematic)

The entire marketing site uses a dark navy palette. No light/white section backgrounds.

| Token | Value | Usage |
|---|---|---|
| **Section background** | `#060f1a` | All section backgrounds (inline `style`) |
| **Foreground (headings)** | `rgba(255,255,255,0.95)` | Section h2/h3 titles |
| **Body text** | `rgba(255,255,255,0.5)` | Paragraphs, descriptions |
| **Muted labels** | `rgba(255,255,255,0.35)` | Section badge labels, step labels, footer links |
| **Borders** | `rgba(255,255,255,0.06)–0.08` | Section dividers, dashed pills |
| **Accent (brand purple)** | `oklch(0.62 0.18 275)` | Dots, highlights, progress bars |

**Rules:**
- Never use `bg-white`, `bg-background`, `bg-zinc-50` on section wrappers
- Set backgrounds via `style={{ background: "#060f1a" }}` (inline) for sections
- Pricing section stays `bg-black` with blue glow — existing dark treatment kept
- Test preview stays `bg-zinc-950` — existing dark treatment kept
- Cards inside sections remain white (`bg-white`) — do NOT darken cards

---

## Liquid Glass Effect

Used on: navbar CTA button, hero CTA button, cookie banner Accept button.

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

## Animation System

| Name | Definition | Usage |
|---|---|---|
| `fade-rise` | `opacity 0→1, translateY 24px→0, 0.8s ease-out` | Hero h1 |
| `fade-rise-delay` | same + `0.2s delay` | Hero subtext |
| `fade-rise-delay-2` | same + `0.4s delay` | Hero CTA button |
| `EASE_OUT_EXPO` | `[0.16, 1, 0.3, 1]` | All scroll reveals |
| Scroll reveal | `useInView once:true margin:"-80px"` + `opacity 0→1 y 20–40→0` | Every section |
| Stagger | `delay: base + i * 0.1` | Children in grids |
| Float | `animate={{ y:[0,-7,0] }} Infinity 5s easeInOut` | Dashboard mockup |
| Spring (text) | `stiffness:260 damping:38` | VerticalCutReveal |
| Spring (hover) | `stiffness:400 damping:20` | Nav links |
| Number flow | `<NumberFlow>` component | Stat values |

---

## Navbar

```
Overlaid on the hero video — NOT fixed/sticky
Lives inside HeroSection, rendered above the video z-10
relative z-10, flex row, justify-between
px-8 py-6, max-w-7xl mx-auto

Logo: "prepify®" — lowercase (the brand is styled lowercase across the UI),
      text-3xl tracking-tight text-white
      fontFamily: "var(--font-display, 'Instrument Serif', serif)"
      ® as <sup className="text-xs">. Links to "/".

Nav links (hidden md:below): Home · Features · Pricing · FAQ · Get In Touch
  Each is an in-page anchor (#features / #pricing / #faq / #contact; Home → top).
  onClick preventDefault + smoothScrollTo(anchor) — does NOT navigate routes.
  Active (Home): rgba(255,255,255,1)
  Inactive: rgba(255,255,255,0.5) → hover rgba(255,255,255,1)
  Transition: transition-colors 150ms, inline onMouseEnter/onMouseLeave

CTA: "Begin Journey" — opens the waitlist (onClick={openWaitlist}, dispatches
  the `prepify:open-waitlist` event). NOT a link to /register.
  liquid-glass rounded-full px-6 py-2.5 text-sm text-white
  fontFamily: var(--font-poppins, 'Poppins', sans-serif)
  hover:scale-[1.03] transition-transform duration-200
```

---

## Hero Section (fullscreen video)

```
<section> relative min-h-[100dvh] flex flex-col overflow-hidden

Video background:
  <video autoPlay loop muted playsInline>
  absolute inset-0 w-full h-full object-cover z-0
  src: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/
       hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4

<Navbar /> — overlaid directly, relative z-10

Hero content: relative z-10 flex flex-col items-center justify-center text-center flex-1 px-6 pb-40

H1: "Where ambition meets the exam that opens China."
  text-5xl sm:text-7xl md:text-8xl font-normal leading-[0.95] max-w-7xl text-white
  fontFamily: "'Instrument Serif', serif"
  letterSpacing: "-2.46px"
  Accent words ("ambition", "China."): <em className="not-italic" style={{ color: "rgba(255,255,255,0.45)" }}>

Subtext: mt-8 max-w-2xl text-base sm:text-lg leading-relaxed
  color: rgba(255,255,255,0.55)
  fontFamily: var(--font-poppins, 'Poppins', sans-serif)

CTA: Expandable waitlist pill (liquid-glass rounded-full) — NOT a link to /register.
  Morphs between states via Framer Motion `layout` + AnimatePresence (spring 380/32):
    idle      → "Join Waitlist" + ArrowRight
    expanded  → email input + Send button (accent bg oklch(0.62 0.18 275))
    loading   → spinner inside Send button
    success   → "You're on the list…" + CheckCircle + Confetti burst
    duplicate → "You're already on the list!" + Clock
  Submits to POST /api/waitlist. Also opens on the global `prepify:open-waitlist`
  CustomEvent — dispatched by openWaitlist() in src/lib/waitlist.ts (navbar + other CTAs).
  Confetti: 28 pieces, colors [#9B99FE, #2BC8B7, #fff, #c4b5fd, #6ee7b7].

Animations: animate-fade-rise (h1) · animate-fade-rise-delay (p) · animate-fade-rise-delay-2 (cta)
No overlays, no gradients, no decorative blobs — video provides all depth
```

---

## Section Pattern (all non-video sections)

```
Section wrapper:  style={{ background: "#060f1a" }} + appropriate py-20/py-24
Badge label:      text-xs font-semibold uppercase tracking-widest
                  color: rgba(255,255,255,0.35)
Section heading:  font-normal, color: rgba(255,255,255,0.95)
                  fontFamily: "'Instrument Serif', serif"
                  Size: text-3xl → text-5xl (or matching existing section sizes)
Section subtext:  text-lg, color: rgba(255,255,255,0.45)
Borders/dividers: rgba(255,255,255,0.06) to rgba(255,255,255,0.08)
Dashed pill:      border: "1px dashed rgba(255,255,255,0.15)"
                  color: rgba(255,255,255,0.35)
```

---

## Social Proof

> Built but NOT currently mounted in the home page (see Page Composition).

```
Background: #060f1a, borderBottom: "1px solid rgba(255,255,255,0.06)", py-12
Label: "Students from these countries prepare with Prepify"
       color: rgba(255,255,255,0.35), text-sm, text-center
Ticker: country names, color: rgba(255,255,255,0.2), font-medium tracking-wide
animate-scroll-logos CSS animation, 30s linear infinite
```

---

## Features — Bento Grid (`features-9.tsx`)

First section after the hero. Heading: "what **prepify** gives you" (`prepify` in an
`<em className="not-italic">` at `rgba(255,255,255,0.5)`), Instrument Serif font-normal.

```
Background: #060f1a, px-4 py-16 md:py-32
Outer grid: mx-auto max-w-5xl border (rgba 0.08), md:grid-cols-2

Cells:
  • Left col  — 3 SubjectCards stacked (Mathematics / Physics / Chemistry),
                each: rounded-lg border, bg rgba(255,255,255,0.02), lucide icon + title + desc
  • Right col — "AI-Powered Help" chat mock (question bubble + accent reply bubble)
  • Full row  — "94% Pass Rate" (Instrument Serif, text-4xl lg:text-7xl, centered)
  • Full row  — "Progress Analytics" + Recharts AreaChart (math/physics/chemistry
                over 7 weeks; colors #9B99FE / #2BC8B7 / #F5A623)

Scroll animation (added — match this when editing):
  Section: useInView(once, margin -80px)
  Heading: fade-rise (y 24→0, 0.6s EASE_OUT_EXPO)
  Grid:    stagger container — variants hidden/show, staggerChildren 0.12, delayChildren 0.1
  Cells:   cellVariants { hidden: y28/opacity0 → show: 0.65s EASE_OUT_EXPO }
  Subject cards: nested stagger (0.1) inside the left column, + whileHover y:-3 (0.2s)
```

---

## Core Features

```
Background: #060f1a, padding: "80px 20px"
Badge: rgba(255,255,255,0.35)
Heading: Instrument Serif, rgba(255,255,255,0.95), 2.75rem, font-weight 400
Sub: rgba(255,255,255,0.45), 1.125rem

Cards: white bg, unchanged
Grid: 3 columns (2 < 900px, 1 < 600px), 24px gap
Card backgrounds (gradient, top → bottom):
  Card 1 (Smart Study System):   #FFB347 → #F9ED96 → #F4F8F9
  Card 2 (Realistic Tests):      #E5A1F5 → #F8ACA0 → #F4F8F9
  Card 3 (Progress Analytics):   #F9ED96 → #E5A1F5 → #F4F8F9
All card internals (text, icons, pill buttons) stay white-bg / light-text — do NOT invert
```

---

## How It Works

```
Background: #060f1a, py-24
Step label:   rgba(255,255,255,0.35), text-xs uppercase tracking-widest
Step heading: Instrument Serif, rgba(255,255,255,0.95), text-2xl → text-3xl, font-normal
Step body:    rgba(255,255,255,0.5), leading-relaxed max-w-[44ch]
Step pill:    border "1px dashed rgba(255,255,255,0.15)", color rgba(255,255,255,0.35)
Ghost number: rgba(255,255,255,0.04), clamp(7rem,16vw,11rem)

Layout: flex flex-col items-center (default), md:flex-row (even: md:flex-row-reverse)
Visual side: w-full md:flex-1 — MUST be w-full on mobile (not flex-1 only — items-center shrinks it)
Text side: flex-1

Step cards (white — do NOT darken):
  Step 01: Signup form card (email/pw/CTA/Google)
  Step 02: Study session card (domain progress bars)
  Step 03: PASSED results card (score breakdown, Download Certificate)
```

---

## Why Prepify (`why-us-section.tsx`)

```
Background: #060f1a, py-24
Badge:    "Why prepify" — rgba(255,255,255,0.35), uppercase tracking-widest
Heading:  "Built differently, for one test." — Instrument Serif font-normal,
          rendered via <VerticalCutReveal> (spring 260/38), autoStart on inView
Sub:      rgba(255,255,255,0.45), max-w-[48ch]

Bento grid: grid-cols-1 md:grid-cols-3, auto-rows-[minmax(160px,auto)], gap-5
  • Left col (row-span-3): white rounded-2xl card, 4 FeatureCards divided by
    divide-gray-100 — Faast (Rocket) · Cheap (PiggyBank) · Freedom (Wind) · Built-in AI (Brain)
  • CscaBentoCard — md:col-span-2 row-span-2 (ui/csca-bento-card.tsx)
  • MagnifiedBento — md:col-span-2 row-span-1 (ui/magnified-bento.tsx)

Reveal: stagger container (hidden/visible, staggerChildren 0.1), each cell
        spring 100/10 rise. Cards stay white — do NOT darken.
```

---

## Test Preview

> Built but NOT currently mounted in the home page (see Page Composition).

```
Background: bg-zinc-950 (unchanged, already dark)
Heading: Instrument Serif font-normal, text-white
Badge: text-[oklch(0.78_0.14_275)]
Interactive question card: dark zinc treatment, unchanged
```

---

## Materials Preview

```
Background: #060f1a, py-20
Badge/heading/sub: standard dark section pattern
Material cards: white bg, unchanged internal styling
Pro lock overlay: backdrop-blur-[2px] + Lock icon + "Pro Only" gradient badge
```

---

## Stats Section

```
Background: #060f1a, py-20
Badge/heading/sub: standard dark section pattern
Heading: "Proven Results" via VerticalCutReveal, Instrument Serif font-normal

Stat cards: 3-col grid, colored backgrounds unchanged:
  blue-600 (94% pass rate) · emerald-600 (12,847+ students) · fuchsia-700 (2,400+ questions)
  Cards keep white text, NumberFlow values, colored CTA bars — do NOT change
```

---

## Pricing Section

```
bg-black min-h-screen (unchanged)
Sparkles overlay + blue ellipse glow (unchanged)
Heading: Instrument Serif font-normal text-white (updated from font-semibold)
Cards: dark neutral treatment, unchanged
```

---

## Testimonials

```
Background: #060f1a, py-20
Badge/heading/sub: standard dark section pattern
Testimonial cards: white bg (bg-white), dark text inside — do NOT invert
Featured card: rounded-2xl border bg-white p-8
Secondary: md:grid-cols-[1fr_1fr], left 2 stacked + right 1 taller with score breakdown
```

---

## FAQ Section

```
Background: #060f1a, py-20
Badge/heading/sub: standard dark section pattern
Accordion:
  AccordionItem border: rgba(255,255,255,0.08)
  AccordionTrigger: rgba(255,255,255,0.8), text-sm font-medium
  AccordionContent: rgba(255,255,255,0.45), text-sm leading-relaxed
Grid: md:grid-cols-2 gap-x-12
```

---

## CTA Banner

```
background: oklch(0.52 0.22 275), py-24, overflow-hidden (unchanged purple)
Heading: Instrument Serif font-normal text-white (updated from font-semibold)
Layout: md:grid-cols-[2fr_3fr], left "94%" stat, right heading + body + 2 CTAs
Decorative: grid overlay white/10 + SVG arc top-right
```

---

## Get In Touch (`get-in-touch-section.tsx`)

Final section (id="contact"). Contact form wired to `POST /api/contact` (Resend).

```
Background: #060f1a, py-24
Badge:   "Contact" · Heading: "Get in touch" (Instrument Serif font-normal)
Sub:     rgba(255,255,255,0.45), max-w-[44ch]

Layout: grid md:grid-cols-[1fr_1.6fr], gap-8 lg:gap-12, items-start
  Left  — info card (rounded-2xl, border rgba 0.07, bg rgba 0.02):
          Email support@prepify.com · "Remote — Global" · "Within 24 hours"
          each row = size-9 rounded-xl icon tile + uppercase label + value
  Right — form card (same surface): Name + Email (2-col) + Message textarea
          Inputs: rounded-xl, bg rgba 0.04, border rgba 0.09 → focus rgba 0.22
          Submit: rounded-full pill, bg oklch(0.52 0.22 275), Send icon
          States: idle → loading ("Sending…") → success card (CheckCircle +
                  "Message sent" + "Send another") | error inline message

Reveal: header fade-rise; left slides x:-20, right slides x:+20 (EASE_OUT_EXPO)
Form card stays on the dark surface — it is NOT a white card.
```

---

## Footer

```
Background: #060f1a
Border top: rgba(255,255,255,0.06)
Logo: PrepCSCA SVG icon + "Prepify" text rgba(255,255,255,0.85)
Category headings: rgba(255,255,255,0.7), text-sm font-semibold
Links: rgba(255,255,255,0.35), text-sm
Social links: rgba(255,255,255,0.3), text-xs
Bottom rule: rgba(255,255,255,0.06)
Copyright: rgba(255,255,255,0.25)
```

---

## Cookie Consent Banner

```
Fixed bottom-0, z-50, px-4 pb-4 sm:px-6 sm:pb-6
Inner: max-w-2xl mx-auto rounded-2xl p-5
Background: rgba(6,15,26,0.92) + backdrop-filter blur(16px)
Border: rgba(255,255,255,0.1)
Shadow: 0 24px 64px -12px rgba(0,0,0,0.6)

Layout: flex flex-col sm:flex-row items-start sm:items-center gap-4
Icon: 🍪 in size-9 rounded-xl, background rgba(255,255,255,0.06)
Text: text-sm, rgba(255,255,255,0.6), links rgba(255,255,255,0.85) underlined
Buttons:
  Decline: rgba(255,255,255,0.05) bg, rgba(255,255,255,0.08) border, text rgba(255,255,255,0.4)
  Accept:  liquid-glass rounded-full, text-white font-medium

State: localStorage key "csca_consent" → "accepted" | "declined"
Shows only once (hidden if key exists)
Visible on all marketing pages (in MarketingLayout)
```

---

## Privacy Policy Page

```
Route: /privacy-policy (inside (marketing) route group)
Background: #060f1a min-h-screen

Header: border-b rgba(255,255,255,0.06), px-6 py-8
  ← Back link: rgba(255,255,255,0.35), text-xs
  H1: "Privacy Policy" — Instrument Serif, rgba(255,255,255,0.95), text-4xl sm:text-5xl
  Effective date: rgba(255,255,255,0.35), text-sm

Sections (12 total):
  H2: Instrument Serif font-normal, rgba(255,255,255,0.9), text-2xl
  Body: text-sm leading-relaxed, rgba(255,255,255,0.5)
  Strong emphasis: rgba(255,255,255,0.75)
  Links/emails: rgba(255,255,255,0.7), underlined
  Code snippets: bg rgba(255,255,255,0.06), text-xs, rounded

Contact email: privacy@prepify.com
```

---

## Subscription Tiers

| Tier | Price | Includes |
|---|---|---|
| Free | $0 | 2 practice tests, basic study guide (2 materials), community access, score tracking |
| Pro | $9/mo · $89/yr | All 40+ tests, full material library, advanced analytics, PDF exam certificates, priority support, offline study mode |

Lock UI: `backdrop-blur-[2px]` overlay + `Lock` icon + "Pro Only" badge
Badge background: `linear-gradient(90deg, #9B99FE, #2BC8B7)` on `<span>` (NOT gradient text)

---

## File Conventions

```
src/components/blocks/    — marketing page sections
src/components/ui/        — reusable UI primitives
src/components/shared/    — layout pieces (navbar, footer, logo, cookie-banner)
src/app/(marketing)/      — marketing routes (home, privacy-policy)
src/app/(auth)/           — login, register
src/app/(app)/            — authenticated platform
```

All client components: `"use client"` at top
Server components: no directive needed

---

## Absolute Bans

1. **Gradient text** — `background-clip: text` + any gradient. Zero exceptions.
2. **Light section backgrounds** — no `bg-white`, `bg-zinc-50`, `bg-background` on section wrappers
3. **Inverting card internals** — cards stay white with dark text inside
4. **Font-weight on display headings** — Instrument Serif always `font-normal` (weight 400)
5. **Centered hero** — hero is fullscreen video; do not revert to split-screen light layout
6. **Tech company logos in social proof** — country names only, no corporate logos

---

## Streak Feature (platform-only — NOT on marketing site)

Ready in `src/components/ui/streak-card.tsx`. Wire into `/dashboard` or `/profile` only.
`streak-calendar.tsx` still TODO — must be created before `StreakCard` is usable.
