import { sanityFetch } from '@/lib/sanity'
import { pageBySlugQuery, siteSettingsQuery } from '@/lib/queries'
import Layout from '@/components/Layout'
import PageCard from '@/components/PageCard'
import { urlFor } from '@/lib/sanity'

export default function HomePage({ page, siteSettings }) {
  if (!page) {
    return (
      <Layout siteSettings={siteSettings}>
        <p style={{ textAlign: 'center', opacity: 0.5 }}>
          No home page found. Create a page with slug &ldquo;home&rdquo; in Sanity.
        </p>
      </Layout>
    )
  }

  const seo = {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    imageUrl: page.seoImage ? urlFor(page.seoImage).width(1200).url() : undefined,
  }

  return (
    <Layout siteSettings={siteSettings} seo={seo}>
      <PageCard
        content={page.content}
        layout={page.pageLayout || 'withOverlay'}
        overlayText={page.overlayText}
        overlayImage={page.overlayImage}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const [page, siteSettings] = await Promise.all([
    sanityFetch({ query: pageBySlugQuery, params: { slug: 'home' } }),
    sanityFetch({ query: siteSettingsQuery }),
  ])

  return {
    props: {
      page: page ?? null,
      siteSettings: siteSettings ?? null,
    },
    revalidate: 60,
  }
}
