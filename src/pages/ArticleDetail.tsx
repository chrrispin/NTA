import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticles } from '../services/api';

type Article = {
  id: number;
  section: string;
  title: string;
  slug?: string;
  image_url?: string | null;
  summary?: string | null;
  content?: string;
  is_live?: boolean;
  subLinks?: any[];
};

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const articles = await fetchArticles();
        
        // Try to find by slug or id
        const found = articles.find(
          (a) => a.slug === slug || a.id.toString() === slug
        );

        if (found) {
          setArticle(found);
          setError(null);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Failed to load article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-lg text-red-600">{error || 'Article not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <i className="bi bi-arrow-left"></i>
        Back
      </button>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Featured Image */}
        {article.image_url && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="uppercase tracking-wide font-semibold text-gray-600">
              {article.section}
            </span>
            {article.is_live && (
              <span className="flex items-center gap-1 text-red-600 font-semibold">
                <i className="bi bi-dot text-2xl -m-1"></i>
                LIVE
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="text-xl text-gray-700 mb-8 leading-relaxed border-l-4 border-blue-600 pl-4">
              {article.summary}
            </p>
          )}

          {/* Full Content */}
          <div className="prose prose-lg max-w-none text-gray-800 space-y-6">
            {article.content ? (
              <div
                className="leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="text-gray-600 italic">
                Full article content will appear here when published.
              </p>
            )}
          </div>

          {/* Related/SubLinks */}
          {article.subLinks && article.subLinks.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Related Articles
              </h3>
              <div className="space-y-4">
                {article.subLinks.map((link: any) => (
                  <a
                    key={link.id}
                    href="#"
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded hover:bg-gray-100 transition group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                        {link.title}
                      </p>
                      {link.isVideo && (
                        <span className="inline-block mt-2 text-xs bg-red-600 text-white px-3 py-1 rounded">
                          <i className="bi bi-play-circle"></i> Video
                        </span>
                      )}
                    </div>
                    <i className="bi bi-arrow-up-right text-gray-400 group-hover:text-blue-600 transition flex-shrink-0 mt-1"></i>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Share Section */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2">
          <i className="bi bi-share"></i> Share
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center gap-2">
          <i className="bi bi-bookmark"></i> Save
        </button>
      </div>
    </main>
  );
};

export default ArticleDetail;
