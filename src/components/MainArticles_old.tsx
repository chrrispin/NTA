import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SmallList from "./SmallList";
import { fetchArticles } from "../services/api";

type SubLink = {
  id: string | number;
  title: string;
  url?: string;
  isVideo?: boolean;
};

type Article = {
  id: number;
  section: string; // e.g. news1, news2, news3, news4, news5, news6, news7
  category?: string;
  title: string;
  slug?: string;
  image_url?: string | null;
  summary?: string | null;
  is_live?: boolean;
  subLinks?: SubLink[];
  // Flags to control curated placements
  isTrending?: boolean;
  isHot?: boolean;
  isVideoSpotlight?: boolean;
  isYoutubePick?: boolean;
  isAudioPick?: boolean;
  // Optional explicit role for "Across the Network"
  roleType?: "heading" | "generic" | "images" | "ads" | "live" | "focus" | "paragraph" | "link";
};

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23e5e7eb' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
  // const PLACEHOLDER = "https://via.placeholder.com/800x450?text=No+Image";
const defaultArticles: Article[] = [
  // news1 primary (large)
  {
    id: 1,
    section: "news1",
    category: "Hero",
    title:
      "Officials: Over 2,600 rescued from flooded Ukrainian-controlled areas of Kherson",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/97ff8560-8c09-4bfb-8d40-86f8ea671d18.jpg?c=16x9&q=h_720,w_1280,c_fill",
    summary:
      "Water level at the Nova Kakhovka reservoir ‘continues to decline,’ minister says, after collapse of major dam in southern Ukraine",
    is_live: true,
    isTrending: true,
    isHot: true,
    isVideoSpotlight: true,
    isYoutubePick: true,
    isAudioPick: true,
    roleType: "heading",
    subLinks: [
      { id: "1a", title: "Ukrainians in battered southern town hopeful about counter offensive" },
      { id: "1b", title: "Video shows Western donated equipment destroyed by Russia", isVideo: true },
      { id: "1c", title: "Analysis: What’s happening along the frontline? It’s too early to tell" },
    ],
  },

  // news1 secondary grid items
  {
    id: 2,
    section: "news1",
    title: "Trump’s chilling remarks reveal a deeper reality about the 2024 campaign",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230613205742-05-donald-trump-bedminster-061323.jpg?c=16x9&q=h_720,w_1280,c_fill",
    isTrending: true,
    isHot: true,
    isVideoSpotlight: true,
    roleType: "images",
    subLinks: [
      { id: "2a", title: "Takeaways from Trump’s historic court appearance" },
      { id: "2b", title: "Trump’s pit stop after his arrest was a key play. Here’s why", isVideo: true },
      { id: "2c", title: "Opinion: Trump’s case is a crucial test for justice in America" },
    ],
  },
  {
    id: 3,
    section: "news1",
    title: "A map in India’s new Parliament is making its neighbors nervous",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230531134142-india-new-parliament-house-building-0524.jpg?c=16x9&q=h_720,w_1280,c_fill",
    isTrending: true,
    roleType: "focus",
  },

  {
    id: 4,
    section: "news1",
    title: "Pittsburgh synagogue gunman found guilty on all 63 charges",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230615155632-01-pittsburgh-synagogue-trial-0615-bowers.jpg?c=16x9&q=h_438,w_780,c_fill",
    isTrending: true,
    roleType: "paragraph",
    subLinks: [
      { id: "4a", title: "Cyclist Gino Mäder dies aged 26 after high-speed Tour de Suisse crash" },
      { id: "4b", title: "Thousands of dead fish wash up on Thai beach" },
      { id: "4c", title: "Video shows key Russian supply bridge knocked out by missile", isVideo: true },
    ],
  },

  // news2 / sidebar items
  {
    id: 10,
    section: "news2",
    title: "What scientists say keeps mosquitoes at bay",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230622192324-01-how-repel-mosquitos-scientifically-wellness-scn.jpg?c=16x9&q=h_438,w_780,c_fill",
    isHot: true,
    roleType: "generic",
    subLinks: [
      { id: "10a", title: "Train derailment on Montana bridge sends multiple rail cars into the Yellowstone River" },
      { id: "10b", title: "Orca pod attacks Ocean Race boats" },
    ],
  },
  {
    id: 11,
    section: "news2",
    title: "‘Everybody loves Americans’: Why US tourists are a hot commodity",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230622161002-01-us-tourists-hot-commodity-restricted.jpg?c=16x9&q=h_438,w_780,c_fill",
    isHot: true,
    roleType: "link",
    subLinks: [
      { id: "11a", title: "These ordinary people became accidental stars thanks to this niche video genre" },
      { id: "11b", title: "This country is 99% water. But the 1% is paradise" },
    ],
  },

  // news3
  {
    id: 20,
    section: "news3",
    title: "This endangered bird has found a refuge among Hong Kong’s skyscrapers",
    image_url: "https://cdn.cnn.com/cnn/interactive/uploads/20230619-cockatoo_image_c.jpg",
    isHot: true,
    roleType: "images",
    subLinks: [
      { id: "20a", title: "Fox News shuffles prime-time lineup in wake of Tucker Carlson firing and sagging ratings" },
      { id: "20b", title: "Hollywood stars part of group taking 24% stake in F1 team" },
      { id: "20c", title: "Rent is falling in America for the first time in years" },
    ],
  },
  {
    id: 21,
    section: "news3",
    title: "Lost for decades, these 19th-century photo portraits tell a quietly radical love story",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230623142929-05-marie-heg-bolette-berg-untold-art-history.jpg?c=16x9&q=h_438,w_780,c_fill",
    roleType: "focus",
    subLinks: [
      { id: "21a", title: "Curious whale follows kayak as Australia revels in bumper annual humpback count", isVideo: true },
      { id: "21b", title: "Jacquemus’ Versailles show was an ode to Princess Diana" },
    ],
  },

  // featured / news4
  {
    id: 30,
    section: "news4",
    title: "Live updates on a huge day for the US economy: Housing, GDP, jobs and Bidenomics",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230627152404-nyse-file-0609.jpg?c=16x9&q=h_438,w_780,c_fill",
    is_live: true,
    isYoutubePick: true,
    roleType: "live",
    subLinks: [
      { id: "30a", title: "Flight problems mostly over — except at United" },
      { id: "30b", title: "The Fed is secretly stress testing the US economy against nightmare scenarios" },
    ],
  },

  {
    id: 31,
    section: "news4",
    title: "The world’s biggest cruise ship is almost ready",
    image_url:
      "https://media.cnn.com/api/v1/images/stellar/prod/230627100639-icon-of-the-sea-card.jpg?c=16x9&q=h_438,w_780,c_fill",
    isYoutubePick: true,
    roleType: "ads",
  },

  // news5/news6/news7 small sets - use placeholders where appropriate
  { id: 40, section: "news5", title: "Caroline Wozniacki plans return to tennis at US Open", image_url: null },
  { id: 41, section: "news5", title: "Archaeologists find a 3,000-year-old sword so well preserved it’s still gleaming", image_url: null },
  { id: 50, section: "news6", title: "Rep. Alexandria Ocasio-Cortez supports Biden’s reelection bid", image_url: null },
  { id: 60, section: "news7", title: "Photos You Should See", image_url: null, isAudioPick: true },
];

const truncate = (text: string | undefined | null, len = 120) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

const BadgeLive: React.FC = () => (
  <div className="absolute bottom-0 left-0 bg-white flex items-center justify-between p-1.5 w-32">
    <i className="bi bi-dot text-red-600 text-3xl -m-3" />
    <b className="text-xs">LIVE UPDATES</b>
  </div>
);
const MainArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        // Use backend data if we have 5+ articles, otherwise use defaults
        if (data && data.length >= 5) {
          setArticles(data);
        } else {
          setArticles(defaultArticles);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to load articles:", err);
        setArticles(defaultArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <main className="px-4 py-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading articles...</p>
        </div>
      </main>
    );
  }

  const news1 = articles.filter((a) => a.section === "news1");
  const news2 = articles.filter((a) => a.section === "news2");
  const news3 = articles.filter((a) => a.section === "news3");
  const news4 = articles.filter((a) => a.section === "news4");
  const news5 = articles.filter((a) => a.section === "news5");
  const news6 = articles.filter((a) => a.section === "news6");
  const news7 = articles.filter((a) => a.section === "news7");
  const trendingFlagged = articles.filter((a) => a.isTrending);
  const trending = (trendingFlagged.length ? trendingFlagged : articles).slice(0, 6);

  const hotFlagged = articles.filter((a) => a.isHot);
  const hotNews = (hotFlagged.length ? hotFlagged : [...news2, ...news3]).slice(0, 5);

  const videoSpotlightFlagged = articles.filter((a) => a.isVideoSpotlight);
  const videoSpotlight = (videoSpotlightFlagged.length
    ? videoSpotlightFlagged
    : articles.filter((a) => a.subLinks?.some((s) => s.isVideo))
  ).slice(0, 3);

  const youtubeFlagged = articles.filter((a) => a.isYoutubePick);
  const youtubePicks = (youtubeFlagged.length ? youtubeFlagged : news4.length ? news4 : articles).slice(0, 3);
  const featureMosaic = news1.slice(0, 3);
  const roleItemsFlagged = articles.filter((a) => a.roleType);
  const roleItems = (roleItemsFlagged.length ? roleItemsFlagged : articles.length ? articles : defaultArticles).slice(0, 8);
  const roleTypes = ["heading", "generic", "images", "ads", "live", "focus", "paragraph", "link"];

  const audioFlagged = articles.filter((a) => a.isAudioPick);
  const audioPicks = (audioFlagged.length ? audioFlagged : articles.length ? articles : defaultArticles).slice(0, 8);
  const moreNews = (articles.length ? articles : defaultArticles).slice(8, 20);

  const renderRoleCard = (a: Article, role: string, idx: number) => {
    const sizeClass = idx % 4 === 0 ? "md:col-span-2" : "";
    switch (role) {
      case "heading":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <Link to={`/article/${a.slug || a.id}`} className="text-2xl font-bold leading-tight hover:text-blue-600 transition block">
              {a.title}
            </Link>
            {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 150)}</p>}
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition mt-2">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "images":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <div className="relative">
              <Link to={`/article/${a.slug || a.id}`} className="block">
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full h-56 object-cover rounded hover:opacity-90 transition" />
              </Link>
              {a.is_live && <BadgeLive />}
            </div>
            <Link to={`/article/${a.slug || a.id}`} className="font-semibold hover:text-blue-600 transition block">
              {a.title}
            </Link>
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "ads":
        return (
          <article className={`bg-gray-100 border border-gray-200 rounded p-6 shadow-inner ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Sponsored</p>
            <h3 className="text-lg font-bold mb-1">Premium Placement</h3>
            <p className="text-sm text-gray-700">Advertise your brand here with a high-visibility mid-page slot.</p>
          </article>
        );
      case "live":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <div className="relative overflow-hidden rounded" style={{ paddingBottom: "56.25%" }}>
              <iframe
                title="Live stream"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <Link to={`/article/${a.slug || a.id}`} className="font-semibold hover:text-blue-600 transition block">
              Live Stream: {a.title}
            </Link>
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "focus":
        return (
          <article className={`space-y-2 border-l-4 border-red-500 pl-3 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <p className="text-xs uppercase tracking-wide text-red-600">Focus</p>
            <Link to={`/article/${a.slug || a.id}`} className="font-bold text-lg hover:text-blue-600 transition block">
              {a.title}
            </Link>
            {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 130)}</p>}
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "paragraph":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <h4 className="font-semibold text-sm text-gray-500">Analysis</h4>
            <p className="text-sm text-gray-800 leading-relaxed">{truncate(a.summary, 220) || truncate(a.title, 220)}</p>
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "link":
        return (
          <article className={`space-y-1 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <Link to={`/article/${a.slug || a.id}`} className="text-base font-semibold hover:text-blue-600 transition">
              {a.title}
            </Link>
            <Link to={`/article/${a.slug || a.id}`} className="text-sm text-blue-600 hover:text-blue-800 transition inline-flex items-center gap-1">
              Full story <i className="bi bi-arrow-up-right" />
            </Link>
          </article>
        );
      default:
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <Link to={`/article/${a.slug || a.id}`} className="font-semibold hover:text-blue-600 transition block">
              {a.title}
            </Link>
            {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 110)}</p>}
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
    }
  };

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto grid gap-6 grid-cols-1 lg:grid-cols-3">
      {error && (
        <div className="lg:col-span-3 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded">
          {error}
        </div>
      )}
      {/* Left - main articles wide */}
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
              <ul className="list-disc pl-5 space-y-1 text-sm">
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
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <article className="SArticle space-y-3">
          {news1.slice(3).map((a) => (
            <div key={a.id} className="space-y-2">
              <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full md:w-1/2 rounded object-cover" />
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

      {/* Right - side columns */}
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
                      <img src={PLACEHOLDER} alt={s.title} className="w-16 h-10 object-cover rounded" />
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
                {(trending.length ? trending : defaultArticles.slice(0, 4)).map((a, idx) => (
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
                      <img src={PLACEHOLDER} alt={s.title} className="w-12 h-8 object-cover rounded" />
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
        <SmallList
          title="Watch it"
          items={[
            { id: "w1", title: "Alligator chases fisherman", url: "#", image: null },
            { id: "w2", title: "Orca pod attacks Ocean Race boats", url: "#", image: null },
          ]}
        />
        <SmallList
          title="Photos You Should See"
          items={[
            { id: "p1", title: "Close-up images of insects", url: "#", image: null },
            { id: "p2", title: "Most delicious Turkish dishes", url: "#", image: null },
            { id: "p3", title: "'Flying Shark' photo changed this man's life", url: "#", image: null },
          ]}
        />
      </aside>

      {/* featured / lower sections spanning full width */}
      <section id="news4" className="lg:col-span-3 mt-6 space-y-6">
        <h2 className="text-xl font-bold">Featured Sections</h2>

        <article className="grid md:grid-cols-3 gap-6">
          {news4.map((a) => (
            <div key={a.id} className="relative">
              <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="rounded object-cover w-full" />
              {a.is_live && <BadgeLive />}
              <a href="#" className="font-bold block hover:underline mt-2">
                {a.title}
              </a>
              {a.subLinks && (
                <ul className="list-disc pl-5 text-sm mt-2">
                  {a.subLinks.map((s) => (
                    <li key={s.id}>
                      <a href={s.url ?? "#"} className="hover:underline">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>
      </section>

      {/* news5, news6, news7 are similar - render simple grids or lists dynamically */}
      {news5.length > 0 && (
        <section id="news5" className="lg:col-span-3 mt-6 space-y-6">
          <article className="grid md:grid-cols-3 gap-6">
            {news5.map((a) => (
              <div key={a.id}>
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full rounded object-cover" />
                <a className="font-bold text-lg block mt-2 hover:underline" href="#">
                  {a.title}
                </a>
              </div>
            ))}
          </article>
        </section>
      )}

      {news6.length > 0 && (
        <section id="news6" className="lg:col-span-3 mt-6 space-y-6">
          <article className="grid md:grid-cols-3 gap-6">
            {news6.map((a) => (
              <div key={a.id}>
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full rounded object-cover" />
                <a href="#" className="font-bold block mt-2 hover:underline">
                  {a.title}
                </a>
              </div>
            ))}
          </article>
        </section>
      )}

      {news7.length > 0 && (
  <section id="news7" className="lg:col-span-3 mt-6 space-y-6">
    <h2 className="text-xl font-bold">Watch it</h2>
    <h3 className="text-lg font-semibold">Photos You Should See</h3>

    <article className="grid md:grid-cols-3 gap-6">
      
      {/* --- COLUMN 1 --- */}
      <div>
        <ul className="space-y-3">
          {news7.slice(0, 3).map((a) => (
            <li className="flex gap-3 items-center" key={a.id}>
              <img
                src={a.image_url ?? 'https://media.cnn.com/api/v1/images/stellar/prod/221123145851-levon-biss-insects-card.jpg?c=16x9&q=h_270,w_480,c_fill'}
                alt={a.title}
                className="w-28 h-20 object-cover rounded"
              />
              <a href="#" className="hover:underline">
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* --- COLUMN 2 --- */}
      <div>
        <ul className="space-y-3">
          {news7.slice(3, 6).map((a) => (
            <li className="flex gap-3 items-center" key={a.id}>
              <img
                src={a.image_url ?? "https://media.cnn.com/api/v1/images/stellar/prod/220517105501-saota-beyond-1.jpg?c=16x9&q=h_270,w_480,c_fill"}
                alt={a.title}
                className="w-28 h-20 object-cover rounded"
              />
              <a href="#" className="hover:underline">
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* --- COLUMN 3 (Paid Content or Ads) --- */}
      <div>
        <div className="bg-gray-50 p-4 rounded">Paid Content</div>
      </div>

    </article>
  </section>
)}

      {/* Feature mosaic with mixed sizes */}
      {featureMosaic.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-4">
          <h2 className="text-xl font-bold">Feature Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featureMosaic.map((a, idx) => (
              <div
                key={a.id}
                className={idx === 0 ? "md:col-span-2 space-y-3" : "space-y-2"}
              >
                <div className="relative">
                  <img
                    src={a.image_url ?? PLACEHOLDER}
                    alt={a.title}
                    className="w-full h-full max-h-72 object-cover rounded"
                  />
                  {a.is_live && <BadgeLive />}
                </div>
                <a href="#" className="font-bold text-lg hover:underline block">
                  {a.title}
                </a>
                {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 140)}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trending hot news ticker */}
      {trending.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-2">
          <h2 className="text-xl font-bold">Trending Now</h2>
          <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded">
            {trending.map((a) => (
              <a key={a.id} href="#" className="flex items-center gap-2 text-sm hover:underline">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                {truncate(a.title, 80)}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Video spotlight block */}
      {videoSpotlight.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-4">
          <h2 className="text-xl font-bold">Video Spotlight</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {videoSpotlight.map((a) => (
              <div key={a.id} className="relative overflow-hidden rounded shadow-sm">
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="bg-white/80 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">Play</span>
                </div>
                <div className="p-3 bg-white space-y-1">
                  <a href="#" className="font-semibold hover:underline block">
                    {a.title}
                  </a>
                  <p className="text-xs text-gray-600">{truncate(a.summary, 90)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hot news vertical list */}
      {hotNews.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-3">
          <h2 className="text-xl font-bold">Hot News</h2>
          <ul className="space-y-2">
            {hotNews.map((a) => (
              <li key={a.id} className="flex items-start gap-2">
                <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <a href="#" className="hover:underline font-medium">
                    {a.title}
                  </a>
                  {a.summary && <p className="text-xs text-gray-600">{truncate(a.summary, 110)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* YouTube / external video picks */}
      {youtubePicks.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-4">
          <h2 className="text-xl font-bold">YouTube Picks</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {youtubePicks.map((a) => (
              <div key={a.id} className="flex gap-3 items-start bg-gray-50 p-3 rounded">
                <img
                  src={a.image_url ?? PLACEHOLDER}
                  alt={a.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="space-y-1">
                  <a href="#" className="hover:underline font-semibold text-sm">
                    {a.title}
                  </a>
                  <p className="text-xs text-gray-600">{truncate(a.summary, 80)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Audio strip similar to BBC/CNN rows */}
      {audioPicks.length > 0 && (
        <section className="lg:col-span-3 mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wide">Best Audio of the Week</h2>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <span className="bg-gray-100 px-2 py-1 rounded">See more</span>
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {audioPicks.map((a, idx) => (
                <article
                  key={`audio-${a.id}-${idx}`}
                  className="snap-start min-w-[240px] max-w-[260px] bg-white border border-gray-100 rounded shadow-sm overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={a.image_url ?? PLACEHOLDER}
                      alt={a.title}
                      className="w-full h-44 object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-white/90 text-xs px-2 py-1 rounded shadow">Audio</span>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">The Global Story</p>
                    <a href="#" className="font-semibold leading-snug hover:underline block">
                      {truncate(a.title, 80)}
                    </a>
                    <p className="text-xs text-gray-600">Save · {20 + idx} mins</p>
                  </div>
                </article>
              ))}

              {/* Ad slot inside the carousel */}
              <article className="snap-start min-w-[240px] max-w-[260px] bg-gray-50 border border-gray-200 rounded p-4 flex items-center justify-center text-sm font-semibold text-gray-700">
                Advertisement
              </article>
            </div>
          </div>
        </section>
      )}

      {/* Role-based showcase with varied sizes and placements */}
      {roleItems.length > 0 && (
        <section className="lg:col-span-3 mt-10 space-y-4">
          <h2 className="text-xl font-bold">Across the Network</h2>
          <p className="text-sm text-gray-600">A mix of headings, live, ads, focus, and rich media blocks.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {roleItems.map((a, idx) => renderRoleCard(a, a.roleType ?? roleTypes[idx % roleTypes.length], idx))}
          </div>
        </section>
      )}

      {/* More news masonry/grid to cover gaps */}
      {moreNews.length > 0 && (
        <section className="lg:col-span-3 mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wide">More News</h2>
            <span className="text-sm text-blue-600 hover:underline">See all</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {moreNews.map((a, idx) => (
              <article
                key={`more-${a.id}-${idx}`}
                className={`space-y-2 ${idx % 5 === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="relative">
                  <img
                    src={a.image_url ?? PLACEHOLDER}
                    alt={a.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  {a.is_live && <BadgeLive />}
                </div>
                <a href="#" className="font-bold text-lg hover:underline block leading-snug">
                  {truncate(a.title, 120)}
                </a>
                {a.summary && <p className="text-sm text-gray-700 leading-relaxed">{truncate(a.summary, 160)}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

    </main>
  );
};

export default MainArticles;
