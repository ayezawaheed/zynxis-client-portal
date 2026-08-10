import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data.tasks);
      } catch (error) {
        console.error(
          "Tasks fetch failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">
          Tasks
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Manage your project tasks
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-bold text-slate-800">
                {task.title}
              </h2>

              <p className="text-slate-500 mt-2">
                {task.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Priority:</span>{" "}
                  {task.priority}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {task.status}
                </p>

                <p>
                  <span className="font-semibold">Due Date:</span>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;