import React from "react";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";

const VideoSpotlight: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const videoSpotlightFlagged = articles.filter((a) => a.isVideoSpotlight);
  const videoSpotlight = videoSpotlightFlagged.length 
    ? videoSpotlightFlagged.slice(0, 3)
    : articles.filter((a) => a.subLinks?.some((s) => s.isVideo)).slice(0, 3);

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
