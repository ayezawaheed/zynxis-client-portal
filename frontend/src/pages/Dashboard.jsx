import { useEffect, useState } from "react";
import axios from "axios";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dashboard, setDashboard] = useState(null);
  const [notifications, setNotifications] = useState([]);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data.dashboard);
      const notificationResponse = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/notifications`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

setNotifications(notificationResponse.data.notifications);
    } catch (error) {
      console.error(
        "Dashboard fetch failed:",
        error.response?.data || error.message
      );
    }
  };

  fetchDashboard();
}, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back, {user?.fullName || "User"}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              Total Clients
            </p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashboard?.totalClients ?? 0}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              Total Projects
            </p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashboard?.totalProjects ?? 0}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              Total Tasks
            </p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashboard?.totalTasks ?? 0}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
             Notifications
  </p>
  <h2 className="text-3xl font-bold text-slate-800 mt-2">
    {notifications.filter((notification) => !notification.isRead).length}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;