const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// ── Trust proxy — required for Render/Heroku/Railway deployments ──
app.set('trust proxy', 1);

// ── Middleware ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow your frontend origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://portfolio-virid-chi-81.vercel.app',
  'https://portfolio-9sstvgy0u-tusharparihar05s-projects.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      // allow all *.vercel.app preview URLs
      if (origin.endsWith('.vercel.app')) return callback(null, true);

      // allow localhost for development
      if (origin.startsWith('http://localhost')) return callback(null, true);

      // allow specific origins from list
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // block everything else
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Rate limiter — protect contact route from spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// ── Routes ──
app.use('/api/contact', contactLimiter, require('./routes/contact'));
app.use('/api/cv',      require('./routes/cv'));

// ── Health check ──
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running 🚀' });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── MongoDB connection + server start ──
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });