import React from "react";
import { cn } from "@/lib/utils";

export interface StreakPeriod {
  start: string;
  end: string;
}

interface StreakCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  streak: StreakPeriod[];
  view?: "week" | "month";
  startOfWeek?: number;
}

export const StreakCalendar = React.forwardRef<HTMLDivElement, StreakCalendarProps>(
  ({ streak, view = "week", startOfWeek = 1, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-1", className)}
        {...props}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="size-8 rounded bg-muted flex items-center justify-center text-xs"
            title={new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString()}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  }
);
StreakCalendar.displayName = "StreakCalendar";

export type { StreakCalendarProps };
