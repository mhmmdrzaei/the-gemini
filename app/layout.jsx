import '@/styles/globals.scss'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'

// Site-wide metadata (favicon + fallback title/description) sourced from
// Sanity Site Settings. Individual pages override title/description/og:image.
export async function generateMetadata() {
  const settings = await sanityFetch({ query: siteSettingsQuery })
  const siteName = settings?.siteName || 'The Gemini'

  const metadata = {
    title: {
      default: siteName,
      template: `%s — ${siteName}`,
    },
  }

  if (settings?.defaultSeoDescription) {
    metadata.description = settings.defaultSeoDescription
  }

  if (settings?.favicon) {
    metadata.icons = {
      icon: urlFor(settings.favicon).width(512).url(),
    }
  }

  if (settings?.defaultSeoImage) {
    metadata.openGraph = {
      images: [urlFor(settings.defaultSeoImage).width(1200).url()],
    }
  }

  return metadata
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
