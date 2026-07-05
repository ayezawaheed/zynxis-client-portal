const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

router.get("/", protect, getClients);

router.post("/", protect, createClient);

router.get("/:id", protect, getClientById);

router.put("/:id", protect, updateClient);

router.delete("/:id", protect, deleteClient);

module.exports = router;