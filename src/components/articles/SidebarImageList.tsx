import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../services/api";
import { Link } from 'react-router-dom';
import { PLACEHOLDER } from '../../data/defaultArticles';

interface Article {
  id: string | number;
  title: string;
  summary?: string;
  image_url?: string;
  slug?: string;
  section: string;
  created_at?: string;
}

const truncate = (text: string | undefined | null, len = 100) => {
  if (!text) return '';
  return text.length > len ? text.slice(0, len).trim() + '…' : text;
};

export default function SidebarImageList() {
  const [articles, setArticles] = useState<Article[]>([]);
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
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Combine news3 and news6, sort by latest first, show only 3
  const combinedArticles = articles
    .filter((a) => a.section === 'news3' || a.section === 'news6')
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA; // Latest first
    })
    .slice(0, 3);

  if (loading) {
    return (
      <section className="space-y-3">
        <div className="text-center py-4 text-gray-500 text-sm">Loading...</div>
      </section>
    );
  }

  if (!combinedArticles.length) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Latest News</h3>
      <ul className="space-y-3">
        {combinedArticles.map((article) => (
          <li key={article.id} className="flex gap-3 items-start">
            <Link to={`/article/${article.slug || article.id}`} className="block flex-shrink-0">
              <img
                src={article.image_url ?? PLACEHOLDER}
                alt={article.title}
                className="w-24 h-20 object-cover rounded hover:opacity-90 transition"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/article/${article.slug || article.id}`} className="font-semibold text-sm hover:text-blue-600 transition block line-clamp-2">
                {article.title}
              </Link>
              <p className="text-xs text-gray-600 mt-1">{truncate(article.summary, 80)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {article.section === 'news3' ? '📰 News 3' : '📌 Featured'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
