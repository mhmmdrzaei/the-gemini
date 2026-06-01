import { sanityFetch } from '@/lib/sanity'
import { pageBySlugQuery, allPageSlugsQuery, siteSettingsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Layout from '@/components/Layout'
import PageCard from '@/components/PageCard'

export default function Page({ page, siteSettings }) {
  if (!page) {
    return (
      <Layout siteSettings={siteSettings} seo={{ title: '404' }}>
        <p style={{ textAlign: 'center', opacity: 0.5 }}>Page not found.</p>
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

export async function getStaticPaths() {
  // Skip fetching at build time if credentials aren't configured yet
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') {
    return { paths: [], fallback: 'blocking' }
  }

  const slugs = await sanityFetch({ query: allPageSlugsQuery })

  return {
    paths: (slugs || []).map((s) => ({ params: { slug: s.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const [page, siteSettings] = await Promise.all([
    sanityFetch({ query: pageBySlugQuery, params: { slug: params.slug } }),
    sanityFetch({ query: siteSettingsQuery }),
  ])

  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      page,
      siteSettings: siteSettings ?? null,
    },
    revalidate: 60,
  }
}
