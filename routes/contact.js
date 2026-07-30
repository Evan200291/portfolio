const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const Message = require('../models/Message');

const router = express.Router();
const memoryMessages = [];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const subject = String(req.body.subject || '').trim();
    const message = String(req.body.message || '').trim();

    if (name.length < 2 || !emailPattern.test(email) || message.length < 10) {
      res.status(400).json({ error: 'Please provide a valid name, email, and a message of at least 10 characters.' });
      return;
    }

    const ipHash = crypto
      .createHash('sha256')
      .update(`${req.ip || 'unknown'}:${process.env.CONTACT_HASH_SALT || 'portfolio'}`)
      .digest('hex');

    const payload = { name, email, subject, message, ipHash };
    let storage = 'memory';

    if (mongoose.connection.readyState === 1) {
      await Message.create(payload);
      storage = 'mongodb';
    } else {
      memoryMessages.push({ ...payload, createdAt: new Date() });
    }

    res.status(201).json({
      success: true,
      storage,
      message: 'Thanks - your message has been received.'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
