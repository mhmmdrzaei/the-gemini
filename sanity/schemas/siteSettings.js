export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      description: 'Recommended: square image, at least 512×512px (PNG or SVG)',
      type: 'image',
    },
    {
      name: 'defaultSeoDescription',
      title: 'Default SEO Description',
      description: 'Used on any page that does not have its own SEO description set',
      type: 'text',
      rows: 3,
    },
    {
      name: 'defaultSeoImage',
      title: 'Default SEO / Social Share Image',
      description: 'Used on any page that does not have its own SEO image set',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link (slug or URL)',
              description: 'Use a leading slash for internal pages, e.g. /reservations',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'link' },
          },
        },
      ],
    },
    {
      name: 'address',
      title: 'Restaurant Address',
      type: 'string',
    },
    {
      name: 'addressMapUrl',
      title: 'Google Maps Link',
      description: 'Paste the Google Maps URL here — the address in the header will link to it',
      type: 'url',
    },
    {
      name: 'hours',
      title: 'Restaurant Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Day / Label',
              description: 'e.g. "Thursday – Monday" or "Thursday"',
              type: 'string',
            },
            {
              name: 'times',
              title: 'Hours',
              description: 'e.g. "5pm – 11pm" — leave blank to show the label alone',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'times' },
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter / X', value: 'twitter' },
                ],
                layout: 'radio',
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
}
