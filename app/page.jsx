import { sanityFetch } from '@/lib/sanity'
import { pageBySlugQuery, siteSettingsQuery } from '@/lib/queries'
import { buildPageMetadata } from '@/lib/metadata'
import Layout from '@/components/Layout'
import PageCard from '@/components/PageCard'

export const revalidate = 60

async function getData() {
  const [page, siteSettings] = await Promise.all([
    sanityFetch({ query: pageBySlugQuery, params: { slug: 'home' } }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  return { page, siteSettings }
}

export async function generateMetadata() {
  const { page } = await getData()
  return buildPageMetadata(page)
}

export default async function HomePage() {
  const { page, siteSettings } = await getData()

  return (
    <Layout siteSettings={siteSettings}>
      {page ? (
        <PageCard
          content={page.content}
          layout={page.pageLayout || 'withOverlay'}
          overlayText={page.overlayText}
          overlayImage={page.overlayImage}
        />
      ) : (
        <p style={{ textAlign: 'center', opacity: 0.5 }}>
          No home page found. Create a page with slug &ldquo;home&rdquo; in Sanity.
        </p>
      )}
    </Layout>
  )
}
