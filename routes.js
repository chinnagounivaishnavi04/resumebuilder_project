const express = require('express');
const jwt = require('jsonwebtoken');
const Resume = require('Resume');
const User = require('User');

const router = express.Router();

// Middleware for token verification
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
};

router.post('/create', authenticateToken, async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.user.id,
      ...req.body,
    });
    await resume.save();
    res.status(201).send('Resume Created');
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

router.get('/view', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    res.json(resume);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

module.exports = router;