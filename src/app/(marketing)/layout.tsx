import { Footer } from "@/components/shared/footer";
import { CookieBanner } from "@/components/shared/cookie-banner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
