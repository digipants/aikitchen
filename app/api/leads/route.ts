import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name = "", phone = "", area = "", goal = "", message = "" } = body ?? {};

    if (!name || !phone) {
      return NextResponse.json({ ok: false, error: "Missing name/phone" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const toEmail = process.env.LEADS_TO_EMAIL;
    const fromEmail = process.env.LEADS_FROM_EMAIL || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !toEmail) {
      return NextResponse.json({ ok: false, error: "Missing SMTP env vars" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subject = `New AIKitchen Lead: ${name} (${phone})`;
    const text = [
      "New lead received:",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Area: ${area}`,
      `Goal: ${goal}`,
      `Message: ${message}`,
      "",
      "Source: AIKitchen website enquiry form",
    ].join("\n");

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
