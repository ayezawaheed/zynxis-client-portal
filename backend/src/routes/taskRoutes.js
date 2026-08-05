const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  uploadAttachment,
} = require("../controllers/taskController");

// Everyone logged in
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);

// Admin only
router.post("/", protect, adminOnly, createTask);
router.put("/:id", protect, adminOnly, updateTask);
router.delete("/:id", protect, adminOnly, deleteTask);

router.post(
  "/:id/upload",
  protect,
  upload.single("attachment"),
  uploadAttachment
);

module.exports = router;