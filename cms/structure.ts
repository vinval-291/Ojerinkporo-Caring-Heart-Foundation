import type { StructureResolver } from 'sanity/structure';

/**
 * The sidebar the client sees when she logs in.
 *
 * Sanity's default is a flat alphabetical list of document types, which reads like a
 * database. This groups everything the way she thinks about the website instead:
 * what's on the site, what the numbers say, who we are, and what came in.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Ojerinkporo Caring Hearts Foundation')
    .items([
      // ---------------------------------------------------------- programmes
      S.listItem()
        .title('Programmes')
        .child(
          S.documentTypeList('programme')
            .title('Programmes')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),

      S.divider(),

      // ------------------------------------------------------------ content
      S.listItem()
        .title('Stories & updates')
        .child(
          S.documentTypeList('story')
            .title('Stories & updates')
            .defaultOrdering([{ field: 'date', direction: 'desc' }]),
        ),

      S.listItem()
        .title('Photo albums')
        .child(S.documentTypeList('galleryAlbum').title('Photo albums')),

      S.divider(),

      // ------------------------------------------------------------ numbers
      S.listItem()
        .title('Impact figures')
        .child(
          S.list()
            .title('Impact figures')
            .items([
              S.listItem()
                .title('Awaiting verification')
                .child(
                  S.documentList()
                    .title('Awaiting verification')
                    .filter('_type == "impactMetric" && status != "verified"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Published figures')
                .child(
                  S.documentList()
                    .title('Published figures')
                    .filter('_type == "impactMetric" && status == "verified"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('All figures')
                .child(
                  S.documentTypeList('impactMetric')
                    .title('All figures')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
            ]),
        ),

      S.listItem()
        .title('Milestones')
        .child(
          S.documentTypeList('milestone')
            .title('Milestones')
            .defaultOrdering([{ field: 'year', direction: 'asc' }]),
        ),

      S.divider(),

      // ------------------------------------------------------------- people
      S.listItem()
        .title('People')
        .child(
          S.documentTypeList('person')
            .title('People')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),

      S.listItem()
        .title('Partners')
        .child(S.documentTypeList('partner').title('Partners')),

      S.divider(),

      // ---------------------------------------------------------- reference
      S.listItem()
        .title('Questions & answers')
        .child(
          S.documentTypeList('faq')
            .title('Questions & answers')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),

      // Read-only inbox of website enquiries.
      S.listItem()
        .title('Enquiries')
        .child(
          S.documentTypeList('submission')
            .title('Enquiries')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
        ),

      S.divider(),

      // Singleton — one document, edited in place, never listed.
      S.listItem()
        .title('Foundation details')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Foundation details'),
        ),
    ]);
