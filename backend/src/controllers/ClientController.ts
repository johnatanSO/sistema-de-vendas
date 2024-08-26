import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewClientService } from '../useCases/Client/CreateNewClient/CreateNewClientService.service'
import { ListClientsService } from '../useCases/Client/ListClients/ListClientsService.service'
import { DeleteClientService } from '../useCases/Client/DeleteClient/DeleteClientService.service'
import { UpdateClientService } from '../useCases/Client/UpdateClientService/UpdateClientService.service'

export class ClientController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, phone, cpf, email } = req.body
    const { userId } = req.user

    const createNewClientService = container.resolve(CreateNewClientService)
    const newClient = await createNewClientService.execute({
      name,
      phone,
      cpf,
      email,
      userId,
    })

    return res.status(201).json({
      success: true,
      item: newClient,
      message: 'Cliente cadastrado com sucesso',
    })
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user
    const { searchString = null } = req.query

    const listClientsService = container.resolve(ListClientsService)
    const clients = await listClientsService.execute({ 
      userId, 
      ...(searchString ? {
        searchString: String(searchString)
      } : {
        searchString: null
      }) 
    })

    return res.status(200).json({
      success: true,
      items: clients,
      message: 'Busca de clientes realizada com sucesso',
    })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { clientId } = req.params

    const deleteClientService = container.resolve(DeleteClientService)
    await deleteClientService.execute(clientId)

    return res.status(200).json({
      success: true,
      message: 'Cliente excluído com sucesso',
    })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, phone, email, cpf } = req.body
    const { clientId } = req.params

    const updateClientService = container.resolve(UpdateClientService)
    await updateClientService.execute({ name, email, phone, cpf, clientId })

    return res.status(201).json({
      success: true,
      message: 'Dados do cliente atualizados com sucesso',
    })
  }
}
