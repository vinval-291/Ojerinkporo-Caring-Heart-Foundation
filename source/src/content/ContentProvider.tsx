import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { cmsEnabled, fetchCms, queries, imageUrl, onContentChange } from '@/src/lib/sanity';

import { site as localSite, type Site } from '@/src/data/site';
import { programmes as localProgrammes, type Programme } from '@/src/data/programmes';
import { headlineMetrics, impactMetrics as localMetrics, milestones as localMilestones, type Metric } from '@/src/data/impact';
import { stories as localStories, partners as localPartners, type Story } from '@/src/data/stories';
import { faqs as localFaqs, type Faq } from '@/src/data/faq';
import type { Photo } from '@/src/data/media';

/**
 * Supplies page content from Sanity when the CMS is configured, and from the local
 * data modules when it is not.
 *
 * The site therefore renders correctly in three situations: before the CMS exists,
 * while it is being populated, and if it ever goes down. Pages consume `useContent()`
 * and never know which source they got.
 */

export interface Partner {
  name: string;
  logoUrl: string;
  alt?: string;
  url?: string;
  category?: string;
}

interface Content {
  site: Site;
  programmes: Programme[];
  headlineMetrics: Metric[];
  impactMetrics: Metric[];
  milestones: { year: string; body: string }[];
  stories: Story[];
  partners: Partner[];
  faqs: Faq[];
  /** True once a CMS response has been applied. */
  fromCms: boolean;
}

const fallback: Content = {
  site: localSite,
  programmes: localProgrammes,
  headlineMetrics,
  impactMetrics: localMetrics,
  milestones: localMilestones,
  stories: localStories,
  partners: localPartners as Partner[],
  faqs: localFaqs,
  fromCms: false,
};

const ContentContext = createContext<Content>(fallback);

export const useContent = () => useContext(ContentContext);

/* ---------------------------------------------------------------- mapping */

/** Sanity's image shape → the site's Photo shape. */
function toPhoto(src: unknown, fallbackPhoto: Photo): Photo {
  const raw = src as { url?: string; alt?: string; credit?: string } | undefined;
  if (!raw?.url) return fallbackPhoto;
  return {
    src: imageUrl(src, 1600) || raw.url,
    alt: raw.alt ?? fallbackPhoto.alt,
    credit: raw.credit ?? '',
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(fallback);

  const load = useCallback(async (cancelledRef: { current: boolean }) => {
    {
      const [settings, programmes, metrics, milestones, stories, partners, faqs] = await Promise.all([
        fetchCms<Record<string, unknown> | null>(queries.settings, null),
        fetchCms<Record<string, unknown>[]>(queries.programmes, []),
        fetchCms<Record<string, unknown>[]>(queries.impactMetrics, []),
        fetchCms<{ year: string; body: string }[]>(queries.milestones, []),
        fetchCms<Record<string, unknown>[]>(queries.stories, []),
        fetchCms<Partner[]>(queries.partners, []),
        fetchCms<Faq[]>(queries.faqs, []),
      ]);

      if (cancelledRef.current) return;

      const mappedProgrammes: Programme[] = programmes.length
        ? programmes.map((p, i) => {
            const local = localProgrammes.find((l) => l.slug === p.slug) ?? localProgrammes[i];
            const terms = (p.terms as { value: string; label: string }[]) ?? [];
            const panels = (p.panels as { heading: string; body: string }[]) ?? [];
            return {
              slug: String(p.slug),
              name: String(p.name),
              tag: String(p.tag ?? ''),
              blurb: String(p.tag ?? ''),
              summary: String(p.summary ?? ''),
              image: toPhoto(p.image, local?.image ?? localProgrammes[0].image),
              detail: p.modelTitle
                ? {
                    modelEyebrow: 'The grant model',
                    modelTitle: String(p.modelTitle),
                    terms,
                    panels,
                    metrics: local?.detail?.metrics ?? [],
                    ctaTitle: 'Ready to grow your business?',
                    ctaPrimary: {
                      label: p.applicationOpen ? 'Apply for the Grant' : 'Enquire about this programme',
                      path: p.applicationOpen ? '/support/apply' : '/contact',
                    },
                  }
                : null,
            };
          })
        : fallback.programmes;

      const mappedMetrics: Metric[] = metrics.map((m) => ({
        label: String(m.label),
        value: m.value ? String(m.value) : '',
        prefix: m.prefix ? String(m.prefix) : undefined,
        period: String(m.period ?? ''),
        status: m.status === 'verified' ? 'verified' : 'pending',
      }));

      const mappedStories: Story[] = stories.length
        ? stories.map((s, i) => {
            const local = localStories[i];
            return {
              slug: String(s.slug),
              category: s.category as Story['category'],
              title: String(s.title),
              standfirst: String(s.standfirst ?? ''),
              date: String(s.date ?? '').slice(0, 4),
              image: toPhoto(s.image, local?.image ?? localStories[0].image),
              draft: false,
            };
          })
        : fallback.stories;

      setContent({
        site: settings
          ? {
              ...localSite,
              name: String(settings.name ?? localSite.name),
              short: String(settings.short ?? localSite.short),
              address: String(settings.address ?? localSite.address),
              location: String(settings.location ?? localSite.location),
              email: String(settings.email ?? localSite.email),
              phones: (settings.phones as string[]) ?? localSite.phones,
              logo: String(settings.logoUrl ?? localSite.logo),
              social: { ...localSite.social, ...(settings.social as object ?? {}) },
            }
          : localSite,
        programmes: mappedProgrammes,
        headlineMetrics: mappedMetrics.length
          ? mappedMetrics.filter((_, i) => (metrics[i] as { placement?: string }).placement === 'headline')
          : fallback.headlineMetrics,
        impactMetrics: mappedMetrics.length ? mappedMetrics : fallback.impactMetrics,
        milestones: milestones.length ? milestones : fallback.milestones,
        stories: mappedStories,
        partners,
        faqs: faqs.length ? faqs : fallback.faqs,
        fromCms: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!cmsEnabled) return;
    const cancelledRef = { current: false };

    load(cancelledRef);

    // Re-fetch whenever anything is published in the studio, so the page updates
    // without a manual reload.
    const stop = onContentChange(() => { load(cancelledRef); });

    return () => { cancelledRef.current = true; stop(); };
  }, [load]);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
