import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { methodology } from '@/src/data/impact';
import { Breadcrumb, CtaBand } from '@/src/components/ui';

/**
 * Governance page.
 *
 * Governance claims — registration status, board composition, audit arrangements,
 * safeguarding and conflict-of-interest policy — are matters of fact about a real
 * organisation. Nothing here is invented. The page publishes what the foundation has
 * already stated in its own materials, and marks the rest as awaiting confirmation.
 */

export default function Governance() {
  const { site } = useContent();
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'About', path: '/about' }, { name: 'Governance' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">About {site.short} — Governance</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">
            Accountability, structure and policies.
          </h1>
          <p className="mt-6 lede">
            Funders, partners and the communities we serve are entitled to know how {site.short} is
            governed, who decides what, and how the money is accounted for.
          </p>
        </div>
      </section>

      {/* What is already established and publishable. */}
      <section className="band-tight bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="max-w-[52ch]">
            <p className="eyebrow mb-4">Reporting standard</p>
            <h2 className="text-[26px] md:text-[30px]">{methodology.title}</h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-body">{methodology.body}</p>
          </div>

          <div className="max-w-[52ch]">
            <p className="eyebrow mb-4">Grant award standard</p>
            <h2 className="text-[26px] md:text-[30px]">Published criteria, applied consistently.</h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-body">
              Entrepreneurship Grant awards are assessed against criteria published in advance on
              the programme page — job creation potential, originality, plan strength, founder
              experience and programme fit — and applicants must meet stated eligibility before
              assessment begins.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Questions about how we operate?">
        <Link to="/contact" className="btn-gold">Contact the Foundation</Link>
        <Link to="/impact" className="btn-outline">Impact & Evidence</Link>
      </CtaBand>
    </>
  );
}
