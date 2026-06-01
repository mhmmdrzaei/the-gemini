import { urlFor } from './sanity'

// Builds Next.js metadata for a content page, falling back to site-level
// defaults (handled in the root layout) when page fields are empty.
export function buildPageMetadata(page) {
  if (!page) return {}

  const metadata = {
    title: page.seoTitle || page.title,
  }

  if (page.seoDescription) {
    metadata.description = page.seoDescription
  }

  if (page.seoImage) {
    metadata.openGraph = {
      images: [urlFor(page.seoImage).width(1200).url()],
    }
  }

  return metadata
}
