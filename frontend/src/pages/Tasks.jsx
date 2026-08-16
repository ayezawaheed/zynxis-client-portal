import { useState } from "react";
import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import DataTable from "../components/DataTable";

function Tasks() {
  const [selectedFiles, setSelectedFiles] = useState({});

  const queryClient = useQueryClient();

  // Fetch tasks using React Query
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.tasks;
  };

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // File upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ taskId, file }) => {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      // Must match upload.single("attachment") in backend
      formData.append("attachment", file, file.name);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Upload failed with status ${response.status}`
        );
      }

      return data;
    },

    onSuccess: () => {
      alert("File uploaded successfully!");

      // Tell React Query that task data has changed
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      // Clear selected file
      setSelectedFiles({});
    },

    onError: (error) => {
      console.error("FILE UPLOAD ERROR:", error);

      alert(`File upload failed: ${error.message}`);
    },
  });

  const handleFileChange = (taskId, file) => {
    setSelectedFiles((previous) => ({
      ...previous,
      [taskId]: file,
    }));
  };

  const handleUpload = (taskId) => {
    const file = selectedFiles[taskId];

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    uploadMutation.mutate({
      taskId,
      file,
    });
  };

  const columns = [
    {
      key: "title",
      label: "Task",
    },
    {
      key: "project",
      label: "Project",
      render: (task) =>
        task.project?.projectName || "N/A",
    },
    {
      key: "priority",
      label: "Priority",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (task) =>
        task.dueDate
          ? new Date(
              task.dueDate
            ).toLocaleDateString()
          : "N/A",
    },
    {
      key: "attachment",
      label: "Attachment",
      render: (task) =>
        task.attachment ? (
          <span className="text-green-600 font-medium">
            Uploaded
          </span>
        ) : (
          <span className="text-slate-400">
            None
          </span>
        ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Tasks
          </h1>

          <p className="text-slate-500 mt-2">
            Loading tasks...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Tasks
          </h1>

          <p className="text-red-500 mt-2">
            Failed to load tasks:{" "}
            {error.response?.data?.message ||
              error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">
          Tasks
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Manage your project tasks
        </p>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
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
                  <span className="font-semibold">
                    Priority:
                  </span>{" "}
                  {task.priority}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {task.status}
                </p>

                <p>
                  <span className="font-semibold">
                    Due Date:
                  </span>{" "}
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                {/* Attachment */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="font-semibold mb-2">
                    Attachment
                  </p>

                  {task.attachment ? (
                    <div className="mb-3">
                      <p className="text-green-600 text-sm mb-2">
                        ✓ File uploaded
                      </p>

                      <a
                        href={`${import.meta.env.VITE_API_URL}/uploads/${task.attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Attachment
                      </a>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm mb-3">
                      No attachment
                    </p>
                  )}

                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(
                        task._id,
                        e.target.files[0]
                      )
                    }
                    className="block w-full text-sm text-slate-600 mb-3"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleUpload(task._id)
                    }
                    disabled={
                      uploadMutation.isPending
                    }
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    {uploadMutation.isPending
                      ? "Uploading..."
                      : "Upload Attachment"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Task Overview */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Task Overview
          </h2>

          <DataTable
            columns={columns}
            data={tasks}
          />
        </div>
      </div>
    </div>
  );
}

export default Tasks;