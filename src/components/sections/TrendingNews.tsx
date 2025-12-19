import React from "react";
import { defaultArticles } from "../../data/defaultArticles";
import TrendingBar from "../shared/TrendingBar";

const TrendingNews: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const trendingFlagged = articles.filter((a) => a.isTrending);
  const trending = trendingFlagged.length ? trendingFlagged.slice(0, 6) : articles.slice(0, 6);

  if (trending.length === 0) return null;

  return (
    <div className="lg:col-span-3 mt-8">
      <TrendingBar />
    </div>
  );
};

export default TrendingNews;
