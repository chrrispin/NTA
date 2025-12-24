import React, { useState, useEffect } from "react";

const News7Section: React.FC = () => {
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

  const news7 = articles.filter((a) => a.section === "news7");
  
  if (loading) {
    return (
      <section id="news7" className="lg:col-span-3 mt-6 space-y-6">
        <div className="text-center py-8 text-gray-500">Loading articles...</div>
      </section>
    );
  }

  if (news7.length === 0) return null;

  return (
    <section id="news7" className="lg:col-span-3 mt-6 space-y-6">
      <h2 className="text-xl font-bold">Watch it</h2>
      <h3 className="text-lg font-semibold">Photos You Should See</h3>

      <article className="grid md:grid-cols-3 gap-6">
        {/* --- COLUMN 1 --- */}
        <div>
          <ul className="space-y-3">
            {news7.slice(0, 3).map((a) => (
              <li className="flex gap-3 items-center" key={a.id}>
                <img
                  src={a.image_url ?? 'https://media.cnn.com/api/v1/images/stellar/prod/221123145851-levon-biss-insects-card.jpg?c=16x9&q=h_270,w_480,c_fill'}
                  alt={a.title}
                  className="w-28 h-20 object-cover rounded"
                />
                <a href="#" className="hover:underline">
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- COLUMN 2 --- */}
        <div>
          <ul className="space-y-3">
            {news7.slice(3, 6).map((a) => (
              <li className="flex gap-3 items-center" key={a.id}>
                <img
                  src={a.image_url ?? "https://media.cnn.com/api/v1/images/stellar/prod/220517105501-saota-beyond-1.jpg?c=16x9&q=h_270,w_480,c_fill"}
                  alt={a.title}
                  className="w-28 h-20 object-cover rounded"
                />
                <a href="#" className="hover:underline">
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- COLUMN 3 (Paid Content or Ads) --- */}
        <div>
          <div className="bg-gray-50 p-4 rounded">Paid Content</div>
        </div>
      </article>
    </section>
  );
};

export default News7Section;
