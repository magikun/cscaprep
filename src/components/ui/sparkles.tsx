"use client";

import { useCallback, useId } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

interface SparklesProps {
  className?: string;
  size?: number;
  density?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  background?: string;
}

export function Sparkles({
  className,
  size = 1,
  density = 800,
  speed = 1,
  opacity = 1,
  color = "#FFFFFF",
  background = "transparent",
}: SparklesProps) {
  const id = useId();

  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 60,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        speed: { min: speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: 3 },
      },
      size: { value: { min: size / 2.5, max: size } },
    },
    detectRetina: true,
  };

  return (
    <ParticlesProvider init={init}>
      <Particles id={id} options={options} className={className} />
    </ParticlesProvider>
  );
}
