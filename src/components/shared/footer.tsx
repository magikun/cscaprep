import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Practice Tests", href: "/tests" },
    { name: "Study Materials", href: "/materials" },
  ],
  Resources: [
    { name: "CSCA Guide", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Community", href: "#" },
    { name: "Support", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-dashed bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-48">
              The most effective way to prepare for the China Scholastic Competency Assessment.
            </p>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "GitHub"].map((name) => (
                <Link key={name} href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs flex items-center gap-1">
                  <ExternalLink className="size-3" /> {name}
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-dashed pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} PrepCSCA. All rights reserved.</p>
          <p>Made with care for CSCA students</p>
        </div>
      </div>
    </footer>
  );
}
