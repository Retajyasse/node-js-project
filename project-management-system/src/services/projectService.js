const Project = require("../models/Projects");
const AppError = require("../utils/AppError");

// جلب كل المشاريع
const getProjects = async () => {
  return await Project.find().populate("assignedTo");
};

// جلب مشروع واحد
const getProjectById = async (id) => {
  const project = await Project.findById(id).populate("assignedTo");
  if (!project) throw new AppError("Project not found", 404);
  return project;
};

// إنشاء مشروع جديد
const createProject = async (data) => {
  const project = await Project.create(data);
  return project;
};

// تعديل مشروع
const updateProject = async (id, data) => {
  const project = await Project.findByIdAndUpdate(id, data, { new: true }).populate("assignedTo");
  if (!project) throw new AppError("Project not found", 404);
  return project;
};

// حذف مشروع
const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new AppError("Project not found", 404);
  return { message: "Project deleted" };
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };