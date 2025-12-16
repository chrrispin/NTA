import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { fetchArticles, deleteArticle, type Article } from "../services/api";

const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadArticles = async () => {
    setLoading(true);
    const data = await fetchArticles();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (deleteId === id) {
      try {
        await deleteArticle(id);
        alert("Article deleted successfully!");
        loadArticles(); // Refresh list
        setDeleteId(null);
      } catch (error) {
        alert("Failed to delete article");
        console.error(error);
      }
    } else {
      setDeleteId(id);
    }
  };

  const liveCount = articles.filter((a) => a.is_live).length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading articles...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📋 All Articles</h1>
            <p className="text-gray-600">Manage all published and draft articles</p>
          </div>
          <Link
            to="/admin/articles/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            ✍️ New Article
          </Link>
        </div>

        {/* Stats */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Total Articles</p>
            <p className="text-2xl font-bold text-slate-900">{articles.length}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Live Articles</p>
            <p className="text-2xl font-bold text-green-600">{liveCount}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Draft Articles</p>
            <p className="text-2xl font-bold text-orange-600">{articles.length - liveCount}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Sections</p>
            <p className="text-2xl font-bold text-blue-600">7</p>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Section</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">#{article.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {article.image_url && (
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-10 h-10 rounded object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/40";
                          }}
                        />
                      )}
                      <span className="font-medium text-gray-900">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.section}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded text-sm font-bold ${article.is_live ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                      {article.is_live ? "🔴 Live" : "⚪ Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/articles/${article.id}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className={`px-3 py-1 rounded text-sm transition font-bold ${
                          deleteId === article.id
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                        }`}
                      >
                        {deleteId === article.id ? "❌ Confirm?" : "🗑️ Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminArticles;
