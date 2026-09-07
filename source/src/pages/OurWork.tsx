import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { flagship } from '@/src/data/programmes';
import { Figure, ArrowLink, CtaBand, Breadcrumb, categoryTag } from '@/src/components/ui';

export default function OurWork() {
  const { programmes } = useContent();
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Our Work' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">Our Work</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[18ch]">Four pillars, one direction.</h1>
          <p className="mt-6 lede">
            Structured programmes built to grow — not a list of activities we happen to run. Each
            pillar has its own model, its own eligibility, and its own reported outcomes.
          </p>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell space-y-16 md:space-y-20">
          {programmes.map((p, i) => (
            <article
              key={p.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Figure photo={p.image} ratio="aspect-[16/10]" />
              </div>

              <div className={`lg:col-span-6 max-w-[46ch] ${i % 2 ? 'lg:order-1' : ''}`}>
                <p className="eyebrow mb-4">Programme {String(i + 1).padStart(2, '0')}</p>
                <span className={`block h-0.5 w-10 mb-5 ${categoryTag(p.name, i).split(' ')[0]}`} aria-hidden="true" />
                <h2 className="text-[28px] md:text-[34px]">{p.name}</h2>
                <p className="mt-2 text-[13px] font-semibold text-gold-ink">{p.tag}</p>
                <p className="mt-5 text-[14.5px] leading-relaxed text-body">{p.summary}</p>
                <ArrowLink to={`/our-work/${p.slug}`} className="mt-6">
                  {p.detail ? `Explore ${p.name}` : `About ${p.name}`}
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="shell py-16 md:py-20 max-w-[62ch]">
          <p className="eyebrow eyebrow-dark mb-4">{flagship.eyebrow}</p>
          <h2 className="text-white text-[28px] md:text-[34px]">{flagship.title}</h2>
          <p className="mt-6 text-[14.5px] text-white/70 leading-relaxed">{flagship.body}</p>
          <ArrowLink to={flagship.cta.path} dark className="mt-7">{flagship.cta.label}</ArrowLink>
        </div>
      </section>

      <CtaBand title="See what the work has produced.">
        <Link to="/impact" className="btn-gold">Explore Our Impact</Link>
        <Link to="/stories" className="btn-outline">Read Field Stories</Link>
      </CtaBand>
    </>
  );
}
