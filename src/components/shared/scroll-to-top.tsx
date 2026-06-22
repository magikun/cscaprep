"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return null;
}
