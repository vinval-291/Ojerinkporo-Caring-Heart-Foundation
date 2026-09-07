import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { byPillar, methodology } from '@/src/data/impact';
import { Breadcrumb, Stat, CtaBand } from '@/src/components/ui';

export default function Impact() {
  const { impactMetrics, milestones } = useContent();
  return (
    <>
      {/* --------------------------------------------------------- header */}
      <section className="bg-paper">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Impact' }]} />
        </div>

        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">Our Work — Evidence</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">The evidence behind the work.</h1>
          <p className="mt-6 lede">
            Every figure below is checked against grant disbursement records, programme registers
            and partner reporting before publication — with the period it covers stated alongside it.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- headline figures */}
      <section className="pb-16 bg-paper">
        <div className="shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {impactMetrics.map((m) => (
            <div key={m.label} className="bg-surface border border-rule rounded-[3px] p-7">
              <Stat metric={m} />
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- by pillar */}
      <section className="band-ink text-white">
        <div className="shell py-16 md:py-20">
          <p className="eyebrow eyebrow-dark mb-10">By pillar</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {byPillar.map((p) => (
              <div key={p.pillar} className={`pillar-bar pillar-${p.pillar.toLowerCase()} pt-5`}>
                <h2 className="text-white text-[17px] mb-5">{p.pillar}</h2>
                <ul className="space-y-3">
                  {p.rows.map((r) => (
                    <li key={r.label} className="flex items-baseline justify-between gap-4">
                      <span className="text-[13px] text-white/60">{r.label}</span>
                      <span className="text-[13px] font-semibold text-gold-lift tabular-nums shrink-0">
                        {r.value || '—'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- methodology */}
      <section className="band bg-paper">
        <div className="shell">
          <div className="max-w-[62ch]">
            <h2 className="text-[26px] md:text-[30px]">{methodology.title}</h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-body">{methodology.body}</p>
          </div>

          <div className="mt-16">
            <p className="eyebrow mb-6">Milestones</p>
            <ol className="border-t border-rule">
              {milestones.map((m) => (
                <li
                  key={m.year}
                  className="grid grid-cols-[64px_1fr] md:grid-cols-[110px_1fr] gap-6 py-5 border-b border-rule"
                >
                  <span className="font-serif text-[19px] font-semibold text-ink tabular-nums">
                    {m.year}
                  </span>
                  <span className="text-[14px] text-body leading-relaxed">{m.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand title="See the people behind the numbers.">
        <Link to="/stories" className="btn-gold">Meet the Entrepreneurs</Link>
        <Link to="/contact" className="btn-outline">Request the Full Report</Link>
      </CtaBand>
    </>
  );
}
