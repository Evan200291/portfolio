const mongoose = require('mongoose');
const Project = require('../models/Project');
const bundledProjects = require('../data/projects');

async function ensureProjectSeed() {
  if (mongoose.connection.readyState !== 1) return;

  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(bundledProjects);
    console.log(`Seeded ${bundledProjects.length} projects.`);
  }
}

async function getProjects() {
  if (mongoose.connection.readyState === 1) {
    return Project.find().sort({ symbol: 1 }).lean();
  }
  return bundledProjects;
}

async function getProjectBySlug(slug) {
  if (mongoose.connection.readyState === 1) {
    return Project.findOne({ slug }).lean();
  }
  return bundledProjects.find((project) => project.slug === slug) || null;
}

module.exports = { ensureProjectSeed, getProjects, getProjectBySlug };
