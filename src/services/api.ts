// src/services/api.ts
import axios from 'axios';

export interface Article {
  id: number;
  section: string;
  category?: string;
  page?: string;
  title: string;
  slug?: string;
  image_url?: string | null;
  summary?: string | null;
  is_live?: boolean;
  subLinks?: any[];
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
  is_live?: boolean;
  subLinks?: any[];
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

export const fetchArticleById = async (id: string | number): Promise<Article | null> => {
  try {
    const response = await API.get<Article>(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
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
