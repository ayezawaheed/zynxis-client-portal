const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getClients,
  createClient,
  getClientById,
} = require("../controllers/clientController");

// Protected Route
router.get("/", protect, getClients);
router.post("/", protect, createClient);
router.get("/:id", protect, getClientById);

module.exports = router;