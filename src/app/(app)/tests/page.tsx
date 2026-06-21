import Link from "next/link";
import { Lock, Clock, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const allTests = [
  { id: "1", title: "Domain 1: Governance & Management", category: "Governance", difficulty: "Beginner", questions: 40, duration: 90, isPro: false },
  { id: "2", title: "Domain 2: IT Risk Management", category: "Risk", difficulty: "Intermediate", questions: 40, duration: 90, isPro: false },
  { id: "3", title: "Domain 3: IS Acquisition & Development", category: "Development", difficulty: "Intermediate", questions: 40, duration: 90, isPro: true },
  { id: "4", title: "Domain 4: IS Operations & Resilience", category: "Operations", difficulty: "Advanced", questions: 40, duration: 90, isPro: true },
  { id: "5", title: "Full Mock Exam — Set A", category: "Mock", difficulty: "Advanced", questions: 150, duration: 240, isPro: true },
  { id: "6", title: "Full Mock Exam — Set B", category: "Mock", difficulty: "Advanced", questions: 150, duration: 240, isPro: true },
  { id: "7", title: "Quick Drill: Ethics & Compliance", category: "Ethics", difficulty: "Beginner", questions: 20, duration: 30, isPro: true },
  { id: "8", title: "Quick Drill: Control Frameworks", category: "Controls", difficulty: "Intermediate", questions: 20, duration: 30, isPro: true },
];

const difficultyColor: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function TestsPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Practice Tests</h1>
        <p className="text-muted-foreground text-sm">
          Free plan: 2 tests unlocked. <Link href="/pricing" className="underline text-foreground">Upgrade to Pro</Link> for all 40+ tests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allTests.map((test) => (
          <div
            key={test.id}
            className={`relative rounded-2xl border p-5 ${test.isPro ? "bg-zinc-50/50" : "bg-white hover:shadow-md transition-shadow"}`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className={`font-medium text-sm ${test.isPro ? "text-zinc-400" : ""}`}>{test.title}</h3>
              {test.isPro && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                  style={{ background: "linear-gradient(90deg, #9B99FE, #2BC8B7)" }}
                >
                  Pro
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <FileQuestion className="size-3" />
                {test.questions} questions
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {test.duration} min
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor[test.difficulty]}`}>
                {test.difficulty}
              </span>
            </div>

            {!test.isPro ? (
              <Button asChild size="sm" className="w-full">
                <Link href={`/tests/${test.id}`}>Start Test</Link>
              </Button>
            ) : (
              <div className="absolute inset-0 rounded-2xl backdrop-blur-[2px] flex items-center justify-center">
                <div className="text-center">
                  <div className="size-10 rounded-full bg-zinc-900/80 flex items-center justify-center mx-auto mb-2">
                    <Lock className="size-4 text-white" />
                  </div>
                  <Link href="/pricing" className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 underline">
                    Upgrade to unlock
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
