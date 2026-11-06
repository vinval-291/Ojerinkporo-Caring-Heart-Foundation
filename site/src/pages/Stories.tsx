import { Link, useParams } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { getStory } from '@/src/data/stories';
import { photo } from '@/src/data/media';
import { Accent, ArrowLink, ClosingCta, TintCard, PageHero, Reveal, StoryCard } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

export function StoriesIndex() {
  const { stories: allStories } = useContent();
  const stories = allStories.filter((s) => !s.draft);
  const [lead, ...rest] = stories;
  usePageMeta('Stories', 'Human stories and field updates from OCHF programmes, published with the permission of the people involved.');

  return (
    <>
      <PageHero
        trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Stories' }]}
        kicker="From the field"
        title={<>Stories <Accent>from the work.</Accent></>}
        lede="Human stories and field updates from OCHF programmes — written with the people involved, and published with their permission."
      />

      <section className="shell py-24">
        {!lead ? (
          <div className="max-w-[520px]">
            <TintCard to="/gallery" photo={photo.guests} title="The foundation's work, in photographs."
              body="From the inauguration to grant awards and equipment handovers to entrepreneurs." cta="Open the gallery" />
          </div>
        ) : (
          <>
            {/* The newest story leads, set large. */}
            <Reveal as="article" className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[28px] overflow-hidden bg-brand-900 text-white on-dark focus-within:ring-2 focus-within:ring-lime">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] overflow-hidden">
                <img src={lead.image.src} alt="" loading="eager" decoding="async" referrerPolicy="no-referrer" className="img-zoom absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col gap-4 justify-center">
                <span className="tag-lime self-start">Latest · {lead.category}{lead.date && ` · ${lead.date}`}</span>
                <h2 className="font-serif font-semibold text-[34px] md:text-[42px] leading-[1.05]">
                  <Link to={`/stories/${lead.slug}`} className="after:absolute after:inset-0 focus:outline-none">{lead.title}</Link>
                </h2>
                {lead.standfirst && <p className="lede text-white/80">{lead.standfirst}</p>}
                <span className="font-bold text-lime">Read the story →</span>
              </div>
            </Reveal>
            {rest.length > 0 && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((s, i) => <StoryCard key={s.slug} story={s} index={i % 3} />)}
              </div>
            )}
          </>
        )}
      </section>

      <ClosingCta title={<>See the numbers <Accent tone="brand">behind the stories.</Accent></>} action={{ label: 'Partner With Us', to: '/partners' }} />
    </>
  );
}

export function StoryDetail() {
  const { slug } = useParams();
  const { stories, loaded } = useContent();
  // Resolved against the same list the index renders, so a listed story always opens.
  const found = stories.find((s) => s.slug === slug) ?? getStory(slug);
  const story = found && !found.draft ? found : undefined;
  usePageMeta(story?.title ?? 'Stories', story?.standfirst, story?.image.src);

  if (!story && !loaded) return <div className="shell py-24" aria-busy="true" aria-label="Loading story" />;
  if (!story) {
    return (
      <div className="shell py-24">
        <h1 className="h-page text-brand-800 mb-8">Story not found.</h1>
        <Link to="/stories" className="btn-brand">All stories</Link>
      </div>
    );
  }

  return (
    <>
      <article>
        <PageHero
          trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Stories', path: '/stories' }, { name: story.category }]}
          kicker={`${story.category}${story.date ? ` · ${story.date}` : ''}`}
          title={story.title}
          lede={story.standfirst}
        />

        {/* Fixed 16:9 at the client's instruction; a portrait image is shown whole, not cropped. */}
        <div className="shell -mt-12 relative z-10">
          <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden bg-tint shadow-[0_24px_60px_-24px_rgba(13,59,122,0.35)]">
            <img src={story.image.src} alt={story.image.alt} fetchPriority="high" decoding="async" referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>

        <div className="shell py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <aside className="lg:col-span-3">
            <dl className="lg:sticky lg:top-28 card-tint p-6 flex flex-col gap-4">
              <div><dt className="text-[13px] font-semibold text-faint">Pillar</dt><dd className="font-bold text-brand-800">{story.category}</dd></div>
              {story.date && <div><dt className="text-[13px] font-semibold text-faint">Published</dt><dd className="font-bold text-brand-800 tabular-nums">{story.date}</dd></div>}
              <ArrowLink to="/stories">All stories</ArrowLink>
            </dl>
          </aside>
          <Reveal className="lg:col-span-8 lg:col-start-5 max-w-[68ch] space-y-6 text-[18px] leading-[1.8] text-ink">
            {story.body?.map((para, i) => <p key={i}>{para}</p>)}
          </Reveal>
        </div>
      </article>

      <ClosingCta title={<>Help us expand <Accent tone="brand">what works.</Accent></>} action={{ label: 'Partner With Us', to: '/partners' }} />
    </>
  );
}
