# Genzy — Design System

## Product Context

**Platform name: Genzy** (styled as `Genzy®` in Instrument Serif in the navbar)

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

---

## Fonts

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | **Instrument Serif** (weight 400) | All section h1/h2/h3 headings, navbar logo |
| `--font-body` | **Inter** (weight 400, 500) | Body text, CTAs, subtext |
| `--font-bricolage` | Bricolage Grotesque | Legacy — do not use on marketing pages |
| `--font-figtree` | Figtree | Legacy — do not use on marketing pages |

**Rules:**
- Section headings: `font-normal` + `fontFamily: "'Instrument Serif', serif"`
- Body/UI text: `fontFamily: "var(--font-body, Inter, sans-serif)"`
- Never use `font-semibold` or `font-bold` on Instrument Serif headings — weight 400 only

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

Logo: "Genzy®" — text-3xl tracking-tight text-white
      fontFamily: "'Instrument Serif', serif"
      ® as <sup className="text-xs">

Nav links (hidden md:below): Home · Features · Pricing · FAQ · Get In Touch
  Active: rgba(255,255,255,1)
  Inactive: rgba(255,255,255,0.5) → hover rgba(255,255,255,1)
  Transition: transition-colors 150ms
  Inline onMouseEnter/onMouseLeave (no CSS class conflict with dark bg)

CTA: "Begin Journey"
  liquid-glass rounded-full px-6 py-2.5 text-sm text-white
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
  fontFamily: var(--font-body, Inter, sans-serif)

CTA: "Start Preparing" — liquid-glass rounded-full px-14 py-5 text-base text-white mt-12
  hover:scale-[1.03] transition-transform duration-200
  Link href="/register"

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

```
Background: #060f1a, borderBottom: "1px solid rgba(255,255,255,0.06)", py-12
Label: "Students from these countries prepare with Genzy"
       color: rgba(255,255,255,0.35), text-sm, text-center
Ticker: country names, color: rgba(255,255,255,0.2), font-medium tracking-wide
animate-scroll-logos CSS animation, 30s linear infinite
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

## Test Preview

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

## Footer

```
Background: #060f1a
Border top: rgba(255,255,255,0.06)
Logo: PrepCSCA SVG icon + "Genzy" text rgba(255,255,255,0.85)
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

Contact email: privacy@genzy.com
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
