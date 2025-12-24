import React, { useState, useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";

const News5Section: React.FC = () => {
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
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const news5 = articles.filter((a) => a.section === "news5");
  
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
            <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full rounded object-cover" />
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
