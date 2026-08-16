import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/DataTable";

function Projects() {
  const fetchProjects = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.projects;
  };

  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const columns = [
  {
    key: "projectName",
    label: "Project",
  },
  {
    key: "client",
    label: "Client",
    render: (project) =>
      project.client?.companyName || "N/A",
  },
  {
    key: "budget",
    label: "Budget",
    render: (project) =>
      project.budget !== undefined && project.budget !== null
        ? `$${project.budget}`
        : "N/A",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "deadline",
    label: "Deadline",
    render: (project) =>
      project.deadline
        ? new Date(project.deadline).toLocaleDateString()
        : "N/A",
  },
];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Projects
          </h1>

          <p className="text-slate-500 mt-2">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">
            Projects
          </h1>

          <p className="text-red-500 mt-2">
            Failed to load projects:{" "}
            {error.response?.data?.message || error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">
          Projects
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Manage your client projects
        </p>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-bold text-slate-800">
                {project.projectName}
              </h2>

              <p className="text-slate-500 mt-2">
                {project.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">
                    Client:
                  </span>{" "}
                  {project.client?.companyName || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">
                    Budget:
                  </span>{" "}
                  ${project.budget}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {project.status}
                </p>

                <p>
                  <span className="font-semibold">
                    Deadline:
                  </span>{" "}
                  {project.deadline
                    ? new Date(
                        project.deadline
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Project Overview */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Project Overview
          </h2>

          <DataTable
            columns={columns}
            data={projects}
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;