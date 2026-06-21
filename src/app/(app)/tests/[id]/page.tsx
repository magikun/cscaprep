"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flag, ChevronLeft, ChevronRight, Clock } from "lucide-react";

const sampleQuestions = [
  {
    text: "Which of the following BEST describes the primary objective of IT governance?",
    options: [
      "Ensure IT systems are always operational",
      "Align IT strategy with business strategy to deliver value",
      "Minimize IT costs across the organization",
      "Provide IT services to all business units equally",
    ],
    correctIndex: 1,
    explanation: "IT governance aims to align IT strategy with business objectives to ensure IT delivers value and manages risks appropriately — not just operational continuity or cost minimization.",
  },
  {
    text: "An IS auditor discovers that change management procedures were not followed for a critical production update. What is the MOST appropriate next step?",
    options: [
      "Immediately roll back the change",
      "Document the finding and assess impact on internal controls",
      "Notify regulators of the control failure",
      "Suspend the IT manager responsible",
    ],
    correctIndex: 1,
    explanation: "The auditor's role is to document findings objectively and assess the impact on internal controls, not to take corrective action directly. Management is responsible for remediation.",
  },
  {
    text: "Risk appetite is BEST defined as:",
    options: [
      "The total amount of risk an organization faces",
      "The level of risk an organization is willing to accept in pursuit of its objectives",
      "The maximum financial loss an organization can absorb",
      "The probability of a risk event occurring",
    ],
    correctIndex: 1,
    explanation: "Risk appetite is the amount and type of risk an organization is willing to accept to achieve its strategic objectives. It differs from risk capacity (maximum absorbable risk) and risk tolerance (acceptable variation).",
  },
];

export default function TakeTestPage() {
  const { id } = useParams();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const q = sampleQuestions[current];
  const progress = ((current + 1) / sampleQuestions.length) * 100;
  const answered = answers[current] !== undefined;

  const handleAnswer = (i: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [current]: i }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = Object.entries(answers).filter(
      ([qi, ai]) => sampleQuestions[parseInt(qi)]?.correctIndex === ai
    ).length;
    router.push(`/tests/${id}/results?score=${score}&total=${sampleQuestions.length}`);
  };

  if (!q) return null;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="text-sm text-zinc-400">Question {current + 1} of {sampleQuestions.length}</div>
          <Progress value={progress} className="w-32 h-2 bg-zinc-800" />
        </div>
        <div className="flex items-center gap-3 text-zinc-400 text-sm">
          <Clock className="size-4" />
          <span>1:30:00</span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="flex items-start justify-between gap-4 mb-8">
          <p className="text-white text-lg font-medium leading-relaxed">{q.text}</p>
          <button
            onClick={() => setFlagged((prev) => {
              const next = new Set(prev);
              if (next.has(current)) {
                next.delete(current);
              } else {
                next.add(current);
              }
              return next;
            })}
            className={`p-2 rounded-lg border flex-shrink-0 ${flagged.has(current) ? "border-amber-500 text-amber-400" : "border-zinc-700 text-zinc-500"}`}
          >
            <Flag className="size-4" />
          </button>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left px-5 py-4 rounded-xl border text-sm text-zinc-200 transition-all duration-200 ${
                answers[current] === i
                  ? "border-primary bg-primary/10 text-white"
                  : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"
              }`}
            >
              <span className="font-semibold mr-3 text-zinc-400">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="border-zinc-700 text-zinc-300 bg-transparent"
        >
          <ChevronLeft className="size-4 mr-1" /> Previous
        </Button>

        {current < sampleQuestions.length - 1 ? (
          <Button
            size="sm"
            onClick={() => setCurrent((c) => c + 1)}
            disabled={!answered}
          >
            Next <ChevronRight className="size-4 ml-1" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < sampleQuestions.length}
          >
            Submit Test
          </Button>
        )}
      </div>
    </div>
  );
}
