import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: "#060f1a" }}>
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.2 }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, #060f1a 75%)" }}
      />
      <header className="relative z-10 px-8 py-6">
        <Link
          href="/"
          className="text-2xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-display, 'Instrument Serif', serif)" }}
        >
          genzy<sup className="text-xs">®</sup>
        </Link>
      </header>
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
