const express = require('express');
const router = express.Router();

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'senha123';

router.post('/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    // Retorne um token ou sessão
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

module.exports = router;