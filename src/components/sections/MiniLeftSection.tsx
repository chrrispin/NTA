import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../services/api";
import { Link } from "react-router-dom";
import { PLACEHOLDER } from "../../data/defaultArticles";

interface Article {
  id: string | number;
  title: string;
  summary?: string;
  image_url?: string;
  slug?: string;
  section?: string;
}

const truncate = (text: string | undefined | null, len = 60) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

const MiniLeftSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/articles?section=mini-left&limit=4`);
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

  if (loading) {
    return (
      <section className="space-y-2">
        <div className="text-center py-3 text-gray-500 text-xs">Loading...</div>
      </section>
    );
  }

  if (!articles.length) return null;

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-bold text-xl text-red-500">E-News</h3>
      <div className="space-y-2">
        {articles.map((article) => (
          <article key={article.id} className="flex gap-2 items-start p-1 hover:bg-gray-50 rounded transition">
            <Link
              to={`/article/${article.slug || article.id}`}
              className="block flex-shrink-0"
            >
              <img
                src={article.image_url ?? PLACEHOLDER}
                alt={article.title}
                className="w-16 h-12 object-cover rounded hover:opacity-90 transition"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                to={`/article/${article.slug || article.id}`}
                className="font-semibold text-xs hover:text-blue-600 transition block line-clamp-2 leading-tight"
              >
                {truncate(article.title, 40)}
              </Link>
              {article.summary && (
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-tight">
                  {truncate(article.summary, 60)}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MiniLeftSection;
