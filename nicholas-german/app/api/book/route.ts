import { NextRequest, NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/email";

interface BookingRequestBody {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  venue: string;
  duration?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  let body: BookingRequestBody;

  try {
    body = (await request.json()) as BookingRequestBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, eventType, eventDate, venue } = body;

  // Validate required fields
  if (!name || !email || !eventType || !eventDate || !venue) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: name, email, eventType, eventDate, venue.",
      },
      { status: 400 }
    );
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address." },
      { status: 400 }
    );
  }

  try {
    await sendBookingEmail({
      name,
      email,
      phone: body.phone,
      eventType,
      eventDate,
      venue,
      duration: body.duration,
      notes: body.notes,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send booking request. Please try again later." },
      { status: 500 }
    );
  }
}
