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

// GET Project By ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("client", "companyName contactPerson email")
      .populate("assignedUsers", "fullName email role");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE Project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("client", "companyName contactPerson email")
      .populate("assignedUsers", "fullName email role");

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE Project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
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
  getProjectById,
  updateProject,
  deleteProject,
};