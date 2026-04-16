require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// =========================
// FRONTEND (optional)
// =========================
app.use(express.static(path.join(__dirname, '../frontend')));

// =========================
// ROUTES
// =========================
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// =========================
// SERVER START
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});