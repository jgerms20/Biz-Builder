import { NextRequest, NextResponse } from "next/server";
import { sendConversionEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await sendConversionEmail({ name, email, phone, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Conversion form error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
