import React from "react";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";

const AudioCarousel: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const audioFlagged = articles.filter((a) => a.isAudioPick);
  const audioPicks = audioFlagged.length ? audioFlagged.slice(0, 8) : articles.slice(0, 8);

  if (audioPicks.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-10">
      <h2 className="text-xl font-bold mb-4">Best Audio of the Week</h2>
      <div className="flex gap-4 overflow-x-auto">
        {audioPicks.map((article) => (
          <div key={article.id} className="min-w-[240px] max-w-[260px]">
            <img src={article.image_url ?? PLACEHOLDER} alt={article.title} className="w-full h-44 object-cover rounded" />
            <a href={`/article/${article.slug || article.id}`} className="font-semibold hover:text-blue-600 mt-2 block">
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioCarousel;
