import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { cmsEnabled, onContentChange } from '@/src/lib/sanity';
import { fallback, loadContent, type Content } from './load';

export type { Content, Partner, CmsPerson, CmsAlbum, ProgrammeRecord, Publication, Institution } from './load';

/**
 * Supplies page content to every page.
 *
 * A prerendered page starts with the content it was built with, so the first paint
 * matches the HTML. The browser then fetches the CMS again and listens for publishes,
 * so an edit in the dashboard appears without waiting for a rebuild.
 */
const ContentContext = createContext<Content>(fallback);

export const useContent = () => useContext(ContentContext);

export function ContentProvider({ initial, children }: { initial?: Content; children: ReactNode }) {
  const [content, setContent] = useState<Content>(initial ?? fallback);

  useEffect(() => {
    if (!cmsEnabled) return;
    let cancelled = false;
    // A failed or partial refresh never replaces content that came complete from the
    // CMS — the page keeps what it was built with.
    const refresh = () => loadContent().then((c) => {
      if (!cancelled) setContent((prev) => (c.fromCms || !prev.fromCms ? c : prev));
    });
    refresh();
    const stop = onContentChange(refresh);
    return () => { cancelled = true; stop(); };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
