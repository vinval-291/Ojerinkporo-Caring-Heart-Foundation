import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { about } from '@/src/content/copy';
import { Accent, ClosingCta, PageHero, Pic, Reveal, Timeline } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Our Story (master file 4.3).
 *
 * "Growing across Nigeria" waits for the states list, so the heading is "Built in
 * community." The inauguration specifics (attendance, households served, the liaison
 * office) and the ₦100,000,000 commitment are held back until records confirm them.
 */
export default function Story() {
  const { milestones } = useContent();
  usePageMeta('Our Story | OCHF', 'How Ojerinkporo Caring Hearts Foundation began, and how its programmes have developed.', photo.guests.src);

  return (
    <>
      <PageHero
        trail={[{ name: 'About', path: '/about' }, { name: 'Our Story' }]}
        kicker="About OCHF — Our Story"
        title={<>Built in <Accent>community.</Accent></>}
        lede="How the foundation began, and how its programmes have developed since."
      />

      <section className="shell py-24">
        <div className="mx-auto max-w-[720px] text-[18px] leading-[1.8] text-ink space-y-6">
          <Reveal as="div">
            <p className="first-letter:font-serif first-letter:font-semibold first-letter:text-brand-800 first-letter:text-[72px] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:mt-2">
              {about.story[0]}
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <Pic photo={photo.guests} className="aspect-[16/10] lg:aspect-[21/9]" rounded="rounded-[28px]" caption />
        </Reveal>
        <div className="mx-auto max-w-[720px] mt-14 text-[18px] leading-[1.8] text-ink space-y-6">
          <Reveal as="div">
            <p>
              In 2025 OCHF launched its Entrepreneurship Grant Programme. That programme now sets the
              pattern for how the foundation works — capital paired with mentorship, awarded against
              published criteria, and followed up rather than forgotten. It is open to Nigerian
              entrepreneurs, wherever they build.
            </p>
          </Reveal>
          <Reveal as="div">
            <blockquote className="my-10 rounded-[24px] bg-tint px-8 py-10 font-serif text-[26px] md:text-[32px] leading-[1.3] text-brand-800">
              {about.story[1]}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {milestones.length > 0 && (
        <section className="bg-brand-950 text-white on-dark">
          <div className="shell py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <p className="kicker text-lime-200 mb-4">Milestones</p>
              <h2 className="h-sec text-sand">The record <Accent>so far.</Accent></h2>
            </Reveal>
            <div className="lg:col-span-8"><Timeline items={milestones} dark /></div>
          </div>
        </section>
      )}

      <ClosingCta title={<>See where the work <Accent tone="brand">stands now.</Accent></>} action={{ label: 'Explore Our Impact', to: '/impact' }} />
    </>
  );
}
