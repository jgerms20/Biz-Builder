import nodemailer from "nodemailer";

function makeTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

export async function sendOrderEmail(data: {
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  notes?: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
}) {
  const itemRows = data.items
    .map(
      (i) =>
        `<tr><td style="padding:4px 8px">${i.name}</td><td style="padding:4px 8px;text-align:center">${i.qty}</td><td style="padding:4px 8px;text-align:right">$${(i.qty * i.price).toFixed(2)}</td></tr>`
    )
    .join("");

  const transporter = makeTransport();
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.BOOKING_EMAIL || process.env.GMAIL_USER,
    subject: `New Order — ${data.customerName} (${data.customerPhone})`,
    html: `
      <h2 style="color:#0ABFBF">New Order — The Comeback Truck</h2>
      <p><strong>Name:</strong> ${data.customerName}</p>
      <p><strong>Phone:</strong> ${data.customerPhone}</p>
      <p><strong>Pickup Time:</strong> ${data.pickupTime || "Not specified"}</p>
      ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
      <h3>Order Items</h3>
      <table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:480px">
        <thead style="background:#0ABFBF;color:white">
          <tr><th>Item</th><th>Qty</th><th>Subtotal</th></tr>
        </thead>
        <tbody>${itemRows}</tbody>
        <tfoot>
          <tr style="font-weight:bold;background:#f5f5f5">
            <td colspan="2" style="padding:6px 8px">TOTAL</td>
            <td style="padding:6px 8px;text-align:right">$${data.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p style="color:#888;font-size:12px;margin-top:16px">Call ${data.customerName} at ${data.customerPhone} to confirm the order.</p>
    `,
  });
}

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
  const transporter = makeTransport();

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
