export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageLayout',
      title: 'Page Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Cards with Overlay (home, contact, reservations style)', value: 'withOverlay' },
          { title: 'Full Content Card (FAQ style)', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'withOverlay',
    },
    {
      name: 'content',
      title: 'Main Card Content',
      description: 'Content displayed inside the cream card',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    description: 'https://… · mailto:email@example.com · tel:+14165550100',
                    validation: (Rule) =>
                      Rule.custom((val) => {
                        if (!val) return true
                        if (/^(https?|mailto|tel):/.test(val)) return true
                        return 'Must start with https://, mailto:, or tel:'
                      }),
                  },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
          ],
        },
        {
          type: 'object',
          name: 'resyBooking',
          title: 'Resy Reservation Widget (inline)',
          description: 'Embeds the full Resy booking flow directly on the page',
          fields: [
            {
              name: 'venueId',
              title: 'Venue ID',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'apiKey',
              title: 'API Key',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { venueId: 'venueId' },
            prepare({ venueId }) {
              return {
                title: 'Resy Reservation Widget',
                subtitle: venueId ? `Venue ${venueId}` : 'Venue ID missing',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'codeEmbed',
          title: 'Code / HTML Embed',
          fields: [
            {
              name: 'code',
              title: 'HTML / Embed Code',
              description:
                'Paste raw HTML and/or <script> embeds here (e.g. a Resy widget). Scripts will run on the page.',
              type: 'text',
              rows: 8,
            },
          ],
          preview: {
            select: { code: 'code' },
            prepare({ code }) {
              return {
                title: 'Code / HTML Embed',
                subtitle: code ? code.replace(/\s+/g, ' ').slice(0, 60) : 'empty',
              }
            },
          },
        },
      ],
    },
    {
      name: 'overlayText',
      title: 'Overlay Card Text',
      description: 'Shown in the white overlay card (e.g. "Coming soon!", "RESY Coming Soon!")',
      type: 'string',
      hidden: ({ document }) => document?.pageLayout !== 'withOverlay',
    },
    {
      name: 'overlayImage',
      title: 'Overlay Card Image',
      description: 'Image shown in the white overlay card (e.g. the fish lure)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.pageLayout !== 'withOverlay',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    },
    {
      name: 'seoImage',
      title: 'SEO / Social Share Image',
      type: 'image',
      group: 'seo',
    },
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }) {
      return { title, subtitle: `/${subtitle}` }
    },
  },
}
