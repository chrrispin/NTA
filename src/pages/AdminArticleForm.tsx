import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { createArticle, updateArticle, fetchArticleById, type ArticleInput } from "../services/api";

const AdminArticleForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ArticleInput>({
    section: "news1",
    title: "",
    slug: "",
    image_url: "",
    summary: "",
    is_live: false,
    subLinks: [
      { id: "1", title: "", url: "" },
      { id: "2", title: "", url: "" },
      { id: "3", title: "", url: "" },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      const loadArticle = async () => {
        const article = await fetchArticleById(id);
        if (article) {
          setFormData({
            ...article,
            subLinks: article.subLinks && article.subLinks.length > 0 
              ? article.subLinks 
              : [
                  { id: "1", title: "", url: "" },
                  { id: "2", title: "", url: "" },
                  { id: "3", title: "", url: "" },
                ],
          });
        }
      };
      loadArticle();
    }
  }, [isEditing, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubLinkChange = (index: number, field: string, value: string | boolean) => {
    const newSubLinks = [...(formData.subLinks || [])];
    newSubLinks[index] = { ...newSubLinks[index], [field]: value };
    setFormData((prev) => ({ ...prev, subLinks: newSubLinks }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setMessage("❌ Title is required");
      return;
    }
    if (!formData.section) {
      setMessage("❌ Section is required");
      return;
    }

    try {
      setLoading(true);
      
      // Filter out empty subLinks
      const filteredSubLinks = formData.subLinks?.filter(link => link.title.trim() !== "") || [];
      
      const articleData = {
        ...formData,
        subLinks: filteredSubLinks,
      };

      if (isEditing && id) {
        await updateArticle(id, articleData);
        setMessage("✅ Article updated successfully!");
      } else {
        await createArticle(articleData);
        setMessage("✅ Article created successfully!");
      }

      setTimeout(() => {
        navigate("/admin/articles");
      }, 1500);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error || error?.message || "Unknown error occurred";
      setMessage(`❌ Error saving article: ${errorMsg}`);
      console.error("Full error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">{isEditing ? "Edit Article" : "Create New Article"}</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
          {/* Title */}
          <div>
            <label className="block text-lg font-bold mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter article title"
              required
            />
          </div>

          {/* Section */}
          <div>
            <label className="block text-lg font-bold mb-2">Section *</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="news1">news1 - Main News</option>
              <option value="news2">news2 - Secondary</option>
              <option value="news3">news3 - Features</option>
              <option value="news4">news4 - Featured</option>
              <option value="news5">news5 - Sports</option>
              <option value="news6">news6 - Politics</option>
              <option value="news7">news7 - Photos</option>
            </select>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-lg font-bold mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="article-slug"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-lg font-bold mb-2">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="https://..."
            />
            {formData.image_url && (
              <div className="mt-2">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="max-h-32 rounded" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }} 
                />
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="block text-lg font-bold mb-2">Summary</label>
            <textarea
              name="summary"
              value={formData.summary || ""}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Brief article summary..."
            />
          </div>

          {/* Is Live */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_live"
                checked={formData.is_live || false}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
              <span className="text-lg font-bold">🔴 Live (Show on homepage)</span>
            </label>
          </div>

          {/* Sub Links */}
          <div>
            <label className="block text-lg font-bold mb-4">Sub Links (Related Articles)</label>
            <div className="space-y-4">
              {formData.subLinks?.map((link, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded space-y-3">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleSubLinkChange(index, "title", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder={`Sub-link ${index + 1} title`}
                  />
                  <input
                    type="text"
                    value={link.url || ""}
                    onChange={(e) => handleSubLinkChange(index, "url", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="URL (optional)"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={link.isVideo || false}
                      onChange={(e) => handleSubLinkChange(index, "isVideo", e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Is Video?</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "⏳ Saving..." : isEditing ? "💾 Update Article" : "✅ Create Article"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/articles")}
              className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition font-bold"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminArticleForm;
