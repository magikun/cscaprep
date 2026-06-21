import Link from "next/link";
import { Lock, Clock, BookOpen } from "lucide-react";

const materials = [
  { id: "1", slug: "csca-subject-guide", title: "CSCA Subject Guide", category: "Core", readTime: 45, isPro: false, description: "Complete walkthrough of all 3 CSCA subjects — math, physics, and chemistry." },
  { id: "2", slug: "exam-strategy", title: "Exam Strategy", category: "Strategy", readTime: 20, isPro: false, description: "How to approach different question types and manage exam time." },
  { id: "3", slug: "physics-chemistry-guide", title: "Physics & Chemistry Guide", category: "Core", readTime: 60, isPro: true, description: "Core concepts, formulas, and worked examples across both sciences." },
  { id: "4", slug: "formula-reference", title: "Math Formula Sheet", category: "Reference", readTime: 10, isPro: true, description: "Quick-access formulas for all tested mathematics topics." },
  { id: "5", slug: "mock-exam-guide", title: "Mock Exam Strategy", category: "Strategy", readTime: 15, isPro: true, description: "How to get the most out of timed practice tests." },
  { id: "6", slug: "mathematics-deep-dive", title: "Mathematics Deep Dive", category: "Core", readTime: 40, isPro: true, description: "Advanced problem-solving techniques for algebra, geometry, and calculus." },
];

const categoryColors: Record<string, string> = {
  Core: "bg-violet-100 text-violet-700",
  Strategy: "bg-blue-100 text-blue-700",
  Applied: "bg-amber-100 text-amber-700",
  Reference: "bg-emerald-100 text-emerald-700",
};

export default function MaterialsPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Study Materials</h1>
        <p className="text-muted-foreground text-sm">
          Free plan: 2 materials unlocked.{" "}
          <Link href="/pricing" className="underline text-foreground">Upgrade to Pro</Link> for the full library.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((mat) => (
          <div key={mat.id} className={`relative rounded-2xl border p-5 ${mat.isPro ? "bg-zinc-50/50" : "bg-white hover:shadow-md transition-shadow"}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`size-10 rounded-xl flex items-center justify-center flex-shrink-0 ${mat.isPro ? "bg-zinc-100" : "bg-violet-50"}`}>
                <BookOpen className={`size-4 ${mat.isPro ? "text-zinc-300" : "text-violet-500"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${mat.isPro ? "bg-zinc-100 text-zinc-400" : categoryColors[mat.category]}`}>
                  {mat.category}
                </span>
              </div>
            </div>

            <h3 className={`font-medium text-sm mb-1 ${mat.isPro ? "text-zinc-400" : ""}`}>{mat.title}</h3>
            <p className={`text-xs mb-3 ${mat.isPro ? "text-zinc-300" : "text-muted-foreground"}`}>{mat.description}</p>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {mat.readTime} min read
            </div>

            {!mat.isPro && (
              <Link href={`/materials/${mat.slug}`} className="mt-3 block text-xs font-semibold text-violet-600 hover:underline">
                Read now →
              </Link>
            )}

            {mat.isPro && (
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
