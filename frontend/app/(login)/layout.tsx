export default function Layout({ children }: any) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sistema de vendas</title>
      </head>
      <body>
        <main
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
