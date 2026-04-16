const express = require('express');
const { v4: uuid } = require('uuid');
const auth = require('../middleware/auth');
const { readData, writeData } = require('../utils/fileHandler');
const path = require('path');

const router = express.Router();

const TODOS_FILE = path.join(__dirname, '../data/todos.json');


// =========================
// GET TODOS (USER ONLY)
// =========================
router.get('/', auth, (req, res) => {
  const todos = readData(TODOS_FILE) || [];

  const userTodos = todos.filter(
    t => t.userId === req.user.id
  );

  res.json(userTodos);
});


// =========================
// CREATE TODO
// =========================
router.post('/', auth, (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  const todos = readData(TODOS_FILE) || [];

  const newTodo = {
    id: uuid(),
    title: title.trim(),
    completed: false,
    userId: req.user.id,
    createdAt: new Date()
  };

  todos.push(newTodo);
  writeData(TODOS_FILE, todos);

  res.status(201).json(newTodo);
});


// =========================
// UPDATE TODO (SECURE)
// =========================
router.put('/:id', auth, (req, res) => {
  const todos = readData(TODOS_FILE) || [];

  const index = todos.findIndex(
    t => t.id === req.params.id && t.userId === req.user.id
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found or unauthorized' });
  }

  // allow flexible update
  todos[index] = {
    ...todos[index],
    ...req.body,
    updatedAt: new Date()
  };

  writeData(TODOS_FILE, todos);

  res.json(todos[index]);
});


// =========================
// DELETE TODO (SECURE)
// =========================
router.delete('/:id', auth, (req, res) => {
  let todos = readData(TODOS_FILE) || [];

  const exists = todos.some(
    t => t.id === req.params.id && t.userId === req.user.id
  );

  if (!exists) {
    return res.status(404).json({ message: 'Todo not found or unauthorized' });
  }

  todos = todos.filter(
    t => !(t.id === req.params.id && t.userId === req.user.id)
  );

  writeData(TODOS_FILE, todos);

  res.json({ message: 'Todo deleted successfully' });
});

module.exports = router;