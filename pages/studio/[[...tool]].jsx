import dynamic from 'next/dynamic'
import config from '../../sanity.config'

// Load studio client-side only — it uses browser APIs
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}

// Skip the main site layout for the studio
StudioPage.noLayout = true
