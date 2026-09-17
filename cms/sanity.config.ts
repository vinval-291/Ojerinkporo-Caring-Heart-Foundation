import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './structure';

/**
 * OCHF content dashboard.
 *
 * SETUP: create a free project at sanity.io/manage, then put its ID in
 * `projectId` below (and in the website's .env as VITE_SANITY_PROJECT_ID).
 */
export default defineConfig({
  name: 'ochf',
  title: 'Ojerinkporo Caring Hearts Foundation',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'essbj1jr',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    // Query playground. Restricted to administrators.
    visionTool({ defaultApiVersion: '2024-10-01' }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Keep the "create new" menu focused on what editors actually create.
    newDocumentOptions: (prev) =>
      prev.filter((item) => !['siteSettings', 'submission'].includes(item.templateId)),
  },
});
