import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { nav } from '@/src/data/site';

export default function NotFound() {
  const { site } = useContent();
  return (
    <section className="band bg-paper">
      <div className="shell max-w-[60ch]">
        <p className="eyebrow mb-5">404</p>
        <h1 className="text-[38px] md:text-[48px]">That page doesn't exist.</h1>
        <p className="mt-6 lede">
          The link may be out of date, or the page may have moved during the site's redesign.
          Everything below is current.
        </p>

        <div className="mt-10 border-t border-rule">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-baseline justify-between gap-6 py-4 border-b border-rule group"
            >
              <span className="font-serif text-[19px] font-semibold text-ink group-hover:text-gold-ink transition-colors">
                {item.name}
              </span>
              <span className="text-[12.5px] text-muted">
                {item.mega?.intro.desc ?? 'View page'}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className="btn-gold">Back to home</Link>
          <Link to="/contact" className="btn-outline">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
