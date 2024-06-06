const express = require('express');
const router = express.Router();

// Мок дані
const users = [
  { id: 1, name: 'Алина' },
  { id: 2, name: 'Alina' }
];

// Список користувачів
router.get('/', (req, res) => {
  res.render('users/index', { users });
});

// Деталі користувача
router.get('/:userId', (req, res) => {
  const user = users.find(u => u.id == req.params.userId);
  if (user) {
    res.render('users/show', { user });
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
