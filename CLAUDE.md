# PrepCSCA — Design System

## Product Context
**CSCA = China Scholastic Competency Assessment** — a standardized test organized by the China Scholarship Council (CSC) and developed with Chinese university experts. It assesses international students' **language proficiency and academic readiness** for undergraduate studies in China.

**Target audience**: International students (primarily from Africa, South/Southeast Asia, Middle East, Central Asia) aged 16–25, preparing to apply for Chinese university undergraduate programs or CSC scholarships. They are NOT IT auditors, compliance officers, or enterprise professionals.

**CSCA subjects** (always use these — never audit/compliance domains):
1. Mathematics
2. Physics
3. Chemistry

**Testimonial personas**: International students by nationality (e.g., "Amara O., Nigeria → Tsinghua University")
**Social proof**: Country names of student origins (Nigeria, Indonesia, Pakistan, etc.) — NOT company names

## Tech Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion for animations
- Supabase (auth + database)
- Stripe (subscriptions)

## Font
- **Bricolage Grotesque** — headings (h1–h4), via `--font-bricolage` CSS variable
- **Figtree** — body / UI text, via `--font-figtree` CSS variable
- Both loaded from `next/font/google`; applied in `layout.tsx` via `.variable` class on `<html>`
- `globals.css`: `--font-sans: var(--font-figtree)`, `--font-heading: var(--font-bricolage)`
- Never use Inter, Geist, or system fonts

## Colors & Tokens (OKLCH)

| Token | OKLCH Value | Usage |
|-------|-------------|-------|
| Primary (brand purple) | `oklch(0.62 0.18 275)` | Accents, CTAs, active states, badges |
| Background | `oklch(0.99 0.006 275)` | Page background — tinted near-white |
| Foreground | `oklch(0.13 0.015 275)` | Body text |
| Muted foreground | `oklch(0.52 0.012 275)` | Subtitles, descriptions |
| Border | `oklch(0.91 0.01 275)` | Default borders |
| Light lavender | `oklch(0.78 0.14 275)` | Number counters on dark backgrounds |
| Dark section bg | `bg-zinc-950` | Stats, test preview |
| Brand teal | `#2BC8B7` | Logo gradient end, avatar backgrounds |
| Blue glow | `#3131f5` | Pricing section ellipse glow only |

**Rules:**
- Never use pure `#000` or `#fff` — always use OKLCH tokens
- Never use gradient text (`background-clip: text` + gradient) — absolute ban
- Never use `#9B99FE` hex directly in new code — use `oklch(0.62 0.18 275)` or `text-primary`

## Absolute Bans
1. **Gradient text** — `background-clip: text` + any gradient. Zero exceptions.
2. **Side-stripe borders** — `border-left` or `border-right` > 1px as a colored accent on cards/alerts.
3. **3-column equal-weight card grids** for feature sections (use zig-zag, asymmetric, or horizontal scroll instead).
4. **Centered hero** — hero must be split-screen (55/45 or similar asymmetric grid).
5. **Tech company logos** in social proof — CSCA audience is auditors/compliance. Use real org names (Deloitte, KPMG, EY, JPMorgan Chase, etc.) or text marquee.

## Layout Rules
- Content max-width: `max-w-5xl` (text) · `max-w-7xl` (full-bleed)
- Section padding: `py-20` standard · `py-24` for how-it-works/CTA · `py-28 lg:py-24` for hero
- Horizontal padding: `px-6` consistently
- Section content centered via `mx-auto`
- Body text max-width: `max-w-[52ch]` to `max-w-[72ch]`

## Navbar
```
Fixed, z-20, full width
border-b border-dashed bg-white/90 backdrop-blur-md
dark: bg-zinc-950/50 lg:bg-transparent
Max width: max-w-5xl px-6
Mobile hamburger: Menu ↔ X with rotate/scale/opacity transitions (200ms)
Nav links: motion.span whileHover={{ y: -2 }} spring(400, 20)
Auth buttons: outline "Login" + solid "Get Started"
```

## Hero Section (split screen — light)
```
min-h-[100dvh], bg-white, overflow-hidden
Grid: lg:grid-cols-[55fr_45fr] gap-12 xl:gap-20, items-center
Max width: max-w-7xl px-6

Left column:
  Badge: rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5
         text-xs font-semibold uppercase tracking-widest text-primary
  H1: text-4xl → text-6xl font-semibold leading-[1.08] tracking-tight text-balance
  Sub: text-lg text-muted-foreground max-w-[52ch]
  CTAs: flex gap-3, active:scale-[0.97] on both buttons
  Stats: flex gap-8 pt-4 border-t border-dashed
         value: text-2xl font-semibold text-primary tabular-nums
         label: text-xs text-muted-foreground

Right column (DashboardMockup):
  Entrance: opacity 0→1, x 32→0, y 16→0, duration 0.85s, delay 0.25s
  Float: animate={{ y: [0,-7,0] }} repeat Infinity, duration 5s, easeInOut
  Stat cards: animate={{ opacity: [1,0.75,1] }} staggered, repeat Infinity
  Progress bars: initial={{ width:0 }} animate={{ width:"X%" }} delay 1.0–1.3s
```

## How It Works (zig-zag — light/zinc-50)
```
Alternating: flex md:flex-row + md:flex-row-reverse on even steps
Visual side: ghost number (oklch 0.62 0.18 275 / 0.05) + contextual mini-UI card
  Step 01: Signup form card (email/pw fields + CTA button)
  Step 02: Study session card (domain progress bars, animated)
  Step 03: Results/score card (PASSED badge, score breakdown)
Text side: step label, h3, description, detail pill (border-dashed rounded-full)
```

## Pricing Section (dark — apply ONLY to pricing)
```
bg-black overflow-x-hidden min-h-screen
Sparkles particle overlay (density 1800, white, direction bottom)
Grid background: linear-gradient 70×80px, #ffffff18 and #3a3a3a01
Blue ellipse glow: border 200px solid #3131f5, blur 92px, left/right -568px, opacity 0.25

Header: badge "PRICING" text-xs text-blue-400/80 uppercase tracking-widest
Heading: VerticalCutReveal, text-4xl md:text-5xl font-semibold text-white tracking-tight
Sub: text-base text-zinc-400 max-w-[40ch] mx-auto

Toggle: bg-neutral-900 border border-white/10, layoutId spring (500, 30)
Active tab: bg-gradient-to-t from-blue-600 to-blue-500, border-blue-500/60
"SAVE 17%" badge: bg-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wide

Cards: grid md:grid-cols-2 max-w-3xl gap-5
Free card:  bg-neutral-950 border border-white/[0.07] rounded-2xl z-10
            CTA: bg-white/[0.07] border border-white/[0.12] text-white hover:bg-white/[0.12]
            Check icons: text-white/40
            Feature text: text-zinc-500

Pro card:   bg-gradient-to-br from-neutral-900 via-[#0c0c1e] to-neutral-900
            border border-blue-900/40 rounded-2xl shadow-[0px_-13px_280px_0px_#0900ff] z-20
            Top accent: h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent
            "Most Popular" badge: top-5 right-5, bg-blue-500/20 border-blue-500/30 text-blue-300 text-[10px] uppercase tracking-widest
            CTA: bg-gradient-to-t from-blue-600 to-blue-500 shadow-blue-900/50 border-blue-400/30
            Check icons: text-emerald-400
            Feature text: text-zinc-300

Price typography: clamp(2.5rem,6vw,3.5rem) font-bold leading-none
Feature header: text-xs font-semibold uppercase tracking-widest text-zinc-500
Card hover: whileHover={{ y: -4 }} spring(350, 26)
Prices: <NumberFlow> animated, tabular-nums

Trust footer: ShieldCheck icon + "7-day money-back guarantee · Instant access · No hidden fees" text-xs text-zinc-600
```

## Core Features Cards (gradient cards — apply ONLY to features section)
```
White background, 80px vertical + 20px horizontal padding
Badge: text-xs, color oklch(0.62 0.18 275), weight 600, uppercase, tracking 1px (NO gradient text)
Title: 2.75rem, weight 500, color #0f172a, letter-spacing -0.02em
Grid: 3 columns, 24px gap (2 cols < 900px, 1 col < 600px)
Card: border-radius 20px, height 340px, flex-col justify-end, bg #F4F8F9
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1)
Card 1 gradient: radial-gradient(circle at 50% 0%, #FFB347 → #F9ED96 → #F4F8F9)
Card 2 gradient: radial-gradient(circle at 50% 0%, #E5A1F5 → #F8ACA0 → #F4F8F9)
Card 3 gradient: radial-gradient(circle at 50% 0%, #F9ED96 → #E5A1F5 → #F4F8F9)
Internal elements: absolutely positioned, no external images
```

## Stats Section (white — 3-card)
```
bg-white, py-20
Section header: badge + VerticalCutReveal h2 + sub-paragraph "Numbers that reflect real student outcomes..."

3-card grid: grid-cols-1 md:grid-cols-3 gap-6
Card structure (each):
  - colored bg: blue-600 (pass rate), emerald-600 (students), fuchsia-700 (questions)
  - rounded-2xl overflow-hidden shadow-lg min-h-[320px] flex flex-col
  - Ghost ordinal ("01","02","03"): absolute top-right, clamp(6rem,16vw,9rem), white/7%, pointer-events-none
  - Icon: size-7 text-white/50, px-6 mb-5
  - Thin rule: h-px bg-white/15 mx-6 mb-5
  - Value: clamp(2.75rem,7vw,3.75rem) font-bold text-white, NumberFlow animated
  - Title: text-base font-semibold text-white
  - Desc: text-sm text-white/70 leading-relaxed
  - CTA bar: Link, bg-black/80 group-hover:bg-black/90, px-6 py-4, ArrowRight icon translates +1 on hover
Card hover: whileHover={{ y: -5 }} spring(380, 28)
Numbers: NumberFlow animated, tabular-nums
Cards: 94% First-Attempt Pass Rate · 12,847+ Students Prepared · 2,400+ Practice Questions
```

## Testimonials
```
bg-zinc-50/50
Featured card: full width, rounded-2xl border bg-white p-8, text-lg quote
Secondary: grid md:grid-cols-[1fr_1fr] — left: 2 stacked cards, right: 1 taller card with score breakdown
Avatars: Next.js Image, ui-avatars.com API, size 40/48
```

## Social Proof
```
Simple text marquee of company names (Deloitte, KPMG, EY, PwC, Accenture, JPMorgan Chase...)
NO logo images — company names in text-foreground/25 font-medium
animate-scroll-logos CSS animation, 30s linear infinite
Label: "Students from these organizations prepare with PrepCSCA"
```

## CTA Banner (solid purple — asymmetric)
```
background: oklch(0.52 0.22 275), py-24, overflow-hidden
Grid: md:grid-cols-[2fr_3fr] gap-12 md:gap-20
Left: "94%" in text-[5rem] md:text-[6rem] font-bold text-white/90
Right: VerticalCutReveal heading + body + 2 CTAs
Decorative: subtle grid overlay (white, opacity-10) + SVG arc (top-right corner)
CTA primary: bg-white text-[oklch(0.52_0.22_275)] font-semibold
CTA secondary: border border-white/40 text-white bg-white/10
```

## Buttons (pill — apply everywhere)
```
Base: rounded-full font-semibold active:scale-[0.97] active:-translate-y-px
Sizes:
  default: h-10 px-5 py-2
  sm:      h-9 px-4 text-xs
  lg:      h-11 px-8 text-sm
  icon:    h-10 w-10

shadcn <Button>: cva base is rounded-full — do NOT add rounded-md anywhere

Custom pill buttons (native <button> or <motion.button>):
  Primary:  bg-primary text-white hover:bg-primary/90
  Ghost:    bg-zinc-100 text-zinc-800 hover:bg-zinc-200
  Google:   border border-input bg-white text-zinc-800 hover:bg-zinc-50

Input fields in auth forms:
  rounded-full pl-10 py-2.5 — matches pill aesthetic

Progress indicator (register step flow):
  Uses <motion.button> with spring(400, 20, 0.8) physics
  Back button: animates in/out width 0→64px, opacity 0→1
  Continue/Finish: flex-1, uses bg-primary
  Progress dots: oklch(0.62 0.18 275) bar, spring(300, 20, 0.8)
```

## Animation System
- **Easing**: `EASE_OUT_EXPO = [0.16, 1, 0.3, 1]` — use on ALL scroll reveals
- **Spring (text)**: `type:"spring", stiffness: 260, damping: 38` — VerticalCutReveal
- **Spring (hover)**: `type:"spring", stiffness: 400, damping: 20` — nav links, hover states
- **Scroll reveals**: Framer `useInView`, `once: true`, `margin: "-80px"`, `initial opacity 0 + y 20–40`
- **Stagger**: `delay: base + i * 0.1` on children
- **Float**: `animate={{ y:[0,-7,0] }} repeat:Infinity duration:5 ease:"easeInOut"` — hero mockup
- **Pulse**: `animate={{ opacity:[1,0.75,1] }}` staggered per stat card
- **Progress bars**: `initial={{ width:0 }} animate={{ width:"X%" }}` with EASE_OUT_EXPO + delay
- **Text reveal**: `VerticalCutReveal` on ALL section headings (spring 260, 38)
- **Button feedback**: `active:scale-[0.97]` on all CTAs

## Typography Scale
```
Section badge:    text-xs font-semibold uppercase tracking-widest text-primary (solid — NO gradient)
Section heading:  text-3xl md:text-4xl lg:text-5xl font-semibold (via VerticalCutReveal)
Section sub:      text-lg text-muted-foreground max-w-[48ch]→[52ch]
Hero H1:          text-4xl → text-6xl font-semibold leading-[1.08] tracking-tight text-balance
Stat value:       text-2xl font-semibold text-primary tabular-nums (inline stats)
Dark stat:        clamp(4rem,10vw,7.5rem) featured · text-5xl supporting, text-[oklch(0.78_0.14_275)]
Card title:       text-xl font-semibold
Card body:        text-sm text-muted-foreground
```

## Subscription Tiers
- **Free**: 2 practice tests, basic study guide (first 2 materials), community access
- **Pro ($9/month | $89/year)**: All 40+ tests, full material library, analytics, PDF certs, priority support
- Lock UI pattern: `backdrop-blur-[2px]` overlay + `Lock` icon (lucide) + "Pro Only" badge
- Badge uses `linear-gradient(90deg, #9B99FE, #2BC8B7)` as background on a `<span>` (NOT gradient text)

## Streak Feature (platform-only — do NOT add to marketing site)

> This feature is ready in `src/components/ui/streak-card.tsx` but must only be wired into app routes (`/dashboard`, `/profile`) when the authenticated platform is built.

### What it is
A `<StreakCard>` component that shows a student's daily study streak, longest streak, and total activity. Designed for the dashboard sidebar or profile page.

### Files
```
src/components/ui/streak-card.tsx     — main card component (DONE)
src/components/ui/streak-calendar.tsx — weekly calendar sub-component (TODO — must be created)
```

> `streak-calendar.tsx` is imported by `streak-card.tsx` but does not exist yet. It must be built or sourced before `StreakCard` can be used. It exports `StreakCalendar` with a `streak: StreakPeriod[]` prop and a `view="week"` + `startOfWeek` API.

### Props (`StreakCardProps`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `streak` | `StreakPeriod[]` | required | Array of `{ periodStart, periodEnd }` ISO date strings |
| `currentStreak` | `number` | required | Current consecutive days |
| `longestStreak` | `number` | required | All-time longest streak |
| `total` | `number` | required | Total active days ever |
| `title` | `string` | `"Streak"` | Card heading |
| `actionLabel` | `string` | `"View Details"` | Link button label |
| `onActionClick` | `() => void` | — | Link button callback |
| `showHowItWorks` | `boolean` | `true` | Show collapsible explainer |
| `howItWorksTitle` | `string` | `"How do streaks work?"` | Dropdown heading |
| `howItWorksItems` | `string[]` | 3 default rules | Bullet items in explainer |
| `defaultHowItWorksOpen` | `boolean` | `false` | Explainer open on mount |

### Usage (when platform is built)
```tsx
import { StreakCard } from "@/components/ui/streak-card"

<StreakCard
  streak={[
    { periodStart: "2026-05-24", periodEnd: "2026-05-24" },
    { periodStart: "2026-05-25", periodEnd: "2026-05-28" },
  ]}
  currentStreak={16}
  longestStreak={100}
  total={131}
  onActionClick={() => router.push("/profile")}
/>
```

### Placement
- **Dashboard** (`/dashboard`): sidebar widget or stats row below the welcome card
- **Profile** (`/profile`): dedicated streak section below subscription info

### Data requirements
Streak periods come from `test_attempts` table — query completed attempts grouped into consecutive date ranges. The `StreakPeriod[]` array represents contiguous active windows, not individual days.

### Dependencies
- `lucide-react` (already installed) — `Flame`, `CheckCircle2`, `ChevronDown`, `RefreshCcw`
- `@/components/ui/button` (already exists)
- `@/components/ui/streak-calendar` (TODO — must be created first)
- `@/lib/utils` `cn()` (already exists)

## File Conventions
- Marketing sections: `src/components/blocks/`
- UI primitives: `src/components/ui/`
- Shared layout pieces: `src/components/shared/`
- Route groups: `(marketing)` · `(auth)` · `(app)`
- All "use client" components explicitly marked
- Server components default (no directive needed)
