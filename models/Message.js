const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  subject: { type: String, trim: true, maxlength: 160 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
  ipHash: String
}, { timestamps: true });

module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);
