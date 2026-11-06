import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, Mail, Phone } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { cn } from '@/src/lib/utils';
import { nav, type NavItem } from '@/src/data/site';

type ProgrammeLink = { name: string; slug: string; tag: string };

/** The Programmes column comes from the CMS, so a renamed pillar updates the menu. */
function columnsFor(item: NavItem, programmes: ProgrammeLink[], hasPublications = false) {
  if (!item.mega) return [];
  return item.mega.columns.map((col) =>
    col.heading === 'Programmes'
      ? { ...col, links: programmes.map((p) => ({ name: p.name, path: `/our-work/${p.slug}`, desc: p.tag.split('|').map((s) => s.trim()).join(' · ').replace(/(^|· )Infrastructure$/, '$1Community Infrastructure') })) }
      // Resources is listed only once there is something to read there.
      : { ...col, links: col.links.filter((l) => l.path !== '/resources' || hasPublications) },
  );
}

function MegaPanel({ item, id, onNavigate, programmes, hasPublications }: {
  item: NavItem; id: string; onNavigate: () => void; programmes: ProgrammeLink[]; hasPublications: boolean;
}) {
  if (!item.mega) return null;
  const columns = columnsFor(item, programmes, hasPublications).filter((c) => c.links.length);
  const wide = columns.length > 1;

  // A short dropdown with one line under each item (master file, Part 5) — not a wide mega-menu.
  return (
    <div id={id} className="shell flex justify-center pt-3 pb-6 fade-in">
      <div className={cn('bg-white rounded-[22px] shadow-[0_30px_70px_-30px_rgba(5,26,58,0.55)] p-4 grid gap-2', wide ? 'w-[620px] grid-cols-2' : 'w-[360px] grid-cols-1')}>
        {columns.map((col) => (
          <div key={col.heading ?? 'links'}>
            {col.heading && <p className="kicker text-faint px-3 pt-2 pb-1">{col.heading}</p>}
            <ul className="flex flex-col">
              {col.links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} onClick={onNavigate} className="group block rounded-[14px] px-3 py-2.5 hover:bg-tint transition-colors">
                    <span className="block font-bold text-[15.5px] text-ink group-hover:text-brand-800">{link.name}</span>
                    {link.desc && <span className="block text-[13px] text-muted mt-0.5">{link.desc}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const { site, programmes, publications } = useContent();
  const hasPublications = publications.length > 0;
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const location = useLocation();
  const closeTimer = useRef<number | undefined>(undefined);
  const openTimer = useRef<number | undefined>(undefined);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpenMega(null); setMobileOpen(false); setMobileSection(null); }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (openMega) { triggers.current[openMega]?.focus(); setOpenMega(null); }
      if (mobileOpen) { setMobileOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openMega, mobileOpen]);

  // Mobile menu: lock the page behind it and keep Tab inside it.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    const el = drawer.current;
    el?.querySelector<HTMLElement>('button, a')?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !el) return;
      const items = [...el.querySelectorAll<HTMLElement>('a, button')].filter((n) => n.offsetParent !== null);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', trap);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', trap); };
  }, [mobileOpen]);

  const hoverOpen = useCallback((name: string) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpenMega(name), 110);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 220);
  }, []);
  const keepOpen = useCallback(() => window.clearTimeout(closeTimer.current), []);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/') ||
    (path === '/our-work' && /^\/(impact|stories|gallery)/.test(location.pathname)) ||
    (path === '/partners' && location.pathname.startsWith('/support'));

  const openItem = nav.find((n) => n.name === openMega);

  return (
    <header className="sticky top-0 z-50 on-dark" onMouseLeave={scheduleClose}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] btn-lime">Skip to content</a>
      <div className="bg-brand-800 border-b border-white/10">
        <div className="shell flex items-center justify-between h-[76px]">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${site.name}, home`}>
            <span className="bg-white rounded-full w-11 h-11 flex items-center justify-center">
              <img src={site.logo} alt="" width={32} height={32} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-bold text-[21px] tracking-[-0.01em] text-white">{site.short}</span>
              <span className="hidden sm:block text-[11.5px] font-medium text-white/65 mt-1">Caring Hearts Foundation</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            <Link to="/" className={cn('px-4 py-2.5 rounded-full text-[15px] font-semibold text-white transition-colors',
              location.pathname === '/' ? 'bg-white/10' : 'hover:bg-white/10')} aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link>
            {nav.map((item) => {
              const active = isActive(item.path);
              const cls = cn('flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[15px] font-semibold text-white transition-colors',
                active || openMega === item.name ? 'bg-white/10' : 'hover:bg-white/10');
              return (
                <div key={item.path} onMouseEnter={() => (item.mega ? hoverOpen(item.name) : scheduleClose())}>
                  {item.mega ? (
                    <button type="button" ref={(el) => { triggers.current[item.name] = el; }}
                      aria-expanded={openMega === item.name} aria-controls={`mega-${item.name}`}
                      onClick={() => setOpenMega(openMega === item.name ? null : item.name)} className={cls}>
                      {item.name}
                      <ChevronDown className={cn('w-4 h-4 transition-transform', openMega === item.name && 'rotate-180')} aria-hidden="true" />
                    </button>
                  ) : (
                    <Link to={item.path} className={cls} aria-current={active ? 'page' : undefined}>{item.name}</Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/partners" className="hidden lg:inline-flex btn-lime">Partner With Us</Link>
            <button ref={menuButton} type="button" onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 text-white font-semibold text-[15px]"
              aria-expanded={mobileOpen} aria-controls="mobile-menu">
              Menu <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {openItem && (
        <div className="hidden lg:block absolute left-0 right-0 top-full on-light" onMouseEnter={keepOpen}>
          <MegaPanel item={openItem} id={`mega-${openItem.name}`} onNavigate={() => setOpenMega(null)} programmes={programmes} hasPublications={hasPublications} />
        </div>
      )}

      {mobileOpen && (
        <div id="mobile-menu" ref={drawer} role="dialog" aria-modal="true" aria-label="Site menu"
          className="lg:hidden fixed inset-0 z-[70] bg-brand-800 flex flex-col fade-in">
          <div className="shell flex items-center justify-between h-[76px] shrink-0 border-b border-white/10">
            <span className="font-bold text-[21px] text-white">{site.short}</span>
            <button type="button" onClick={() => { setMobileOpen(false); menuButton.current?.focus(); }}
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 text-white font-semibold text-[15px]">
              Close <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto" aria-label="Mobile">
            <ul className="shell py-4">
              <li className="border-b border-white/10"><Link to="/" className="block py-5 font-serif font-semibold text-[30px] text-white">Home</Link></li>
              {nav.map((item) => (
                <li key={item.path} className="border-b border-white/10">
                  {item.mega ? (
                    <>
                      <button type="button" aria-expanded={mobileSection === item.name}
                        onClick={() => setMobileSection(mobileSection === item.name ? null : item.name)}
                        className="flex w-full items-center justify-between py-5 text-left font-serif font-semibold text-[30px] text-white">
                        {item.name}
                        <ChevronDown className={cn('w-6 h-6 text-lime transition-transform', mobileSection === item.name && 'rotate-180')} aria-hidden="true" />
                      </button>
                      {mobileSection === item.name && (
                        <div className="pb-6 space-y-5">
                          <Link to={item.path} className="link-arrow link-arrow-light">
                            {item.name === 'About' ? 'About OCHF' : 'Our Work overview'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                          {columnsFor(item, programmes, hasPublications).map((col) => (
                            <div key={col.heading ?? 'links'}>
                              {col.heading && <p className="kicker text-lime-200 mb-2">{col.heading}</p>}
                              <ul>
                                {col.links.filter((l) => l.path !== item.path).map((link) => (
                                  <li key={link.path}>
                                    <Link to={link.path} className="block py-2.5">
                                      <span className="block font-bold text-[17px] text-white">{link.name}</span>
                                      {link.desc && <span className="block text-[13.5px] text-white/60">{link.desc}</span>}
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
                    <Link to={item.path} className="block py-5 font-serif font-semibold text-[30px] text-white">{item.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="shell shrink-0 border-t border-white/10 pt-5 pb-[calc(20px+env(safe-area-inset-bottom))] space-y-4">
            <Link to="/partners" className="btn-lime w-full">Partner With Us</Link>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/75">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2"><Mail className="w-4 h-4 text-lime" aria-hidden="true" />{site.email}</a>
              <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="inline-flex items-center gap-2"><Phone className="w-4 h-4 text-lime" aria-hidden="true" />{site.phones[0]}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
