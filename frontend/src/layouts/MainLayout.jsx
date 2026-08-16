import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function MainLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white flex items-center justify-between px-4 py-4 md:hidden">
        <h1 className="text-xl font-bold">
          Zynxis
        </h1>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-xl p-2"
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          w-64
          bg-slate-900
          text-white
          min-h-screen
          p-6
          transform transition-transform duration-300
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">
            Zynxis
          </h1>

          <button
            onClick={closeSidebar}
            className="text-xl md:hidden"
            aria-label="Close navigation menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <FaTachometerAlt />
            Dashboard
          </Link>

          <Link
            to="/projects"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <FaProjectDiagram />
            Projects
          </Link>

          <Link
            to="/tasks"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <FaTasks />
            Tasks
          </Link>

          <Link
            to="/notifications"
            onClick={closeSidebar}
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

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;