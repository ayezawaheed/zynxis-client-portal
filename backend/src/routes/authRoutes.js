const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Admin only can register new users
router.post("/register", protect, authorizeRoles("admin"), registerUser);

// Anyone can login
router.post("/login", loginUser);

module.exports = router;