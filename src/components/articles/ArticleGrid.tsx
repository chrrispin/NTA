import React from "react";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";

const ArticleGrid: React.FC = () => {
  // Hardcoded values - change these directly in the code
  const title = "Latest News";
  const articles = defaultArticles;
  const variant: "default" | "featured" | "compact" | "video" | "audio" = "audio";
  const columns = 3;
  const showSeeMore = false;
  const className = "";

  if (articles.length === 0) return null;

  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    6: "md:grid-cols-6",
  }[columns];

  // Horizontal scroll for audio variant
  if (variant === "audio") {
    return (
      <section className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-wide">{title}</h2>
          {showSeeMore && (
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">
              See more
            </span>
          )}
        </div>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
            {articles.map((article) => (
              <div key={article.id} className="min-w-[240px] max-w-[260px]">
                <img src={article.image_url ?? PLACEHOLDER} alt={article.title} className="w-full h-44 object-cover rounded" />
                <a href={`/article/${article.slug || article.id}`} className="font-semibold hover:text-blue-600 mt-2 block">
                  {article.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Compact list layout
  if (variant === "compact") {
    return (
      <section className={`space-y-3 ${className}`}>
        <h2 className="text-xl font-bold">{title}</h2>
        <ul className="space-y-2">
          {articles.map((article) => (
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
      </section>
    );
  }

  // Grid layout for default, featured, and video variants
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {showSeeMore && (
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            See all
          </span>
        )}
      </div>
      <div className={`grid ${gridClass} gap-6`}>
        {articles.map((article, idx) => {
          // Make first item span 2 columns for featured variant
          const spanClass = variant === "featured" && idx === 0 ? "md:col-span-2" : "";
          return (
            <div key={article.id} className={spanClass}>
              <img src={article.image_url ?? PLACEHOLDER} alt={article.title} className="w-full h-48 object-cover rounded" />
              <a href={`/article/${article.slug || article.id}`} className="font-bold hover:text-blue-600 mt-2 block">
                {article.title}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArticleGrid;
