import { BarChart3, ClipboardList, Flame, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Tests Completed", value: "0", icon: ClipboardList, color: "#9B99FE" },
  { label: "Average Score", value: "—", icon: BarChart3, color: "#2BC8B7" },
  { label: "Study Streak", value: "0 days", icon: Flame, color: "#F28482" },
  { label: "Pass Probability", value: "—", icon: TrendingUp, color: "#F5C344" },
];

const recentTests = [
  { title: "Domain 1: Governance & Management", status: "Available", href: "/tests/1" },
  { title: "Domain 2: IT Risk Management", status: "Available", href: "/tests/2" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          You&apos;re on the{" "}
          <span
            className="font-semibold"
            style={{
              background: "linear-gradient(90deg, #9B99FE, #2BC8B7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Free Plan
          </span>
          .{" "}
          <Link href="/pricing" className="underline text-foreground hover:no-underline">
            Upgrade to Pro
          </Link>{" "}
          to unlock everything.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border bg-white p-5">
            <div
              className="size-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${stat.color}22`, color: stat.color }}
            >
              <stat.icon className="size-5" />
            </div>
            <div className="text-2xl font-semibold mb-0.5">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Available tests */}
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Your Tests</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/tests">View All</Link>
          </Button>
        </div>
        <div className="space-y-3">
          {recentTests.map((test) => (
            <Link
              key={test.href}
              href={test.href}
              className="flex items-center justify-between p-4 rounded-xl border hover:bg-zinc-50 transition-colors group"
            >
              <div>
                <div className="font-medium text-sm">{test.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">40 questions · 90 min</div>
              </div>
              <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Start
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Upgrade banner */}
      <div
        className="mt-6 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #9B99FE, #2BC8B7)" }}
      >
        <div>
          <div className="font-semibold text-lg mb-1">Unlock 40+ Tests & Full Library</div>
          <div className="text-white/80 text-sm">Upgrade to Pro for just $9/month</div>
        </div>
        <Button asChild className="bg-white text-zinc-900 hover:bg-zinc-100 flex-shrink-0">
          <Link href="/pricing">Upgrade to Pro</Link>
        </Button>
      </div>
    </div>
  );
}
