import React from "react";
import { defaultArticles, PLACEHOLDER } from "../../data/defaultArticles";

const News5Section: React.FC = () => {
  // Hardcoded values - change these directly
  const articles = defaultArticles;
  const news5 = articles.filter((a) => a.section === "news5");
  
  if (news5.length === 0) return null;

  return (
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
  );
};

export default News5Section;
