import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../services/api";
import SmallList from "../articles/SmallList";
import SidebarImageList from "../articles/SidebarImageList";
import VideoSection from "./VideoSection";
import MiniLeftSection from "./MiniLeftSection";
import { PLACEHOLDER } from "../../data/defaultArticles";

interface SubLink {
  id: string;
  title: string;
  url?: string;
  image_url?: string;
}

interface Article {
  id: string;
  title: string;
  image_url?: string;
  section: string;
  isTrending?: boolean;
  summary?: string;
  subLinks?: SubLink[];
}

const truncate = (text: string | undefined | null, len = 120) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

const RightSidebar: React.FC = () => {
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
  const news2 = articles.filter((a) => a.section === "news2");
  const news3 = articles.filter((a) => a.section === "news3");
  const trendingFlagged = articles.filter((a) => a.isTrending);
  const trending = (trendingFlagged.length ? trendingFlagged : articles).slice(0, 6);

  if (loading) {
    return (
      <aside className="space-y-6">
        <div className="text-center py-8 text-gray-500">Loading articles...</div>
      </aside>
    );
  }

  return (
    <aside className="space-y-6">
      <section id="news2" className="space-y-4">
        {news2.map((a) => (
          <article className="SArticle" key={a.id}>
            <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full rounded object-cover" />
            <a href="#" className="font-bold block hover:underline mt-2">
              {a.title}
            </a>
            {a.subLinks && (
              <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
                {a.subLinks.map((s) => (
                  <li className="flex items-start gap-2" key={s.id}>
                    {/* small thumb for subLinks if possible - use placeholder */}
                    <img src={s.image_url ?? PLACEHOLDER} alt={s.title} className="w-16 h-10 object-cover rounded" />
                    <a href={s.url ?? "#"} className="hover:underline text-sm">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}

        {/* Fallback hero when news1 is empty to avoid blank left column */}
        {news1.length === 0 && (
          <article className="space-y-3">
            <a href="#" className="text-xl font-bold hover:underline block">
              Top Stories
            </a>
            <div className="grid md:grid-cols-2 gap-4">
              {(trending.length ? trending : articles.slice(0, 4)).map((a, idx) => (
                <div key={`fallback-${a.id}-${idx}`} className="space-y-2">
                  <img
                    src={a.image_url ?? PLACEHOLDER}
                    alt={a.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <a href="#" className="font-semibold block hover:underline">
                    {truncate(a.title, 110)}
                  </a>
                  {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 140)}</p>}
                </div>
              ))}
            </div>
          </article>
        )}
      </section>

      <MiniLeftSection />

      <section id="news3" className="space-y-4">
        {news3.map((a) => (
          <article className="SArticle" key={a.id}>
            <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full rounded object-cover" />
            <a href="#" className="font-bold block hover:underline mt-2">
              {a.title}
            </a>
            {a.subLinks && (
              <ul className="list-disc pl-5 text-sm mt-1">
                {a.subLinks.map((s) => (
                  <li className="flex items-start gap-2" key={s.id}>
                    <img src={s.image_url ?? PLACEHOLDER} alt={s.title} className="w-12 h-8 object-cover rounded" />
                    <a href={s.url ?? "#"} className="hover:underline text-sm">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      {/* Additional small blocks */}
      <SidebarImageList />
      <VideoSection />
      <SmallList />
      {/* <SmallList
        title="Photos You Should See"
        items={[
          { id: "p1", title: "Close-up images of insects", url: "#", image: null },
          { id: "p2", title: "Most delicious Turkish dishes", url: "#", image: null },
          { id: "p3", title: "'Flying Shark' photo changed this man's life", url: "#", image: null },
        ]}
      /> */}
    </aside>
  );
};

export default RightSidebar;
