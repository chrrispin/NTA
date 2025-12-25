import React, { useState, useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";
import { API_BASE_URL } from "../../services/api";

const FeatureHighlights: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/articles`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const news1 = articles.filter((a) => a.section === "news1");
  const featureMosaic = news1.slice(0, 3);

  if (loading) {
    return (
      <div className="lg:col-span-3 mt-8">
        <div className="text-center py-8 text-gray-500">Loading feature highlights...</div>
      </div>
    );
  }

  if (featureMosaic.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-8">
      <h2 className="text-xl font-bold mb-4">Feature Highlights</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {featureMosaic.map((article) => (
          <div key={article.id}>
            <img src={article.image_url ?? PLACEHOLDER} alt={article.title} className="w-full h-48 object-cover rounded" />
            <a href={`/article/${article.slug || article.id}`} className="font-bold hover:text-blue-600 mt-2 block">
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
