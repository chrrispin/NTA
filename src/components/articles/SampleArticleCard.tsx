import React, { useState, useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";
import { fetchArticles } from "../../services/api";

type Props = {
  imageUrl?: string;
  title?: string;
  excerpt?: string;
  dateLabel?: string;
  articleIndex?: number;
};

const SampleArticleCard: React.FC<Props> = ({
  imageUrl,
  title,
  excerpt,
  dateLabel,
  articleIndex = 0,
}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        setArticles(data || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <section className="lg:col-span-3 max-w-3xl mx-auto mt-6">
        <div className="text-center py-12 text-gray-500">Loading article...</div>
      </section>
    );
  }

  const article = articles[articleIndex];
  if (!article) return null;

  const displayTitle = title ?? article.title;
  const displayExcerpt = excerpt ?? article.summary;
  const displayImage = imageUrl ?? article.image_url;
  const displayDate = dateLabel ?? new Date(article.created_at || Date.now()).toLocaleDateString();
  const isVideoUrl = (url?: string) =>
    !!url && (/^data:video\//.test(url) || /(\.mp4|\.webm|\.ogg)(\?|$)/i.test(url));
  return (
    <section className="lg:col-span-3 max-w-3xl mx-auto mt-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow overflow-hidden">
        {/* Image on the left */}
        <div className="md:w-1/3">
          {isVideoUrl(displayImage) ? (
            <video src={displayImage} controls className="w-full h-full object-cover" />
          ) : (
            <img src={displayImage ?? PLACEHOLDER} alt={displayTitle} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Content on the right */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 hover:underline">{displayTitle}</h2>
            <p className="mt-2 text-gray-600 text-sm">{displayExcerpt}</p>
          </div>
          <div className="mt-4 text-xs text-gray-500">{displayDate}</div>
        </div>
      </div>
    </section>
  );
};

export default SampleArticleCard;
