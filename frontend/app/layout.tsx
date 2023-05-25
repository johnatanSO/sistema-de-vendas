import { Sidebar } from '@/src/layout/Sidebar'
import '../styles/globals.scss'

export default function Layout({ children }: any) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sistema de vendas</title>
      </head>
      <body>
        <Sidebar />
        <main className="screensContainer">{children}</main>
      </body>
    </html>
  )
}
