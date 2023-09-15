import 'reflect-metadata'
import express, { Express } from 'express'
import 'express-async-errors'
import { routes } from './src/routes'
import './src/shared/containers'
import dbConnection from './src/database/mongoConfigs'
import cors from 'cors'
import { handleErrors } from './src/middlewares/handleErrors'

interface CustomExpress extends Express {
  mongo?: any
}

// Configurações
const app: CustomExpress = express()
const PORT = 3333

app.mongo = dbConnection
app.use(express.json())
app.use(cors())

// Rotas
app.use(routes)
app.use(handleErrors)

app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`))

app.get('/', async (req: any, res: any) => {
  try {
    res.status(200).send(`<h1>Servidor rodando na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})
