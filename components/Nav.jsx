import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Nav.module.scss'

export default function Nav({ siteSettings }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const {
    menuItems = [],
    address,
    addressMapUrl,
    hours = [],
    socialLinks = [],
  } = siteSettings || {}

  // Close on route change
  useEffect(() => {
    const handler = () => setOpen(false)
    router.events.on('routeChangeStart', handler)
    return () => router.events.off('routeChangeStart', handler)
  }, [router.events])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const instagramLink = socialLinks.find((s) => s.platform === 'instagram')

  return (
    <nav className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Main navigation">
      {/* Hamburger — mobile only */}
      <button
        className={styles.hamburger}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={styles.inner}>
        {/* Left: page links */}
        <ul className={styles.links}>
          {menuItems.map((item, i) => {
            const isActive =
              item.link === '/'
                ? router.pathname === '/'
                : router.asPath.startsWith(item.link)
            return (
              <li key={i}>
                <Link
                  href={item.link}
                  className={isActive ? styles.active : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right: address / hours / socials */}
        <div className={styles.info}>
          {address && (
            addressMapUrl ? (
              <a
                href={addressMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.address}
              >
                {address}
              </a>
            ) : (
              <p className={styles.address}>{address}</p>
            )
          )}

          {hours.length > 0 && (
            <ul className={styles.hours}>
              {hours.map((h, i) => (
                <li key={i}>
                  {h.times ? (
                    <>
                      <span className={styles.day}>{h.label}</span>
                      <span className={styles.time}>{h.times}</span>
                    </>
                  ) : (
                    <span className={styles.day}>{h.label}</span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {instagramLink && (
            <a
              href={instagramLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
