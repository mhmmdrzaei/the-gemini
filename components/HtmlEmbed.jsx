'use client'

import { useEffect, useRef } from 'react'
import styles from './HtmlEmbed.module.scss'

// Renders raw HTML from Sanity and executes any <script> tags it contains.
// React's dangerouslySetInnerHTML does NOT run scripts, and embeds like Resy
// need their external script to finish loading before the inline init runs —
// so we inject the scripts ourselves, in order.
export default function HtmlEmbed({ html }) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container || !html) return

    container.innerHTML = html

    // Pull out the scripts the innerHTML inserted (they don't auto-execute)
    const originalScripts = Array.from(container.querySelectorAll('script'))
    originalScripts.forEach((s) => s.remove())

    let cancelled = false

    const runSequentially = async () => {
      for (const old of originalScripts) {
        if (cancelled) return

        await new Promise((resolve) => {
          const script = document.createElement('script')
          for (const attr of old.attributes) {
            script.setAttribute(attr.name, attr.value)
          }
          script.textContent = old.textContent

          // Wait for external scripts to load before running the next one;
          // inline scripts execute synchronously on append.
          if (old.src) {
            script.onload = resolve
            script.onerror = resolve
            container.appendChild(script)
          } else {
            container.appendChild(script)
            resolve()
          }
        })
      }
    }

    runSequentially()

    return () => {
      cancelled = true
    }
  }, [html])

  return <div ref={ref} className={styles.embed} />
}
