import Link from 'next/link'
import Nav from './Nav'
import styles from './Layout.module.scss'

export default function Layout({ children, siteSettings }) {
  return (
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
  )
}
