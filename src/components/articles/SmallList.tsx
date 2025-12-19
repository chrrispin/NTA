import { Link } from 'react-router-dom';
import { defaultArticles } from '../../data/defaultArticles';

export default function SmallList() {
  // Hardcoded values - change these directly
  const title = "Latest Articles";
  const items = defaultArticles.slice(0, 5).map(a => ({
    id: a.id,
    title: a.title,
    image: a.image_url,
    slug: a.slug
  }));
  const showThumb = true;
  
  if (!items?.length) return null;
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.id} className="flex flex-col gap-2">
            {showThumb ? (
              <Link to={`/article/${it.slug || it.id}`} className="block">
                <img
                  src={it.image ?? 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'96\' height=\'64\'%3E%3Crect fill=\'%23e5e7eb\' width=\'96\' height=\'64\'/%3E%3C/svg%3E'}
                  alt={it.title}
                  className="w-auto h-20 object-cover rounded hover:opacity-90 transition"
                />
              </Link>
            ) : null}
            <Link to={`/article/${it.slug || it.id}`} className="font-semibold hover:text-blue-600 transition">
              {it.title}
            </Link>
            <Link to={`/article/${it.slug || it.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm transition w-fit">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
