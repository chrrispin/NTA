import { useState, useCallback, useRef, useEffect } from "react";
import { API_BASE_URL } from "../services/api";

interface UsePaginatedArticlesOptions {
  initialLimit?: number;
  section?: string;
  enableInfiniteScroll?: boolean;
}

export const usePaginatedArticles = ({
  initialLimit = 10,
  section,
  enableInfiniteScroll = false,
}: UsePaginatedArticlesOptions = {}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | undefined>(section);
  const observerTarget = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  const fetchArticles = useCallback(
    async (pageNum: number = 1, isLoadMore: boolean = false) => {
      // Prevent duplicate requests
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
          setError(null);
        }

        const params = new URLSearchParams({
          page: pageNum.toString(),
          limit: initialLimit.toString(),
        });

        if (selectedSection) {
          params.append("section", selectedSection);
        }

        const response = await fetch(`${API_BASE_URL}/articles?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response. Check if /api/articles endpoint exists.");
        }

        const data = await response.json();
        const newArticles = Array.isArray(data) ? data : data.articles || [];

        if (isLoadMore) {
          setArticles((prev) => [...prev, ...newArticles]);
        } else {
          setArticles(newArticles);
        }

        // Check if there are more articles
        setHasMore(newArticles.length === initialLimit);
        setPage(pageNum);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to fetch articles";
        setError(errorMsg);
        console.error("Error fetching articles:", err);
      } finally {
        if (isLoadMore) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
        isFetchingRef.current = false;
      }
    },
    [initialLimit, selectedSection]
  );

  const loadMore = useCallback(async () => {
    if (!loadingMore && hasMore) {
      await fetchArticles(page + 1, true);
    }
  }, [page, loadingMore, hasMore, fetchArticles]);

  const filterBySection = useCallback(
    async (newSection: string | undefined) => {
      setSelectedSection(newSection);
      await fetchArticles(1, false);
    },
    [fetchArticles]
  );

  // Infinite scroll setup
  useEffect(() => {
    if (!enableInfiniteScroll || !observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loadingMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [enableInfiniteScroll, hasMore, loadingMore, loading, loadMore]);

  return {
    articles,
    page,
    loading,
    loadingMore,
    error,
    hasMore,
    selectedSection,
    observerTarget,
    fetchArticles,
    loadMore,
    filterBySection,
    setArticles,
  };
};
