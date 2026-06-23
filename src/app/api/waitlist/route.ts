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
const ADMIN_EMAIL = "genzy@academixhub.co";

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
      subject: "greeting you are the one of the first who joined genzy",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;padding:48px 32px;">
    <tr>
      <td align="left" style="padding-bottom:36px;">
        <img src="https://res.cloudinary.com/dr5iwebjw/image/upload/f_auto,q_auto/ChatGPT_Image_22_июня_2026_г._21_04_47_pq5ndt"
             alt="genzy" width="120" style="display:block;border:0;" />
      </td>
    </tr>
    <tr>
      <td style="color:#0f172a;font-size:16px;line-height:1.7;">
        <p style="margin:0 0 16px 0;">hey,</p>
        <p style="margin:0 0 16px 0;">you're officially on the genzy waitlist — and you're early, which is the best place to be.</p>
        <p style="margin:0 0 16px 0;">we're building the fastest, clearest way to prep for the CSCA: real-format practice tests, full study materials for math, physics & chemistry, and progress tracking that shows you exactly where you stand.</p>
        <p style="margin:0 0 32px 0;">you'll be among the first to get in the moment we launch. we'll email you the second it's ready — keep an eye out.</p>
        <p style="margin:0 0 4px 0;">talk soon,</p>
        <p style="margin:0;color:#64748b;font-size:14px;">— Magzhan, genzy</p>
      </td>
    </tr>
  </table>
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

  // Notify the admin so signups are captured even when the filesystem can't
  // persist them. Best-effort — must not affect the user-facing response.
  try {
    await resend.emails.send({
      from: "genzy waitlist <genzy@academixhub.co>",
      to: ADMIN_EMAIL,
      subject: `New waitlist signup: ${normalized}`,
      html: `<p style="font-family:sans-serif;font-size:15px;color:#0f172a;">New waitlist signup:</p>
<p style="font-family:sans-serif;font-size:18px;font-weight:600;color:#0f172a;">${normalized}</p>`,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    });
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }

  // Best-effort local persistence (works in dev, no-ops safely in prod).
  emails.add(normalized);
  saveEmails(emails);

  return NextResponse.json({ success: true });
}
