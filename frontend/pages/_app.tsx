import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Sidebar } from '../src/layout/Sidebar'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="wrapper">
      <Sidebar />
      <main className="screensContainer">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
