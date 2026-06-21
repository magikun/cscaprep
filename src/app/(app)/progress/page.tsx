import { BarChart3, TrendingUp, Target } from "lucide-react";

const domainData = [
  { domain: "Governance & Management", score: 0, questions: 0, color: "#9B99FE" },
  { domain: "IT Risk Management", score: 0, questions: 0, color: "#2BC8B7" },
  { domain: "IS Acquisition & Development", score: 0, questions: 0, color: "#F28482" },
  { domain: "IS Operations & Resilience", score: 0, questions: 0, color: "#F5C344" },
];

export default function ProgressPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Progress Analytics</h1>
        <p className="text-muted-foreground text-sm">Track your performance across all CSCA domains.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Tests Completed", value: "0", icon: BarChart3, color: "#9B99FE" },
          { label: "Overall Score", value: "—", icon: TrendingUp, color: "#2BC8B7" },
          { label: "Exam Readiness", value: "—", icon: Target, color: "#F28482" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border bg-white p-5">
            <div className="size-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}22`, color: s.color }}>
              <s.icon className="size-5" />
            </div>
            <div className="text-2xl font-semibold mb-0.5">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Domain breakdown */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="font-semibold mb-6">Domain Performance</h2>
        <div className="space-y-5">
          {domainData.map((d) => (
            <div key={d.domain}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">{d.domain}</span>
                <span className="font-medium text-muted-foreground">
                  {d.questions === 0 ? "No attempts yet" : `${d.score}%`}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${d.score}%`, background: d.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {domainData.every((d) => d.questions === 0) && (
          <div className="mt-8 text-center py-8 border-t border-dashed">
            <div className="text-muted-foreground text-sm">
              Complete your first practice test to see analytics here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
