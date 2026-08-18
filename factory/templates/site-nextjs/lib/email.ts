import nodemailer from "nodemailer";

export interface ConversionData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendConversionEmail(data: ConversionData): Promise<void> {
  const recipient = process.env["{{RECIPIENT_ENV_KEY}}"];
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  // Dev-mode escape hatch: without credentials, log and succeed so the form
  // works locally without wiring email.
  if (!recipient || !user || !pass) {
    console.log("Submission received (email not configured):", data);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Message", data.message],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600">${k}</td><td style="padding:6px 12px">${v}</td></tr>`
    )
    .join("");

  await transporter.sendMail({
    from: `"{{BUSINESS_NAME}}" <${user}>`,
    to: recipient,
    replyTo: data.email,
    subject: "{{EMAIL_SUBJECT_TEMPLATE}}".replace("${name}", data.name),
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px">
        <div style="background: {{TOKEN_BRAND}}; padding: 20px 24px">
          <h1 style="color: #fff; margin: 0; font-size: 18px">{{BUSINESS_NAME}}</h1>
        </div>
        <table style="border-collapse: collapse; width: 100%; margin-top: 12px">${rows}</table>
      </div>
    `,
  });
}
