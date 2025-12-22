import React, { useState, useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";

const AudioCarousel: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const audioFlagged = articles.filter((a) => a.isAudioPick);
  const audioPicks = audioFlagged.length ? audioFlagged.slice(0, 8) : articles.slice(0, 8);

  if (loading) {
    return (
      <div className="lg:col-span-3 mt-10">
        <div className="text-center py-8 text-gray-500">Loading audio picks...</div>
      </div>
    );
  }

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
