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
        <main
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
