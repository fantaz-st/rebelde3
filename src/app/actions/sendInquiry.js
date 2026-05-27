"use server";

import { sendMail } from "@/lib/email/sendMail";

export async function sendInquiry(prevState, formData) {
  // formData.getAll() handles the multi-checkbox "howDidYouHear" field
  const data = {
    name: (formData.get("name") || "").toString().trim(),
    email: (formData.get("email") || "").toString().trim(),
    phone: (formData.get("phone") || "").toString().trim(),
    interestedIn: (formData.get("interestedIn") || "").toString().trim(),
    message: (formData.get("message") || "").toString().trim(),
    howDidYouHear: formData.getAll("howDidYouHear").map((v) => v.toString()),
    honey: (formData.get("honey") || "").toString(),
    sourceUrl: (formData.get("sourceUrl") || "").toString(),
  };

  const errors = {};

  // Validation
  if (!data.name || data.name.length < 2) errors.name = "Please enter your name";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errors.email = "Please enter a valid email";
  if (!data.message || data.message.length < 10) errors.message = "Please write at least 10 characters";

  // Honeypot
  if (data.honey) {
    return { status: "error", errors: { honey: "Bot detected" }, message: "" };
  }

  if (Object.keys(errors).length) {
    return { status: "error", errors, message: "Please fix the highlighted fields." };
  }

  const formatList = (arr) => (arr.length ? arr.join(", ") : "—");

  try {
    // Admin notification
    await sendMail({
      to: process.env.GMAIL_USER,
      subject: `New inquiry from ${data.name} — ${data.interestedIn || "General"}`,
      html: `
        <h2>New inquiry</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone || "—"}</p>
        <p><b>Interested in:</b> ${data.interestedIn || "—"}</p>
        <p><b>How did you hear:</b> ${formatList(data.howDidYouHear)}</p>
        <p><b>Message:</b><br/>${data.message.replace(/\n/g, "<br/>")}</p>
        <p><small>Source URL: ${data.sourceUrl || "—"}</small></p>
      `,
    });

    // Auto-reply to the sender
    await sendMail({
      to: data.email,
      subject: "We got your message — Rebelde Boats",
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for reaching out. We've received your message and will reply within 24 hours.</p>
        <p>In the meantime, feel free to check out our <a href="https://rebeldeboats.com/bespoke-tours">bespoke tours</a> or follow us on <a href="https://instagram.com/rebeldeboats">Instagram</a>.</p>
        <p>— The Rebelde Boats team</p>
      `,
    });

    return {
      status: "success",
      errors: {},
      message: "Thanks! We'll get back to you within 24 hours.",
    };
  } catch (err) {
    console.error("sendInquiry error:", err);
    return {
      status: "error",
      errors: {},
      message: "Something went wrong. Please try again or email us directly at info@rebeldeboats.com.",
    };
  }
}
