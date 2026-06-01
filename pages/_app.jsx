import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  if (Component.noLayout) {
    return <Component {...pageProps} />
  }

  return <Component {...pageProps} />
}
