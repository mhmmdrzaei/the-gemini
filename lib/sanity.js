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

// Fetches from Sanity with light caching. Returns null when the project
// isn't configured yet (e.g. during a build without env vars).
export async function sanityFetch({ query, params = {}, tags = [] }) {
  if (!isConfigured) return null

  return client.fetch(query, params, {
    next: { revalidate: 60, tags },
  })
}
