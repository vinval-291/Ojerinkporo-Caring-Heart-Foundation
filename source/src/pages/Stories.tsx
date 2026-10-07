import { Link, useParams } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { getStory } from '@/src/data/stories';
import { photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand, ArrowLink, categoryTag } from '@/src/components/ui';

export function StoriesIndex() {
  const { stories: allStories } = useContent();
  const stories = allStories.filter((s) => !s.draft);
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Stories' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">From the field</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[18ch]">Stories from the work.</h1>
          <p className="mt-6 lede">
            Human stories and field updates from OCHF programmes — written with the people
            involved, and published with their permission.
          </p>
        </div>
      </section>

      <section className="band bg-paper">
        {stories.length === 0 ? (
          <div className="shell">
            <Link to="/gallery" className="group grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <Figure photo={photo.guests} ratio="aspect-[16/10]" />
              <div className="max-w-[46ch]">
                <p className="eyebrow mb-4">Visual documentation</p>
                <h2 className="text-[26px] md:text-[32px] group-hover:text-accent transition-colors">
                  The foundation's work, in photographs.
                </h2>
                <p className="mt-5 text-[14.5px] text-body leading-relaxed">
                  From the inauguration to grant awards and equipment handovers to entrepreneurs.
                </p>
                <span className="link-arrow mt-6">Open the gallery →</span>
              </div>
            </Link>
          </div>
        ) : (
        <div className="shell grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {stories.map((s, i) => (
            <article key={s.slug}>
              <Link to={`/stories/${s.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[3px] bg-ink/5 aspect-[16/10]">
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <span className={`absolute bottom-0 left-0 text-[9.5px] font-semibold uppercase tracking-[0.14em] px-3 py-2 ${categoryTag(s.category, i)}`}>
                    {s.category}
                  </span>
                </div>
                <h2 className="text-[19px] mt-5 leading-snug group-hover:text-accent transition-colors">
                  {s.title}
                </h2>
              </Link>
              <p className="text-[13.5px] text-muted mt-2 leading-relaxed">{s.standfirst}</p>
              <ArrowLink to={`/stories/${s.slug}`} className="mt-3">Read story</ArrowLink>
            </article>
          ))}
        </div>
        )}
      </section>

      <CtaBand title="See the numbers behind the stories.">
        <Link to="/partners" className="btn-accent">Partner With Us</Link>
      </CtaBand>
    </>
  );
}

export function StoryDetail() {
  const { slug } = useParams();
  const { stories } = useContent();

  // Resolve against the same list the index renders. This used to read a hardcoded
  // local array instead, so every story written in the CMS appeared on the index and
  // then 404'd when opened — the index was reading the CMS, the detail page was not.
  const found = stories.find((s) => s.slug === slug) ?? getStory(slug);
  const story = found && !found.draft ? found : undefined;

  if (!story) {
    return (
      <div className="shell band text-center">
        <h1 className="text-[32px] mb-4">Story not found</h1>
        <Link to="/stories" className="btn-outline mt-4">All stories</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb
            trail={[
              { name: 'Our Work', path: '/our-work' },
              { name: 'Stories', path: '/stories' },
              { name: story.category },
            ]}
          />
        </div>
        {/* `shell` centres what it holds, so adding a max-width here pushed the whole
            header into the middle of the page and left a gap down its left side. The
            width belongs on the standfirst, not on the shell. */}
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">{story.category} · {story.date}</p>
          <h1 className="text-[34px] md:text-[46px] max-w-[22ch]">{story.title}</h1>
          <p className="mt-6 lede">{story.standfirst}</p>
        </div>
      </section>

      {/* Fixed 16:9 at the client's instruction. Note that this crops: a portrait
          image like the Quarterly Grant poster (1600x1827) loses the top and bottom
          of its frame. Swapping object-cover for object-contain here would keep the
          same 16:9 band and show the whole image inside it. */}
      <section className="bg-paper pt-12">
        <div className="shell">
          <Figure photo={story.image} ratio="aspect-[16/9]" priority />
        </div>
      </section>

      {/* Two columns from lg, so the body uses the page instead of leaving half of it
          empty — while each line stays a readable length. A single column stretched to
          1160px would run to about 140 characters a line; the launch brief asks for
          600–700px, and this holds roughly to that. */}
      <section className="band bg-paper">
        <div className="shell">
          {/* Multi-column, not a grid: text flows down the first column and continues
              at the top of the second, so the reading order is preserved. A two-column
              grid would have put the second paragraph beside the first. */}
          <div className="columns-1 lg:columns-2 gap-14 xl:gap-20
                          text-[16.5px] leading-relaxed text-body
                          [&>p]:mb-6 [&>p]:break-inside-avoid">
            {story.body?.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          <ArrowLink to="/stories" className="mt-10">All stories</ArrowLink>
        </div>
      </section>

      <CtaBand title="Help us expand what works.">
        <Link to="/partners" className="btn-accent">Partner With Us</Link>
      </CtaBand>
    </>
  );
}
