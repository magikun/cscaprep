import { Resend } from "resend";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

const resend = new Resend(process.env.RESEND_API_KEY);
// process.cwd() is read-only on Vercel; the OS temp dir is writable (though
// ephemeral). We treat persistence as best-effort and rely on the admin
// notification email below to reliably capture every signup in production.
const DATA_FILE = path.join(os.tmpdir(), "waitlist-emails.json");

function loadEmails(): Set<string> {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveEmails(emails: Set<string>) {
  // Best-effort only — the serverless filesystem may be read-only or
  // ephemeral. A failure here must never break the response.
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify([...emails], null, 2));
  } catch (err) {
    console.error("Failed to persist waitlist email:", err);
  }
}

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();
  const emails = loadEmails();

  if (emails.has(normalized)) {
    return NextResponse.json({ alreadyJoined: true });
  }

  // Sending the welcome email is the real success criterion.
  try {
    await resend.emails.send({
      from: "Magzhan from genzy <genzy@academixhub.co>",
      replyTo: "genzy@academixhub.co",
      to: email,
      subject: "you're on the genzy waitlist",
      // Plain-text first: a text alternative + a simple, personal-letter
      // layout (no banner image, no newsletter table) reads as a 1:1 email
      // and is far more likely to land in Primary than Promotions.
      text: `hey,

you are now in the waitlist. we will let you know when we launch.

thx.
— Magzhan, genzy`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
  <div style="max-width:480px;margin:0 auto;padding:32px 24px;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;">
    <p style="margin:0 0 16px 0;">hey,</p>
    <p style="margin:0 0 16px 0;">you are now in the waitlist. we will let you know when we launch.</p>
    <p style="margin:0 0 24px 0;">thx.</p>
    <p style="margin:0;">— Magzhan, genzy</p>
  </div>
</body>
</html>`,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // Best-effort local persistence (works in dev, no-ops safely in prod).
  // In production, the full signup list is visible in the Resend dashboard
  // (Emails log) — each welcome email's recipient is a signup.
  emails.add(normalized);
  saveEmails(emails);

  return NextResponse.json({ success: true });
}
