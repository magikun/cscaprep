import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditCard, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">Profile & Settings</h1>

      {/* User info */}
      <div className="rounded-2xl border bg-white p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="https://ui-avatars.com/api/?name=User&background=9B99FE&color=fff&size=64"
            alt="Avatar"
            width={64}
            height={64}
            className="size-16 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-lg">Your Name</h2>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Full Name</label>
            <input
              type="text"
              defaultValue="Your Name"
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email</label>
            <input
              type="email"
              defaultValue="user@example.com"
              className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <Button size="sm" className="mt-4">Save Changes</Button>
      </div>

      {/* Subscription */}
      <div className="rounded-2xl border bg-white p-6 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="size-5 text-muted-foreground" />
          <h2 className="font-semibold">Subscription</h2>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border mb-4">
          <div>
            <div className="font-medium text-sm">Current Plan</div>
            <div className="text-xs text-muted-foreground mt-0.5">Free — 2 tests, 2 materials</div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-200 text-zinc-600">
            Free
          </span>
        </div>

        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/pricing">Upgrade to Pro — $9/month</Link>
        </Button>
      </div>

      {/* Security */}
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="size-5 text-muted-foreground" />
          <h2 className="font-semibold">Security</h2>
        </div>
        <div className="space-y-3">
          <Button variant="outline" size="sm">Change Password</Button>
          <p className="text-xs text-muted-foreground">
            Last sign in: Just now
          </p>
        </div>
      </div>
    </div>
  );
}
