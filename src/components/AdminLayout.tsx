import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-800 text-white transition-all duration-300 shadow-lg`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-2xl font-bold">📰 NTA Admin</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded transition"
            >
              {sidebarOpen ? "←" : "→"}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8">
          <Link
            to="/admin"
            className={`flex items-center gap-4 px-4 py-3 border-r-4 transition ${
              isActive("/admin") && !isActive("/admin/articles")
                ? "bg-blue-600 border-blue-400 text-white"
                : "border-transparent hover:bg-gray-700"
            }`}
          >
            <span className="text-xl">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/admin/articles"
            className={`flex items-center gap-4 px-4 py-3 border-r-4 transition ${
              isActive("/admin/articles")
                ? "bg-blue-600 border-blue-400 text-white"
                : "border-transparent hover:bg-gray-700"
            }`}
          >
            <span className="text-xl">📋</span>
            {sidebarOpen && <span>Articles</span>}
          </Link>

          <Link
            to="/admin/articles/new"
            className={`flex items-center gap-4 px-4 py-3 border-r-4 transition ${
              location.pathname === "/admin/articles/new"
                ? "bg-blue-600 border-blue-400 text-white"
                : "border-transparent hover:bg-gray-700"
            }`}
          >
            <span className="text-xl">✍️</span>
            {sidebarOpen && <span>New Article</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>

      {/* Right Panel - Admin Info */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Admin Panel</h3>
          <p className="text-sm text-gray-600">Logged in as</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl">👤</span>
            <span className="font-bold text-gray-800">Admin</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded transition"
          >
            <span className="text-xl">🏠</span>
            <span className="text-sm font-medium text-blue-900">Back to Site</span>
          </Link>

          <button className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 hover:bg-red-100 rounded transition">
            <span className="text-xl">🚪</span>
            <span className="text-sm font-bold text-red-700">Logout</span>
          </button>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-gray-500">NTA Admin Dashboard</p>
          <p className="text-xs text-gray-400 mt-1">Version 1.0.0</p>
        </div>
      </aside>
    </div>
  );
};

export default AdminLayout;
