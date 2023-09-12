import { Request, Response } from 'express'
import { ListAccountsService } from '../useCases/Account/ListAccountsService.service'
import { container } from 'tsyringe'
import { CreateNewAccountService } from '../useCases/Account/CreateNewAccountService.service'
import { UpdateNewAccountService } from '../useCases/Account/UpdateAccountService.service'
import { DeleteAccountService } from '../useCases/Account/DeleteAccountService.service'

export class AccountController {
  async listAccounts(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate, accountType, userId } = req.query

      const listAccountsService = container.resolve(ListAccountsService)
      const accounts = await listAccountsService.execute({
        startDate,
        endDate,
        accountType,
        userId,
      })

      return res.status(200).json({
        items: accounts,
        message: 'Busca concluída com sucesso!',
      })
    } catch ({ message }) {
      return res.status(500).json({ message })
    }
  }

  async createNewAccount(req: Request, res: Response): Promise<Response> {
    try {
      const { description, type, category, value, userInfo } = req.body

      const createNewAccountService = container.resolve(CreateNewAccountService)
      const newAccount = await createNewAccountService.execute({
        description,
        type,
        category,
        value,
        userId: userInfo?._id,
      })

      return res.status(201).json({
        item: newAccount,
        message: 'Conta cadastrada com sucesso',
      })
    } catch ({ message }) {
      return res.status(401).json({
        message,
      })
    }
  }

  async updateAccount(req: Request, res: Response): Promise<Response> {
    try {
      const { description, category, type, _id, value, userId } = req.body

      const updateNewAccountService = container.resolve(UpdateNewAccountService)
      const updatedAccount = await updateNewAccountService.execute({
        description,
        category,
        type,
        _id,
        value,
        userId,
      })

      return res.status(202).json({
        updatedAccount,
        message: 'Conta atualizada com sucesso',
      })
    } catch (error: any) {
      return res.status(402).json({ error: error.message })
    }
  }

  async deleteAccount(req: Request, res: Response): Promise<Response> {
    try {
      const { idAccount } = req.query

      const deleteAccountService = container.resolve(DeleteAccountService)
      await deleteAccountService.execute(idAccount)

      return res.status(200).json({ message: 'Conta excluída com sucesso' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
