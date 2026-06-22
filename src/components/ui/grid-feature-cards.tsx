import { cn } from '@/lib/utils';
import React from 'react';

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureType;
};

// Deterministic LCG seeded from a string — same output on server and client.
function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) | 0;
    return (s >>> 0) / 0x100000000;
  };
}

function genPattern(seed: string, length = 5): number[][] {
  const hash = Array.from(seed).reduce(
    (a, c) => (Math.imul(31, a) + c.charCodeAt(0)) | 0,
    0,
  );
  const rand = seededRand(hash);
  return Array.from({ length }, () => [
    Math.floor(rand() * 4) + 7,
    Math.floor(rand() * 6) + 1,
  ]);
}

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const p = React.useMemo(() => genPattern(feature.title), [feature.title]);

  return (
    <div className={cn('group relative overflow-hidden p-4', className)} {...props}>
      {/* Strictly clipped to card bounds — prevents any layout shift on hover/touch */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-foreground/[0.01] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </div>
      <feature.icon className="text-foreground/75 size-5" strokeWidth={1} aria-hidden />
      <h3 className="mt-6 text-sm font-semibold text-gray-900">{feature.title}</h3>
      <p className="relative z-20 mt-1.5 text-[11px] font-light leading-relaxed text-gray-500">
        {feature.description}
      </p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<'svg'> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && squares.length > 0 && (
        <svg x={x} y={y} className="overflow-hidden">
          {squares.map(([sx, sy], index) => (
            <rect
              key={index}
              strokeWidth="0"
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
