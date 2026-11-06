import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import type { Content } from './content/load';
import './styles.css';

declare global {
  interface Window { __OCHF__?: { path: string; content: Content } }
}

// Scroll reveals arm only when the browser can observe and the reader has not asked
// for reduced motion. Otherwise every section is simply visible.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reveal-ready');
}

const root = document.getElementById('root')!;
const state = window.__OCHF__;
const here = window.location.pathname.replace(/\/+$/, '') || '/';

const app = (
  <StrictMode>
    <BrowserRouter>
      <App initial={state?.content} />
    </BrowserRouter>
  </StrictMode>
);

/* A page built for this address is hydrated in place. Any other address — the
   server's fallback serves the homepage's HTML for every unknown path, and /admin is
   never prerendered — renders fresh instead of hydrating the wrong page. */
if (state && state.path === here && root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  root.textContent = '';
  createRoot(root).render(app);
}
