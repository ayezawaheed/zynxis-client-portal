const Project = require("../models/Project");

// CREATE Project
const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      client,
      assignedUsers,
      budget,
      deadline,
      status,
    } = req.body;

    if (!projectName || !client) {
      return res.status(400).json({
        success: false,
        message: "Project name and client are required",
      });
    }

    const project = await Project.create({
      projectName,
      description,
      client,
      assignedUsers,
      budget,
      deadline,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET All Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "client",
      "companyName contactPerson email"
    );

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};