/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Sanity project ID. Empty until the CMS is connected — the site then uses local content. */
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
