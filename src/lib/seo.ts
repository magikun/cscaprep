/**
 * Central SEO configuration. Override the production URL by setting
 * NEXT_PUBLIC_SITE_URL in the environment (e.g. on Vercel).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://tryprepify.vercel.app";

export const SITE_NAME = "Prepify";

export const SITE_DESCRIPTION =
  "Prepare for the China Scholastic Competency Assessment (CSCA) with real-format practice tests, structured study materials for mathematics, physics, and chemistry, and progress analytics — built for international students applying to Chinese universities.";

export const SITE_TAGLINE = "Ace Your CSCA Exam on the First Try";

// Social profiles — used in Organization schema's sameAs. Add real URLs as they exist.
export const SOCIAL_LINKS: string[] = [];
