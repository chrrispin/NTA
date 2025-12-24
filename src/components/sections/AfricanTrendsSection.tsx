import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PLACEHOLDER } from "../../data/defaultArticles";

interface Article {
  id: string | number;
  title: string;
  summary?: string;
  image_url?: string;
  slug?: string;
  section?: string;
  created_at?: string;
}

const AfricanTrendsSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles?section=african-trends&limit=5");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const fetchedArticles = data.articles || [];
        // Sort by created_at date (newest first)
        const sortedArticles = fetchedArticles.sort((a: Article, b: Article) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="space-y-3">
        <div className="text-center py-3 text-gray-500 text-xs">Loading...</div>
      </section>
    );
  }

  if (!articles.length) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-base font-semibold text-green-500 text-xl font-bold">African Trends</h3>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id} className="space-y-2">
            {/* Title at the top */}
            <Link
              to={`/article/${article.slug || article.id}`}
              className="font-bold text-base hover:text-blue-600 transition block"
            >
              {article.title}
            </Link>

            {/* Image and Description Layout */}
            <div className="flex gap-4">
              {/* Image on the left */}
              <Link
                to={`/article/${article.slug || article.id}`}
                className="flex-shrink-0"
              >
                <img
                  src={article.image_url ?? PLACEHOLDER}
                  alt={article.title}
                  className="w-64 h-48 object-cover rounded hover:opacity-90 transition"
                />
              </Link>

              {/* Description on the right of image */}
              <div className="flex-1">
                {article.summary && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {article.summary}
                  </p>
                )}
              </div>
            </div>

            {/* Description continues below the image */}
            {article.summary && article.summary.length > 200 && (
              <div className="w-full">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {article.summary.slice(200)}
                </p>
              </div>
            )}

            <Link
              to={`/article/${article.slug || article.id}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition"
            >
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AfricanTrendsSection;
