import React, { useEffect, useState } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";
import { fetchArticles } from "../../services/api";

const isVideoUrl = (url?: string) =>
  !!url && (/^data:video\//.test(url) || /(\.mp4|\.webm|\.ogg)(\?|$)/i.test(url));

const VideoSection: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        setArticles(data || []);
      } catch (err) {
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const videos = articles.filter((a) => a.section === "video");

  if (loading) {
    return (
      <section id="video" className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center py-8 text-gray-500">Loading videos...</div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <section id="video" className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Latest Videos</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((a) => (
          <div key={a.id} className="bg-white rounded shadow overflow-hidden">
            <div className="aspect-video bg-black">
              {isVideoUrl(a.image_url) ? (
                <video src={a.image_url} controls className="w-full h-full object-contain" />
              ) : (
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-4">
              <div className="font-semibold text-lg">{a.title}</div>
              {a.summary && <div className="text-sm text-gray-600 mt-2">{a.summary}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
