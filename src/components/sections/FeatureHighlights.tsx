import React from "react";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";

const FeatureHighlights: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const news1 = articles.filter((a) => a.section === "news1");
  const featureMosaic = news1.slice(0, 3);

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
