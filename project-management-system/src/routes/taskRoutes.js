const express = require("express");


const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const protect = require("../middlewares/authMiddleware");
const checkApiKey = require("../middlewares/checkApiKey");

const router = express.Router();

router.get("/", checkApiKey, getTasks);
router.get("/:id", checkApiKey, getTaskById);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;