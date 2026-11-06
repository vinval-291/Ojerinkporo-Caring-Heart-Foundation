/**
 * Loads every piece of CMS content the public site uses, in one call, and maps it onto
 * the site's own shapes.
 *
 * It runs in two places: at build time, so each page is written as finished HTML with
 * its content already in it, and in the browser, so anything published in the CMS
 * after the build shows within seconds. Whatever the CMS cannot supply comes from the
 * local data modules, so the site never renders empty.
 */

import { cmsEnabled, client, queries, imageUrl } from '@/src/lib/sanity';
import { site as localSite, type Site } from '@/src/data/site';
import { programmes as localProgrammes, splitFocusAreas, type Programme } from '@/src/data/programmes';
import { headlineMetrics, impactMetrics as localMetrics, milestones as localMilestones, type Metric } from '@/src/data/impact';
import { stories as localStories, partners as localPartners, type Story } from '@/src/data/stories';
import { faqs as localFaqs, type Faq } from '@/src/data/faq';
import type { Photo } from '@/src/data/media';

export interface Partner {
  name: string;
  logoUrl: string;
  alt?: string;
  url?: string;
  category?: string;
}

/** A person on the Leadership page. */
export interface CmsPerson {
  name: string;
  role: string;
  group: 'founder' | 'leadership' | 'board';
  portrait?: Photo;
  bio: string[];
  order: number;
}

/** A gallery album, in the shape the Gallery page renders. */
export interface CmsAlbum {
  id: string;
  title: string;
  year: string;
  description: string;
  cover?: string;
  sets: { name: string; images: string[] }[];
}

/** One documented intervention. Fields OCHF has not verified arrive empty. */
export interface ProgrammeRecord {
  id: string;
  title: string;
  pillar: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  /** Only present once the figures have been checked against the records. */
  beneficiaries: string;
  outcomes: string[];
  image?: Photo;
  /** Only present when the person quoted has consented. */
  testimonial: string;
  testimonialName: string;
}

export interface Publication {
  id: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  url: string;
  sizeKb: number;
}

/** Approved institutional statements. Each list is empty until OCHF enters it. */
export interface Institution {
  values: { name: string; description: string }[];
  objectives: string[];
  registration: string;
}

export interface Content {
  site: Site;
  programmes: Programme[];
  headlineMetrics: Metric[];
  impactMetrics: Metric[];
  milestones: { year: string; body: string }[];
  stories: Story[];
  partners: Partner[];
  faqs: Faq[];
  /** Empty means "nothing in the CMS yet" — each page falls back to its own data. */
  people: CmsPerson[];
  albums: CmsAlbum[];
  records: ProgrammeRecord[];
  publications: Publication[];
  institution: Institution;
  /** True when every CMS query answered. A partial or failed load is false. */
  fromCms: boolean;
  /** True once a load has been attempted, whatever its outcome. */
  loaded: boolean;
}

export const fallback: Content = {
  site: localSite,
  programmes: localProgrammes,
  headlineMetrics,
  impactMetrics: localMetrics,
  milestones: localMilestones,
  stories: localStories,
  partners: localPartners as Partner[],
  faqs: localFaqs,
  people: [],
  albums: [],
  records: [],
  publications: [],
  institution: { values: [], objectives: [], registration: '' },
  fromCms: false,
  loaded: false,
};

/**
 * Flattens Sanity's Portable Text into plain paragraphs. Marks, links and embedded
 * objects are dropped rather than rendered half-correctly.
 */
function toParagraphs(body: unknown): string[] | undefined {
  if (!Array.isArray(body)) return undefined;
  const paragraphs = body
    .map((block) => {
      const children = (block as { children?: { text?: unknown }[] })?.children;
      if (!Array.isArray(children)) return '';
      return children.map((c) => String(c?.text ?? '')).join('').trim();
    })
    .filter(Boolean);
  return paragraphs.length ? paragraphs : undefined;
}

/** Sanity's image shape → the site's Photo shape. */
/** "Community Infrastructure" everywhere, never bare "Infrastructure" (master file 4.1). */
const focusLabel = (area: string) => (area.trim().toLowerCase() === 'infrastructure' ? 'Community Infrastructure' : area.trim());

function toPhoto(src: unknown, fallbackPhoto: Photo): Photo {
  const raw = src as { url?: string; alt?: string; credit?: string } | undefined;
  if (!raw?.url) return fallbackPhoto;
  return {
    src: imageUrl(src, 1600) || raw.url,
    alt: raw.alt ?? fallbackPhoto.alt,
    credit: raw.credit ?? '',
  };
}

export async function loadContent(): Promise<Content> {
  if (!cmsEnabled || !client) return { ...fallback, loaded: true };

  // Failures are counted rather than hidden, so a caller holding good content (a
  // prerendered page) can keep it instead of swapping in the fallback.
  let failures = 0;
  const get = async <T,>(query: string, fb: T): Promise<T> => {
    try {
      return (await client!.fetch<T>(query)) ?? fb;
    } catch (err) {
      failures++;
      console.error('[cms] fetch failed', err instanceof Error ? err.message : err);
      return fb;
    }
  };

  const [settings, programmes, metrics, milestones, stories, partners, faqs, people, albums, records, publications] =
    await Promise.all([
      get<Record<string, unknown> | null>(queries.settings, null),
      get<Record<string, unknown>[]>(queries.programmes, []),
      get<Record<string, unknown>[]>(queries.impactMetrics, []),
      get<{ year: string; body: string }[]>(queries.milestones, []),
      get<Record<string, unknown>[]>(queries.stories, []),
      get<Partner[]>(queries.partners, []),
      get<Record<string, unknown>[]>(queries.faqs, []),
      get<Record<string, unknown>[]>(queries.people, []),
      get<Record<string, unknown>[]>(queries.albums, []),
      get<Record<string, unknown>[]>(queries.records, []),
      get<Record<string, unknown>[]>(queries.publications, []),
    ]);

  const str = (v: unknown) => (v == null ? '' : String(v).trim());

  const mappedRecords: ProgrammeRecord[] = records
    .map((r) => ({
      id: str(r._id),
      title: str(r.title),
      pillar: str(r.pillar),
      location: str(r.location),
      start: str(r.startDate),
      end: str(r.endDate),
      summary: str(r.summary),
      beneficiaries: str(r.beneficiaries),
      outcomes: (Array.isArray(r.outcomes) ? r.outcomes : []).map(str).filter(Boolean),
      image: r.image ? toPhoto(r.image, { src: '', alt: '', credit: '' }) : undefined,
      testimonial: str(r.testimonial),
      testimonialName: str(r.testimonialName),
    }))
    .map((r) => (r.image && !r.image.src ? { ...r, image: undefined } : r))
    .filter((r) => r.title && r.summary);

  const mappedPublications: Publication[] = publications
    .map((p) => ({
      id: str(p._id), title: str(p.title), kind: str(p.kind) || 'Other', year: str(p.year),
      summary: str(p.summary), url: str(p.url), sizeKb: Math.round(Number(p.size ?? 0) / 1024),
    }))
    .filter((p) => p.title && p.url);

  const institution: Institution = {
    values: (Array.isArray(settings?.values) ? settings.values as Record<string, unknown>[] : [])
      .map((v) => ({ name: str(v?.name), description: str(v?.description) }))
      .filter((v) => v.name),
    objectives: (Array.isArray(settings?.objectives) ? settings.objectives : []).map(str).filter(Boolean),
    registration: str(settings?.registration),
  };

  const mappedProgrammes: Programme[] = programmes.length
    ? programmes.map((p, i) => {
        const local = localProgrammes.find((l) => l.slug === p.slug) ?? localProgrammes[i];
        const terms = (p.terms as { value: string; label: string }[]) ?? [];
        const panels = (p.panels as { heading: string; body: string }[]) ?? [];
        return {
          slug: String(p.slug),
          name: String(p.name),
          tag: String(p.tag ?? ''),
          focusAreas: splitFocusAreas(String(p.tag ?? '')).map(focusLabel),
          blurb: splitFocusAreas(String(p.tag ?? '')).map(focusLabel).join(' · '),
          summary: String(p.summary ?? ''),
          image: toPhoto(p.image, local?.image ?? localProgrammes[0].image),
          application: {
            open: p.applicationOpen === true,
            url: String(p.applicationUrl ?? '').trim(),
            deadline: String(p.applicationDeadline ?? '').trim(),
          },
          detail: p.modelTitle
            ? {
                modelEyebrow: 'The grant model',
                modelTitle: String(p.modelTitle),
                terms,
                panels,
                ctaTitle: 'Ready to grow your business?',
                ctaPrimary: {
                  label: p.applicationOpen ? 'Apply for the Grant' : 'Enquire about this programme',
                  path: p.applicationOpen ? '/our-work/enterprise/grants' : '/contact',
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
          slug: String(s.slug).trim(),
          category: s.category as Story['category'],
          title: String(s.title).trim(),
          standfirst: String(s.standfirst ?? '').trim(),
          date: String(s.date ?? '').slice(0, 4),
          image: toPhoto(s.image, local?.image ?? localStories[0].image),
          draft: false,
          body: toParagraphs(s.body),
        };
      })
    : fallback.stories;

  /* A person with no biography written yet is left out rather than published as a
     name and a job title. */
  const mappedPeople: CmsPerson[] = people
    .map((p) => ({
      name: String(p.name ?? '').trim(),
      role: String(p.role ?? '').trim(),
      group: (p.group as CmsPerson['group']) ?? 'leadership',
      portrait: p.portrait ? toPhoto(p.portrait, localStories[0].image) : undefined,
      bio: toParagraphs(p.bio) ?? [],
      order: Number(p.order ?? 100),
    }))
    .filter((p) => p.name && p.bio.length > 0)
    .sort((a, b) => a.order - b.order);

  const mappedAlbums: CmsAlbum[] = albums
    .map((a) => {
      const sets = (Array.isArray(a.sets) ? a.sets : [])
        .map((s) => {
          const set = s as { name?: unknown; images?: unknown[] };
          return {
            name: String(set.name ?? '').trim(),
            images: (Array.isArray(set.images) ? set.images : [])
              .map((im) => toPhoto(im, localStories[0].image).src)
              .filter(Boolean),
          };
        })
        .filter((s) => s.images.length > 0);
      return {
        id: String(a.slug ?? a.title ?? '').trim(),
        title: String(a.title ?? '').trim(),
        year: String(a.year ?? '').trim(),
        description: String(a.description ?? '').trim(),
        cover: a.cover ? toPhoto(a.cover, localStories[0].image).src : sets[0]?.images[0],
        sets,
      };
    })
    // Published albums with no photographs yet are kept; the Gallery shows them as
    // awaiting photographs without making them openable.
    .filter((a) => a.id);

  // The CMS stores `question` / `answer`; the site's Faq shape is `q` / `a`.
  const mappedFaqs: Faq[] = faqs
    .map((f) => ({ q: String(f.q ?? f.question ?? '').trim(), a: String(f.a ?? f.answer ?? '').trim() }))
    .filter((f) => f.q && f.a);

  return {
    people: mappedPeople,
    albums: mappedAlbums,
    records: mappedRecords,
    publications: mappedPublications,
    institution,
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
          social: { ...localSite.social, ...((settings.social as object) ?? {}) },
        }
      : localSite,
    programmes: mappedProgrammes,
    // Only signed-off figures are shown: "four true numbers beat five uncertain ones"
    // (master file 4.1). A figure that is not verified is left out, not drawn as pending.
    headlineMetrics: mappedMetrics.length
      ? mappedMetrics.filter((m, i) => (metrics[i] as { placement?: string }).placement === 'headline' && m.status === 'verified' && m.value)
      : fallback.headlineMetrics,
    impactMetrics: mappedMetrics.length ? mappedMetrics.filter((m) => m.status === 'verified' && m.value) : fallback.impactMetrics,
    // A milestone must state a fact; "figures pending verification" contradicts the
    // reporting standard and is never shown (master file F2).
    milestones: milestones.filter((m) => !/pending verification/i.test(m.body)).length
      ? milestones.filter((m) => !/pending verification/i.test(m.body))
      : fallback.milestones,
    stories: mappedStories,
    partners,
    faqs: mappedFaqs.length ? mappedFaqs : fallback.faqs,
    fromCms: failures === 0,
    loaded: true,
  };
}
