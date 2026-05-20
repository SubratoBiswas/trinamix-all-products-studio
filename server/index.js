'use strict';

require('dotenv').config();

var express  = require('express');
var cors     = require('cors');
var mongoose = require('mongoose');

// Config
var PORT        = process.env.PORT        || 3001;
var MONGODB_URI = process.env.MONGODB_URI;
var CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set.');
  process.exit(1);
}

// Mongoose schema  single "singleton" document stores all AdminStorage
var registrySchema = new mongoose.Schema(
  {
    _id:        { type: String, default: 'singleton' },
    overrides:  { type: mongoose.Schema.Types.Mixed, default: {} },
    additions:  { type: [mongoose.Schema.Types.Mixed], default: [] },
    deletedIds: { type: [String], default: [] }
  },
  { strict: false, timestamps: true }
);

var Registry = mongoose.model('Registry', registrySchema, 'registry');

// Express app
var app = express();

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));

// Health check
app.get('/health', function(_req, res) {
  res.json({ ok: true });
});

// GET /api/registry
app.get('/api/registry', function(_req, res) {
  Registry.findById('singleton').lean()
    .then(function(doc) {
      if (!doc) {
        return res.status(404).json({ error: 'No registry found' });
      }
      var payload = Object.assign({}, doc);
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      return res.json(payload);
    })
    .catch(function(err) {
      console.error('GET /api/registry error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    });
});

// POST /api/registry
app.post('/api/registry', function(req, res) {
  var body       = req.body || {};
  var overrides  = body.overrides  || {};
  var additions  = body.additions  || [];
  var deletedIds = body.deletedIds || [];

  Registry.findByIdAndUpdate(
    'singleton',
    { overrides: overrides, additions: additions, deletedIds: deletedIds },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then(function() {
      return res.json({ ok: true });
    })
    .catch(function(err) {
      console.error('POST /api/registry error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    });
});

// Start server
mongoose
  .connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || 'trinamix' })
  .then(function() {
    console.log('MongoDB connected');
    app.listen(Number(PORT), '0.0.0.0', function() {
      console.log('Server listening on port ' + PORT);
    });
  })
  .catch(function(err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  });
