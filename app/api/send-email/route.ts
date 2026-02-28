import { NextResponse } from "next/server";
import { contactFormSchema } from "@/app/lib/email-validation";
import { getResend } from "@/app/lib/resend-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Update to your verified domain email after setting up Resend
      to: "anuragmundada46@gmail.com",
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
