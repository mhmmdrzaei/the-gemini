import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity'
import { pageBySlugQuery, allPageSlugsQuery, siteSettingsQuery } from '@/lib/queries'
import { buildPageMetadata } from '@/lib/metadata'
import Layout from '@/components/Layout'
import PageCard from '@/components/PageCard'

export const revalidate = 60

async function getData(slug) {
  const [page, siteSettings] = await Promise.all([
    sanityFetch({ query: pageBySlugQuery, params: { slug } }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  return { page, siteSettings }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: allPageSlugsQuery })
  return (slugs || []).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { page } = await getData(slug)
  return buildPageMetadata(page)
}

export default async function Page({ params }) {
  const { slug } = await params
  const { page, siteSettings } = await getData(slug)

  if (!page) {
    notFound()
  }

  return (
    <Layout siteSettings={siteSettings}>
      <PageCard
        content={page.content}
        layout={page.pageLayout || 'withOverlay'}
        overlayText={page.overlayText}
        overlayImage={page.overlayImage}
      />
    </Layout>
  )
}
