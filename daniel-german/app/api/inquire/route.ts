import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      serviceType,
      name,
      email,
      phone,
      eventDate,
      guestCount,
      budgetRange,
      location,
      dietaryRestrictions,
      message,
    } = body;

    // Basic validation
    if (!name || !email || !phone || !serviceType) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // If email env vars are not configured, log and return success (dev mode)
    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_APP_PASSWORD ||
      !process.env.CONTACT_EMAIL
    ) {
      console.log("Inquiry received (email not configured):", {
        name,
        email,
        phone,
        serviceType,
        eventDate,
        guestCount,
        budgetRange,
        location,
      });
      return NextResponse.json({ success: true });
    }

    await sendInquiryEmail({
      serviceType,
      name,
      email,
      phone,
      eventDate: eventDate || "",
      guestCount: guestCount || "",
      budgetRange: budgetRange || "",
      location: location || "",
      dietaryRestrictions: dietaryRestrictions || "",
      message: message || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
