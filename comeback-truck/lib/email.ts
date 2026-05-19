import nodemailer from "nodemailer";

export async function sendBookingEmail(data: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests?: string;
  serviceStyle?: string;
  notes?: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.BOOKING_EMAIL || process.env.GMAIL_USER,
    subject: `New Booking — ${data.eventType} on ${data.eventDate}`,
    html: `
      <h2>New Booking Request — The Comeback Truck</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Event Type:</strong> ${data.eventType}</p>
      <p><strong>Date:</strong> ${data.eventDate}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Guests:</strong> ${data.guests || "N/A"}</p>
      <p><strong>Service Style:</strong> ${data.serviceStyle || "N/A"}</p>
      <p><strong>Notes:</strong> ${data.notes || "None"}</p>
    `,
    replyTo: data.email,
  });
}
