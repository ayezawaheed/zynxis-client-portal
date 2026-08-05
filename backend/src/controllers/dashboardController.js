const Client = require("../models/Client");
const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {
    // Clients
    const totalClients = await Client.countDocuments();

    // Projects
    const totalProjects = await Project.countDocuments();
    const completedProjects = await Project.countDocuments({
      status: "completed",
    });
    const pendingProjects = await Project.countDocuments({
      status: "pending",
    });
    const inProgressProjects = await Project.countDocuments({
      status: "in progress",
    });

    // Tasks
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({
      status: "completed",
    });
    const pendingTasks = await Task.countDocuments({
      status: "todo",
    });
    const inProgressTasks = await Task.countDocuments({
      status: "in progress",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalClients,

        totalProjects,
        completedProjects,
        pendingProjects,
        inProgressProjects,

        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};