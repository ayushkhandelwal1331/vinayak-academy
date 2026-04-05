import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import enquiryRoutes from './routes/enquiry.js';
import { logMailConfig, getMailStatus, sendTestMail } from './services/mail.js';

const app = express();
const PORT = Number(process.env.PORT) || 5001;
const MONGODB_URI = process.env.MONGODB_URI;
/** Always use this DB name (overrides missing or wrong path in MONGODB_URI, e.g. Atlas defaulting to `test`). */
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'vinayak_academy';
const allowedOrigins = new Set(
  [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    ...(process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  ]
);

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin and non-browser requests; validate cross-origin browser traffic.
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

app.use('/api', enquiryRoutes);

app.get('/health', (req, res) => {
  res.json({ ok: true, mail: getMailStatus() });
});

app.get('/health/test-mail', async (req, res) => {
  const result = await sendTestMail();
  res.json(result);
});

async function start() {
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME });
    console.log(`Connected to MongoDB (database: ${MONGODB_DB_NAME})`);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }

  logMailConfig();

  const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);

    // Render free tier sleeps after 15 min of inactivity — ping every 14 min to stay warm
    const selfUrl = process.env.RENDER_EXTERNAL_URL;
    if (selfUrl) {
      const INTERVAL = 14 * 60 * 1000;
      setInterval(() => {
        fetch(`${selfUrl}/health`).catch(() => {});
      }, INTERVAL);
      console.log(`Keep-alive ping enabled: ${selfUrl}/health every 14 min`);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Port ${PORT} is already in use. Change PORT in server/.env or run: kill $(lsof -t -i :${PORT})`
      );
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}

start();
