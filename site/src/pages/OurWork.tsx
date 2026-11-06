import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { ourWork, pillarCards } from '@/src/content/copy';
import { Accent, Arrow, ClosingCta, PageHero, Pic, Reveal, pillarsPhrase } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';
import { usePageMeta } from '@/src/lib/meta';

/** "Enterprise, Education and Community" from however many pillars the CMS holds. */
const listNames = (names: string[]) =>
  names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;

/** Our Work (master file 4.4): heading, intro, one card per pillar, one closing button. */
export default function OurWork() {
  const { programmes } = useContent();
  usePageMeta(ourWork.title, ourWork.description);
  const count = pillarsPhrase(programmes.length).replace(' pillars.', '').replace(' pillar.', '').toLowerCase();

  return (
    <>
      <PageHero
        trail={[{ name: 'Our Work' }]}
        kicker="Our Work"
        title={<>Practical support. <Accent>Lasting opportunity.</Accent></>}
        lede={`Our work is organised around ${count} connected pillars: ${listNames(programmes.map((p) => p.name))}. Each pillar has its own model, eligibility criteria and reported outcomes.`}
      />

      <div className="shell py-24 flex flex-col gap-24">
        {programmes.map((p, i) => (
          <section key={p.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal className={cn('lg:col-span-7', i % 2 && 'lg:order-2')}>
              <Pic photo={p.image} className="aspect-[4/3]" rounded="rounded-[28px]" caption sizes="(min-width:1024px) 58vw, 100vw" />
            </Reveal>
            <Reveal index={1} className={cn('lg:col-span-5 flex flex-col gap-5', i % 2 && 'lg:order-1')}>
              <span className="tag-tint self-start">Pillar {i + 1}</span>
              <h2 className="h-sec text-brand-800">{p.name}</h2>
              <p className="text-[13.5px] font-semibold text-faint">{p.focusAreas.join(' · ')}</p>
              <p className="lede text-muted">{pillarCards[p.slug] ?? p.summary}</p>
              <Link to={`/our-work/${p.slug}`} className="btn-brand self-start">Explore {p.name} <Arrow /></Link>
            </Reveal>
          </section>
        ))}
      </div>

      <ClosingCta title={<>See what the work <Accent tone="brand">has documented.</Accent></>} action={{ label: 'See our impact', to: '/impact' }} />
    </>
  );
}
