import nodemailer from "nodemailer";

interface ContactFormData {
  inquiryType: string;
  businessName: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { CONTACT_EMAIL, GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!CONTACT_EMAIL || !GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.log("Email credentials not configured. Form submission (dev mode):", data);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f4f6f9;">
      <div style="background: #1B2A4A; padding: 24px 32px; margin-bottom: 24px;">
        <h1 style="color: #C9A85C; font-family: Georgia, serif; font-size: 24px; margin: 0;">
          Milton German Bookkeeping
        </h1>
        <p style="color: #fff; font-family: sans-serif; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; margin: 8px 0 0;">
          New Inquiry
        </p>
      </div>
      <div style="background: #fff; padding: 32px; border: 1px solid #E2E7EF;">
        <table style="width: 100%; font-family: sans-serif; font-size: 14px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #E2E7EF;">
            <td style="padding: 12px 0; color: #6B7A99; width: 40%;">Inquiry Type</td>
            <td style="padding: 12px 0; color: #1A1A2E; font-weight: 500;">${data.inquiryType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E7EF;">
            <td style="padding: 12px 0; color: #6B7A99;">Business Name</td>
            <td style="padding: 12px 0; color: #1A1A2E; font-weight: 500;">${data.businessName || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E7EF;">
            <td style="padding: 12px 0; color: #6B7A99;">Name</td>
            <td style="padding: 12px 0; color: #1A1A2E; font-weight: 500;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E7EF;">
            <td style="padding: 12px 0; color: #6B7A99;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${data.email}" style="color: #2D7D46;">${data.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E7EF;">
            <td style="padding: 12px 0; color: #6B7A99;">Phone</td>
            <td style="padding: 12px 0; color: #1A1A2E;">${data.phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #6B7A99; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; color: #1A1A2E;">${data.message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Milton German Bookkeeping" <${GMAIL_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject: `New Inquiry — ${data.inquiryType} — ${data.name}`,
    html,
  });
}
