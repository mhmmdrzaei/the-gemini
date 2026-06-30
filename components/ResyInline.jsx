'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ResyInline.module.scss'

// Embeds the full Resy booking flow inline (no button / modal).
//
// The booking app is served from widgets.resy.com, which sets no
// X-Frame-Options / frame-ancestors, so it can be framed directly — this is
// the same iframe the official widget opens in its modal. As the user moves
// through the flow (calendar -> times -> details) the widget posts
// { event: "resyHeightChanged", value: <px> } to the parent so we can resize
// the frame to fit its content.
export default function ResyInline({ venueId, apiKey, minHeight = 600 }) {
  const frameRef = useRef(null)
  const [height, setHeight] = useState(minHeight)

  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== 'https://widgets.resy.com') return
      const data = event.data
      if (data && data.event === 'resyHeightChanged' && typeof data.value === 'number') {
        setHeight(Math.max(data.value, minHeight))
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [minHeight])

  // Deterministic src (no window access) so SSR and client markup match.
  const params = new URLSearchParams({
    venueId: String(venueId),
    apiKey: apiKey || '',
  })
  const src = `https://widgets.resy.com/?${params.toString()}#/venues/${venueId}`

  return (
    <div className={styles.wrap}>
      <iframe
        ref={frameRef}
        src={src}
        title="Resy reservations"
        allow="clipboard-write; payment"
        scrolling="no"
        className={styles.frame}
        style={{ height: `${height}px` }}
      />
    </div>
  )
}
