import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../services/api";
import { Link } from 'react-router-dom';

interface Article {
  id: string | number;
  title: string;
  summary?: string;
  image_url?: string;
  slug?: string;
  section?: string;
}

const truncate = (text: string | undefined, maxLength: number): string => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength).trim() + '…' : text;
};

export default function SmallList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/articles`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Exclude news2, news3, and video (YouTube Trads) to avoid duplication with other sections
  const filtered = articles.filter((a) => !['news1', 'news2', 'news3', 'video'].includes(a.section || ''));

  // Split articles: first one is main, rest are side articles
  const allArticles = filtered.slice(0, 6);
  const mainArticle = allArticles[0];
  const sideArticles = allArticles.slice(1);

  if (loading) {
    return (
      <section className="space-y-3">
        <div className="text-center py-4 text-gray-500 text-sm">Loading articles...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-3">
        <div className="text-center py-4 text-red-500 text-sm">{error}</div>
      </section>
    );
  }
  
  if (!allArticles?.length) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Latest News</h3>
      
      {/* Responsive grid: main article on left (col-span-2), side articles on right (col-span-1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Article - Large Block */}
        {mainArticle && (
          <article className="md:col-span-2 space-y-3">
            <Link to={`/article/${mainArticle.slug || mainArticle.id}`} className="block">
              <img
                src={mainArticle.image_url ?? 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23e5e7eb\' width=\'400\' height=\'300\'/%3E%3C/svg%3E'}
                alt={mainArticle.title}
                className="w-full h-64 object-cover rounded hover:opacity-90 transition"
              />
            </Link>
            <h2 className="text-xl font-bold hover:text-blue-600 transition">
              <Link to={`/article/${mainArticle.slug || mainArticle.id}`}>
                {truncate(mainArticle.title, 45)}
              </Link>
            </h2>
            {mainArticle.summary && (
              <p className="text-sm text-gray-700 leading-relaxed">
                {truncate(mainArticle.summary, 90)}
              </p>
            )}
            <Link 
              to={`/article/${mainArticle.slug || mainArticle.id}`} 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition"
            >
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        )}

        {/* Side Articles - Smaller Blocks */}
        <aside className="md:col-span-1 space-y-4">
          {sideArticles.map((article) => (
            <article key={article.id} className="space-y-2">
              <div className="flex gap-3 items-start">
                <Link to={`/article/${article.slug || article.id}`} className="flex-shrink-0">
                  <img
                    src={article.image_url ?? 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\'%3E%3Crect fill=\'%23e5e7eb\' width=\'80\' height=\'80\'/%3E%3C/svg%3E'}
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded hover:opacity-90 transition"
                  />
                </Link>
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold hover:text-blue-600 transition leading-snug">
                      <Link to={`/article/${article.slug || article.id}`}>
                        {truncate(article.title, 30)}
                      </Link>
                    </h2>
                  </div>
              </div>
                {article.summary && (
                  <p className="text-xs text-gray-600 leading-relaxed w-full">
                    {truncate(article.summary, 80)}
                  </p>
                )}
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}
