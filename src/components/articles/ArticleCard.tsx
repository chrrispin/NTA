import React from "react";
import { Link } from "react-router-dom";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";
import BadgeLive from "../shared/BadgeLive";

const truncate = (text: string | undefined | null, len = 120) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

interface ArticleCardProps {
  variant?: "default" | "featured" | "compact" | "video" | "audio";
  className?: string;
  articleIndex?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ variant = "default", className = "", articleIndex = 0 }) => {
  // Hardcoded values - change these directly
  const article = defaultArticles[articleIndex];
  
  const { id, slug, title, summary, image_url, is_live } = article;
  const articleLink = `/article/${slug || id}`;

  // Featured variant (large card)
  if (variant === "featured") {
    return (
      <article className={`space-y-3 ${className}`}>
        <div className="relative">
          <Link to={articleLink}>
            <img
              src={image_url ?? PLACEHOLDER}
              alt={title}
              className="w-full h-full max-h-72 object-cover rounded hover:opacity-90 transition"
            />
          </Link>
          {is_live && <BadgeLive />}
        </div>
        <Link to={articleLink} className="font-bold text-lg hover:text-blue-600 transition block">
          {title}
        </Link>
        {summary && <p className="text-sm text-gray-700">{truncate(summary, 140)}</p>}
        <Link to={articleLink} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
          Read More <i className="bi bi-arrow-right"></i>
        </Link>
      </article>
    );
  }

  // Compact variant (list item)
  if (variant === "compact") {
    return (
      <article className={`flex items-start gap-2 ${className}`}>
        <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
        <div>
          <Link to={articleLink} className="hover:text-blue-600 transition font-medium">
            {title}
          </Link>
          {summary && <p className="text-xs text-gray-600">{truncate(summary, 110)}</p>}
        </div>
      </article>
    );
  }

  // Video variant
  if (variant === "video") {
    return (
      <article className={`relative overflow-hidden rounded shadow-sm ${className}`}>
        <Link to={articleLink}>
          <img src={image_url ?? PLACEHOLDER} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white/80 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
              <i className="bi bi-play-fill"></i> Play
            </span>
          </div>
        </Link>
        <div className="p-3 bg-white space-y-1">
          <Link to={articleLink} className="font-semibold hover:text-blue-600 transition block">
            {title}
          </Link>
          <p className="text-xs text-gray-600">{truncate(summary, 90)}</p>
        </div>
      </article>
    );
  }

  // Audio variant
  if (variant === "audio") {
    return (
      <article className={`snap-start min-w-[240px] max-w-[260px] bg-white border border-gray-100 rounded shadow-sm overflow-hidden ${className}`}>
        <div className="relative">
          <Link to={articleLink}>
            <img
              src={image_url ?? PLACEHOLDER}
              alt={title}
              className="w-full h-44 object-cover"
            />
          </Link>
          <span className="absolute bottom-2 right-2 bg-white/90 text-xs px-2 py-1 rounded shadow">
            <i className="bi bi-mic-fill"></i> Audio
          </span>
        </div>
        <div className="p-3 space-y-1">
          <p className="text-xs uppercase tracking-wide text-gray-500">The Global Story</p>
          <Link to={articleLink} className="font-semibold leading-snug hover:text-blue-600 transition block">
            {truncate(title, 80)}
          </Link>
          <p className="text-xs text-gray-600">
            <i className="bi bi-bookmark"></i> Save · 20 mins
          </p>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className={`space-y-2 ${className}`}>
      <div className="relative">
        <Link to={articleLink}>
          <img
            src={image_url ?? PLACEHOLDER}
            alt={title}
            className="w-full h-48 object-cover rounded hover:opacity-90 transition"
          />
        </Link>
        {is_live && <BadgeLive />}
      </div>
      <Link to={articleLink} className="font-bold text-lg hover:text-blue-600 transition block leading-snug">
        {truncate(title, 120)}
      </Link>
      {summary && <p className="text-sm text-gray-700 leading-relaxed">{truncate(summary, 160)}</p>}
      <Link to={articleLink} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
        Read More <i className="bi bi-arrow-right"></i>
      </Link>
    </article>
  );
};

export default ArticleCard;
