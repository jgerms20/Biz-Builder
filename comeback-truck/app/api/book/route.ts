import { NextRequest, NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/email";

interface BookingRequestBody {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests?: string;
  serviceStyle?: string;
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

  const { name, email, phone, eventType, eventDate, location } = body;

  if (!name || !email || !phone || !eventType || !eventDate || !location) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Missing required fields: name, email, phone, eventType, eventDate, location.",
      },
      { status: 400 }
    );
  }

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
      phone,
      eventType,
      eventDate,
      location,
      guests: body.guests,
      serviceStyle: body.serviceStyle,
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
