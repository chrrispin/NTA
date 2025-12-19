import React from "react";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";

const MoreNews: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const moreNews = articles.slice(8, 20);

  if (moreNews.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-10">
      <h2 className="text-xl font-bold mb-4">More News</h2>
      <div className="grid md:grid-cols-6 gap-6">
        {moreNews.map((article) => (
          <div key={article.id}>
            <img src={article.image_url ?? PLACEHOLDER} alt={article.title} className="w-full h-32 object-cover rounded" />
            <a href={`/article/${article.slug || article.id}`} className="font-semibold hover:text-blue-600 mt-2 block text-sm">
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreNews;
