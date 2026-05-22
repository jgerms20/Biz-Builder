import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, pickupTime, notes, items, total } = body;

    if (!customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in order." },
        { status: 400 }
      );
    }

    await sendOrderEmail({ customerName, customerPhone, pickupTime, notes, items, total });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call us at 803-380-3309." },
      { status: 500 }
    );
  }
}
