import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(response.data.projects);
      } catch (error) {
        console.error(
          "Projects fetch failed:",
          error.response?.data || error.message
        );
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">
          Projects
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Manage your client projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <span className="font-semibold">Client:</span>{" "}
                  {project.client?.companyName}
                </p>

                <p>
                  <span className="font-semibold">Budget:</span>{" "}
                  ${project.budget}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {project.status}
                </p>

                <p>
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;