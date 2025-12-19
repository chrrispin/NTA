import React from "react";
import { Link } from "react-router-dom";
import { defaultArticles } from "../../data/defaultArticles";

const truncate = (text: string | undefined | null, len = 120) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

const TrendingBar: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const title = "Trending Now";
  const maxItems = 6;
  const className = "";
  
  if (articles.length === 0) return null;

  const displayArticles = articles.slice(0, maxItems);

  return (
    <section className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-red-500 animate-pulse">
          <i className="bi bi-fire"></i>
        </span>
      </div>
      <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded border border-gray-200">
        {displayArticles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.slug || article.id}`}
            className="flex items-center gap-2 text-sm hover:text-blue-600 transition"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
            <span>{truncate(article.title, 80)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingBar;
