// src/services/api.ts
import axios from 'axios';

export const API_BASE_URL = 'https://nta-backend-re6q.onrender.com/api';

export interface MediaItem {
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

export interface Article {
  id: number;
  section: string;
  category?: string;
  page?: string;
  title: string;
  slug?: string;
  image_url?: string | null;
  summary?: string | null;
  content?: string | null;
  is_live?: boolean;
  subLinks?: any[];
  media?: MediaItem[];
}

export interface ArticleInput {
  id?: number;
  section: string;
  category?: string;
  page?: string;
  title: string;
  slug?: string;
  image_url?: string | null;
  summary?: string | null;
  content?: string | null;
  is_live?: boolean;
  subLinks?: any[];
  media?: MediaItem[];
}

// Base URL of your backend
const API = axios.create({
  baseURL: 'https://nta-backend-re6q.onrender.com/api', // change this if your backend URL is different
});

export const fetchArticles = async (
  params?: { section?: string; page?: string; limit?: number; offset?: number }
): Promise<Article[]> => {
  try {
    const response = await API.get<{ articles: Article[] }>('/articles', { params }); // GET request to /api/articles
    // Backend returns { articles: [...], page, totalItems, ... }
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

// Handles both shapes: {id, title, ...} and {article: {...} | null}
// Also tries slug endpoint if direct ID fetch returns null
export const fetchArticleById = async (id: string | number): Promise<Article | null> => {
  try {
    // Try numeric ID first
    const response = await API.get(`/articles/${id}`);
    const data = response.data;

    if (!data) return null;

    // Backend returns { article: null } when not found; short-circuit
    if (data.article === null) {
      // If ID looks like a slug (contains hyphens), try slug endpoint
      if (String(id).includes('-')) {
        console.log('🔄 Retrying with slug endpoint:', id);
        const slugResponse = await API.get(`/articles/slug/${id}`);
        return slugResponse.data || null;
      }
      return null;
    }

    // If wrapped
    if (data.article) {
      return data.article as Article;
    }

    // If direct article object
    if (data.id || data.title) {
      return data as Article;
    }

    return null;
  } catch (error: any) {
    console.error('Error fetching article:', error);
    
    // If 404 or 500 and looks like a slug, try slug endpoint
    if (String(id).includes('-')) {
      try {
        console.log('🔄 Retrying with slug endpoint after error:', id);
        const slugResponse = await API.get(`/articles/slug/${id}`);
        return slugResponse.data || null;
      } catch (slugError) {
        console.error('Slug fetch also failed:', slugError);
        return null;
      }
    }
    
    return null;
  }
};

export const createArticle = async (article: ArticleInput): Promise<Article> => {
  const response = await API.post<Article>('/articles', article);
  return response.data;
};

export const updateArticle = async (id: string | number, article: Partial<ArticleInput>): Promise<void> => {
  await API.put(`/articles/${id}`, article);
};

export const deleteArticle = async (id: string | number): Promise<void> => {
  await API.delete(`/articles/${id}`);
};
