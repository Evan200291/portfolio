const express = require('express');
const { getProjects, getProjectBySlug } = require('../services/projectService');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    res.json({ projects: await getProjects() });
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const project = await getProjectBySlug(req.params.slug);
    if (!project) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }
    res.json({ project });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
