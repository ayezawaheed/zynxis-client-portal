import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaProjectDiagram, FaTasks, FaBell, FaSignOutAlt } from "react-icons/fa";

function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-10">
          Zynxis
        </h1>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <FaTachometerAlt />
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <FaProjectDiagram />
            Projects
          </Link>

          <Link
            to="/tasks"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <FaTasks />
            Tasks
          </Link>

          <Link
            to="/notifications"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <FaBell />
            Notifications
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 w-full mt-10"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;