const taskService = require("../services/taskService");
const asyncWrapper = require("../utils/asyncWrapper");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await taskService.getTasks();
  res.json({ status: "success", data: tasks });
});

const getTaskById = asyncWrapper(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  res.json({ status: "success", data: task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(201).json({ status: "success", data: task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json({ status: "success", data: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const result = await taskService.deleteTask(req.params.id);
  res.json({ status: "success", data: result });
});

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };