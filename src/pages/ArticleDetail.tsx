import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticles, fetchArticleById } from '../services/api';
import { IoShareSocialOutline, IoBookmarkOutline, IoBookmark } from 'react-icons/io5';

type Article = {
  id: number;
  section: string;
  title: string;
  slug?: string;
  image_url?: string | null;
  summary?: string | null;
  content?: string | null;
  is_live?: boolean;
  media?: Array<{
    type: 'video' | 'image';
    url: string;
    caption?: string;
  }>;
  subLinks?: any[];
};

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        
        console.log('🔍 Loading article with slug/id:', slug);
        
        // 1) Try direct fetch using the slug param (works for numeric IDs too)
        if (slug) {
          const direct = await fetchArticleById(slug);
          console.log('📦 Direct fetch result:', direct);
          if (direct) {
            setArticle(direct);
            setError(null);
            checkIfSaved(direct.id);
            loadRelatedArticles(direct.section, direct.id);
            return;
          }
        }

        // 2) Fallback: fetch list and resolve slug to ID, then fetch full article
        const articles = await fetchArticles();
        const found = slug ? articles.find((a) => a.slug === slug || String(a.id) === slug) : undefined;

        if (found) {
          const fullArticle = await fetchArticleById(found.id);
          if (fullArticle) {
            setArticle(fullArticle);
            setError(null);
            checkIfSaved(fullArticle.id);
            loadRelatedArticles(fullArticle.section, fullArticle.id);
            return;
          }
        }

        setError('Article not found');
      } catch (err) {
        console.error('Failed to load article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  const loadRelatedArticles = async (section: string, currentArticleId: number) => {
    try {
      const articles = await fetchArticles({ section, limit: 4 });
      // Filter out current article and take first 3
      const related = articles
        .filter(a => a.id !== currentArticleId)
        .slice(0, 3);
      setRelatedArticles(related);
    } catch (err) {
      console.error('Failed to load related articles:', err);
    }
  };

  const checkIfSaved = (articleId: number) => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    setIsSaved(savedArticles.includes(articleId));
  };

  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.title,
      text: article.summary || article.title,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleSave = () => {
    if (!article) return;

    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    
    if (isSaved) {
      // Remove from saved
      const updated = savedArticles.filter((id: number) => id !== article.id);
      localStorage.setItem('savedArticles', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      // Add to saved
      savedArticles.push(article.id);
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      setIsSaved(true);
    }
  };

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
    <main className="px-4 py-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <i className="bi bi-arrow-left"></i>
        
      </button>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-5 md:p-12 flex flex-col gap-6">
          {/* Metadata */}
          <div className="order-1 flex items-center gap-4 text-sm text-gray-500">
            <span className="uppercase tracking-wide font-semibold text-gray-600">
              {/* {article.section} */}
            </span>
            {article.is_live && (
              <span className="flex items-center gap-1 text-red-600 font-semibold">
                <i className="bi bi-dot text-2xl -m-1"></i>
                LIVE
              </span>
            )}
          </div>

          {/* Title - Largest at the top */}
          <h1 className="order-2 text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>

          {/* Featured Image - Below title */}
          {article.image_url && (
            <div className="order-3 w-full rounded-lg overflow-hidden">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Summary */}
          {article.summary && (
            <p className="order-4 text-base md:text-2xl text-gray-700 leading-relaxed border-l-4 border-blue-600 pl-6 italic">
              {article.summary}
            </p>
          )}

          {/* Full Content - Below image */}
          {article.content && (
            <div className="order-5 prose-sm md:prose-lg lg:prose-xl max-w-none text-gray-800 leading-relaxed">
              <div
                className="space-y-4 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          )}

          {/* Additional Media Gallery */}
          {article.media && article.media.length > 0 && (
            <div className="order-6 mt-8 space-y-6">
              {article.media.map((item, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      controls
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.caption || `Media ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                  )}
                  {item.caption && (
                    <p className="mt-2 text-sm text-gray-600 italic text-center">
                      {item.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Share and Save buttons - Bottom left */}
          <div className="order-7 mt-4 pt-6 border-t border-gray-200 flex gap-3">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <IoShareSocialOutline size={20} />
              <span className="text-sm font-medium">Share</span>
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isSaved 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {isSaved ? <IoBookmark size={20} /> : <IoBookmarkOutline size={20} />}
              <span className="text-sm font-medium">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </article>

      {/* Related News Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            Related News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <div
                key={relatedArticle.id}
                onClick={() => navigate(`/article/${relatedArticle.slug || relatedArticle.id}`)}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {relatedArticle.image_url && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={relatedArticle.image_url}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    {relatedArticle.section}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mb-2">
                    {relatedArticle.title}
                  </h3>
                  {relatedArticle.summary && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedArticle.summary}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles - At the bottom */}
      {article.subLinks && article.subLinks.length > 0 && (
        <section className="mt-12 bg-gray-50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b-4 border-blue-600 pb-4">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {article.subLinks.map((link: any, index: number) => (
              <a
                key={link.id || index}
                href={link.url || '#'}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {link.image_url && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={link.image_url}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition line-clamp-3">
                    {link.title}
                  </h3>
                  {link.isVideo && (
                    <span className="inline-block mt-3 text-xs bg-red-600 text-white px-3 py-1 rounded">
                      <i className="bi bi-play-circle"></i> Video
                    </span>
                  )}
                  <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                    Read more
                    <i className="bi bi-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ArticleDetail;
