import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

const isConfigured = projectId && projectId !== 'placeholder'

export const client = createClient({
  projectId: isConfigured ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Fetches from Sanity. Returns null when the project isn't configured yet
// (e.g. a build without env vars).
//
// Caching: when `tags` are provided the result is cached indefinitely and only
// refreshed on demand (via the /api/revalidate webhook fired by Sanity). This
// avoids the constant time-based ISR rewrites that a short `revalidate` causes.
// A 24h fallback covers any untagged calls.
export async function sanityFetch({ query, params = {}, tags = [] }) {
  if (!isConfigured) return null

  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : 86400,
      tags,
    },
  })
}
