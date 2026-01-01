import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../services/api";
import { Link } from "react-router-dom";
import { PLACEHOLDER } from "../../data/defaultArticles";
import BadgeLive from "../shared/BadgeLive";
import TradingYouTubeSection from "./TradingYouTubeSection";
import AfricanTrendsSection from "./AfricanTrendsSection";

interface SubLink {
  id: string | number;
  url?: string;
  title: string;
  isVideo?: boolean;
}

interface Article {
  id: string | number;
  slug?: string;
  title: string;
  summary?: string;
  image_url?: string;
  is_live?: boolean;
  section: string;
  subLinks?: SubLink[];
}

const truncate = (text: string | undefined | null, len = 120) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

const LeftMainSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/articles`);
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

  const news1 = articles.filter((a) => a.section === "news1");

  if (loading) {
    return (
      <section id="news1" className="lg:col-span-2 space-y-6">
        <div className="text-center py-12 text-gray-500">Loading articles...</div>
      </section>
    );
  }

  return (
    <section id="news1" className="lg:col-span-2 space-y-6">
        {news1.length > 0 && (
          <article className="space-y-3">
            <Link to={`/article/${news1[0].slug || news1[0].id}`} className="text-xl font-bold hover:text-blue-600 transition block">
              {news1[0].title}
            </Link>

            <div className="relative">
              <Link to={`/article/${news1[0].slug || news1[0].id}`} className="block">
                <img
                  src={news1[0].image_url ?? PLACEHOLDER}
                  className="w-full object-cover rounded hover:opacity-90 transition"
                  alt={news1[0].title}
                />
              </Link>
              {news1[0].is_live && news1[0].section !== 'video' && <BadgeLive />}
            </div>

            <Link to={`/article/${news1[0].slug || news1[0].id}`} className="text-lg font-bold block hover:text-blue-600 transition">
              {truncate(news1[0].summary, 220)}
            </Link>

            <Link to={`/article/${news1[0].slug || news1[0].id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>

            {news1[0].subLinks?.length ? (
              <ul className="list-disc pl-5 space-y-1 text-sm ">
                {news1[0].subLinks.map((s) => (
                  <li key={s.id}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener" className="hover:underline">
                        {s.isVideo && <i className="bi bi-play-circle text-red-600 pr-1" />} {s.title}
                      </a>
                    ) : (
                      <span>{s.isVideo && <i className="bi bi-play-circle text-red-600 pr-1" />} {s.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        )}

        {/* secondary two-column grid */}
        <article className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {news1.slice(1, 3).map((a) => (
          <div key={a.id} className="space-y-3">
            <div className="relative">
              <Link to={`/article/${a.slug || a.id}`} className="block">
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full rounded object-cover hover:opacity-90 transition" />
              </Link>
            </div>
            <Link to={`/article/${a.slug || a.id}`} className="font-bold hover:text-blue-600 transition block">
              {a.title}
            </Link>
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
            {a.subLinks?.length ? (
              <ul className="list-disc pl-5 text-sm space-y-1">
                {a.subLinks.map((s) => (
                  <li key={s.id}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener" className="hover:underline">
                        {s.title}
                      </a>
                    ) : (
                      <span>{s.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </article>

      {/* SArticle list / stacked items */}
      {/* <article className="SArticle space-y-3 text-green-500">
        {news1.slice(3).map((a) => (
          <div key={a.id} className="space-y-3">
            <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full h-150 md:w-170 rounded object-cover" />
            <a href="#" className="font-bold hover:underline block">
              {a.title}
            </a>
            {(a.summary || a.subLinks?.[0]?.title) && (
              <p className="text-sm text-gray-700">{truncate(a.summary ?? a.subLinks?.[0]?.title ?? "", 140)}</p>
            )}
            {a.subLinks?.length ? (
              <ul className="list-disc pl-5 text-sm space-y-1">
                {a.subLinks.map((s) => (
                  <li key={s.id}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener" className="hover:underline">
                        {s.title}
                      </a>
                    ) : (
                      <span>{s.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </article> */}

      <article className="SArticle space-y-4 text-green-500 ">
  {news1.length > 3 && (() => {
    const latest = news1[news1.length - 1];
    return (
      <div key={latest.id} className="flex flex-col gap-3 md:flex-row md:items-start">
        <img
          src={latest.image_url ?? PLACEHOLDER}
          alt={latest.title}
          className="w-full h-auto rounded object-cover md:w-60 md:h-50 md:flex-shrink-0"
        />
        <div className="space-y-2 w-full">
          <a href="#" className="font-bold hover:underline block">
            {latest.title}
          </a>
          {(latest.summary || latest.subLinks?.[0]?.title) && (
            <p className="text-sm text-gray-700">
              {truncate(latest.summary ?? latest.subLinks?.[0]?.title ?? "", 600)}
            </p>
          )}
          {latest.subLinks?.length ? (
            <ul className="list-disc pl-5 text-sm space-y-1">
              {latest.subLinks.map((s) => (
                <li key={s.id}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener" className="hover:underline">
                      {s.title}
                    </a>
                  ) : (
                    <span>{s.title}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    );
  })()}
</article>
      {/* <article className="SArticle space-y-4 text-green-500">
        {news1.slice(3).map((a) => (
          <div key={a.id} className="flex gap-4 items-start">
            <img
              src={a.image_url ?? PLACEHOLDER}
              alt={a.title}
              className="w-36 h-24 md:w-50 md:h-50 rounded object-cover flex-shrink-0"
            />
            <div className="space-y-2">
              <a href="#" className="font-bold hover:underline block mt-20">
                {a.title}
              </a>
              {(a.summary || a.subLinks?.[0]?.title) && (
                <p className=" text-sm text-gray-700">{truncate(a.summary ?? a.subLinks?.[0]?.title ?? "", 140)}</p>
              )}
              {a.subLinks?.length ? (
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {a.subLinks.map((s) => (
                    <li key={s.id}>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener" className="hover:underline">
                          {s.title}
                        </a>
                      ) : (
                        <span>{s.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </article> */}

      <TradingYouTubeSection />

      <AfricanTrendsSection />
    </section>
  );
};

export default LeftMainSection;
