import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !email.includes("@") || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Prepify Contact Form <prepify@academixhub.co>",
      replyTo: email,
      to: "prepify@academixhub.co",
      subject: `New message from ${name}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;padding:48px 32px;">
    <tr>
      <td style="color:#0f172a;font-size:16px;line-height:1.7;">
        <p style="margin:0 0 8px 0;color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">New contact message</p>
        <p style="margin:0 0 24px 0;font-size:22px;font-weight:600;">From ${name}</p>
        <p style="margin:0 0 6px 0;color:#64748b;font-size:13px;">Email</p>
        <p style="margin:0 0 24px 0;font-size:15px;">${email}</p>
        <p style="margin:0 0 6px 0;color:#64748b;font-size:13px;">Message</p>
        <p style="margin:0 0 32px 0;font-size:15px;white-space:pre-wrap;">${message}</p>
        <p style="margin:0;color:#94a3b8;font-size:13px;">Sent via prepify.com contact form</p>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
