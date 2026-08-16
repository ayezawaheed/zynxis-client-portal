const Client = require("../models/Client");
const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalClients,
      totalProjects,
      completedProjects,
      pendingProjects,
      inProgressProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
    ] = await Promise.all([
      Client.countDocuments(),

      Project.countDocuments(),
      Project.countDocuments({ status: "completed" }),
      Project.countDocuments({ status: "pending" }),
      Project.countDocuments({ status: "in progress" }),

      Task.countDocuments(),
      Task.countDocuments({ status: "completed" }),
      Task.countDocuments({ status: "todo" }),
      Task.countDocuments({ status: "in progress" }),
    ]);

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