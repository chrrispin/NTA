import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { fetchArticles } from "../services/api";

const Admin: React.FC = () => {
  const [stats, setStats] = useState({
    total: 0,
    live: 0,
    sections: 7,
  });

  useEffect(() => {
    const loadStats = async () => {
      const articles = await fetchArticles();
      setStats({
        total: articles.length,
        live: articles.filter((a) => a.is_live).length,
        sections: 7,
      });
    };
    loadStats();
  }, []);

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">📊 Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the NTA admin panel. Manage articles and content here.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Articles */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">📰 Total Articles</h3>
            <p className="text-4xl font-bold">{stats.total}</p>
            <p className="text-sm text-blue-100 mt-2">All time</p>
          </div>

          {/* Published Today */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">✅ Live Articles</h3>
            <p className="text-4xl font-bold">{stats.live}</p>
            <p className="text-sm text-green-100 mt-2">Currently active</p>
          </div>

          {/* Sections */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">🏷️ Sections</h3>
            <p className="text-4xl font-bold">{stats.sections}</p>
            <p className="text-sm text-purple-100 mt-2">news1 - news7</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">⚡ Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/articles/new"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center"
            >
              ✍️ Create New Article
            </Link>
            <Link
              to="/admin/articles"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center"
            >
              📋 View All Articles
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mt-8">
          <h3 className="font-bold text-blue-900 mb-2">💡 Admin Tips</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Click "Create New Article" to add a new article to the database</li>
            <li>• Use "View All Articles" to edit or delete existing articles</li>
            <li>• Articles marked as "Live" appear on the homepage</li>
            <li>• Add up to 3 sub-links (related articles) to each article</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
