const Project = require("../models/Projects");
const AppError = require("../utils/AppError");


const getProjects = async () => {
  return await Project.find().populate("assignedTo");
};


const getProjectById = async (id) => {
  const project = await Project.findById(id).populate("assignedTo");
  if (!project) throw new AppError("Project not found", 404);
  return project;
};


const createProject = async (data) => {
  const project = await Project.create(data);
  return project;
};


const updateProject = async (id, data) => {
  const project = await Project.findByIdAndUpdate(id, data, { new: true }).populate("assignedTo");
  if (!project) throw new AppError("Project not found", 404);
  return project;
};


const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new AppError("Project not found", 404);
  return { message: "Project deleted" };
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };