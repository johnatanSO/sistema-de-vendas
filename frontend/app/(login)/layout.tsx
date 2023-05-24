export default function Layout({ children }: any) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sistema de vendas</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
