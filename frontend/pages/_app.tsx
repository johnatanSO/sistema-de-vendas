import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Sidebar } from '../src/layout/Sidebar'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AlertContextComponent } from '../src/contexts/alertContext'

config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const restrictLayout =
    router.route !== '/login' && router.route !== '/createAccount'

  return (
    <div className="wrapper">
      <AlertContextComponent>
        <Head>
          <title>Sistema de vendas</title>
          <link rel="shortcut icon" href="./favicon.ico" />
        </Head>
        {restrictLayout && <Sidebar />}

        <main
          className={restrictLayout ? 'screensContainer' : 'loginContainer'}
        >
          <Component {...pageProps} />
        </main>
      </AlertContextComponent>
    </div>
  )
}
