const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  eyebrow: String,
  period: String,
  category: String,
  summary: String,
  description: String,
  impact: [String],
  stack: [String],
  liveUrl: String,
  accent: String,
  symbol: String,
  featured: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
