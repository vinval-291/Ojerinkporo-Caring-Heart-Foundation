import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { MetaCollector, resolve, headTags } from './lib/meta';
import type { Content } from './content/load';

export { loadContent } from './content/load';
export { personSlug } from './pages/Leadership';
export { headTags };

/** Renders one address to HTML, and returns the head tags its page declared. */
export function render(path: string, content: Content) {
  const collector: { path: string; meta?: ReturnType<typeof resolve> } = { path };
  const html = renderToString(
    <MetaCollector.Provider value={collector}>
      <StaticRouter location={path}>
        <App initial={content} />
      </StaticRouter>
    </MetaCollector.Provider>,
  );
  return { html, head: headTags(collector.meta ?? resolve(undefined, undefined, undefined, path)) };
}
