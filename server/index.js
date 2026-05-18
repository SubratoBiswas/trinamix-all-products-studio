/**
 * ═══════════════════════════════════════════════════════════════════════
 *  Express + Mongoose backend — replaces Firebase Realtime Database
 *
 *  Endpoints
 *  ─────────
 *  GET  /api/registry   → fetch the single AdminStorage document
 *  POST /api/registry   → upsert (replace) the AdminStorage document
 *  GET  /health         → liveness probe
 *
 *  Run:
 *    cd server
 *    npm install
 *    node index.js
 * ═══════════════════════════════════════════════════════════════════════
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// ─── Config ───────────────────────────────────────────────────────────────────

const PORT         = process.env.PORT         ?? 3001;
const MONGODB_URI  = process.env.MONGODB_URI;
const CORS_ORIGIN  = process.env.CORS_ORIGIN  ?? 'http://localhost:5173';

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set. Add it to server/.env');
  process.exit(1);
}

// ─── Mongoose schema ──────────────────────────────────────────────────────────

/**
 * We store the entire AdminStorage as a single document identified by
 * a fixed _id so we can upsert it in one call.
 */
const registrySchema = new mongoose.Schema(
  {
    _id:        { type: String, default: 'singleton' },
    overrides:  { type: mongoose.Schema.Types.Mixed, default: {} },
    additions:  { type: [mongoose.Schema.Types.Mixed], default: [] },
    deletedIds: { type: [String], default: [] },
  },
  {
    // Allow any shape inside overrides / additions without strict validation
    strict: false,
    // Store ISO timestamps automatically
    timestamps: true,
  },
);

const Registry = mongoose.model('Registry', registrySchema, 'registry');

// ─── Express app ──────────────────────────────────────────────────────────────

const app = express();

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// GET /api/registry — return the stored AdminStorage (or 404 if empty)
app.get('/api/registry', async (_req, res) => {
  try {
    const doc = await Registry.findById('singleton').lean();
    if (!doc) return res.status(404).json({ error: 'No registry found' });

    // Strip internal Mongoose fields before sending to the client
    const { _id, __v, createdAt, updatedAt, ...payload } = doc;
    return res.json(payload);
  } catch (err) {
    console.error('GET /api/registry error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/registry — upsert the full AdminStorage document
app.post('/api/registry', async (req, res) => {
  try {
    const { overrides = {}, additions = [], deletedIds = [] } = req.body ?? {};

    await Registry.findByIdAndUpdate(
      'singleton',
      { overrides, additions, deletedIds },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/registry error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────

async function start() {
  console.log('🔌  Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI, {
    dbName: process.env.MONGODB_DB ?? 'trinamix',
  });
  console.log('✅  MongoDB connected');

  // Bind to 0.0.0.0 so Render's reverse proxy can reach the process
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀  Server listening on http://0.0.0.0:${PORT}`);
  });
}

start().