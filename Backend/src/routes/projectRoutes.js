const express = require("express");
const checkApiKey = require("../middlewares/checkApiKey");

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", checkApiKey, getProjects);
router.get("/:id", checkApiKey, getProjectById);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;