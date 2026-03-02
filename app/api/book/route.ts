import { NextRequest, NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      services,
      garmentType,
      garmentDescription,
      name,
      email,
      phone,
      deliveryMethod,
      timeline,
      heardAboutUs,
      additionalNotes,
    } = body;

    // Basic validation
    if (!name || !email || !phone || !services?.length || !garmentType || !deliveryMethod) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // If email env vars are not configured, log and return success (dev mode)
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.CONTACT_EMAIL) {
      console.log("📬 Booking received (email not configured):", {
        name,
        email,
        phone,
        services,
        garmentType,
        deliveryMethod,
        timeline,
      });
      return NextResponse.json({ success: true });
    }

    await sendBookingEmail({
      services,
      garmentType,
      garmentDescription: garmentDescription || "",
      name,
      email,
      phone,
      deliveryMethod,
      timeline: timeline || "standard",
      heardAboutUs: heardAboutUs || "",
      additionalNotes: additionalNotes || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
