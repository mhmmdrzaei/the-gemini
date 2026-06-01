import Head from 'next/head'
import Link from 'next/link'
import Nav from './Nav'
import { urlFor } from '@/lib/sanity'
import styles from './Layout.module.scss'

export default function Layout({ children, siteSettings, seo = {} }) {
  const siteName = siteSettings?.siteName || 'The Gemini'
  const title = seo.title ? `${seo.title} — ${siteName}` : siteName

  const description = seo.description || siteSettings?.defaultSeoDescription || ''

  const ogImage =
    seo.imageUrl ||
    (siteSettings?.defaultSeoImage
      ? urlFor(siteSettings.defaultSeoImage).width(1200).url()
      : null)

  const faviconUrl = siteSettings?.favicon
    ? urlFor(siteSettings.favicon).width(512).url()
    : null

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Head>

      <div className={styles.site}>
        <Nav siteSettings={siteSettings} />

        <main className={styles.main}>
          <div className={styles.content}>
            {children}
          </div>
        </main>

        <footer className={styles.footer}>
          <Link href="/" className={styles.restaurantWord}>RESTAURANT</Link>
        </footer>
      </div>
    </>
  )
}
