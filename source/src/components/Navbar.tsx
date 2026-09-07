import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { site, nav, type NavItem } from '@/src/data/site';

/* ---------------------------------------------------------------- mega panel */

function MegaPanel({
  item, onNavigate, programmes,
}: {
  item: NavItem;
  onNavigate: () => void;
  programmes: { name: string; slug: string; tag: string }[];
}) {
  if (!item.mega) return null;
  const { intro, features } = item.mega;

  // The Programmes column is generated from the CMS rather than hardcoded, so renaming
  // or adding a programme updates the menu instead of leaving a link pointing nowhere.
  const columns = item.mega.columns.map((col) =>
    col.heading === 'Programmes'
      ? {
          ...col,
          links: programmes.map((p) => ({
            name: p.name,
            path: `/our-work/${p.slug}`,
            desc: p.tag,
          })),
        }
      : col,
  );

  return (
    <div className="bg-surface border-t border-rule shadow-[0_24px_48px_-24px_rgba(14,26,43,0.25)]">
      <div className="shell grid grid-cols-12 gap-10 py-12">
        {/* Intro rail */}
        <div className="col-span-3">
          <Link
            to={intro.path}
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 font-serif text-[26px] font-semibold text-ink hover:text-gold-ink transition-colors"
          >
            {intro.title}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <p className="text-[13px] text-muted leading-relaxed mt-3 max-w-[24ch]">{intro.desc}</p>
        </div>

        {/* Link columns */}
        <div
          className={cn(
            'col-span-6 grid gap-10 border-l border-rule pl-10',
            columns.length > 1 ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {columns.map((col) => (
            <div key={col.heading ?? 'links'}>
              {col.heading && <p className="eyebrow mb-5">{col.heading}</p>}
              <ul className="space-y-5">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} onClick={onNavigate} className="group block">
                      <span className="font-serif text-[17px] font-semibold text-ink group-hover:text-gold-ink transition-colors">
                        {link.name}
                      </span>
                      {link.desc && (
                        <span className="block text-[12.5px] text-muted mt-0.5">{link.desc}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="col-span-3 space-y-5">
          {features.map((f) => (
            <Link
              key={f.path}
              to={f.path}
              onClick={onNavigate}
              className="group block bg-cream rounded-[3px] overflow-hidden hover:bg-cream/70 transition-colors"
            >
              {f.image && (
                <div className="aspect-[16/9] overflow-hidden bg-ink/5">
                  <img
                    src={f.image}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-4">
                {f.eyebrow && <p className="eyebrow mb-1.5">{f.eyebrow}</p>}
                <p className="font-semibold text-[14px] text-ink leading-snug">{f.title}</p>
                {f.desc && <p className="text-[12.5px] text-muted mt-1">{f.desc}</p>}
                <span className="link-arrow mt-2">
                  {f.cta}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Same Programmes substitution the desktop panel does, for the mobile drawer. */
function mobileColumns(
  item: NavItem,
  programmes: { name: string; slug: string; tag: string }[],
) {
  if (!item.mega) return [];
  return item.mega.columns.map((col) =>
    col.heading === 'Programmes'
      ? { ...col, links: programmes.map((p) => ({ name: p.name, path: `/our-work/${p.slug}`, desc: p.tag })) }
      : col,
  );
}

/* -------------------------------------------------------------------- navbar */

export function Navbar() {
  const { site, programmes } = useContent();
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const location = useLocation();
  const closeTimer = useRef<number | undefined>(undefined);

  // Close everything on route change.
  useEffect(() => {
    setOpenMega(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  // Escape closes the open panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenMega(null); setMobileOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Small grace period so the pointer can cross the gap into the panel.
  const open = useCallback((name: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMega(name);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 120);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50">
      <div
        className="bg-surface border-b border-rule"
        onMouseLeave={scheduleClose}
      >
        <div className="shell flex items-center justify-between h-[70px]">
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${site.short} — home`}>
            <img src={site.logo} alt="" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
            <span className="font-serif text-[21px] font-bold tracking-tight text-ink leading-none">
              {site.short}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {nav.map((item) => (
              <div
                key={item.path}
                onMouseEnter={() => item.mega ? open(item.name) : scheduleClose()}
              >
                {item.mega ? (
                  <button
                    type="button"
                    aria-expanded={openMega === item.name}
                    aria-haspopup="true"
                    onClick={() => setOpenMega(openMega === item.name ? null : item.name)}
                    className={cn(
                      'flex items-center gap-1.5 text-[14px] font-medium py-6 border-b-2 -mb-px transition-colors',
                      openMega === item.name || isActive(item.path)
                        ? 'text-gold-ink border-gold'
                        : 'text-ink border-transparent hover:text-gold-ink',
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn('w-3.5 h-3.5 transition-transform',
                        openMega === item.name && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      'block text-[14px] font-medium py-6 border-b-2 -mb-px transition-colors',
                      isActive(item.path)
                        ? 'text-gold-ink border-gold'
                        : 'text-ink border-transparent hover:text-gold-ink',
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/support" className="btn-gold hidden sm:inline-flex">Support</Link>
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 text-ink"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop mega panel */}
        {openMega && (
          <div className="hidden lg:block absolute left-0 right-0 top-full" onMouseEnter={() => open(openMega)}>
            <MegaPanel
              item={nav.find((n) => n.name === openMega)!}
              onNavigate={() => setOpenMega(null)}
              programmes={programmes}
            />
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bottom-0 bg-surface overflow-y-auto">
          <div className="shell py-8">
            <ul className="divide-y divide-rule">
              {nav.map((item) => (
                <li key={item.path} className="py-4">
                  {item.mega ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileSection === item.name}
                        onClick={() => setMobileSection(mobileSection === item.name ? null : item.name)}
                        className="flex w-full items-center justify-between text-left"
                      >
                        <span className="font-serif text-[22px] font-semibold text-ink">{item.name}</span>
                        <ChevronDown
                          className={cn('w-5 h-5 text-muted transition-transform',
                            mobileSection === item.name && 'rotate-180')}
                          aria-hidden="true"
                        />
                      </button>

                      {mobileSection === item.name && (
                        <div className="mt-5 pl-4 border-l-2 border-cream space-y-6">
                          {mobileColumns(item, programmes).map((col) => (
                            <div key={col.heading ?? 'links'}>
                              {col.heading && <p className="eyebrow mb-3">{col.heading}</p>}
                              <ul className="space-y-4">
                                {col.links.map((link) => (
                                  <li key={link.path}>
                                    <Link to={link.path} className="block">
                                      <span className="font-semibold text-[15px] text-ink">{link.name}</span>
                                      {link.desc && (
                                        <span className="block text-[12.5px] text-muted">{link.desc}</span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to={item.path} className="font-serif text-[22px] font-semibold text-ink block">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <Link to="/support" className="btn-gold w-full mt-8">Support Our Work</Link>
          </div>
        </div>
      )}
    </header>
  );
}
