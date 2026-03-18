const taskService = require("../services/taskService");
const asyncWrapper = require("../utils/asyncWrapper");

// GET all tasks
const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await taskService.getTasks();
  res.json({ status: "success", data: tasks });
});

// GET single task
const getTaskById = asyncWrapper(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  res.json({ status: "success", data: task });
});

// CREATE task
const createTask = asyncWrapper(async (req, res) => {
  const task = await taskService.createTask(req.body);
  const io = req.app.get("io");
  io.emit("taskCreated", task);
  res.status(201).json({ status: "success", data: task });
});

// UPDATE task
const updateTask = asyncWrapper(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  const io = req.app.get("io");
  io.emit("taskUpdated", task);
  res.json({ status: "success", data: task });
});

// DELETE task
const deleteTask = asyncWrapper(async (req, res) => {
  const result = await taskService.deleteTask(req.params.id);
  const io = req.app.get("io");
  io.emit("taskDeleted", req.params.id);
  res.json({ status: "success", data: result });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};