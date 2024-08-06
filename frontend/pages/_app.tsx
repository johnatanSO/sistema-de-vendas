import '../src/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Sidebar } from '../src/components/layout/Sidebar'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AlertContextComponent } from '../src/contexts/alertContext'
import { useState } from 'react'
import { MenuMobile } from '../src/components/layout/MenuMobile'
import { MenuOptionsMobile } from '../src/components/layout/MenuOptionsMobile'
import { UserContextComponent } from '../src/contexts/userContext'

export interface PageProps {
  setTitle: (title: string) => void
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [title, setTitle] = useState('Sistema de vendas')
  const restrictLayout =
    router.route !== '/login' && router.route !== '/createAccount'
  const [menuOptionsOpened, setMenuOptionsOpened] = useState<boolean>(false)

  function handleOpenMenuOptions() {
    setMenuOptionsOpened(!menuOptionsOpened)
  }

  return (
    <div className="wrapper">
      <UserContextComponent>
        <AlertContextComponent>
          <Head>
            <title>{title || 'Sistema de vendas'}</title>
            <link rel="shortcut icon" href="./favicon.ico" />
          </Head>

          {restrictLayout && <Sidebar />}

          {restrictLayout && (
            <MenuMobile
              handleOpenMenuOptions={handleOpenMenuOptions}
              menuOptionsOpened={menuOptionsOpened}
            />
          )}

          <main
            className={restrictLayout ? 'screensContainer' : 'loginContainer'}
          >
            {restrictLayout && menuOptionsOpened && (
              <MenuOptionsMobile
                handleOpenMenuOptions={handleOpenMenuOptions}
              />
            )}

            {restrictLayout && (
              <h2 className="titlePage">{title || 'Sistema de vendas'}</h2>
            )}
            <Component setTitle={setTitle} {...pageProps} />
          </main>
        </AlertContextComponent>
      </UserContextComponent>
    </div>
  )
}
