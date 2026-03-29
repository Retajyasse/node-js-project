const Task = require("../models/Tasks");
const AppError = require("../utils/AppError");

// GET all tasks
const getTasks = async () => {
  return await Task.find()
    .populate("project")
    .populate("assignedTo");
};

// GET task by ID
const getTaskById = async (id) => {
  const task = await Task.findById(id)
    .populate("project")
    .populate("assignedTo");

  if (!task) throw new AppError("Task not found", 404);
  return task;
};

// CREATE task
const createTask = async (data) => {
  const task = await Task.create(data);
  return task;
};

// UPDATE task
const updateTask = async (id, data) => {
  const task = await Task.findByIdAndUpdate(id, data, { new: true });

  if (!task) throw new AppError("Task not found", 404);
  return task;
};

// DELETE task
const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) throw new AppError("Task not found", 404);
  return { message: "Task deleted" };
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};