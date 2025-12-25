import { useMemo } from "react";
import { defaultArticles, Article } from "../data/defaultArticles";

export const useFilteredArticles = (pageCategory?: string) => {
  return useMemo(() => {
    if (!pageCategory) {
      return defaultArticles;
    }
    return defaultArticles.filter(article => article.pageCategory === pageCategory);
  }, [pageCategory]);
};
