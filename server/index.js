import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 3001;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@pearlparadisetours.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

function isValidEmail(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value.trim());
}

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, dates } = req.body || {};
    const nameStr = typeof name === "string" ? name.trim() : "";
    const emailStr = typeof email === "string" ? email.trim() : "";
    const datesStr = typeof dates === "string" ? dates.trim() : "";

    if (!nameStr) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!emailStr) {
      return res.status(400).json({ error: "Email is required." });
    }
    if (!isValidEmail(emailStr)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return res.status(500).json({ error: "Email is not configured. Please try again later." });
    }

    const html = `
      <h2>New enquiry from Pearl Paradise Tours</h2>
      <p><strong>Name:</strong> ${escapeHtml(nameStr)}</p>
      <p><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
      <p><strong>Travel dates / preferences:</strong></p>
      <p>${datesStr ? escapeHtml(datesStr) : "(not provided)"}</p>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `Pearl Paradise Tours – Enquiry from ${escapeHtml(nameStr)}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send your message. Please try again or email us directly." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again or email us directly." });
  }
});

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
