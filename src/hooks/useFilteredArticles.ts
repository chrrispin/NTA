import { useMemo } from "react";
import { defaultArticles } from "../data/defaultArticles";
import type { Article } from "../data/defaultArticles";

export const useFilteredArticles = (pageCategory?: string) => {
  return useMemo(() => {
    if (!pageCategory) {
      return defaultArticles;
    }
    return defaultArticles.filter((article: Article) => article.category === pageCategory);
  }, [pageCategory]);
};
