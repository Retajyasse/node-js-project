const projectService = require("../services/projectService");
const asyncWrapper = require("../utils/asyncWrapper");

const getProjects = asyncWrapper(async (req, res) => {
  const projects = await projectService.getProjects();
  res.json({ status: "success", data: projects });
});

const getProjectById = asyncWrapper(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);
  res.json({ status: "success", data: project });
});

const createProject = asyncWrapper(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(201).json({ status: "success", data: project });
});

const updateProject = asyncWrapper(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  res.json({ status: "success", data: project });
});

const deleteProject = asyncWrapper(async (req, res) => {
  const result = await projectService.deleteProject(req.params.id);
  res.json({ status: "success", data: result });
});

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };