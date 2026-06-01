export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName,
    favicon,
    defaultSeoDescription,
    defaultSeoImage,
    menuItems,
    address,
    addressMapUrl,
    hours,
    socialLinks
  }
`

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    pageLayout,
    overlayText,
    overlayImage,
    content,
    seoTitle,
    seoDescription,
    seoImage
  }
`

export const allPageSlugsQuery = `
  *[_type == "page" && defined(slug.current) && slug.current != "home"] {
    "slug": slug.current
  }
`
