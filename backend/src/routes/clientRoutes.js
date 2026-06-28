const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getClients,
  createClient,
} = require("../controllers/clientController");

// Protected Route
router.get("/", protect, getClients);
router.post("/", protect, createClient);

module.exports = router;