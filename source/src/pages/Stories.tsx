import { Link, useParams } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { getStory } from '@/src/data/stories';
import { Figure, Breadcrumb, CtaBand, ArrowLink, AwaitingContent, categoryTag } from '@/src/components/ui';

export function StoriesIndex() {
  const { stories } = useContent();
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
                <h2 className="text-[19px] mt-5 leading-snug group-hover:text-gold-ink transition-colors">
                  {s.title}
                </h2>
              </Link>
              <p className="text-[13.5px] text-muted mt-2 leading-relaxed">{s.standfirst}</p>
              <ArrowLink to={`/stories/${s.slug}`} className="mt-3">Read story</ArrowLink>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="See the numbers behind the stories.">
        <Link to="/impact" className="btn-gold">Impact & Evidence</Link>
        <Link to="/gallery" className="btn-outline">Visual Documentation</Link>
      </CtaBand>
    </>
  );
}

export function StoryDetail() {
  const { slug } = useParams();
  const story = getStory(slug);

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
        <div className="shell pt-10 pb-14 max-w-[62ch]">
          <p className="eyebrow mb-5">{story.category} · {story.date}</p>
          <h1 className="text-[34px] md:text-[46px]">{story.title}</h1>
          <p className="mt-6 lede">{story.standfirst}</p>
        </div>
      </section>

      <section className="bg-paper pt-12">
        <div className="shell">
          <Figure photo={story.image} ratio="aspect-[16/9]" priority />
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell">
          {story.draft ? (
            <AwaitingContent
              what="This story is being written"
              detail={
                'OCHF is gathering this piece with the people involved. Beneficiary stories ' +
                'publish only with the subject’s permission and with figures that have been ' +
                'verified — never as illustrative copy.'
              }
            />
          ) : (
            <div className="max-w-[64ch] space-y-6 text-[16px] leading-relaxed text-body">
              {story.body?.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          )}

          <ArrowLink to="/stories" className="mt-10">All stories</ArrowLink>
        </div>
      </section>

      <CtaBand title="Help us expand what works.">
        <Link to="/partners" className="btn-gold">Become a Partner</Link>
        <Link to="/support" className="btn-outline">Support Our Work</Link>
      </CtaBand>
    </>
  );
}
