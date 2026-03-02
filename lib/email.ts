import nodemailer from "nodemailer";

interface BookingEmailData {
  // Step 1 — Services
  services: string[];
  // Step 2 — Garment
  garmentType: string;
  garmentDescription: string;
  // Step 3 — Contact
  name: string;
  email: string;
  phone: string;
  // Step 4 — Delivery
  deliveryMethod: "local" | "mail-in";
  // Step 5 — Timeline
  timeline: "standard" | "rush";
  heardAboutUs: string;
  additionalNotes: string;
}

function buildEmailHTML(data: BookingEmailData): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1A1714;">
      <div style="background: #A85C3A; padding: 24px 32px;">
        <h1 style="margin: 0; color: #F7F2E9; font-size: 24px; font-weight: 500;">
          New Booking Request
        </h1>
        <p style="margin: 4px 0 0; color: rgba(247,242,233,0.7); font-family: sans-serif; font-size: 13px;">
          Janie Bell&apos;s Alterations
        </p>
      </div>

      <div style="padding: 32px; background: #F7F2E9;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td colspan="2" style="padding-bottom: 24px; border-bottom: 1px solid #E8E0D4;">
              <h2 style="margin: 0 0 4px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #A85C3A;">
                Customer
              </h2>
              <p style="margin: 0; font-size: 20px; font-weight: 500;">${data.name}</p>
              <p style="margin: 4px 0 0; font-family: sans-serif; font-size: 14px; color: #3D3530;">
                ${data.email} &bull; ${data.phone}
              </p>
            </td>
          </tr>

          <tr>
            <td colspan="2" style="padding: 24px 0; border-bottom: 1px solid #E8E0D4;">
              <h2 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #A85C3A;">
                Services Requested
              </h2>
              <ul style="margin: 0; padding-left: 20px; font-family: sans-serif; font-size: 14px; color: #1A1714; line-height: 1.8;">
                ${data.services.map((s) => `<li>${s}</li>`).join("")}
              </ul>
            </td>
          </tr>

          <tr>
            <td colspan="2" style="padding: 24px 0; border-bottom: 1px solid #E8E0D4;">
              <h2 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #A85C3A;">
                Garment Details
              </h2>
              <p style="margin: 0 0 6px; font-family: sans-serif; font-size: 14px;">
                <strong>Type:</strong> ${data.garmentType}
              </p>
              <p style="margin: 0; font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #3D3530;">
                ${data.garmentDescription || "No additional description provided."}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 24px 24px 0; border-bottom: 1px solid #E8E0D4; width: 50%;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #A85C3A;">
                Delivery Method
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 15px; font-weight: 500;">
                ${data.deliveryMethod === "local" ? "Local Drop-Off (Walterboro, SC)" : "Mail-In Order"}
              </p>
            </td>
            <td style="padding: 24px 0; border-bottom: 1px solid #E8E0D4;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #A85C3A;">
                Timeline
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 15px; font-weight: 500;">
                ${data.timeline === "rush" ? "Rush Order" : "Standard (3–7 business days)"}
              </p>
            </td>
          </tr>

          ${
            data.additionalNotes
              ? `
          <tr>
            <td colspan="2" style="padding: 24px 0; border-bottom: 1px solid #E8E0D4;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #A85C3A;">
                Additional Notes
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #3D3530;">
                ${data.additionalNotes}
              </p>
            </td>
          </tr>
          `
              : ""
          }

          <tr>
            <td colspan="2" style="padding: 24px 0 0;">
              <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #9B9186;">
                Heard about us via: ${data.heardAboutUs || "Not specified"}
              </p>
            </td>
          </tr>
        </table>
      </div>

      <div style="background: #2C3E2D; padding: 20px 32px; text-align: center;">
        <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: rgba(247,242,233,0.5);">
          Janie Bell&apos;s Alterations &bull; Walterboro, South Carolina
        </p>
      </div>
    </div>
  `;
}

export async function sendBookingEmail(data: BookingEmailData): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Janie Bell's Alterations" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: data.email,
    subject: `New Booking: ${data.name} — ${data.services.join(", ")}`,
    html: buildEmailHTML(data),
  });
}
