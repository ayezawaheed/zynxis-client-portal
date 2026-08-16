import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Notifications() {
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

 const {
  data: notifications = [],
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["notifications"],
  queryFn: fetchNotifications,
  refetchInterval: 5000,
});

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-slate-500 mt-2">
            Loading notifications...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-red-600 mt-4">
            Failed to load notifications:{" "}
            {error?.response?.data?.message || error.message}
          </p>
        </div>
      </div>
    );
  }

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