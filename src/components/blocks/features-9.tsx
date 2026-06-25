'use client'
import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Activity, MessageCircle, Calculator, Atom, Beaker } from 'lucide-react'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

// Cell reveal: rise + fade, orchestrated by the grid's stagger container.
const cellVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
}

export function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    return (
        <section ref={ref} className="px-4 py-16 md:py-32" style={{ background: "#060f1a" }}>
            <motion.div
                className="mx-auto max-w-5xl mb-16"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Instrument Serif', serif" }}>
                    what <em className="not-italic" style={{ color: "rgba(255,255,255,0.5)" }}>prepify</em> gives you
                </h2>
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
                    <SubjectCard Icon={Calculator} title="Mathematics" description="Algebra, geometry, calculus & problem-solving techniques" />
                    <SubjectCard Icon={Atom} title="Physics" description="Mechanics, thermodynamics, waves & energy concepts" />
                    <SubjectCard Icon={Beaker} title="Chemistry" description="Reactions, periodic table, bonding & molecular structure" />
                </motion.div>
                <motion.div variants={cellVariants} className="overflow-hidden border-t p-6 sm:p-12 md:border-0 md:border-l" style={{ background: "transparent", borderColor: "rgba(255,255,255,0.08)" }}>
                    <div className="relative z-10">
                        <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body, Inter, sans-serif)" }}>
                            <MessageCircle className="size-4" />
                            AI-Powered Help
                        </span>

                        <p className="my-8 text-2xl font-normal" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Instrument Serif', serif" }}>Get instant explanations for every concept.</p>
                    </div>
                    <div aria-hidden className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex justify-center items-center size-5 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                                    <span className="size-3 rounded-full" style={{ background: "oklch(0.62 0.18 275)" }} />
                                </span>
                                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body, Inter, sans-serif)" }}>Physics Question</span>
                            </div>
                            <div className="rounded-lg mt-1.5 w-3/5 border p-3 text-xs" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body, Inter, sans-serif)" }}>Why does this formula apply to thermodynamics?</div>
                        </div>

                        <div>
                            <div className="rounded-lg mb-1 ml-auto w-3/5 p-3 text-xs text-white" style={{ background: "oklch(0.62 0.18 275)", fontFamily: "var(--font-body, Inter, sans-serif)" }}>This relates to the second law of thermodynamics because...</div>
                            <span className="block text-right text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body, Inter, sans-serif)" }}>Instant</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={cellVariants} className="col-span-full border-y p-12" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.95)" }}>
                    <p className="text-center text-4xl font-semibold lg:text-7xl" style={{ fontFamily: "'Instrument Serif', serif" }}>94% Pass Rate</p>
                </motion.div>
                <motion.div variants={cellVariants} className="col-span-full flex flex-col gap-8 px-6 py-12 md:px-12">
                    <div>
                        <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body, Inter, sans-serif)" }}>
                            <Activity className="size-4" />
                            Progress Analytics
                        </span>

                        <p className="mt-6 text-2xl font-normal" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Instrument Serif', serif" }}>
                            Monitor your score improvement in real-time. <span style={{ color: "rgba(255,255,255,0.35)" }}> Track progress across all 3 subjects.</span>
                        </p>
                    </div>
                    <MonitoringChart />
                </motion.div>
            </motion.div>
        </section>
    )
}


const SubjectCard = ({ Icon, title, description }: { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; title: string; description: string }) => {
    return (
        <motion.div
            variants={cellVariants}
            whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
            className="rounded-lg border p-4"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
        >
            <Icon className="size-5" style={{ color: "rgba(255,255,255,0.5)" }} />
            <h3 className="mt-4 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>{title}</h3>
            <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body, Inter, sans-serif)" }}>{description}</p>
        </motion.div>
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

const chartData = [
    { month: 'Week 1', math: 56, physics: 48, chemistry: 42 },
    { month: 'Week 2', math: 48, physics: 62, chemistry: 55 },
    { month: 'Week 3', math: 72, physics: 54, chemistry: 68 },
    { month: 'Week 4', math: 61, physics: 78, chemistry: 58 },
    { month: 'Week 5', math: 85, physics: 66, chemistry: 80 },
    { month: 'Week 6', math: 74, physics: 88, chemistry: 70 },
    { month: 'Week 7', math: 92, physics: 76, chemistry: 90 },
]

const MonitoringChart = () => {
    return (
        <ChartContainer className="h-120 aspect-auto md:h-96 w-full" config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 0,
                    right: 0,
                }}>
                <defs>
                    <linearGradient id="fillMath" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-math)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-math)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillPhysics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-physics)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-physics)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillChemistry" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chemistry)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-chemistry)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                <Area strokeWidth={2} dataKey="math" type="natural" fill="url(#fillMath)" fillOpacity={0.1} stroke="var(--color-math)" />
                <Area strokeWidth={2} dataKey="physics" type="natural" fill="url(#fillPhysics)" fillOpacity={0.1} stroke="var(--color-physics)" />
                <Area strokeWidth={2} dataKey="chemistry" type="natural" fill="url(#fillChemistry)" fillOpacity={0.1} stroke="var(--color-chemistry)" />
            </AreaChart>
        </ChartContainer>
    )
}
