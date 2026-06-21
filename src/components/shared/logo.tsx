import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <rect width="32" height="32" rx="8" fill="url(#logo-bg)" />
        <path
          d="M9 10h4v12H9V10ZM19 10h4v12h-4V10ZM9 10h14v4H9v-4ZM9 18h14v4H9v-4Z"
          fill="white"
        />
        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9B99FE" />
            <stop offset="1" stopColor="#2BC8B7" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-semibold text-lg tracking-tight">
        PrepCSCA
      </span>
    </div>
  );
};
