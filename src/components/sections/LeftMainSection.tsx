import React from "react";
import { Link } from "react-router-dom";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";
import BadgeLive from "../shared/BadgeLive";

const truncate = (text: string | undefined | null, len = 120) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

const LeftMainSection: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const news1 = articles.filter((a) => a.section === "news1");
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
            {news1[0].is_live && <BadgeLive />}
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
              {a.is_live && <BadgeLive />}
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
      <article className="SArticle space-y-3 text-green-500">
        {news1.slice(3).map((a) => (
          <div key={a.id} className="space-y-2">
            <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full h-150 md:w-170 rounded object-cover" />
            <a href="#" className="font-bold hover:underline block">
              {a.title}
            </a>
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
    </section>
  );
};

export default LeftMainSection;
