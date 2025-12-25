import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Article } from "../../data/defaultArticles";
import { defaultArticles } from "../../data/defaultArticles";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setIsSearching(true);
      // Filter articles based on title or summary
      const results = defaultArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          (article.summary &&
            article.summary.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results.slice(0, 8)); // Limit to 8 results
      setShowDropdown(true);
    } else {
      setIsSearching(false);
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  // Handle clicking on a search result
  const handleResultClick = (article: Article) => {
    const slug = article.slug || `article-${article.id}`;
    navigate(`/article/${slug}`);
    setSearchQuery("");
    setShowDropdown(false);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setIsSearchBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search box opens
  useEffect(() => {
    if (isSearchBoxOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchBoxOpen]);

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  // Handle search icon click
  const handleSearchIconClick = () => {
    setIsSearchBoxOpen(!isSearchBoxOpen);
    if (!isSearchBoxOpen) {
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full md:w-auto">
      {!isSearchBoxOpen ? (
        <button
          onClick={handleSearchIconClick}
          className="text-gray-600 hover:text-blue-600 transition p-2"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <form onSubmit={handleSearchSubmit} className="relative w-80">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowDropdown(true)}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <div className="absolute right-3 flex gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="text-gray-400 hover:text-blue-600 transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {searchResults.map((article) => (
                <button
                  key={article.id}
                  onClick={() => handleResultClick(article)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition flex gap-3"
                >
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-12 h-12 object-cover rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 hover:text-blue-600">
                      {article.title}
                    </h3>
                    {article.category && (
                      <p className="text-xs text-gray-500 mt-1">{article.category}</p>
                    )}
                  </div>
                </button>
              ))}
              {searchResults.length > 0 && (
                <button
                  onClick={handleSearchSubmit}
                  className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 font-medium transition"
                >
                  View all results for "{searchQuery}"
                </button>
              )}
            </div>
          )}

          {/* No results message */}
          {showDropdown && isSearching && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500 text-sm">
              No articles found for "{searchQuery}"
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SearchBar;
