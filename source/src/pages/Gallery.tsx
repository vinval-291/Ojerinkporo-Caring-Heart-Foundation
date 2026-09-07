import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryAlbums, img } from '@/src/data/media';
import { Breadcrumb, CtaBand } from '@/src/components/ui';

/**
 * Visual documentation.
 *
 * All stock photography has been removed per the client directive — every image here
 * is OCHF's own. The lightbox is keyboard-operable (Escape closes, arrows navigate),
 * which the previous build's click-only overlay was not.
 */
export default function Gallery() {
  const album = galleryAlbums[0];

  // Flat list so the lightbox can step through the whole album.
  const allImages = album.sets.flatMap((s) =>
    s.images.map((path) => ({ path, setName: s.name })),
  );

  const [lightbox, setLightbox] = useState<number | null>(null);

  const step = useCallback((delta: number) => {
    setLightbox((i) => (i === null ? null : (i + delta + allImages.length) % allImages.length));
  }, [allImages.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, step]);

  const current = lightbox === null ? null : allImages[lightbox];

  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Gallery' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">Visual documentation</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">{album.title}</h1>
          <p className="mt-6 lede">{album.description}</p>
          <p className="mt-5 text-[12.5px] text-faint">
            {allImages.length} photographs · {album.year}
          </p>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell space-y-16">
          {album.sets.map((set) => (
            <div key={set.name}>
              <div className={`flex items-baseline gap-4 mb-7 pillar-bar pt-5 ${["pillar-enterprise","pillar-agriculture","pillar-wellbeing","pillar-education"][album.sets.indexOf(set) % 4]}`}>
                <h2 className="text-[21px] md:text-[24px]">{set.name}</h2>
                <span className="text-[12px] text-faint tabular-nums ml-auto shrink-0">
                  {set.images.length}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {set.images.map((path) => {
                  const index = allImages.findIndex((im) => im.path === path);
                  return (
                    <button
                      key={path}
                      type="button"
                      onClick={() => setLightbox(index)}
                      aria-label={`Open photograph — ${set.name}`}
                      className="group relative aspect-square overflow-hidden rounded-[3px] bg-ink/5"
                    >
                      <img
                        src={img(path)}
                        alt={`${set.name} — OCHF documentation`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          className="fixed inset-0 z-[100] bg-ink-deep/97 flex items-center justify-center p-4 md:p-12"
          onClick={() => setLightbox(null)}
        >
          <img
            src={img(current.path)}
            alt={`${current.setName} — OCHF documentation`}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full object-contain rounded-[3px]"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-5 left-0 right-0 text-center text-[11px] uppercase tracking-[0.14em] text-white/60">
            {current.setName} · {(lightbox ?? 0) + 1} of {allImages.length}
          </p>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close viewer"
            className="absolute top-5 right-5 p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-[3px] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous photograph"
            className="absolute left-3 md:left-6 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-[3px] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next photograph"
            className="absolute right-3 md:right-6 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-[3px] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      <CtaBand title="See what these programmes produced.">
        <Link to="/impact" className="btn-gold">Impact & Evidence</Link>
        <Link to="/stories" className="btn-outline">Field Stories</Link>
      </CtaBand>
    </>
  );
}
