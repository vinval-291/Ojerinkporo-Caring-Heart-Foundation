import { Link } from 'react-router-dom';
import { nav } from '@/src/data/site';
import { Accent, Arrow } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

export default function NotFound() {
  usePageMeta('Page not found', undefined, undefined, { noindex: true });
  return (
    <section className="bg-brand-800 text-white on-dark">
      <div className="shell py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <span className="tag-lime self-start">Error 404</span>
          <h1 className="h-page">That page <Accent>doesn't exist.</Accent></h1>
          <p className="lede text-white/80">The link may be out of date, or the page may have moved during the site's redesign. Everything listed here is current.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="btn-lime">Back to home <Arrow /></Link>
            <Link to="/contact" className="btn-ghost-light">Contact us</Link>
          </div>
        </div>
        <ul className="lg:col-span-5 lg:col-start-8 flex flex-col gap-3">
          {nav.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="flex items-center justify-between gap-6 rounded-[18px] bg-white/[0.07] px-6 py-5 hover:bg-white/[0.12]">
                <span className="font-serif font-semibold text-[24px]">{item.name}</span>
                <span className="text-[13.5px] text-white/65 text-right">{item.mega?.intro.desc ?? 'View page'}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
