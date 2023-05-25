import express, { Express } from 'express'
import dbConnection from './src/mongoConfigs'
import cors from 'cors'
import { vendasRoutes } from './src/routes/vendas'
import { dashboardRoutes } from './src/routes/dashboard'
import { produtosRoutes } from './src/routes/produtos'
import { usersRoutes } from './src/routes/users'

interface CustomExpress extends Express {
  mongo?: any
}

// Configs:
const app: CustomExpress = express()
const PORT = 3333
app.mongo = dbConnection
app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`))

// Rotas do sistema:
app.use('/vendas', vendasRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/produtos', produtosRoutes)
app.use('/users', usersRoutes)

/* Não adicionei nenhum middleware em nenhuma das rotas (authentication || permission) 
pois o sistema é bem simples e para fins de estudo. */
app.get('/', async (req: any, res: any) => {
  try {
    res
      .status(200)
      .send(`<h1>Servidor funcionando corretamente na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})
