'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import { Activity, MessageCircle, Calculator, Atom, Beaker, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
const POPPINS = "var(--font-poppins, 'Poppins', sans-serif)"

// Subject accents mirror the analytics chart palette so the cards and the
// chart read as one system.
const SUBJECTS = [
    {
        Icon: Calculator,
        title: 'Mathematics',
        description: 'Algebra, geometry, calculus & problem-solving techniques',
        accent: '#9B99FE',
        questions: 812,
    },
    {
        Icon: Atom,
        title: 'Physics',
        description: 'Mechanics, thermodynamics, waves & energy concepts',
        accent: '#2BC8B7',
        questions: 746,
    },
    {
        Icon: Beaker,
        title: 'Chemistry',
        description: 'Reactions, periodic table, bonding & molecular structure',
        accent: '#F5A623',
        questions: 693,
    },
] as const

// Cell reveal: rise + fade, orchestrated by the grid's stagger container.
const cellVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
}

export function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    // The pass-rate row sits ~2 viewports below the heading — give it its own
    // trigger so the count-up runs when the user actually sees it.
    const passRef = useRef(null)
    const passInView = useInView(passRef, { once: true, margin: "-60px" })

    return (
        <section ref={ref} className="px-4 py-16 md:py-32" style={{ background: "#060f1a" }}>
            <motion.div
                className="mx-auto max-w-5xl mb-16"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
                <span
                    className="text-xs font-semibold uppercase tracking-widest mb-4 block"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                >
                    Features
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Instrument Serif', serif" }}>
                    what <em className="not-italic" style={{ color: "rgba(255,255,255,0.5)" }}>prepify</em> gives you
                </h2>
                <p className="mt-4 text-lg max-w-[52ch]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Real exam practice, instant AI explanations, and progress analytics — across all three CSCA subjects.
                </p>
            </motion.div>
            <motion.div
                className="mx-auto grid max-w-5xl border md:grid-cols-2"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                <motion.div
                    className="flex flex-col gap-4 p-6 sm:p-12"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                >
                    {SUBJECTS.map((subject) => (
                        <SubjectCard key={subject.title} {...subject} />
                    ))}
                </motion.div>
                <motion.div variants={cellVariants} className="overflow-hidden border-t p-6 sm:p-12 md:border-0 md:border-l" style={{ background: "transparent", borderColor: "rgba(255,255,255,0.08)" }}>
                    <ChatDemo />
                </motion.div>
                <motion.div ref={passRef} variants={cellVariants} className="col-span-full border-y p-12" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.95)" }}>
                    <p className="text-center text-4xl font-normal lg:text-7xl tabular-nums" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        {passInView ? <NumberFlow value={94} /> : "0"}% Pass Rate
                    </p>
                    <p className="mt-3 text-center text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: POPPINS }}>
                        of prepify students pass the CSCA on their first attempt
                    </p>
                </motion.div>
                <motion.div variants={cellVariants} className="col-span-full px-6 py-12 md:px-12">
                    <AnalyticsPanel />
                </motion.div>
            </motion.div>
        </section>
    )
}


const SubjectCard = ({ Icon, title, description, accent, questions }: {
    Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    title: string
    description: string
    accent: string
    questions: number
}) => {
    return (
        <motion.div
            variants={cellVariants}
            whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.18)", transition: { duration: 0.2, ease: "easeOut" } }}
            className="rounded-lg border p-4"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
        >
            <div
                className="flex size-9 items-center justify-center rounded-lg"
                style={{ background: `${accent}14`, border: `1px solid ${accent}29` }}
            >
                <Icon className="size-4" style={{ color: accent }} />
            </div>
            <h3 className="mt-4 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>{title}</h3>
            <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: POPPINS }}>{description}</p>
            <div className="mt-3 flex items-center gap-1.5">
                <span className="size-1 rounded-full" style={{ background: accent }} />
                <span className="text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.35)", fontFamily: POPPINS }}>
                    {questions} practice questions
                </span>
            </div>
        </motion.div>
    )
}

/* ── AI chat demo — plays a question → typing → answer sequence on scroll ── */

const TypingDots = () => (
    <span className="flex items-center gap-1 px-1">
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="size-1.5 rounded-full bg-white/80"
                animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
        ))}
    </span>
)

const ChatDemo = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    // 0 idle → 1 question → 2 typing → 3 answered
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        if (!inView) return
        const timers = [
            setTimeout(() => setPhase(1), 400),
            setTimeout(() => setPhase(2), 1100),
            setTimeout(() => setPhase(3), 2500),
        ]
        return () => timers.forEach(clearTimeout)
    }, [inView])

    return (
        <div ref={ref}>
            <div className="relative z-10">
                <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: POPPINS }}>
                    <MessageCircle className="size-4" />
                    AI-Powered Help
                </span>

                <p className="my-8 text-2xl font-normal" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Instrument Serif', serif" }}>Get instant explanations for every concept.</p>
            </div>
            <div aria-hidden className="flex flex-col gap-8">
                {/* Student question */}
                <motion.div
                    initial={false}
                    animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                    <div className="flex items-center gap-2">
                        <span className="flex justify-center items-center size-5 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                            <span className="size-3 rounded-full" style={{ background: "oklch(0.62 0.18 275)" }} />
                        </span>
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: POPPINS }}>Physics Question</span>
                    </div>
                    <div className="rounded-lg mt-1.5 w-3/5 border p-3 text-xs" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontFamily: POPPINS }}>Why does this formula apply to thermodynamics?</div>
                </motion.div>

                {/* AI reply — typing indicator swaps into the answer */}
                <div className="relative">
                    <motion.div
                        initial={false}
                        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    >
                        <div className="rounded-lg mb-1 ml-auto w-3/5 p-3 text-xs text-white" style={{ background: "oklch(0.62 0.18 275)", fontFamily: POPPINS }}>This relates to the second law of thermodynamics because...</div>
                        <span className="block text-right text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: POPPINS }}>Instant</span>
                    </motion.div>
                    <AnimatePresence>
                        {phase === 2 && (
                            <motion.div
                                className="absolute right-0 top-0 rounded-lg p-3"
                                style={{ background: "oklch(0.62 0.18 275)" }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                                <TypingDots />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

/* ── Progress Analytics — interactive panel with subject spotlighting ── */

type SubjectKey = 'math' | 'physics' | 'chemistry'

// Current score + improvement derived from chartData (week 7 vs week 1).
const ANALYTICS_STATS: Array<{ key: SubjectKey; name: string; color: string; now: number; delta: number }> = [
    { key: 'math', name: 'Mathematics', color: '#9B99FE', now: 92, delta: 36 },
    { key: 'physics', name: 'Physics', color: '#2BC8B7', now: 76, delta: 28 },
    { key: 'chemistry', name: 'Chemistry', color: '#F5A623', now: 90, delta: 48 },
]

const AnalyticsPanel = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-80px" })
    // Hovering a stat chip spotlights that subject's line in the chart.
    const [focus, setFocus] = useState<SubjectKey | null>(null)

    return (
        <div ref={ref} className="flex flex-col gap-8">
            <div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: POPPINS }}>
                        <Activity className="size-4" />
                        Progress Analytics
                    </span>
                    <span className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: POPPINS }}>
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "oklch(0.62 0.18 275)" }} />
                            <span className="relative inline-flex size-2 rounded-full" style={{ background: "oklch(0.62 0.18 275)" }} />
                        </span>
                        Last 7 weeks
                    </span>
                </div>

                <p className="mt-6 text-2xl font-normal" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Instrument Serif', serif" }}>
                    Monitor your score improvement in real-time. <span style={{ color: "rgba(255,255,255,0.35)" }}> Track progress across all 3 subjects.</span>
                </p>

                {/* Stat chips — double as an interactive legend */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {ANALYTICS_STATS.map((s) => (
                        <div
                            key={s.key}
                            onMouseEnter={() => setFocus(s.key)}
                            onMouseLeave={() => setFocus(null)}
                            className="rounded-lg border p-3.5 transition-colors duration-300 cursor-default"
                            style={{
                                background: focus === s.key ? `${s.color}0D` : "rgba(255,255,255,0.02)",
                                borderColor: focus === s.key ? `${s.color}45` : "rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: POPPINS }}>
                                <span className="size-2 rounded-full" style={{ background: s.color }} />
                                {s.name}
                            </div>
                            <div className="mt-2 flex items-end justify-between">
                                <span className="text-2xl font-semibold leading-none tabular-nums" style={{ color: "rgba(255,255,255,0.95)", fontFamily: POPPINS }}>
                                    {inView ? <NumberFlow value={s.now} /> : "0"}%
                                </span>
                                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400" style={{ fontFamily: POPPINS }}>
                                    <TrendingUp className="size-3" />
                                    +{s.delta}
                                </span>
                            </div>
                            <div className="mt-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: POPPINS }}>
                                since week 1
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mount the chart on scroll so the areas draw themselves in view */}
            {inView ? <MonitoringChart focus={focus} /> : <div className="h-72 md:h-80 w-full" />}
        </div>
    )
}

const chartConfig = {
    math: {
        label: 'Math',
        color: '#9B99FE',
    },
    physics: {
        label: 'Physics',
        color: '#2BC8B7',
    },
    chemistry: {
        label: 'Chemistry',
        color: '#F5A623',
    },
} satisfies ChartConfig

// Organic upward progression with small dips — endpoints must stay in sync
// with ANALYTICS_STATS (week 7 value, delta vs week 1).
const chartData = [
    { month: 'Week 1', math: 56, physics: 48, chemistry: 42 },
    { month: 'Week 2', math: 60, physics: 53, chemistry: 50 },
    { month: 'Week 3', math: 58, physics: 51, chemistry: 56 },
    { month: 'Week 4', math: 66, physics: 58, chemistry: 61 },
    { month: 'Week 5', math: 75, physics: 65, chemistry: 69 },
    { month: 'Week 6', math: 84, physics: 71, chemistry: 81 },
    { month: 'Week 7', math: 92, physics: 76, chemistry: 90 },
]

// Marks the latest score with a glowing accent dot at the line's end.
const endDot = (color: string, dimmed: boolean) => {
    const EndDotRenderer = (props: { cx?: number; cy?: number; index?: number }) => {
        const { cx, cy, index } = props
        if (index !== chartData.length - 1 || cx == null || cy == null) {
            return <g key={`end-${index}`} />
        }
        return (
            <g key={`end-${index}`} opacity={dimmed ? 0.15 : 1}>
                <circle cx={cx} cy={cy} r={8} fill={color} opacity={0.18} />
                <circle cx={cx} cy={cy} r={3.5} fill={color} stroke="#060f1a" strokeWidth={2} />
            </g>
        )
    }
    return EndDotRenderer
}

const MonitoringChart = ({ focus }: { focus: SubjectKey | null }) => {
    const dim = (key: SubjectKey) => focus !== null && focus !== key

    return (
        <ChartContainer className="h-72 md:h-80 aspect-auto w-full" config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 12,
                    left: 0,
                    right: 14,
                }}>
                <defs>
                    <linearGradient id="fillMath" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-math)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-math)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillPhysics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-physics)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-physics)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillChemistry" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chemistry)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-chemistry)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    interval="preserveStartEnd"
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                />
                <YAxis
                    domain={[30, 100]}
                    ticks={[40, 60, 80, 100]}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                />
                <ReferenceLine
                    y={75}
                    stroke="rgba(255,255,255,0.18)"
                    strokeDasharray="5 5"
                    label={{ value: "Target 75", position: "insideTopLeft", fill: "rgba(255,255,255,0.3)", fontSize: 10, dy: -16 }}
                />
                <ChartTooltip
                    cursor={{ stroke: "rgba(255,255,255,0.2)", strokeDasharray: "4 4" }}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Area strokeWidth={2} strokeLinecap="round" dataKey="math" type="monotone" fill="url(#fillMath)" fillOpacity={dim('math') ? 0.06 : 0.5} strokeOpacity={dim('math') ? 0.15 : 1} stroke="var(--color-math)" dot={endDot('#9B99FE', dim('math'))} activeDot={{ r: 3, strokeWidth: 0 }} animationDuration={1400} animationBegin={0} />
                <Area strokeWidth={2} strokeLinecap="round" dataKey="physics" type="monotone" fill="url(#fillPhysics)" fillOpacity={dim('physics') ? 0.06 : 0.5} strokeOpacity={dim('physics') ? 0.15 : 1} stroke="var(--color-physics)" dot={endDot('#2BC8B7', dim('physics'))} activeDot={{ r: 3, strokeWidth: 0 }} animationDuration={1400} animationBegin={200} />
                <Area strokeWidth={2} strokeLinecap="round" dataKey="chemistry" type="monotone" fill="url(#fillChemistry)" fillOpacity={dim('chemistry') ? 0.06 : 0.5} strokeOpacity={dim('chemistry') ? 0.15 : 1} stroke="var(--color-chemistry)" dot={endDot('#F5A623', dim('chemistry'))} activeDot={{ r: 3, strokeWidth: 0 }} animationDuration={1400} animationBegin={400} />
            </AreaChart>
        </ChartContainer>
    )
}
