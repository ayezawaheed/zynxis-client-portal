const Client = require("../models/Client");

// GET all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE client
const createClient = async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      address,
      industry,
    } = req.body;

    if (!companyName || !contactPerson || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const client = await Client.create({
      companyName,
      contactPerson,
      email,
      phone,
      address,
      industry,
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      client,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getClients,
  createClient,
};