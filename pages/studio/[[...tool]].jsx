import dynamic from 'next/dynamic'
import config from '../../sanity.config'

// Load studio client-side only — it uses browser APIs
const Studio = dynamic(
  () => import('sanity').then((mod) => ({ default: mod.Studio })),
  { ssr: false }
)

export default function StudioPage() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Studio config={config} />
    </div>
  )
}

// Skip the main site layout for the studio
StudioPage.noLayout = true
