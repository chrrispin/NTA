import React, { useState, useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";

interface Article {
  id: string | number;
  title: string;
  image_url?: string;
  slug?: string;
  section: string;
  summary?: string;
  subLinks?: any[];
}

const VideoSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState<string | number | null>(null);

  const getEmbedInfo = (url?: string) => {
    if (!url) return null;
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (yt) {
      const id = yt[1];
      return {
        type: 'youtube' as const,
        src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&loop=1&playlist=${id}`,
      };
    }
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) {
      const id = vimeo[1];
      return {
        type: 'vimeo' as const,
        src: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&playsinline=1&background=0&loop=1&title=0&byline=0&portrait=0`,
      };
    }
    return null;
  };

  const renderPlayer = (video: Article, variant: 'main' | 'side') => {
    const embed = getEmbedInfo(video.image_url);
    const baseClass = variant === 'main' ? 'w-full h-80' : 'w-full h-40';

    if (embed) {
      return (
        <iframe
          key={`${variant}-embed-${video.id}`}
          src={embed.src}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={`${baseClass} object-cover`}
          title={video.title}
        />
      );
    }

    return (
      <video
        key={`${variant}-video-${video.id}`}
        autoPlay
        muted
        loop
        playsInline
        className={`${baseClass} object-cover`}
        poster={video.image_url ?? PLACEHOLDER}
      >
        <source src={video.image_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

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

  // Filter articles by "video" section
  const videos = articles.filter((a) => a.section === "video").slice(0, 3);

  const activeVideo = activeVideoId ? videos.find((v) => v.id === activeVideoId) : null;

  if (loading) {
    return (
      <div className="lg:col-span-2 mt-8">
        <div className="text-center py-8 text-gray-500">Loading videos...</div>
      </div>
    );
  }

  if (videos.length === 0) return null;

  // Get main video (first one)
  const mainVideo = videos[0];
  const sideVideos = videos.slice(1);

  return (
    <section id="video" className="lg:col-span-2 mt-8 space-y-6">
      <h2 className="text-xl font-bold">Videos</h2>

      {/* Main Video with Autoplay */}
      <article className="space-y-3">
        <div
          className="relative w-full bg-black rounded overflow-hidden group cursor-pointer"
          onClick={() => setActiveVideoId(mainVideo.id)}
        >
          {renderPlayer(mainVideo, 'main')}
        </div>

        <h3 className="text-lg font-bold hover:text-blue-600 transition">
          <a href={`/article/${mainVideo.slug || mainVideo.id}`}>
            {mainVideo.title}
          </a>
        </h3>
      </article>

      {/* Side Videos Grid */}
      {sideVideos.length > 0 && (
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sideVideos.map((video) => (
            <div
              key={video.id}
              className="relative group cursor-pointer rounded overflow-hidden"
              onClick={() => setActiveVideoId(video.id)}
            >
              <div className="group-hover:opacity-80 transition">
                {renderPlayer(video, 'side')}
              </div>
              <h4 className="font-semibold text-sm mt-2 hover:text-blue-600 transition">
                <a href={`/article/${video.slug || video.id}`}>
                  {video.title}
                </a>
              </h4>
            </div>
          ))}
        </article>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setActiveVideoId(null)}>
          <div
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 rounded-full p-2"
              onClick={() => setActiveVideoId(null)}
              aria-label="Close video"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
              {renderPlayer(activeVideo, 'main')}
            </div>
            <div className="p-4 text-white">
              <h3 className="text-lg font-semibold mb-2">{activeVideo.title}</h3>
              {activeVideo.summary && (
                <p className="text-sm text-gray-300">{activeVideo.summary}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
