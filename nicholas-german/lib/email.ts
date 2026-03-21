import nodemailer from "nodemailer";

export async function sendBookingEmail(data: {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  venue: string;
  duration?: string;
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
    subject: `New Booking Request — ${data.eventType} on ${data.eventDate}`,
    html: `
      <h2>New Booking Request — NG Percussion</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Event Type:</strong> ${data.eventType}</p>
      <p><strong>Event Date:</strong> ${data.eventDate}</p>
      <p><strong>Venue/Location:</strong> ${data.venue}</p>
      <p><strong>Duration:</strong> ${data.duration || "N/A"}</p>
      <p><strong>Notes:</strong> ${data.notes || "None"}</p>
    `,
    replyTo: data.email,
  });
}
