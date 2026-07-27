const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

// Everyone logged in can view clients
router.get("/", protect, getClients);

router.get("/:id", protect, getClientById);

// Admin & Manager can create/update clients
router.post("/", protect, authorizeRoles("admin", "manager"), createClient);

router.put("/:id", protect, authorizeRoles("admin", "manager"), updateClient);

// Only Admin can delete clients
router.delete("/:id", protect, authorizeRoles("admin"), deleteClient);

module.exports = router;