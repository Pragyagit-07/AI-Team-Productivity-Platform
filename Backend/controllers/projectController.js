const Project = require('../models/Project');
const User = require('../models/User');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;
    const project = await Project.create({ name, description, createdBy });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    await project.update({ name, description });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    await project.destroy();
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
