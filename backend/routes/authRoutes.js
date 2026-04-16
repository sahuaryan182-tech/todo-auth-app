const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const path = require('path');
const { readData, writeData } = require('../utils/fileHandler');

const router = express.Router();

// ✅ FIX: absolute path (VERY IMPORTANT)
const USERS_FILE = path.join(__dirname, '../data/users.json');


// =========================
// REGISTER
// =========================
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // ✅ validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const users = readData(USERS_FILE) || [];

  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuid(),
    username,
    password: hashedPassword,
    createdAt: new Date()
  };

  users.push(newUser);
  writeData(USERS_FILE, users);

  res.status(201).json({ message: 'User registered successfully' });
});


// =========================
// LOGIN
// =========================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const users = readData(USERS_FILE) || [];

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // ⚠️ safer fallback if env missing
  const secret = process.env.JWT_SECRET || 'SECRET_KEY';

  const token = jwt.sign(
    { id: user.id, username: user.username },
    secret,
    { expiresIn: '1d' }
  );

  res.json({ token });
});

module.exports = router;