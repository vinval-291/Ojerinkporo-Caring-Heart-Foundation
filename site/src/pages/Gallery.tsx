import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { galleryAlbums, albumCover, albumCount, img, type GalleryAlbum } from '@/src/data/media';
import { useContent } from '@/src/content/ContentProvider';
import { Accent, Arrow, ClosingCta, PageHero, Reveal } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Visual documentation, arranged as albums. Every image is OCHF's own. An album still
 * waiting on photographs is shown so the structure is visible, but does not open.
 * The open album is kept in the address (#inauguration), so it can be linked to.
 */
export default function Gallery() {
  const { albums: cmsAlbums } = useContent();
  const albums: GalleryAlbum[] = cmsAlbums.length
    ? [
        ...cmsAlbums,
        // Albums defined in code but awaiting photographs (2026 Beneficiaries) until the CMS holds one of the same name.
        ...galleryAlbums.filter((a) => albumCount(a) === 0 && !cmsAlbums.some((c) => c.title.toLowerCase() === a.title.toLowerCase())),
      ]
    : galleryAlbums;

  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => setOpenId(window.location.hash.slice(1) || null);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const album = albums.find((a) => a.id === openId && albumCount(a) > 0) ?? null;
  usePageMeta(album ? `${album.title} — Gallery` : 'Gallery', album?.description || "Photographs from the foundation's programmes, grouped by event.");

  const open = (id: string | null) => {
    window.history.pushState(null, '', id ? `#${id}` : window.location.pathname);
    setOpenId(id);
    window.scrollTo(0, 0);
  };

  return album ? <AlbumView album={album} onBack={() => open(null)} /> : <AlbumIndex albums={albums} onOpen={open} />;
}

function AlbumIndex({ albums, onOpen }: { albums: GalleryAlbum[]; onOpen: (id: string) => void }) {
  // Albums with photographs lead; the inauguration is kept as the archive, not the lead
  // (master file 4.11); albums still waiting on photographs come last.
  const rank = (x: GalleryAlbum) => (albumCount(x) === 0 ? 2 : /inaugurat/i.test(x.title) ? 1 : 0);
  const sorted = [...albums].sort((a, b) => rank(a) - rank(b));
  return (
    <>
      <PageHero
        trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Gallery' }]}
        kicker="Visual documentation"
        title={<>The work, <Accent>in photographs.</Accent></>}
        lede="Photographs from the foundation's programmes, grouped by event."
      />
      <section className="shell py-24">
        {sorted.length === 0 ? (
          <p className="lede text-muted">Photographs will be published here as programmes are documented.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sorted.map((a, i) => {
              const count = albumCount(a);
              const cover = albumCover(a);
              return (
                <Reveal as="li" key={a.id} index={i % 2} className={i === 0 && count ? 'md:col-span-2' : undefined}>
                  {count ? (
                    <button type="button" onClick={() => onOpen(a.id)}
                      className="group w-full text-left card-tint flex flex-col gap-5 focus-visible:ring-2 focus-visible:ring-brand-800">
                      <div className={`relative overflow-hidden rounded-[16px] bg-white ${i === 0 ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/10]'}`}>
                        <img src={img(cover!)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="img-zoom absolute inset-0 w-full h-full object-cover" />
                        <span className="absolute left-4 bottom-4 tag bg-white text-brand-800 tabular-nums">{count} photographs</span>
                      </div>
                      <div className="px-3 pb-3 flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-[13.5px] font-semibold text-faint">Album{a.year && ` · ${a.year}`}{a.sets.length > 1 && ` · ${a.sets.length} sections`}</p>
                          <h2 className="mt-1 font-serif font-semibold text-[32px] text-brand-800">{a.title}</h2>
                          {a.description && <p className="mt-2 text-[15.5px] text-muted leading-relaxed max-w-[60ch]">{a.description}</p>}
                        </div>
                        <span className="btn-brand pointer-events-none">Open album <Arrow /></span>
                      </div>
                    </button>
                  ) : (
                    <div className="rounded-[24px] border-2 border-dashed border-line p-3.5 flex flex-col gap-5" aria-label={`${a.title} — photographs to follow`}>
                      <div className="aspect-[16/10] rounded-[16px] bg-tint-50 flex items-center justify-center">
                        <span className="tag-tint">Photographs to follow</span>
                      </div>
                      <div className="px-3 pb-3">
                        <p className="text-[13.5px] font-semibold text-faint">Album{a.year && ` · ${a.year}`}</p>
                        <h2 className="mt-1 font-serif font-semibold text-[32px] text-brand-800/70">{a.title}</h2>
                        {a.description && <p className="mt-2 text-[15.5px] text-muted leading-relaxed">{a.description}</p>}
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        )}
      </section>
      <ClosingCta title={<>See what these programmes <Accent tone="brand">produced.</Accent></>} action={{ label: 'Explore Our Impact', to: '/impact' }} />
    </>
  );
}

function AlbumView({ album, onBack }: { album: GalleryAlbum; onBack: () => void }) {
  const all = album.sets.flatMap((s) => s.images.map((path) => ({ path, setName: s.name })));
  const [lightbox, setLightbox] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const close = useCallback(() => { setLightbox(null); window.setTimeout(() => opener.current?.focus(), 0); }, []);

  return (
    <>
      <header className="bg-brand-800 text-white on-dark">
        <div className="shell pt-8">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[14.5px] font-semibold hover:bg-white/15">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All albums
          </button>
        </div>
        <div className="shell pt-10 pb-20 flex flex-wrap items-end justify-between gap-8 fade-in">
          <div className="max-w-[760px]">
            <p className="kicker text-lime-200 mb-4">Album{album.year && ` · ${album.year}`}</p>
            <h1 className="h-page">{album.title}</h1>
            {album.description && <p className="lede mt-6 text-white/80">{album.description}</p>}
          </div>
          <dl className="flex gap-3">
            <div className="rounded-[20px] bg-white/10 px-6 py-4"><dt className="text-[13px] text-white/70">Photographs</dt><dd className="font-serif font-semibold text-[36px] leading-none tabular-nums mt-1">{all.length}</dd></div>
            <div className="rounded-[20px] bg-white/10 px-6 py-4"><dt className="text-[13px] text-white/70">Sections</dt><dd className="font-serif font-semibold text-[36px] leading-none tabular-nums mt-1">{album.sets.length}</dd></div>
          </dl>
        </div>
      </header>

      <section className="shell py-20 flex flex-col gap-16">
        {album.sets.filter((s) => s.images.length > 0).map((set, si) => (
          <div key={set.name}>
            {album.sets.length > 1 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-lime text-lime-ink font-bold">{si + 1}</span>
                <h2 className="font-serif font-semibold text-[28px] md:text-[34px] text-brand-800">{set.name}</h2>
                <span className="ml-auto tag-tint tabular-nums">{set.images.length}</span>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {set.images.map((path) => {
                const index = all.findIndex((im) => im.path === path);
                return (
                  <button key={path} type="button" onClick={(e) => { opener.current = e.currentTarget; setLightbox(index); }}
                    aria-label={`Open photograph ${index + 1} of ${all.length}, ${set.name}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-[16px] bg-tint">
                    <img src={img(path)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="img-zoom absolute inset-0 w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {lightbox !== null && <Lightbox images={all} index={lightbox} onChange={setLightbox} onClose={close} />}

      <ClosingCta title={<>See what these programmes <Accent tone="brand">produced.</Accent></>} action={{ label: 'Explore Our Impact', to: '/impact' }} />
    </>
  );
}

/** Full-screen viewer: arrows, swipe, Escape, focus kept inside, counter and caption. */
function Lightbox({ images, index, onChange, onClose }: {
  images: { path: string; setName: string }[]; index: number; onChange: (i: number) => void; onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const n = images.length;
  const step = useCallback((d: number) => onChange((index + d + n) % n), [index, n, onChange]);
  const current = images[index];

  useEffect(() => {
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab' && dialog.current) {
        const items = [...dialog.current.querySelectorAll<HTMLElement>('button')];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, onClose]);

  useEffect(() => {
    [1, -1].forEach((d) => { const im = new Image(); im.src = img(images[(index + d + n) % n].path); });
  }, [index, images, n]);

  const ctrl = 'w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20';
  return (
    <div ref={dialog} role="dialog" aria-modal="true" aria-label="Photograph viewer"
      className="fixed inset-0 z-[100] bg-brand-950/[0.97] on-dark flex flex-col fade-in"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}>
      <div className="flex items-center justify-between px-4 md:px-8 h-20 shrink-0">
        <p className="tag bg-white/10 text-white tabular-nums" aria-live="polite">{index + 1} / {n}</p>
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close viewer" className={ctrl}><X className="w-6 h-6" aria-hidden="true" /></button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 md:px-24" onClick={onClose}>
        <img key={current.path} src={img(current.path)} alt={`${current.setName}, photograph ${index + 1} of ${n}`} referrerPolicy="no-referrer"
          className="max-w-full max-h-full object-contain rounded-[12px] fade-in" onClick={(e) => e.stopPropagation()} />
        <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photograph" className={`absolute left-2 md:left-6 ${ctrl}`}>
          <ChevronLeft className="w-7 h-7" aria-hidden="true" />
        </button>
        <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photograph" className={`absolute right-2 md:right-6 ${ctrl}`}>
          <ChevronRight className="w-7 h-7" aria-hidden="true" />
        </button>
      </div>
      <p className="shrink-0 px-4 py-6 text-center text-[14px] font-semibold text-white/70">{current.setName}</p>
    </div>
  );
}
