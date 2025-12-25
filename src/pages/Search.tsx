import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { defaultArticles, PLACEHOLDER } from "../data/defaultArticles";

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    return defaultArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        (article.summary &&
          article.summary.toLowerCase().includes(query.toLowerCase())) ||
        (article.category &&
          article.category.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-xl text-gray-600">
            {searchResults.length > 0
              ? `Found ${searchResults.length} article${searchResults.length !== 1 ? "s" : ""} for "${query}"`
              : `No articles found for "${query}"`}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.slug || `article-${article.id}`}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={article.image_url || PLACEHOLDER}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {article.category && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 line-clamp-2">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Try different search terms or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
