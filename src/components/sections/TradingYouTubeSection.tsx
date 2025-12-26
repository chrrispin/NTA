import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../services/api";
import { Link } from "react-router-dom";

interface Article {
  id: string | number;
  title: string;
  summary?: string;
  image_url?: string;
  slug?: string;
  section?: string;
  created_at?: string;
  updated_at?: string;
}


// Extract YouTube video ID from URL
const getYouTubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  
  // Handle youtu.be short links (with or without query params)
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  
  // Handle youtube.com/watch?v= links (with or without list params)
  const longMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  
  // Handle youtube.com/embed/ links
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  
  // Handle v= anywhere in the URL
  const vMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (vMatch) return vMatch[1];
  
  return null;
};

const TradingYouTubeSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/articles?section=trading-youtube&limit=3`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const fetchedArticles = data.articles || [];
        // Sort by created_at date (newest first)
        const sortedArticles = fetchedArticles.sort((a: Article, b: Article) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA; // Newest first
        });
        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="space-y-3">
        <div className="text-center py-3 text-gray-500 text-xs">Loading...</div>
      </section>
    );
  }

  if (!articles.length) {
    return (
      <section className="space-y-4 min-h-[140px] bg-white border-b border-gray-200">
        <h3 className="text-base font-bold text-xl text-red-500">YouTube Trads</h3>
        {/* Optionally, add a placeholder or leave empty */}
      </section>
    );
  }

  // First article is featured, rest are in horizontal list
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);
  const featuredYoutubeId = getYouTubeId(featuredArticle.image_url);

  return (
    <section className="space-y-4 min-h-[140px] bg-white border-b border-gray-200">
      <h3 className="text-base font-bold text-xl text-red-500">YouTube Trads</h3>
      {/* Featured Video */}
      {featuredYoutubeId && (
        <article className="flex flex-col md:flex-row gap-4 items-start">
          {/* YouTube Video Player - Large Size with Autoplay */}
          <div className="w-full md:w-96">
            <div className="aspect-video rounded overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${featuredYoutubeId}?autoplay=1&mute=1`}
                title={featuredArticle.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Red Divider Line only on md+ */}
          <div className="hidden md:block w-1.5 bg-red-600 h-54 flex-shrink-0 rounded"></div>

          {/* Title and Description */}
          <div className="w-full md:flex-1 min-w-0 mt-2 md:mt-0">
            <Link
              to={`/article/${featuredArticle.slug || featuredArticle.id}`}
              className="font-semibold text-sm hover:text-blue-600 transition block leading-tight mb-2 text-center md:text-left"
            >
              {featuredArticle.title}
            </Link>
            {/* Show description only on md and up */}
            {featuredArticle.summary && (
              <p className="hidden md:block text-xs text-gray-600 leading-relaxed">
                {featuredArticle.summary}
              </p>
            )}
          </div>
        </article>
      )}

      {/* Horizontal List of Other Videos */}
      {otherArticles.length > 0 && (
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {otherArticles.map((article) => {
              const youtubeId = getYouTubeId(article.image_url);
              return youtubeId ? (
                <Link
                  key={article.id}
                  to={`/article/${article.slug || article.id}`}
                  className="flex-shrink-0 w-40 hover:opacity-80 transition"
                >
                  <div className="aspect-video rounded overflow-hidden bg-gray-200">
                    <img
                      src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xs font-semibold mt-1 line-clamp-2 leading-tight">
                    {article.title}
                  </h4>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default TradingYouTubeSection;
