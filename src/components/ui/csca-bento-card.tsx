"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  MessageCircle,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Flame,
  ChevronRight,
  Star,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  header: string;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    header: "AI Performance",
    description: "Real-time analysis of your exam readiness.",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    header: "Your Plan",
    description: "Manage subscription and access.",
  },
  {
    id: "threads",
    label: "Threads",
    icon: MessageCircle,
    badge: "4",
    header: "Study Groups",
    description: "High-priority peer discussions.",
  },
  {
    id: "learn",
    label: "Learn",
    icon: BookOpen,
    header: "Study Library",
    description: "All materials for your prep.",
  },
];

export function CscaBentoCard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const content = useMemo(() => {
    switch (activeTab.id) {
      case "dashboard": return <DashboardPanel />;
      case "billing":   return <BillingPanel />;
      case "threads":   return <ThreadsPanel />;
      case "learn":     return <LearnPanel />;
      default:          return null;
    }
  }, [activeTab.id]);

  return (
    <div className="flex items-center justify-center w-full h-full antialiased">
      <div className="group relative w-full h-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">

        {/* Header */}
        <div className="p-5 space-y-1.5 relative z-10">
          <h2 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            AI Analytics
          </h2>
          <p className="text-lg font-medium leading-snug text-gray-900 max-w-[360px]">
            High-performing AI analytics of your performance, statistics of test performance.
          </p>
        </div>

        {/* MacBook silhouette window */}
        <div className="relative w-full h-[220px] overflow-hidden">
          {/* Shadow / depth layer */}
          <div className="absolute top-12 left-12 w-full h-full bg-gray-100 rounded-tl-2xl border border-black/[0.06] opacity-80" />

          {/* Main window */}
          <div className="absolute top-6 left-20 w-full h-full bg-white rounded-tl-2xl shadow-xl flex flex-col overflow-hidden ring-[5px] ring-black/[0.05]">

            {/* Window chrome */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center relative flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <div className="w-2 h-2 rounded-full bg-gray-200" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 text-[9px] text-gray-300 uppercase tracking-wider">
                Workspace
              </span>
            </div>

            {/* Sidebar + content */}
            <div className="flex flex-1 overflow-hidden min-h-0">

              {/* Sidebar */}
              <div className="w-28 border-r border-gray-100 p-2 flex flex-col gap-0.5 pt-3 bg-gray-50/50 flex-shrink-0">
                <LayoutGroup id="macbook-tabs">
                  {TABS.map((tab) => {
                    const isActive = activeTab.id === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "relative flex items-center gap-1.5 p-1.5 rounded-lg text-[11px] transition-colors cursor-pointer",
                          isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
                        )}
                      >
                        <Icon size={12} className="z-20 relative flex-shrink-0" />
                        <span className="truncate z-20 relative font-medium">{tab.label}</span>
                        {tab.badge && (
                          <span className={cn(
                            "ml-auto text-[8px] leading-none py-0.5 px-1 rounded-md tabular-nums z-20 relative",
                            isActive
                              ? "text-[oklch(0.42_0.18_275)]"
                              : "bg-gray-100 text-gray-400"
                          )}
                          style={isActive ? { background: "oklch(0.62 0.18 275 / 0.1)", border: "1px solid oklch(0.62 0.18 275 / 0.2)" } : {}}
                          >
                            {tab.badge}
                          </span>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="mac-sidebar-pill"
                            className="absolute left-0 w-[2px] h-3 rounded-full z-30"
                            style={{ background: "oklch(0.62 0.18 275)" }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="mac-bg-indicator"
                            className="absolute inset-0 rounded-lg bg-white border border-gray-100/80 shadow-sm"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </LayoutGroup>
              </div>

              {/* Content panel */}
              <div className="flex-1 bg-white p-3 pt-4 flex flex-col gap-3 overflow-hidden relative min-w-0">
                <header className="flex flex-col gap-0.5 flex-shrink-0">
                  <h3 className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest line-clamp-1">
                    {activeTab.header}
                  </h3>
                  <p className="text-[9px] text-gray-400 font-normal leading-tight line-clamp-1">
                    {activeTab.description}
                  </p>
                </header>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1 overflow-hidden"
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-20"
                  style={{ background: "linear-gradient(to top, white, transparent)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard Panel ─────────────────────────────── */
function DashboardPanel() {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 relative overflow-hidden">
        <div className="flex flex-col gap-1.5 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-medium text-gray-500">Exam Readiness Score</span>
            <TrendingUp size={9} style={{ color: "oklch(0.52 0.22 275)" }} />
          </div>
          <span className="text-base font-semibold tracking-tight text-gray-900">94.2%</span>
          <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "94.2%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="h-full rounded-full"
              style={{ background: "oklch(0.62 0.18 275)" }}
            />
          </div>
          <span className="text-[8px] text-gray-400">Based on your last 3 mock exams</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="p-2 rounded-lg border border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-gray-900">1,070</span>
            <span className="text-[7px] text-gray-400 uppercase font-medium mt-0.5">Tasks Solved</span>
          </div>
          <CheckCircle size={11} className="text-gray-200" />
        </div>
        <div className="p-2 rounded-lg border border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-gray-900">27 days</span>
            <span className="text-[7px] text-gray-400 uppercase font-medium mt-0.5">Streak</span>
          </div>
          <Flame size={11} className="text-amber-400" />
        </div>
      </div>
    </div>
  );
}

/* ── Billing Panel ───────────────────────────────── */
function BillingPanel() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="p-2 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-semibold text-gray-900">Free Plan</span>
          <p className="text-[7px] text-gray-400 mt-0.5">2 tests · basic materials</p>
        </div>
        <span className="text-[8px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">Current</span>
      </div>
      <div
        className="p-2 rounded-lg flex items-center justify-between"
        style={{ border: "1px solid oklch(0.62 0.18 275 / 0.25)", background: "oklch(0.62 0.18 275 / 0.05)" }}
      >
        <div>
          <span className="text-[9px] font-semibold text-gray-900">Pro Plan</span>
          <p className="text-[7px] text-gray-400 mt-0.5">40+ tests · full library · AI</p>
        </div>
        <div className="flex items-center gap-1">
          <Star size={8} style={{ color: "oklch(0.52 0.22 275)" }} />
          <span className="text-[8px] font-semibold" style={{ color: "oklch(0.42 0.18 275)" }}>$9/mo</span>
        </div>
      </div>
      <button
        className="flex items-center justify-center gap-1 w-full py-1.5 rounded-lg text-[9px] font-semibold text-white"
        style={{ background: "oklch(0.62 0.18 275)" }}
      >
        Upgrade to Pro <ChevronRight size={9} />
      </button>
    </div>
  );
}

/* ── Threads Panel ───────────────────────────────── */
function ThreadsPanel() {
  const threads = [
    { title: "Math: Integration tricks", replies: 12, time: "2h" },
    { title: "Chemistry mock exam Q4", replies: 8, time: "4h" },
    { title: "Physics formulas cheat sheet", replies: 24, time: "1d" },
    { title: "CSC scholarship tips", replies: 5, time: "2d" },
  ];
  return (
    <div className="flex flex-col gap-0.5">
      {threads.map((t, i) => (
        <div key={i} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer group">
          <div className="w-4 h-4 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
            <MessageCircle size={8} className="text-gray-400" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[9px] font-medium text-gray-800 truncate">{t.title}</span>
            <span className="text-[7px] text-gray-400">{t.replies} replies · {t.time} ago</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Learn Panel ─────────────────────────────────── */
function LearnPanel() {
  const materials = [
    { name: "CSCA Math Formula Sheet", size: "1.2 MB", type: "PDF" },
    { name: "Physics Past Paper 2024", size: "3.4 MB", type: "PDF" },
    { name: "Chemistry Quick Review", size: "800 KB", type: "PDF" },
    { name: "Full Mock Exam Set", size: "12 MB", type: "ZIP" },
  ];
  return (
    <div className="flex flex-col gap-0.5">
      {materials.map((m, i) => (
        <div key={i} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer group">
          <div className="w-4 h-4 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
            <BookOpen size={8} className="text-gray-400" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[9px] font-medium text-gray-800 truncate">{m.name}</span>
            <span className="text-[7px] text-gray-400 tabular-nums uppercase">{m.size} · {m.type}</span>
          </div>
          <Lock size={8} className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
}
