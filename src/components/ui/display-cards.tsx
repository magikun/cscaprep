"use client";

import { cn } from "@/lib/utils";
import { Trophy, Flame, Star } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
}

function DisplayCard({
  className,
  icon = <Trophy className="size-3.5 text-white" />,
  title = "Achievement",
  description = "You did it",
  date = "Just now",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-[7rem] w-[14rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl px-4 py-3 transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[13rem]",
        "after:bg-gradient-to-l after:from-[#060f1a] after:to-transparent after:content-['']",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1.5px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div>
        <span
          className="inline-flex rounded-full p-1.5 flex-shrink-0"
          style={{ background: "oklch(0.62 0.18 275)" }}
        >
          {icon}
        </span>
        <p className="text-sm font-semibold leading-tight" style={{ color: "rgba(255,255,255,0.9)" }}>
          {title}
        </p>
      </div>
      <p className="text-xs whitespace-nowrap" style={{ color: "rgba(255,255,255,0.65)" }}>
        {description}
      </p>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
        {date}
      </p>
    </div>
  );
}

export interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      icon: <Star className="size-3.5 text-white" />,
      title: "94% Pass Rate",
      description: "Highest in CSCA preparation",
      date: "Verified across 12,847 students",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:rounded-xl before:h-full before:content-[''] before:bg-black/60 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0 grayscale hover:grayscale-0 transition-all",
    },
    {
      icon: <Flame className="size-3.5 text-white" />,
      title: "Exam Passed",
      description: "First-attempt CSCA success",
      date: "2 days ago",
      className:
        "[grid-area:stack] translate-x-8 translate-y-8 hover:-translate-y-1 before:absolute before:w-full before:rounded-xl before:h-full before:content-[''] before:bg-black/60 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0 grayscale hover:grayscale-0 transition-all",
    },
    {
      icon: <Trophy className="size-3.5 text-white" />,
      title: "CSCA Certified",
      description: "Tsinghua University · 2025",
      date: "Just now",
      className: "[grid-area:stack] translate-x-16 translate-y-16 hover:translate-y-10 transition-all",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
