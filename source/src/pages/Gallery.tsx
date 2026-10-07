import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import {
  populatedAlbums, albumCover, albumCount, img, type GalleryAlbum,
} from '@/src/data/media';
import { Breadcrumb, CtaBand } from '@/src/components/ui';
import { useContent } from '@/src/content/ContentProvider';

/**
 * Visual documentation.
 *
 * Opens on album covers rather than every photograph at once: choose Inauguration,
 * then look through it. The previous version listed the whole archive on one page,
 * which meant 33 images loading at once — enough for postimg to start throttling.
 *
 * Every image is OCHF's own; all stock photography was removed per the client
 * directive. The lightbox is keyboard-operable (Escape closes, arrows navigate),
 * which the original click-only overlay was not.
 */
export default function Gallery() {
  const { albums: cmsAlbums } = useContent();

  // The CMS wins once it holds an album with photographs in it; the code keeps the
  // inauguration archive until those images have been moved across.
  const albums = cmsAlbums.length ? cmsAlbums : populatedAlbums();
  const [openId, setOpenId] = useState<string | null>(null);
  const album = albums.find((a) => a.id === openId) ?? null;

  // Always land on the covers, even while only one album has photographs. Opening
  // straight into it would hide the structure the rest are about to fill.
  return album
    ? <AlbumView album={album} onBack={() => setOpenId(null)} />
    : <AlbumIndex albums={albums} onOpen={setOpenId} />;
}

/* --------------------------------------------------------------------- index */

function AlbumIndex({
  albums, onOpen,
}: {
  albums: GalleryAlbum[];
  onOpen: (id: string) => void;
}) {
  return (
    <>
      <GalleryHeader
        title="Visual documentation"
        lede="Photographs from the foundation's programmes, grouped by event."
      />

      <section className="band bg-paper">
        <div className="shell">
          {albums.length === 0 ? (
            <p className="lede">Photographs will be published here as programmes are documented.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {albums.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onOpen(a.id)}
                  className="group text-left"
                >
                  <div className="surface-gradient relative aspect-[4/3] overflow-hidden rounded-[3px]">
                    <img
                      src={img(albumCover(a))}
                      alt={`${a.title} — OCHF documentation`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors" />
                  </div>
                  <h2 className="text-[21px] mt-5 group-hover:text-accent transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-[12.5px] text-faint mt-1.5 tabular-nums">
                    {albumCount(a)} photographs · {a.year}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand title="See what these programmes produced.">
        <Link to="/impact" className="btn-accent">Explore Our Impact</Link>
      </CtaBand>
    </>
  );
}

/* ---------------------------------------------------------------- one album */

function AlbumView({ album, onBack }: { album: GalleryAlbum; onBack?: () => void }) {
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
      <GalleryHeader
        title={album.title}
        lede={album.description}
        meta={`${allImages.length} photographs · ${album.year}`}
        onBack={onBack}
      />

      <section className="band bg-paper">
        <div className="shell space-y-16">
          {album.sets.filter((s) => s.images.length > 0).map((set, setIndex) => (
            <div key={set.name}>
              <div className={`flex items-baseline gap-4 mb-7 pillar-bar pt-5 ${['pillar-enterprise', 'pillar-education', 'pillar-community'][setIndex % 3]}`}>
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
        <Link to="/impact" className="btn-accent">Explore Our Impact</Link>
      </CtaBand>
    </>
  );
}

/* -------------------------------------------------------------------- shared */

function GalleryHeader({
  title, lede, meta, onBack,
}: {
  title: string; lede: string; meta?: string; onBack?: () => void;
}) {
  return (
    <section className="bg-paper border-b border-rule">
      <div className="shell pt-8">
        <Breadcrumb trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Gallery' }]} />
      </div>
      <div className="shell pt-10 pb-14">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="link-arrow mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All albums
          </button>
        )}
        <p className="eyebrow mb-5">Visual documentation</p>
        <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">{title}</h1>
        <p className="mt-6 lede">{lede}</p>
        {meta && <p className="mt-5 text-[12.5px] text-faint tabular-nums">{meta}</p>}
      </div>
    </section>
  );
}

