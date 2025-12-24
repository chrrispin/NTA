import React, { useEffect } from "react";
import { PLACEHOLDER } from "../../data/defaultArticles";
import { usePaginatedArticles } from "../../hooks/usePaginatedArticles";

const MoreNews: React.FC = () => {
  const { articles, loading, loadingMore, error, hasMore, observerTarget, fetchArticles, loadMore } =
    usePaginatedArticles({ initialLimit: 12, enableInfiniteScroll: true, section: "more_news" });

  useEffect(() => {
    fetchArticles(1, false);
  }, [fetchArticles]);

  if (loading) {
    return (
      <div className="lg:col-span-3 mt-10">
        <div className="text-center py-8 text-gray-500">Loading more news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:col-span-3 mt-10">
        <div className="text-center py-8 text-red-500">Error loading articles: {error}</div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-10">
      <h2 className="text-xl font-bold mb-4">More News</h2>
      <div className="grid md:grid-cols-6 gap-6">
        {articles.map((article) => (
          <div key={article.id}>
            <img src={article.image_url ?? PLACEHOLDER} alt={article.title} className="w-full h-32 object-cover rounded" />
            <a href={`/article/${article.slug || article.id}`} className="font-semibold hover:text-blue-600 mt-2 block text-sm">
              {article.title}
            </a>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Observer Target & Load More Button Fallback */}
      <div ref={observerTarget} className="flex justify-center mt-8">
        {hasMore && !loadingMore && (
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        )}
        {loadingMore && <div className="text-center text-gray-500">Loading more...</div>}
      </div>

      {error && (
        <div className="text-center mt-4 text-red-500 text-sm">
          Failed to load more articles
        </div>
      )}
    </div>
  );
};

export default MoreNews;
