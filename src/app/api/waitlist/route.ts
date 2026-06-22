import { Resend } from "resend";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);
const DATA_FILE = path.join(process.cwd(), "waitlist-emails.json");

function loadEmails(): Set<string> {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveEmails(emails: Set<string>) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([...emails], null, 2));
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

  try {
    await resend.emails.send({
      from: "Magzhan from genzy <genzy@academixhub.co>",
      reply_to: "genzy@academixhub.co",
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
        <p style="margin:0 0 16px 0;">you are now in the waitlist. we will let you know when we launch.</p>
        <p style="margin:0 0 32px 0;">thx.</p>
        <p style="margin:0;color:#64748b;font-size:14px;">— Magzhan from genzy</p>
      </td>
    </tr>
  </table>
</body>
</html>`,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    });

    emails.add(normalized);
    saveEmails(emails);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
