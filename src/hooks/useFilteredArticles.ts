import { useMemo } from "react";
import { defaultArticles } from "../data/defaultArticles";
import type { Article } from "../data/defaultArticles";

export const useFilteredArticles = (pageCategory?: string) => {
  return useMemo(() => {
    if (!pageCategory || pageCategory === "Home") {
      // Show all articles on Home page
      return defaultArticles;
    }
    // Show only articles tagged for the selected category
    return defaultArticles.filter(
      (article: Article) => article.category === pageCategory
    );
  }, [pageCategory]);
};
