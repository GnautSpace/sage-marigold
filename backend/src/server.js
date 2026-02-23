const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://5173-firebase-sage-marigoldgit-1771583099257.cluster-bqwaigqtxbeautecnatk4o6ynk.cloudworkstations.dev',
    'http://localhost:5173' // Add this for the proxy to work smoothly
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));

app.get('/', (req, res) => {
  res.send('Welcome to the Sage-Marigold Backend!');
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'backend',
    timestamp: new Date().toISOString(),
  });
});

// db test route
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM test_connection');
    res.json({
      message: 'Database connection is working!',
      data: result.rows,
    });
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed :(' });
  }
});

module.exports = app;
