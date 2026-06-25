import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Prepify collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

const EFFECTIVE_DATE = "June 22, 2026";
const CONTACT_EMAIL = "privacy@prepify.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-2xl font-normal mb-4"
        style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Poppins', sans-serif" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "#060f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="border-b px-6 py-8"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-xs mb-6 inline-flex items-center gap-1.5 transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            ← Back to Prepify
          </Link>
          <h1
            className="text-4xl sm:text-5xl font-normal mt-4"
            style={{ color: "rgba(255,255,255,0.95)", fontFamily: "'Poppins', sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Effective date: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
          Prepify (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and your rights regarding your data when you use our platform at prepify.com.
        </p>

        <Section title="1. Information We Collect">
          <p><strong style={{ color: "rgba(255,255,255,0.75)" }}>Account information.</strong> When you register, we collect your name, email address, and password (stored as a secure hash).</p>
          <p><strong style={{ color: "rgba(255,255,255,0.75)" }}>Usage data.</strong> We collect information about how you interact with our platform — pages visited, practice tests taken, answers submitted, time spent, and score history — to power your analytics dashboard.</p>
          <p><strong style={{ color: "rgba(255,255,255,0.75)" }}>Payment information.</strong> Payments are processed by Stripe. We do not store your full card number. We receive only a tokenized reference and basic billing details (name, country).</p>
          <p><strong style={{ color: "rgba(255,255,255,0.75)" }}>Device and log data.</strong> We automatically collect IP address, browser type, device type, operating system, referring URLs, and timestamps when you access our service.</p>
          <p><strong style={{ color: "rgba(255,255,255,0.75)" }}>Cookies and local storage.</strong> We use first-party cookies and browser local storage to keep you signed in, remember your preferences, and record your consent choices. See Section 6 for details.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use your data to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Create and manage your account</li>
            <li>Deliver practice tests, track your scores, and display subject analytics</li>
            <li>Process payments and manage your subscription</li>
            <li>Send transactional emails (account confirmation, password reset, receipts)</li>
            <li>Send product updates and study tips — only if you opt in</li>
            <li>Detect and prevent fraud, abuse, and security incidents</li>
            <li>Improve our question bank, materials, and platform based on aggregate usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>We do not sell your personal data to third parties.</p>
        </Section>

        <Section title="3. Legal Basis for Processing (GDPR)">
          <p>If you are located in the European Economic Area (EEA), we process your personal data under the following legal bases:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Contract performance</strong> — to provide the service you signed up for</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Legitimate interests</strong> — analytics, fraud prevention, platform improvement</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Consent</strong> — marketing emails, non-essential cookies</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Legal obligation</strong> — complying with applicable laws</li>
          </ul>
        </Section>

        <Section title="4. Data Sharing">
          <p>We share your data only with trusted service providers who help us operate Prepify:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Supabase</strong> — database and authentication hosting</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Stripe</strong> — payment processing</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Vercel</strong> — hosting and edge delivery</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Resend / email provider</strong> — transactional email delivery</li>
          </ul>
          <p>All providers are contractually bound to process data only on our behalf and in accordance with applicable data protection law.</p>
          <p>We may disclose data if required by law, court order, or to protect the rights and safety of Prepify or others.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain your account data for as long as your account is active. If you delete your account, we delete or anonymize your personal data within 30 days, except where we are required by law to retain it longer (e.g., billing records for up to 7 years).</p>
          <p>Anonymized, aggregated analytics data may be retained indefinitely as it cannot be used to identify you.</p>
        </Section>

        <Section title="6. Cookies & Tracking">
          <p>We use the following types of cookies and storage:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Essential cookies</strong> — required for authentication and security. Cannot be disabled.</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Preference storage</strong> — stores your consent choice (via <code className="text-xs px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)" }}>localStorage</code>) so we don&apos;t show the banner repeatedly.</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Analytics cookies</strong> — used to understand how users interact with our platform. Only set if you accept cookies.</li>
          </ul>
          <p>You can withdraw cookie consent at any time by clearing your browser storage or contacting us. Withdrawing consent does not affect the lawfulness of prior processing.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Rectification</strong> — correct inaccurate or incomplete data</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Erasure</strong> — request deletion of your personal data</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Restriction</strong> — ask us to limit how we process your data</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Objection</strong> — object to processing based on legitimate interests</li>
            <li><strong style={{ color: "rgba(255,255,255,0.75)" }}>Withdraw consent</strong> — at any time for consent-based processing</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2" style={{ color: "rgba(255,255,255,0.7)" }}>{CONTACT_EMAIL}</a>. We will respond within 30 days.</p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>Prepify is not directed at children under 16. We do not knowingly collect personal data from anyone under 16. If you believe a child has provided us data, contact us and we will delete it promptly.</p>
        </Section>

        <Section title="9. International Transfers">
          <p>Your data may be processed in countries outside your own, including the United States. Where we transfer data out of the EEA, we rely on Standard Contractual Clauses (SCCs) or equivalent mechanisms approved by the European Commission.</p>
        </Section>

        <Section title="10. Security">
          <p>We implement industry-standard measures to protect your data, including TLS encryption in transit, hashed passwords, row-level security in our database, and access controls limiting who can view personal data internally.</p>
          <p>No system is completely secure. If you believe your account has been compromised, contact us immediately.</p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. When we make material changes, we will update the effective date at the top and, where appropriate, notify you by email or in-app notice. Continued use of Prepify after changes take effect constitutes acceptance of the revised policy.</p>
        </Section>

        <Section title="12. Contact Us">
          <p>For any questions, requests, or concerns about this Privacy Policy or your personal data:</p>
          <p>
            <strong style={{ color: "rgba(255,255,255,0.75)" }}>Prepify</strong><br />
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-2"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t text-xs" style={{ borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)" }}>
          <p>Last updated: {EFFECTIVE_DATE} · <Link href="/" className="underline underline-offset-2">Return to Prepify</Link></p>
        </div>
      </div>
    </div>
  );
}
