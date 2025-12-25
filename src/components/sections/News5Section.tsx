import React, { useState, useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";
import { fetchArticles } from "../../services/api";

const News5Section: React.FC = () => {
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

  const news5 = articles.filter((a) => a.section === "news5");
  const isVideoUrl = (url?: string) =>
    !!url && (/^data:video\//.test(url) || /(\.mp4|\.webm|\.ogg)(\?|$)/i.test(url));
  
  if (loading) {
    return (
      <section id="news5" className="lg:col-span-3 mt-6 space-y-6">
        <div className="text-center py-8 text-gray-500">Loading articles...</div>
      </section>
    );
  }

  if (news5.length === 0) return null;

  return (
    <section id="news5" className="lg:col-span-3 mt-6 space-y-6">
      <article className="grid md:grid-cols-3 gap-6">
        {news5.map((a) => (
          <div key={a.id}>
            {isVideoUrl(a.image_url) ? (
              <video src={a.image_url} controls className="w-full rounded object-cover" />
            ) : (
              <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full rounded object-cover" />
            )}
            <a className="font-bold text-lg block mt-2 hover:underline" href="#">
              {a.title}
            </a>
          </div>
        ))}
      </article>
    </section>
  );
};

export default News5Section;
