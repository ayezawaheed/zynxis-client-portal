import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch dashboard statistics
  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.dashboard;
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.notifications;
  };

  // Dashboard query
  const {
    data: dashboard,
    isLoading: dashboardLoading,
    isError: dashboardError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  // Notifications query
  // Automatically refreshes every 5 seconds
  const {
    data: notifications = [],
    isLoading: notificationsLoading,
    isError: notificationsError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 5000,
  });

  const isLoading =
    dashboardLoading || notificationsLoading;

  const hasError =
    dashboardError || notificationsError;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-red-500 mt-2">
            Failed to load dashboard data.
          </p>
        </div>
      </div>
    );
  }

  // Count unread notifications
  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back, {user?.fullName || "User"}!
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Clients */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              Total Clients
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashboard?.totalClients ?? 0}
            </h2>
          </div>

          {/* Total Projects */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              Total Projects
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashboard?.totalProjects ?? 0}
            </h2>
          </div>

          {/* Total Tasks */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              Total Tasks
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {dashboard?.totalTasks ?? 0}
            </h2>
          </div>

          {/* Unread Notifications */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">
              Notifications
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {unreadNotifications}
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;