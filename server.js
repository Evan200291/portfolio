const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const { ensureProjectSeed } = require('./services/projectService');

const app = express();
const publicDir = path.join(__dirname, 'public');
const port = Number(process.env.PORT) || 33221;

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
const corsOptions = {
  origin(origin, callback) {
    const allowed = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!origin || allowed.length === 0 || allowed.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin is not allowed by CORS.'));
  }
};

app.use(compression());
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.static(publicDir, { maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0 }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'fallback',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', cors(corsOptions));
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

const sendPage = (file) => (_req, res) => res.sendFile(path.join(publicDir, file));

app.get('/', sendPage('index.html'));
app.get('/projects', sendPage('projects.html'));
app.get('/projects/:slug', sendPage('project.html'));
app.get('/about', sendPage('about.html'));
app.get('/contact', sendPage('contact.html'));

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

app.use((_req, res) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Unexpected server error.' : error.message
  });
});

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. The API will use the bundled project data and in-memory contact storage.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    await ensureProjectSeed();
    console.log('MongoDB connected.');
  } catch (error) {
    console.warn(`MongoDB unavailable; continuing in fallback mode: ${error.message}`);
  }
}

if (require.main === module) {
  connectDatabase().finally(() => {
    app.listen(port, () => {
      console.log(`Portfolio running at http://localhost:${port}`);
    });
  });
}

module.exports = app;
