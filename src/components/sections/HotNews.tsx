import React from "react";
import { defaultArticles } from "../../data/defaultArticles";

const HotNews: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const news2 = articles.filter((a) => a.section === "news2");
  const news3 = articles.filter((a) => a.section === "news3");
  
  const hotFlagged = articles.filter((a) => a.isHot);
  const hotNews = hotFlagged.length ? hotFlagged.slice(0, 5) : [...news2, ...news3].slice(0, 5);

  if (hotNews.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-8">
      <h2 className="text-xl font-bold mb-4">Hot News</h2>
      <ul className="space-y-2">
        {hotNews.map((article) => (
          <li key={article.id} className="flex items-start gap-2">
            <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            <div>
              <a href={`/article/${article.slug || article.id}`} className="hover:text-blue-600 transition font-medium">
                {article.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotNews;
