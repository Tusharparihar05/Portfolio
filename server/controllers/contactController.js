const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// ── Helper: send notification email to yourself ──
async function sendNotificationEmail(data) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `📬 New Contact: ${data.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #6366f1;">New message from your portfolio</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding:8px; font-weight:bold;">Name</td><td style="padding:8px;">${data.name}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px; font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Subject</td><td style="padding:8px;">${data.subject}</td></tr>
          <tr style="background:#f5f5f5;"><td style="padding:8px; font-weight:bold; vertical-align:top;">Message</td><td style="padding:8px;">${data.message}</td></tr>
        </table>
        <p style="color:#888; font-size:12px; margin-top:20px;">Sent at ${new Date().toLocaleString()}</p>
      </div>
    `,
  });
}

// ── POST /api/contact ──
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // Save to MongoDB
    const contact = await Contact.create({ name, email, subject, message });

    // Try to send notification email (non-blocking)
    sendNotificationEmail({ name, email, subject, message }).catch((err) =>
      console.error('Email notification failed:', err.message)
    );

    return res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon. 🙌',
      data: { id: contact._id, createdAt: contact.createdAt },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }
    console.error('Contact submit error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};

// ── GET /api/contact (admin only) ──
exports.getContacts = async (req, res) => {
  try {
    const secret = req.headers['x-admin-secret'];
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    console.error('Get contacts error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};