import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { site, footerNav } from '@/src/data/site';

export function Footer() {
  const { site } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper border-t border-rule">
      <div className="shell py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-5" aria-label={`${site.short} — home`}>
              <img src={site.logo} alt="" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              <span className="font-serif text-[21px] font-bold tracking-tight text-ink leading-none">
                {site.short}
              </span>
            </Link>
            <p className="text-[13.5px] text-muted leading-relaxed">
              {site.name}
              <br />
              {site.location}
            </p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-4">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-[13.5px] text-muted hover:text-ink transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-rule flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-faint">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-ink transition-colors">
              {site.email}
            </a>
            {' · '}
            <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="hover:text-ink transition-colors">
              {site.phones[0]}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
