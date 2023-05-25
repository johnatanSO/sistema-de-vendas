import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Sidebar } from '../src/layout/Sidebar'
import { useRouter } from 'next/router'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const restrictLayout =
    router.route !== '/login' && router.route !== '/createAccount'

  return (
    <div className="wrapper">
      {restrictLayout && <Sidebar />}

      <main className={restrictLayout ? 'screensContainer' : 'loginContainer'}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
