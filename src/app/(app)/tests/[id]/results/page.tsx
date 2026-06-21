"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function ResultsContent() {
  const params = useSearchParams();
  const score = parseInt(params.get("score") || "0");
  const total = parseInt(params.get("total") || "3");
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        {/* Score circle */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="54" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke={passed ? "#10b981" : "#ef4444"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 64 64)"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-3xl font-semibold">{pct}%</div>
            <div className="text-xs text-muted-foreground">{score}/{total}</div>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 text-lg font-semibold mb-2 ${passed ? "text-emerald-600" : "text-red-500"}`}>
          {passed ? <CheckCircle className="size-5" /> : <XCircle className="size-5" />}
          {passed ? "Passed!" : "Not Yet"}
        </div>
        <p className="text-muted-foreground text-sm">
          {passed
            ? "Great work! Keep practicing to improve your score further."
            : "Don't give up — review the explanations below and try again."}
        </p>
      </div>

      {/* Domain breakdown */}
      <div className="rounded-2xl border bg-white p-6 mb-6">
        <h2 className="font-semibold mb-4">Domain Breakdown</h2>
        {[
          { domain: "Governance & Management", score: pct, color: "#9B99FE" },
          { domain: "IT Risk Management", score: Math.max(0, pct - 10), color: "#2BC8B7" },
          { domain: "IS Acquisition", score: Math.min(100, pct + 5), color: "#F28482" },
        ].map((d) => (
          <div key={d.domain} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{d.domain}</span>
              <span className="font-medium">{d.score}%</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${d.score}%`, background: d.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline" className="flex-1">
          <Link href="/tests">
            <ArrowLeft className="size-4 mr-2" />
            Back to Tests
          </Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/tests/1">
            <RotateCcw className="size-4 mr-2" />
            Retake Test
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading results…</div>}>
      <ResultsContent />
    </Suspense>
  );
}
