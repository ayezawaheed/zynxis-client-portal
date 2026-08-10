import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(response.data.notifications);
      } catch (error) {
        console.error(
          "Notifications fetch failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">
          Notifications
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Your latest notifications
        </p>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-slate-500">
                No notifications available.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-xl shadow p-6 border-l-4 ${
                  notification.isRead
                    ? "border-slate-300"
                    : "border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-slate-800 font-medium">
                      {notification.message}
                    </p>

                    <p className="text-slate-500 text-sm mt-2">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  {!notification.isRead && (
                    <span className="text-sm font-semibold text-blue-600">
                      Unread
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;