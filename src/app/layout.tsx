import type { Metadata } from "next";
import { Poppins, Instrument_Serif } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Genzy — Ace Your CSCA Exam on the First Try",
  description:
    "Practice with real-format CSCA questions, structured study materials, and performance analytics. Join 12,000+ students who passed with Genzy.",
  keywords: ["CSCA", "exam prep", "practice tests", "study materials", "certification", "Genzy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${instrumentSerif.variable} h-full antialiased`} style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)" }}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
