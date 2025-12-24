import React, { useState, useEffect } from "react";
import TrendingBar from "../shared/TrendingBar";

const TrendingNews: React.FC = () => {
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

  const trendingFlagged = articles.filter((a) => a.isTrending);
  const trending = trendingFlagged.length ? trendingFlagged.slice(0, 6) : articles.slice(0, 6);

  if (loading) {
    return (
      <div className="lg:col-span-3 mt-8">
        <div className="text-center py-8 text-gray-500">Loading trending news...</div>
      </div>
    );
  }

  if (trending.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-8">
      <TrendingBar />
    </div>
  );
};

export default TrendingNews;
