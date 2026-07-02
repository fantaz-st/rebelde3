import nodemailer from "nodemailer";

const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_APP_PASSWORD;

// Singleton — one transporter for the lifetime of the process.
// Creating a new one per call wastes connection overhead.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

export async function sendMail({ to, subject, html }) {
  if (!user || !pass) throw new Error("Missing Gmail credentials (GMAIL_USER / GMAIL_APP_PASSWORD)");
  await transporter.sendMail({ from: user, to, subject, html });
}
