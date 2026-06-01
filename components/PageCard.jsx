import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import styles from './PageCard.module.scss'

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.p}>{children}</p>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className={styles.link}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className={styles.contentImage}>
        <Image
          src={urlFor(value).width(800).url()}
          alt={value?.alt || ''}
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </div>
    ),
  },
}

export default function PageCard({ content, layout, overlayText, overlayImage }) {
  const hasOverlay = layout === 'withOverlay'

  return (
    <div className={`${styles.stage} ${hasOverlay ? styles.stageOverlay : styles.stageFull}`}>
      {/* Main cream card */}
      <div className={styles.frame}>
        <div className={styles.cardMain}>
          {content ? (
            <PortableText value={content} components={portableTextComponents} />
          ) : (
            <p className={styles.empty}>No content yet.</p>
          )}
        </div>
      </div>

      {/* White overlay card — only shown in withOverlay layout */}
      {hasOverlay && (
        <div className={styles.cardOverlay}>
          {overlayText && (
            <p className={styles.overlayText}>&ldquo;{overlayText}&rdquo;</p>
          )}
          {overlayImage ? (
            <div className={styles.overlayImageWrap}>
              <Image
                src={urlFor(overlayImage).width(600).url()}
                alt=""
                fill
                style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
              />
            </div>
          ) : (
            <div className={styles.overlayImagePlaceholder} aria-hidden="true" />
          )}
        </div>
      )}
    </div>
  )
}
