const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const Message = require('../models/Message');

const router = express.Router();
const memoryMessages = [];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendTelegramMessage({ name, email, subject, message }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return false;

  const lines = [
    'New portfolio contact',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject || 'Not provided'}`,
    '',
    'Message:',
    message
  ];

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n')
    }),
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    throw new Error(`Telegram delivery failed (${response.status}).`);
  }

  const result = await response.json();
  if (!result.ok) throw new Error('Telegram delivery failed.');

  return true;
}

router.post('/', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const subject = String(req.body.subject || '').trim();
    const message = String(req.body.message || '').trim();

    if (
      name.length < 2 || name.length > 120 ||
      !emailPattern.test(email) || email.length > 254 ||
      subject.length > 180 || message.length < 10 || message.length > 3000
    ) {
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

    const telegramDelivered = await sendTelegramMessage(payload);

    res.status(201).json({
      success: true,
      storage,
      telegramDelivered,
      message: 'Thanks - your message has been received.'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
