import React, { useState, useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";
import { API_BASE_URL } from "../../services/api";

const VideoSpotlight: React.FC = () => {
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

  const videoSpotlightFlagged = articles.filter((a) => a.isVideoSpotlight);
  const videoSpotlight = videoSpotlightFlagged.length 
    ? videoSpotlightFlagged.slice(0, 3)
    : articles.filter((a) => a.subLinks?.some((s: any) => s.isVideo)).slice(0, 3);

  if (loading) {
    return (
      <div className="lg:col-span-3 mt-8">
        <div className="text-center py-8 text-gray-500">Loading video spotlight...</div>
      </div>
    );
  }

  if (videoSpotlight.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-8">
      <h2 className="text-xl font-bold mb-4">Video Spotlight</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {videoSpotlight.map((article) => (
          <div key={article.id} className="relative">
            <img src={article.image_url ?? PLACEHOLDER} alt={article.title} className="w-full h-48 object-cover rounded" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="bg-white/80 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                <i className="bi bi-play-fill"></i> Play
              </span>
            </div>
            <a href={`/article/${article.slug || article.id}`} className="font-semibold hover:text-blue-600 mt-2 block">
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSpotlight;
