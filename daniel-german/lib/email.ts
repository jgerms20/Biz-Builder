import nodemailer from "nodemailer";

interface InquiryEmailData {
  serviceType: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  budgetRange: string;
  location: string;
  dietaryRestrictions: string;
  message: string;
}

const serviceLabels: Record<string, string> = {
  "private-dining-one-night": "Private Dining — One Night",
  "private-dining-multi-weekend": "Private Dining — Multi-Weekend",
  "private-dining-multi-day": "Private Dining — Multi-Day",
  catering: "Catering",
  "meal-prep": "Meal Prep",
  other: "Other / Not Sure Yet",
};

function buildEmailHTML(data: InquiryEmailData): string {
  const serviceLabel = serviceLabels[data.serviceType] || data.serviceType;

  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #F5F0E8;">
      <div style="background: #C9A85C; padding: 24px 32px;">
        <h1 style="margin: 0; color: #0A0A0A; font-size: 24px; font-weight: 600;">
          New Inquiry
        </h1>
        <p style="margin: 4px 0 0; color: rgba(10,10,10,0.6); font-family: sans-serif; font-size: 13px;">
          DG Creations by Daniel German
        </p>
      </div>

      <div style="padding: 32px; background: #141414;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td colspan="2" style="padding-bottom: 24px; border-bottom: 1px solid #2A2A2A;">
              <h2 style="margin: 0 0 4px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Client
              </h2>
              <p style="margin: 0; font-size: 20px; font-weight: 500; color: #F5F0E8;">${data.name}</p>
              <p style="margin: 4px 0 0; font-family: sans-serif; font-size: 14px; color: #C8C0B4;">
                ${data.email} &bull; ${data.phone}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 24px 24px 0; border-bottom: 1px solid #2A2A2A; width: 50%;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Service
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 15px; font-weight: 500; color: #F5F0E8;">
                ${serviceLabel}
              </p>
            </td>
            <td style="padding: 24px 0; border-bottom: 1px solid #2A2A2A;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Budget
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 15px; font-weight: 500; color: #F5F0E8;">
                ${data.budgetRange || "Not specified"}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 24px 24px 0; border-bottom: 1px solid #2A2A2A; width: 50%;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Date
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 15px; font-weight: 500; color: #F5F0E8;">
                ${data.eventDate || "Not specified"}
              </p>
            </td>
            <td style="padding: 24px 0; border-bottom: 1px solid #2A2A2A;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Guests
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 15px; font-weight: 500; color: #F5F0E8;">
                ${data.guestCount || "Not specified"}
              </p>
            </td>
          </tr>

          ${
            data.location
              ? `
          <tr>
            <td colspan="2" style="padding: 24px 0; border-bottom: 1px solid #2A2A2A;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Location
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #C8C0B4;">
                ${data.location}
              </p>
            </td>
          </tr>
          `
              : ""
          }

          ${
            data.dietaryRestrictions
              ? `
          <tr>
            <td colspan="2" style="padding: 24px 0; border-bottom: 1px solid #2A2A2A;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Dietary Restrictions
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #C8C0B4;">
                ${data.dietaryRestrictions}
              </p>
            </td>
          </tr>
          `
              : ""
          }

          ${
            data.message
              ? `
          <tr>
            <td colspan="2" style="padding: 24px 0; border-bottom: 1px solid #2A2A2A;">
              <h2 style="margin: 0 0 8px; font-size: 14px; font-weight: 600; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.1em; color: #C9A85C;">
                Message
              </h2>
              <p style="margin: 0; font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #C8C0B4;">
                ${data.message}
              </p>
            </td>
          </tr>
          `
              : ""
          }
        </table>
      </div>

      <div style="background: #6B1F2A; padding: 20px 32px; text-align: center;">
        <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: rgba(245,240,232,0.5);">
          DG Creations by Daniel German &bull; Every plate, a creation.
        </p>
      </div>
    </div>
  `;
}

export async function sendInquiryEmail(
  data: InquiryEmailData
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const serviceLabel = serviceLabels[data.serviceType] || data.serviceType;

  await transporter.sendMail({
    from: `"DG Creations" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: data.email,
    subject: `New Inquiry: ${data.name} — ${serviceLabel}`,
    html: buildEmailHTML(data),
  });
}
